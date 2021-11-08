import util from 'util'
import {exec} from "child_process";
import {parentPort, workerData} from "worker_threads";
import path from "path";
import {File} from "./types/File";

// make exec call from callback function to promise(async) function
const promiseExec = util.promisify(exec);

const fileHashSet = new Set<string>();
const duplicateFileNames : string[] = [];
const targetPath = workerData.dirPath;

let receivedFileNumber = 0;

parentPort.on('message', (file: File)=>{
    receivedFileNumber++;

    if (fileHashSet.has(file.value)) {
        duplicateFileNames.push(file.name);
    } else {
        fileHashSet.add(file.value);
    }

    // send end signal and remove files from `rm` batch
    // (1) child process vs fsPromise.unlink asynchronously
    // child process 'exec' for rm batch operation

    // (3) How to input specific directory path from the user ?
    if (receivedFileNumber >= workerData.numOfFile) {

        // execute multiple command using '&&' just one call!
        // (4) can read input path of user

        if (duplicateFileNames.length === 0) {
            console.log("There is no duplicate file in your path : ", targetPath);
            process.exit(0);
        }

        const removeFilesCommand : string = "cd " + targetPath + " && " + "rm " + duplicateFileNames.join(" ");
        console.log('removed file command : ', removeFilesCommand);

        promiseExec(removeFilesCommand)
            .then(({stdout, stderr})=>{
                console.log(stdout);
                console.error(stderr);
                process.exit(0);
            })
            .catch(error=>{
                console.error(error);
                // error occurred => You've to exit using process.exit()!
                // parentPort.emit(error.code);
                process.exit(error.code);
            });
    }
});

