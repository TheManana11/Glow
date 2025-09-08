import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateAnalysisDto } from "./dto/create-analysis.dto";
import { base64ToImage } from "src/helpers/base64_to_img";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Analysis } from "./entities/analysis.entity";
import { TokenService } from "./token.service";
import { call_openAI } from "src/helpers/openAI_call";
import { User } from "src/user/entities/user.entity";

@Injectable()
export class AnalysisService {
  constructor(
    @InjectRepository(Analysis)
    private analysisRepository: Repository<Analysis>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    private tokenService: TokenService,
  ) {}

  async create(req: Request, createAnalysisDto: CreateAnalysisDto) {
    const file_name = await base64ToImage(createAnalysisDto.image_url);
    if (!file_name)
      throw new BadRequestException(
        "Image is corrupted or image type  is invalid, valid types are png, jpg, jpeg, webp",
      );

    const token = (req.headers as any).authorization;
    const user_id = this.tokenService.getUserIdFromToken(token);

    const image = `https://1ac3beb4d0fa.ngrok-free.app/uploads/${file_name}`;
    const res = await call_openAI(image);
    const res_final = JSON.parse(res);

    const problems_array = res_final.problems;
    const analysis_object = this.analysisRepository.create({
      user: { id: user_id },
      image_url: `uploads/${file_name}`,
      problems: res_final.problems,
      skin_care_routine: res_final.skin_care_routine,
      scores: res_final.scores,
      estimated_days_progress: res_final.estimated_days_progress,
    });

    try {
      const analysis_save = await this.analysisRepository.save(analysis_object);
      return {
        message: "Analysis done successfully",
      };
    } catch (error) {
      throw new InternalServerErrorException(
        "Server Error, please try again later",
      );
    }
  }

  async findAll() {
    const all_analysis = await this.analysisRepository.find();
    if (!all_analysis) throw new NotFoundException("No analysis found");
    return {
      message: "All analysis fetched successfully",
      payload: all_analysis,
    };
  }

  async findOne(id: string) {
    const analysis = await this.analysisRepository.findOneBy({ id });
    if (!analysis) throw new NotFoundException("No analysis found");
    return {
      message: `Analysis with id ${id} fetched successfully`,
      payload: analysis,
    };
  }

  async findByUser(req: Request) {
    const token = (req.headers as any).authorization;
    const user_id = this.tokenService.getUserIdFromToken(token);
    const user = await this.userRepository.findOneBy({ id: user_id })

    if(!user) throw new NotFoundException("User not found");

    const analysis = await this.analysisRepository.findOneBy({ user_id });
    if (!analysis) throw new NotFoundException("No analysis with for this user found");
    return {
      message: `Analysis for user ${user.first_name} fetched successfully`,
      payload: analysis,
    };
  }
}
