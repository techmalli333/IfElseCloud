import { Controller, Get, Post } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { EARTH_QUEUE } from 'src/constants';

@Controller('translator')
export class TranslatorController {
  constructor(private readonly producerService: ProducerService) {}

  @Post()
  async sentMessageToMars() {
    try {
      this.producerService.send(EARTH_QUEUE, {
        message: 'this message from earth',
      });
      return 'Message sent to the queue!';
    } catch (error) {
      return error;
    }
  }
}
