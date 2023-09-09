import { Controller } from '@nestjs/common';
import * as fs from 'fs';
import {
  MessagePattern,
  RmqContext,
  Ctx,
  Payload,
} from '@nestjs/microservices';
import { TRANSLATOR_QUEUE } from 'src/constants';
@Controller()
export class ConsumerService {
  // we are getting messages from translator
  @MessagePattern(TRANSLATOR_QUEUE)
  getMessagesFromMars(@Payload() data: any, @Ctx() context: RmqContext) {
    try {
      console.log('message received to translator');

      const channel = context.getChannelRef();
      const originalMsg = context.getMessage();

      // Read existing data from the file
      let existingData = [];
      const dataStr = fs.readFileSync('data.json', 'utf8');
      existingData = JSON.parse(dataStr);

      // Update the existing data (for example, merge it with the new data)
      const updatedData = [...existingData, data];

      // Store the updated data locally
      fs.writeFileSync('../data.json', JSON.stringify(updatedData));
      channel.ack(originalMsg);
    } catch (error) {
      console.error('Error reading existing data:', error);
    }
  }
}
