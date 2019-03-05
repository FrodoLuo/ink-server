import { Injectable } from '@nestjs/common';
import { Media } from '../entity/media.entity';
import { saveFile } from '../utils/file';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { ErrorException } from '../exceptions';
import { SortMethod } from '../controller/media/media.controller';

@Injectable()
export class MediaService {

    constructor(
        @InjectRepository(Media)
        private mediaRepository: Repository<Media>,
        private userService: UserService,
    ) { }

    public async getFilesByToken(token: string, start: number, count: number, sort: SortMethod) {
        const user = await this.userService.findByToken(token);
        return await this.mediaRepository.find({
            where: {
                user,
            },
            skip: start,
            take: count,
        });
    }

    public async getFileByTokenAndId(token: string, id: number) {
        const user = await this.userService.findByToken(token);
        try {
            return await this.mediaRepository.findOneOrFail(id, { where: { user } });
        } catch (err) {
            throw new ErrorException(err);
        }
    }

    public async saveFiles(files: IFile[], token: string): Promise<Media[]> {
        const user = await this.userService.findByToken(token);
        const date = Date.now();
        const medias = await files.map(async (file, index) => {
            console.log(file);
            const f = await saveFile(`data/media/${user.id}`, `${date}_${index}.${file.originalname.split('.').reverse()[0]}`, file.buffer);
            const m = new Media();
            m.name = file.originalname;
            m.user = user;
            m.extension = file.mimetype;
            m.path = f.path;
            m.size = file.size;
            this.mediaRepository.save(m);
            return m;
        });
        return Promise.all(medias);
    }

    public async deleteFiles(id, token: string) {
        const user = await this.userService.findByToken(token);
        const media = await this.mediaRepository.findOne({
            where: {
                user,
                id,
            },
        });
        if (media) {
            media.deleted = true;
            return this.mediaRepository.save(media);
        } else {
            return null;
        }
    }
}

export interface IFile {
    /** Field name specified in the form */
    fieldname: string;
    /** Name of the file on the user's computer */
    originalname: string;
    /** Encoding type of the file */
    encoding: string;
    /** Mime type of the file */
    mimetype: string;
    /** Size of the file in bytes */
    size: number;
    /** The folder to which the file has been saved (DiskStorage) */
    destination: string;
    /** The name of the file within the destination (DiskStorage) */
    filename: string;
    /** Location of the uploaded file (DiskStorage) */
    path: string;
    /** A Buffer of the entire file (MemoryStorage) */
    buffer: Buffer;
}
