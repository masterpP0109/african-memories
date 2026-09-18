import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { timingSafeEqual } from "node:crypto";

@Injectable()
export class AdminApiKeyGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const configuredKey = this.config.getOrThrow<string>("ADMIN_API_KEY");
    const suppliedKey = context.switchToHttp().getRequest().header("x-api-key");
    if (typeof suppliedKey !== "string") throw new UnauthorizedException();

    const configured = Buffer.from(configuredKey);
    const supplied = Buffer.from(suppliedKey);
    if (
      configured.length !== supplied.length ||
      !timingSafeEqual(configured, supplied)
    ) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
