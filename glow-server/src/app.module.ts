import { Module } from "@nestjs/common";
import { ChatModule } from "./chat/chat.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity'
import { AnalysisModule } from './analysis/analysis.module';
import { Analysis } from "./analysis/entities/analysis.entity";
import { HelpersModule } from './helpers/helpers.module';
// import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { APP_GUARD } from "@nestjs/core";
import { ENV_CONFIG, THROTTLE_CONFIG } from "./config";
import { CacheModule } from '@nestjs/cache-manager'
import { DoctorModule } from './doctor/doctor.module';
import { Doctor } from "./doctor/entities/doctor.entity";
import { ScheduleModule } from '@nestjs/schedule'
import { SchedulerModule } from './scheduler/scheduler.module';
import { VectorModule } from './vector/vector.module';
import { AnalysisChunk } from "./vector/entities/vector.entity";
import { LicenseModule } from './license/license.module';
import { License } from "./license/entities/license.entity";

@Module({
  imports: [
    ConfigModule.forRoot(ENV_CONFIG),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [User, Analysis, Doctor, AnalysisChunk, License],
      synchronize: true,
    }),
    // ThrottlerModule.forRoot(THROTTLE_CONFIG),
    CacheModule.register({ isGlobal: true }),
    ScheduleModule.forRoot(),
    ChatModule,
    UserModule,
    AnalysisModule,
    HelpersModule,
    DoctorModule,
    SchedulerModule,
    VectorModule,
    LicenseModule,
  ],
  // providers: [ { provide: APP_GUARD, useClass: ThrottlerGuard } ],
})
export class AppModule {}
