import {Worker, parentPort} from "worker_threads";
import {readFile, readdir} from 'fs/promises';
import path from "path";

// 2. hashing file and store {filename: hashed value}
const filePath = path.join(__dirname, '..', 'example-images');

// const hashFileWorker = new Worker(path.join(__dirname, 'hashFiles.js'));

(async ()=>{

    try {
        const files = await readdir(filePath, {encoding : 'utf-8', withFileTypes: true});
        const numOfFiles : number = files.length;
        console.log(`파일 수 : ${numOfFiles}`);

    } catch (error) {
        console.error(error)
    }

})();


