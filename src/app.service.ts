import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): SuccessResponse {
    return {
      message: 'Hello World!',
      success: true,
    };
  }
}
