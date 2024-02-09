import {parentPort, workerData} from 'worker_threads'
import {rm} from 'fs/promises'
import path from 'path'
import process from 'process'
import {IFile} from './types/File'

const fileHashSet = new Set<string>()
const duplicateFileNames : string[] = []
const targetPath = workerData.dirPath

let receivedFileNumber = 0

parentPort.on('message', async (file: IFile)=>{
  receivedFileNumber++

  if (fileHashSet.has(file.value)) {
    duplicateFileNames.push(file.name)
  } else {
    fileHashSet.add(file.value)
  }

  if (receivedFileNumber >= workerData.numOfFile) {

    if (duplicateFileNames.length === 0) {
      console.log('There is no duplicate file in your path : ', targetPath)
      process.exit(0)
    }

    try {
      await Promise.all(
        duplicateFileNames.map(duplicateFileName=> {
          const removePromise = rm(path.join(targetPath, duplicateFileName))
          console.log(duplicateFileName + ' is removing..')
          return removePromise
        })
      )

      console.log('All duplicate files are removed!')
      process.exit(0)

    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err)
        process.exit(error.code)
      }
    }


  }
})

