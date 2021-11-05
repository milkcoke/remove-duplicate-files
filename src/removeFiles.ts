import {parentPort, workerData} from "worker_threads";
import {File} from "./types/File";

let receivedFileNumber = 0;

const fileHashSet = new Set<string>();
const duplicateFileNames : string[] = [];

console.log(`removeFile's workerData: ${workerData.numOfFile}`);

parentPort.on('message', (file: File)=>{
    receivedFileNumber++;

    if (fileHashSet.has(file.value)) {
        duplicateFileNames.push(file.name);
    } else {
        fileHashSet.add(file.value);
    }

    if (receivedFileNumber >= workerData.numOfFile) console.log('Received all files!');
});

