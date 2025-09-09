// scheduler.service.ts
import { Injectable } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { HelpersService } from '../helpers/helpers.service';

@Injectable()
export class SchedulerService {
  constructor(
    private readonly helpers: HelpersService,
    private readonly registry: SchedulerRegistry,
  ) {}

  @Cron('15 18 * * *', { timeZone: 'Asia/Beirut', name: 'morningJob', disabled: true })
  async morning() {
    console.log("test");
    
    await this.helpers.webhookMessage('+96171236842', "🌞 Good morning! Remember to start your day with your skincare routine for fresh, healthy skin. 💧 Consistency is key to healthy, glowing skin — your future self will thank you! ✨"); 
  }

  @Cron('30 18 * * *', { timeZone: 'Asia/Beirut', name: 'eveningJob', disabled: true })
  async evening() {
    console.log("test");
    await this.helpers.webhookMessage('+96171236842', '🌙 Good evening! Take a few minutes to pamper your skin before bedtime. Your skin will thank you.');
  }

  pauseDailyReminders() {
    this.registry.getCronJob('morningJob').stop();
    this.registry.getCronJob('eveningJob').stop();
  }

  resumeDailyReminders() {
    this.registry.getCronJob('morningJob').start();
    this.registry.getCronJob('eveningJob').start();
    console.log("Resume schedulers");
    
  }
}
