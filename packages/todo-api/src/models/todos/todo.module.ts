import { Module } from "@nestjs/common";
import { PostgresDatabaseProviderModule } from "../../providers/database/postgres/provider.module";
import { TodoService } from "./todo.service";

@Module({
    imports: [PostgresDatabaseProviderModule],
    exports: [TodoService],
    providers: [TodoService],
})
export class TodoModule {}
