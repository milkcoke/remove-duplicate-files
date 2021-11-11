import {Worker, isMainThread} from 'worker_threads'
import path from "path";
import {lstatSync} from "fs"

// 4 workers
// main threads just monit!
if (isMainThread) {


    if (process.argv.length !== 3) {
        console.error("EIO: Invalid usage");
        process.exit(5);
    } else if (lstatSync(process.argv[2]).isDirectory() === false) {
        // ENOTDIR || ENOENT
        console.error("ENOTDIR : Invalid directory");
        process.exit(5);
    }

    // 1. readFile byte stream from the directory
    // 2. hashing file and store {filename: hashed value}
    // 3. check existence duplicates and remove files from the directory
    const readFileWorker = new Worker(path.join(__dirname, 'readFiles.js'), {workerData: {dirPath: process.argv[2]}});

    readFileWorker.once('exit', (exitCode: number) => {
        readFileWorker.terminate().then(()=>{
            switch (exitCode) {
                case 0:
                    console.log("All works are done successfully!");
                    break;
                default :
                    console.error("error occurred!!!");
                    console.error("exit code : ", exitCode);
                    break;
            }
        });
    });

} else {
    console.log("you are not a main thread!");
    process.exit(-1);
}
