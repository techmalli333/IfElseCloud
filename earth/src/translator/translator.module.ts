import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TRANSLATOR_QUEUE, TRANSLATOR_SERVICE } from 'src/constants';
import { TranslatorController } from './translator.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: TRANSLATOR_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: TRANSLATOR_QUEUE,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [TranslatorController],

  providers: [ProducerService],
})
export class TranslatorModule {}
