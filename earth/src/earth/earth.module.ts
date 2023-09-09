import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EARTH_QUEUE, EARTH_SERVICE } from 'src/constants';
import { ConsumerService } from './consumer.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: EARTH_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: EARTH_QUEUE,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [],

  providers: [ConsumerService],
})
export class EarthModule {}
