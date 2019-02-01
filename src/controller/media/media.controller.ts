import { Controller, Get, Query, Param, Post, Put, Delete } from '@nestjs/common';

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
    @Get()
    public getMediaList(
        @Query('start')start: number = 0,
        @Query('count') count: number = 10,
        @Query('sort') sort: SortMethod = SortMethod.nameIncrease,
    ) {
        return null;
    }

    @Get('/:id')
    public getMedia(@Param() id: number) {
        return null;
    }

    @Put()
    public putMedia() {
        return null;
    }

    @Delete()
    public deleteMedia() {
        return null;
    }
}
