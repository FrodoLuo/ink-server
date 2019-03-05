import { existsSync, open, read, write, mkdirSync } from 'fs';
import { dirname, join } from 'path';
export function saveFile(dir, fileName, content): Promise<{ success: boolean, path: string, err: string }> {
  return new Promise((resolve, reject) => {
    if (!existsSync(dir)) {
      mkdirs(dir);
    }
    const path = join(dir, fileName);
    open(path, 'w', (err: NodeJS.ErrnoException, fd) => {
      if (err) {
        return reject({
          success: false,
          err: err.message,
        });
      }
      write(fd, content, (writeErr: NodeJS.ErrnoException, writtenfd: number) => {
        if (writeErr) {
          return reject({
            success: false,
            err: writeErr.message,
          });
        }
        else {
          return resolve({
            success: true,
            path,
            err: null,
          });
        }
      });
    });
  });
}

function mkdirs(dirpath) {
  if (! existsSync(dirname(dirpath))) {
    mkdirs(dirname(dirpath));
  }
  mkdirSync(dirpath);
}