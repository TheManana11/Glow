import { Module } from "@nestjs/common";
import { ChatModule } from "./chat/chat.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity'
import { AnalysisModule } from './analysis/analysis.module';
import { Analysis } from "./analysis/entities/analysis.entity";
import { HelpersModule } from './helpers/helpers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [User, Analysis],
      synchronize: true,
    }),
    ChatModule,
    UserModule,
    AnalysisModule,
    HelpersModule,
  ],
})
export class AppModule {}
