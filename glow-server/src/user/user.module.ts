import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { HelpersModule } from "src/helpers/helpers.module";
import { HelpersService } from "src/helpers/helpers.service";
import { ErrorService } from "src/helpers/errors.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: "mysecret",
      signOptions: { expiresIn: "1h" },
    }),
    HelpersModule
  ],
  controllers: [UserController],
  providers: [UserService, HelpersService, ErrorService],
  exports: [UserService],
})
export class UserModule {}
