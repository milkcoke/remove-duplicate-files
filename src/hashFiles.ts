import {parentPort, Worker, workerData} from "worker_threads";
import {createHash} from "crypto";
import path from "path";
// Hash class is a utility for creating hash digests of data.

// The hashFile thread should keep and share the file list object with removeFiles thread
// [
//  {name: fileName, value: hashedValue},
//  {name: fileName, value: hashedValue},
// ...
// ]

// you should pass 'workerData' in constructor even though parentThread already had it.
const removeFileWorker = new Worker(path.join(__dirname, 'removeFiles.ts'), {workerData: {numOfFile: workerData.numOfFile}});

parentPort.on('message', (fileObj: any)=>{
    const hashGenerator = createHash('MD5');
    hashGenerator.update(fileObj.value);
    const hashedValue : string = hashGenerator.digest('hex');

    console.log(fileObj.name);
    console.log(hashedValue);

    removeFileWorker.postMessage({name: fileObj.name, value: hashedValue});
});

