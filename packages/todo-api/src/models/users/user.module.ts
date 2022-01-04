import { Module } from "@nestjs/common";
import { PostgresDatabaseProviderModule } from "../../providers/database/postgres/provider.module";
import { UserService } from "./user.service";

@Module({
    providers: [UserService],
    exports: [UserService],
    imports: [PostgresDatabaseProviderModule]
})
export class UserModule {}