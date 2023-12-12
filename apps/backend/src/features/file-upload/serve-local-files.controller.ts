import { Controller, Get, Res, Req, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiNotFoundResponse, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { ErrorDto } from '../common/dto/error.dto';

import { LocalFileUploadService } from './local-file-upload-service.service';

@Controller(LocalFileUploadService.FILE_UPLOAD_PATH)
export class ServeLocalFilesController {
  constructor(private readonly localFileUploadService: LocalFileUploadService) {}

  @ApiNotFoundResponse({ type: () => ErrorDto })
  @ApiOperation({
    description: 'Statically serves files that were locally uploaded.',
  })
  @ApiExcludeEndpoint()
  @ApiTags('Files')
  @Get('*')
  getFile(@Req() req: Request, @Res() res: Response) {
    const urlPrefix = `${LocalFileUploadService.FILE_UPLOAD_PATH}/`;
    const fileKey = req.path.substring(urlPrefix.length);
    const filePath = this.localFileUploadService.getFilePath(fileKey);

    res.sendFile(filePath, (err) => {
      if (err instanceof Error) {
        const exception = new NotFoundException();

        const dto = new ErrorDto();
        dto.message = exception.message;
        dto.statusCode = exception.getStatus();

        res.status(404).json(dto);
      }
    });
  }
}
