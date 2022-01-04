import { Module } from "@nestjs/common";
import { PostgresDatabaseProviderModule } from "../../providers/database/postgres/provider.module";
import { CategoryService } from "./category.service";

@Module({
    imports: [PostgresDatabaseProviderModule],
    providers: [CategoryService],
    exports: [CategoryService],
})
export class CategoryModule {}