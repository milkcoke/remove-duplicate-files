// start current directory
// readFile and store hashed value
// if there are duplicates of hashed value
// that stored remove filename from the directory having left one

import {Worker, isMainThread} from 'worker_threads'
import path from "path";

if (isMainThread) {
    // 4 workers
    // main threads just monit!

    // Each worker is connected with its parent worker via a message channel

    // 1. readFile byte stream from the directory
    // 2. hashing file and store {filename: hashed value}
    // 3. check existence duplicates and remove files from the directory

    const readFileWorker = new Worker(path.join('__dirname', 'readFiles.js'));
    // const hashFileWorker = new Worker(path.join('__dirname', 'hashFiles.js'));
    // const removeFileWorker = new Worker(path.join('__dirname', 'removeFiles.js'));


} else {
    console.log("you are not main threads!")
    process.exit(-1);
}
