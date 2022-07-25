import ErrnoException = NodeJS.ErrnoException;
import * as fs from 'node:fs'

/**
 * Load a file and return as a promise.
 */
export async function loadFile(filepath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, 'utf8', (err: ErrnoException | null, content: string) => {
      if (err) {
        reject(err)
        return
      }

      resolve(content)
    })
  })
}

export function loadJson<T>(filepath: string): Promise<T> {
  return new Promise((resolve, reject) => {
    loadFile(filepath)
    .then((content: string) => {
      try {
        resolve(JSON.parse(content) as Promise<T>)
      } catch (error) {
        reject(error)
      }
    })
    .catch((error: ErrnoException | null) => {
      reject(error)
    })
  })
}

/**
 * Load a file and return as a promise.
 * @param filepath
 * @param data
 */
export async function writeFile(filepath: string, data: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const fileOptions: fs.WriteFileOptions = {
      encoding: 'utf8',
    }
    fs.writeFile(filepath, data, fileOptions, (err: NodeJS.ErrnoException | null) => {
      if (err) {
        reject(err)
        return
      }

      resolve(true)
    })
  })
}
