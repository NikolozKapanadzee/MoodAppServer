import { Module } from '@nestjs/common';
import { MoodsService } from './moods.service';
import { MoodsController } from './moods.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MoodSchema } from './schemas/mood.schema';
import { UserSchema } from 'src/users/schema/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'mood', schema: MoodSchema },
      { name: 'user', schema: UserSchema },
    ]),
  ],
  controllers: [MoodsController],
  providers: [MoodsService],
})
export class MoodsModule {}
