import {
  Controller,
  Get,
  Request,
  Post,
  Body,
  Param,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LinksService } from './services/links.service';
import { AddLinkRequest } from './dto/add-link.request';
import { AuthGuard } from '@nestjs/passport';
import { AddLinkResponse } from './dto/add-link.response';
import { UserLinksService } from './services/user-links.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserLinksViewsService } from './services/user-links-views.service';
import { LinkViewsByDayResponse } from './dto/link-views-by-day.response';
import { ApiResDto, MessageDto, PromiseResDto, ResDto } from '../dto/dto';
import { GetLongLinkResponse } from './dto/get-long-link.response';
import { UserLinkResponse } from './dto/user-link.response';

@ApiTags('Links')
@Controller('links')
export class LinksController {
  constructor(
    private readonly linksService: LinksService,
    private readonly userLinksService: UserLinksService,
    private readonly userLinksViewsService: UserLinksViewsService
  ) {}

  @Post()
  @ApiResDto({
    type: AddLinkResponse,
    description: 'Method generate short link.',
  })
  @UseGuards(AuthGuard('jwt'))
  async generateShortLink(
    @Body() request: AddLinkRequest,
    @Request() req
  ): PromiseResDto<AddLinkResponse> {
    try {
      const response = await this.linksService.generateShortLink(
        request,
        req.user.id
      );

      return new ResDto(response);
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Something bad happened while we generating short link.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/statistic/:code')
  @ApiResDto({
    type: LinkViewsByDayResponse,
    description: 'Method get statistic by short link code.',
  })
  @ApiResponse({
    status: 500,
    description: 'Внутренняя ошибка',
  })
  async getDayLinkDayStatistic(
    @Param('code') code: string
  ): PromiseResDto<LinkViewsByDayResponse> {
    try {
      const response = await this.userLinksService.getLinkViewsByCodeResponse(
        code
      );

      if (!response?.linkStatistic?.length) {
        return new ResDto(response, false, [
          {
            text: 'We are not found statistic.',
          },
        ]);
      }

      return new ResDto(response);
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error:
            'Something shit happened while we generating link`s statistic.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('/long-link/:code')
  @ApiResDto({
    type: GetLongLinkResponse,
    description: 'Method get long ling from short code.',
  })
  async getLinkByCode(
    @Param('code') code: string
  ): PromiseResDto<GetLongLinkResponse> {
    try {
      const messages: MessageDto[] = [];
      let sussesFlag = true;

      const response = await this.userLinksService.getLinkByCodeResponse(code);

      if (response?.linkId) {
        await this.userLinksViewsService.saveLinkView(response?.linkId);
      } else {
        // ToDo: Add logger here.
        sussesFlag = false;
        messages.push({ text: "Can't save view log." });
        messages.push({ text: "Can't return long link, maybe it not exist." });
      }

      return new ResDto(response, sussesFlag, messages);
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Something bad happened while we generating link statistic.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('/user-links')
  @ApiResDto({
    type: UserLinkResponse,
    description: 'Method get user short links list.',
  })
  @UseGuards(AuthGuard('jwt'))
  async findUserLinks(@Request() req): PromiseResDto<UserLinkResponse> {
    try {
      const response = await this.userLinksService.getUserLinksRequest(
        req?.user?.id
      );
      return new ResDto(response);
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Something happened while we query user links.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
