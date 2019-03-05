import { Controller, Get, Query, Param, Put, Delete, UploadedFiles, UseGuards, UseInterceptors, FilesInterceptor } from '@nestjs/common';
import { AuthorizationGuard } from 'guard/authorization.guard';
import { MediaService, IFile } from 'service/media.service';
import { HeaderValue } from 'decorators/user.decorator';
import { MulterField } from '@nestjs/common/interfaces/external/multer-options.interface';

export enum SortMethod {
    nameIncrease = 'name',
    nameDecrease = 'nameD',
    sizeIncrease = 'size',
    sizeDecrease = 'sizeD',
    dateIncrease = 'date',
    dateDecrease = 'dateD',
}

@Controller('media')
export class MediaController {

    constructor(
        private mediaService: MediaService,
    ) { }

    @Get()
    @UseGuards(AuthorizationGuard)
    public async getMediaList(
        @Query('start') start: number = 0,
        @Query('count') count: number = 10,
        @Query('sort') sort: SortMethod = SortMethod.nameIncrease,
        @HeaderValue('authorization') token: string,
    ) {
        return this.mediaService.getFilesByToken(token, start, count, sort);
    }

    @Get('/:id')
    @UseGuards(AuthorizationGuard)
    public async getMedia(@Param() id: number, @HeaderValue('authorization') token: string) {
        return this.mediaService.getFileByTokenAndId(token, id);
    }

    @Put()
    @UseInterceptors(FilesInterceptor('files'))
    @UseGuards(AuthorizationGuard)
    public async putMedia(@UploadedFiles() files: IFile[], @HeaderValue('authorization') token: string) {
        return this.mediaService.saveFiles(files, token);
    }

    @Delete('/:id')
    @UseGuards(AuthorizationGuard)
    public async deleteMedia(@Param() id: number, @HeaderValue('authorization') token: string) {
        return this.mediaService.deleteFiles(id, token);
    }
}
