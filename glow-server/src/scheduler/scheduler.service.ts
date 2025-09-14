import { Injectable } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { HelpersService } from '../helpers/helpers.service';

@Injectable()
export class SchedulerService {
  private phone_number: any = '+96171236842';
  constructor(
    private readonly helpers: HelpersService,
    private readonly registry: SchedulerRegistry,
  ) {}

  @Cron('30 20 * * *', { timeZone: 'Asia/Beirut', name: 'morningJob', disabled: true })
  async morning() {
    console.log("test");
    
    await this.helpers.webhookMessage(this.phone_number.slice(1), "🌞 Good morning! Remember to start your day with your skincare routine for fresh, healthy skin. 💧 Consistency is key to healthy, glowing skin — your future self will thank you! ✨"); 
  }

  @Cron('0 21 * * *', { timeZone: 'Asia/Beirut', name: 'eveningJob', disabled: true })
  async evening() {
    console.log("test");
    await this.helpers.webhookMessage(this.phone_number.slice(1), '🌙 Good evening! Take a few minutes to pamper your skin before bedtime. Your skin will thank you.');
  }

  pauseDailyReminders() {
    this.registry.getCronJob('morningJob').stop();
    this.registry.getCronJob('eveningJob').stop();
  }

  resumeDailyReminders(number: any) {
    this.phone_number = number;
    this.registry.getCronJob('morningJob').start();
    this.registry.getCronJob('eveningJob').start();
    console.log("Resume schedulers");
    
  }
}
