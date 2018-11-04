import { existsSync, open, read, write, mkdirSync } from 'fs';
import { dirname, join } from 'path';
export function saveFile(dir, fileName, content): Promise<{ success: boolean, err: string }> {
  return new Promise((resolve) => {
    if (!existsSync(dir)) {
      mkdirs(dir);
    }
    open(join(dir, fileName), 'w', (err: NodeJS.ErrnoException, fd) => {
      if (err) {
        return resolve({
          success: false,
          err: err.message,
        });
      }
      write(fd, content, (writeErr: NodeJS.ErrnoException, writtenfd: number) => {
        if (writeErr) {
          return resolve({
            success: false,
            err: writeErr.message,
          });
        }
        else {
          return resolve({
            success: true,
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