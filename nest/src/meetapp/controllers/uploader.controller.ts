import { Controller, Post, UseInterceptors, UploadedFile } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { editFileName, imageFileFilter } from "../shared/file-upload.util";
import { diskStorage } from 'multer';

@Controller('uploader')
export class UploaderController {
    
    @Post('image')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename: editFileName
            }),
            fileFilter: imageFileFilter
        })
    )
    async uploadedFile(@UploadedFile() file) {
        const response = {
            originalname: file.originalname, // oldname
            filename: file.filename // new name
        };
        return response;
    }
}