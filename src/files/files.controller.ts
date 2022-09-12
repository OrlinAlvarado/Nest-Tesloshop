import { Controller, Get, Post, UploadedFile, UseInterceptors, BadRequestException, Param, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';
import { fileFilter, fileNamer } from './helpers/';

@ApiTags('Files - Get and Upload')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService
  ) {}

  @Get('product/:imageName')
  @ApiResponse({
    status: 200,
    description: 'Get product image',
  })
  fineProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string
  ) {
    const path = this.filesService.getStaticProductImage( imageName );

    res.sendFile( path )
  }

  @Post('product')
  @UseInterceptors( FileInterceptor('file', { 
    fileFilter: fileFilter,
    storage: diskStorage({
      destination: './static/products',
      filename: fileNamer
    }) 
  }))
  uploadProductImage( 
    @UploadedFile() file: Express.Multer.File
  ){

    if ( !file ) {
      throw new BadRequestException('The file is not an image');
    }

    const secureUrl = `${ this.configService.get('HOST_API')}/files/product/${ file.filename }`

    return {
      secureUrl
    };
  }
 
}
