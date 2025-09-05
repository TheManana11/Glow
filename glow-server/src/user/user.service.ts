import {
  HttpStatus,
  Injectable,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import type { Response } from "express";
import * as bcrypt from "bcrypt";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
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
  async login(loginDto: LoginDto, res: Response) {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });
    const match: boolean = await bcrypt.compare(
      loginDto.password,
      user?.password,
    );
    if (!user || !match) throw new UnauthorizedException();
    const token = await this.jwtService.signAsync({ id: user.id });
    const { password, ...rest } = user;
    return res.status(HttpStatus.OK).json({
      message: "User logged in successfully",
      payload: rest,
      token,
    });
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

  async remove(id: string, res: Response) {
    const deleted_user = await this.userRepository.delete({ id });
    return res.status(HttpStatus.OK).json({
      message: `User with id ${id} deleted successfully`,
      payload: deleted_user,
    });
  }
}
