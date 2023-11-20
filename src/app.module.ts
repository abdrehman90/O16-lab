import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PostModule } from './post/post.module';
import { FollowerListModule } from './follower_list/follower_list.module';
import { CommentsModule } from './comments/comments.module';


@Module({
  imports: [
    
   TypeOrmModule.forRoot(typeOrmConfig),
   UserModule,
   JwtModule,
   PostModule,
   FollowerListModule,
   CommentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
