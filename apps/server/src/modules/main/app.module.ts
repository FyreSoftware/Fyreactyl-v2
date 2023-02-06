import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { AuthModule } from "./../auth";
import { CommonModule } from "./../common";
import { ConfigModule, ConfigService } from "./../config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: "mongodb",
          url: configService.get("DB_URL"),
          entities: [__dirname + "/../**/**.entity{.ts,.js}"],
          synchronize: true,
          logging: true,
        } as TypeOrmModuleAsyncOptions;
      },
    }),
    ConfigModule,
    AuthModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
