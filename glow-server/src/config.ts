import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder } from "@nestjs/swagger";
import { User } from "./user/entities/user.entity";
import { Analysis } from "./analysis/entities/analysis.entity";

export const CORS_CONFIG = {
  origin: ['*'],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
};

export const VALIDATOR_CONFIG = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
});

export const SWAGGER_CONFIG = new DocumentBuilder()
  .setTitle("My Glow APIs")
  .setDescription("API documentation for my project")
  .setVersion("1.0")
  .addBearerAuth()
  .build();

export const ENV_CONFIG = {
  isGlobal: true,
};

export const THROTTLE_CONFIG = [
  {
    name: "short",
    ttl: 1000,
    limit: 3,
  },
  {
    name: "medium",
    ttl: 10000,
    limit: 20,
  },
  {
    name: "long",
    ttl: 60000,
    limit: 100,
  },
];
