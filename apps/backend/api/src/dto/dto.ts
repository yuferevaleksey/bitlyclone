import {
  ApiOkResponse,
  ApiProperty,
  ApiResponseMetadata,
} from '@nestjs/swagger';
import { HttpCode, HttpStatus } from '@nestjs/common';

export class Dto<T> {
  constructor(partial: Partial<T>) {
    Object.assign(this, partial);
  }
}

export class ResDto<T> {
  success: boolean;
  body: T;
  messages: MessageDto[];

  constructor(body: T, success = true, messages: MessageDto[] = []) {
    this.success = success;
    this.messages = messages;
    this.body = body;
  }

  static swagger<T>(BodyDto: T): any {
    class Response {
      @ApiProperty({
        type: Boolean,
        example: true,
        description: 'Flag of success',
      })
      success: boolean;

      @ApiProperty({
        type: BodyDto,
        description: 'Response Body',
      })
      body: T;
    }

    Object.defineProperty(Response, 'name', {
      value: (BodyDto as any).name + 'ResDto',
    });

    return Response;
  }
}

export type PromiseResDto<T> = Promise<ResDto<T>>;

export class MessageDto {
  @ApiProperty({
    type: String,
    description: 'Type of Message',
    example: 'ERROR_KEY',
    required: false,
  })
  type?: string;

  @ApiProperty({
    type: String,
    description: 'Text Message',
    example: 'Something shit happened!',
  })
  text: string;

  @ApiProperty({
    type: 'object',
    description: 'Extra data (payload)',
    example: null,
    required: false,
  })
  meta?: Record<string, any>;
}

export const ApiResDto =
  ({ type, ...rest }: ApiResponseMetadata): MethodDecorator =>
  (target, key, descriptor): void => {
    HttpCode(HttpStatus.OK)(target, key, descriptor);

    ApiOkResponse({
      type: ResDto.swagger(type),
      ...rest,
    })(target, key, descriptor);
  };
