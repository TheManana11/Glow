import {
  HttpStatus,
  Injectable,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UpdateProfileDto } from "./dto/updateProfilePic.dto";
import { UpdatePasswordDto } from "./dto/updatePassword.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import type { Response } from "express";
import * as bcrypt from "bcrypt";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { HelpersService } from "src/helpers/helpers.service";


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private readonly helperService: HelpersService
  ) {}

  // register
  async create(createUserDto: CreateUserDto, res: Response) {
    const email = createUserDto.email;

    const existing_user = await this.userRepository.findOneBy({ email });
    if (existing_user)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const new_user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    const user = await this.userRepository.save(new_user);

    const token = await this.jwtService.signAsync({ id: user.id });
    const { password, ...rest } = user;
    return res.status(HttpStatus.CREATED).json({
      message: "User created successfully",
      payload: rest,
      token,
    });
  }

  // login
  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });
    if (!user) throw new UnauthorizedException("User not found");
    const match: boolean = await bcrypt.compare(
      loginDto.password,
      user?.password,
    );
    if (!match) throw new UnauthorizedException("Incorrect password");
    const token = await this.jwtService.signAsync({ id: user.id });
    const { password, ...rest } = user;
    return {
      message: "User logged in successfully",
      payload: rest,
      token,
    };
  }

  async findAll(res: Response) {
    const users = await this.userRepository.find();
    if (!users)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: "No Users found in the database" });
    return res.status(HttpStatus.OK).json({
      message: "Users fetched successfully",
      payload: users,
    });
  }

  async findOne(id: string, res: Response) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) return res.status(HttpStatus.NOT_FOUND).json({ message: `Failed to get user with is ${id}` });
    return res.status(HttpStatus.OK).json({
      message: `User with id ${id} fetched successfully`,
      payload: user,
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto, res: Response) {
    await this.userRepository.update(id, updateUserDto);
    const updated_user = this.userRepository.findOneBy({ id });
    return res.status(HttpStatus.OK).json({
      message: `User with id ${id} updated successfully`,
      payload: updated_user,
    });
  }


 async updateProfilePic(id: string, updateProfileDto: UpdateProfileDto, res: Response) {
  const base64String = updateProfileDto.image_url;

  const filename = await this.helperService.base64ToImage(base64String, "profiles");
  if(!filename) return res.status(HttpStatus.BAD_REQUEST).json({ message: "Invalid image or unsupported image type, only accepts png, jpeg, jpg, webp" });

  const filePathForDb = `uploads/profiles/${filename}`;
  await this.userRepository.update(id, { image_url: filePathForDb });

  const updated_user = await this.userRepository.findOneBy({ id });

  return res.status(HttpStatus.OK).json({
    message: `User with id ${id} updated successfully`,
    payload: updated_user,
  });
}


  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto, res: Response) {
    const user = await this.userRepository.findOneBy({ id });
    const match: boolean = await bcrypt.compare(updatePasswordDto.oldPassword, user?.password)
    if(!match) return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Old password is incorrect' });

    if(updatePasswordDto.newPassword !== updatePasswordDto.confirmPassword) return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Please make sure to confirm password right' });
    
    const hashed_password = await bcrypt.hash(updatePasswordDto.newPassword, 10);

    await this.userRepository.update(id, { password: hashed_password });
    return res.status(HttpStatus.OK).json({
      message: `Password updated successfully`,
      payload: user,
    });
  }

  async remove(id: string, res: Response) {
    const deleted_user = await this.userRepository.delete({ id });
    return res.status(HttpStatus.OK).json({
      message: `User with id ${id} deleted successfully`,
      payload: deleted_user,
    });
  }
}
