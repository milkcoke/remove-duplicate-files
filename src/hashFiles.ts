import {parentPort} from "worker_threads";
import {createHash} from "crypto";
// Hash class is a utility for creating hash digests of data.


parentPort.on('message', (fileObj: any)=>{
    const hashGenerator = createHash('MD5');
    hashGenerator.update(fileObj.value);
    const hashedValue : string = hashGenerator.digest('hex');

    console.log(fileObj.name)
    console.log(hashedValue)
})
