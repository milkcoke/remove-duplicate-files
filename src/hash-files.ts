import {parentPort, Worker, workerData} from 'worker_threads'
import {createHash} from 'crypto'
import path from 'path'
import process from 'process'
import {IFile} from './types/File'

// The hashFile thread should keep and share the file list object with removeFiles thread
// [
//  {name: fileName, value: hashedValue},
//  {name: fileName, value: hashedValue},
// ...
// ]

// you should pass 'workerData' in constructor even though parentThread already had it.
const removeFileWorker = new Worker(path.join(__dirname, 'remove-files.js'), {
  workerData: workerData
})

removeFileWorker.once('exit', (exitCode)=>{
  process.exit(exitCode)
})

parentPort?.on('message', (file: IFile)=>{
  const hashedValue = createHash('MD5')
    .update(file.value)
    .digest('hex')

  removeFileWorker.postMessage({
    name: file.name,
    value: hashedValue
  })
})

