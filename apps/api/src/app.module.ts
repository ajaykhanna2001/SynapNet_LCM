import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CalendarModule } from './calendar/calendar.module';
import { ContractsModule } from './contracts/contracts.module';
import { LifecycleModule } from './lifecycle/lifecycle.module';
import { AssetsModule } from './assets/assets.module';
import { VulnerabilitiesModule } from './vulnerabilities/vulnerabilities.module';
import { AlertsModule } from './alerts/alerts.module';
import { SettingsModule } from './settings/settings.module';
import { AiModule } from './ai/ai.module';
import { AuditModule } from './audit/audit.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PrismaModule,
    AuthModule,
    CalendarModule,
    ContractsModule,
    LifecycleModule,
    AssetsModule,
    VulnerabilitiesModule,
    AlertsModule,
    SettingsModule,
    AiModule,
    AuditModule,
    JobsModule,
  ],
})
export class AppModule {}