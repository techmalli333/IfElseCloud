import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { TRANSLATOR_SERVICE } from 'src/constants';

@Injectable()
export class ProducerService {
  constructor(
    @Inject(TRANSLATOR_SERVICE) private readonly translator: ClientProxy,
  ) {}
  public send(pattern: string, data: any) {
    console.log('message added to translator queue', { pattern, data });

    return this.translator.send(pattern, data).toPromise();
  }
}
