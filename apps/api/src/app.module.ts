import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthGuard, AuthModule } from '@spotdropping/api/auth';
import { AppService } from './app.service';

@Module({
    imports: [AuthModule],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: 'APP_GUARD',
            useClass: AuthGuard,
        },
    ],
})
export class AppModule {}
