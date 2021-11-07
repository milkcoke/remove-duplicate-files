import {Worker} from "worker_threads";
import {readFile} from 'fs/promises';
import path from "path";
import {readdirSync} from "fs";

// 2. hashing file and store {filename: hashed value}
const filePath = path.join(__dirname, '..', 'example-images');
const files = readdirSync(filePath, {encoding : 'utf-8', withFileTypes: true});
const numOfFiles : number = files.length;
console.log(`파일 수 : ${numOfFiles}`);

// 총 파일 수는 넘겨야함.
const hashFileWorker = new Worker(path.join(__dirname, 'hashFiles.js'), {workerData: {numOfFile: numOfFiles}});

hashFileWorker.once("exit", (exitCode)=>process.exit(exitCode));

try {
    // 파일을 다 읽고 넘기는게 아니라 읽을 때마다 족족 넘겨야함.
    for (const file of files) {
        readFile(path.join(filePath, file.name))
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



