import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { HelpersModule } from 'src/helpers/helpers.module';
import { HelpersService } from 'src/helpers/helpers.service';
import { VectorModule } from 'src/vector/vector.module';
import { VectorService } from 'src/vector/vector.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { AnalysisChunk } from 'src/vector/entities/vector.entity';
import { JwtService } from '@nestjs/jwt';
import { ErrorService } from 'src/helpers/errors.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, AnalysisChunk]) , HelpersModule, VectorModule, UserModule],
  controllers: [ChatController],
  providers: [ChatService, HelpersService, VectorService, UserService, JwtService, ErrorService],
})
export class ChatModule {}
