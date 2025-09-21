import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
} from "@nestjs/common";

@Injectable()
export class ErrorService {
  BadRequest(message: string, condition: any) {
    if (condition) throw new BadRequestException(message);
  }

  Unauthorized(message: string, condition: any) {
    if (condition) throw new UnauthorizedException(message);
  }

  Forbidden(message: string, condition: any) {
    if (condition) throw new ForbiddenException(message);
  }

  NotFound(message: string, condition: any) {
    if (condition) throw new NotFoundException(message);
  }

  InternalServerError(message: string, condition: any) {
    if (condition) throw new InternalServerErrorException(message);
  }

  ServiceUnavailable(message: string, condition: any) {
    if (condition) throw new ServiceUnavailableException(message);
  }
}
