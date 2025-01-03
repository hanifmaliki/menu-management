import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { MenuModule } from './menu/menu.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PrismaModule, MenuModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }