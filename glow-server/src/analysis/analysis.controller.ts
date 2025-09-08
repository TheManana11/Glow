import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  UseGuards,
  Req,
} from "@nestjs/common";
import { AnalysisService } from "./analysis.service";
import { CreateAnalysisDto } from "./dto/create-analysis.dto";
import { AuthGuard } from "src/guard/auth.guard";
import { ApiBearerAuth } from "@nestjs/swagger";

@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller("analysis")
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Post()
  @HttpCode(201)
  create(@Req() req: Request, @Body() createAnalysisDto: CreateAnalysisDto) {
    return this.analysisService.create(req, createAnalysisDto);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.analysisService.findAll();
  }

  @Get("/user")
  @HttpCode(200)
  findByUser(@Req() req: Request) {
    return this.analysisService.findByUser(req);
  }

  @Get(":id")
  @HttpCode(200)
  findOne(@Param("id") id: string) {
    return this.analysisService.findOne(id);
  }
}
