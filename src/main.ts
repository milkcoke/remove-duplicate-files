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

    const readFileWorker = new Worker(path.join(__dirname, 'readFiles.js'));

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
