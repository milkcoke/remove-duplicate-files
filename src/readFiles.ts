import {Worker, workerData} from "worker_threads";
import {readFile} from 'fs/promises';
import path from "path";
import {readdirSync} from "fs";

// 2. hashing file and store {filename: hashed value}
const targetDir = workerData.dirPath;
const allResources = readdirSync(targetDir, {encoding : 'utf-8', withFileTypes: true});
const files = allResources.filter(resource=>resource.isFile());

const numOfFiles : number = files.length;
console.log(`파일 수 : ${numOfFiles}`);

// Pass the number of all files
const hashFileWorker = new Worker(path.join(__dirname, 'hashFiles.js'), {workerData: {numOfFile: numOfFiles, dirPath: targetDir}});

hashFileWorker.once("exit", (exitCode)=>process.exit(exitCode));

try {
    // pass file name and byte stream whenever this thread reads each file asynchronously
    for (const file of files) {
        readFile(path.join(targetDir, file.name))
                                                .then((value: Buffer)=>{
                                                    hashFileWorker.postMessage({name: file.name, value: value});
                                                })
                                                .catch((reason: string)=>{
                                                    console.error({name: file.name, reason: reason});
                                                });
    }
} catch (error) {
    console.error(error)
}



