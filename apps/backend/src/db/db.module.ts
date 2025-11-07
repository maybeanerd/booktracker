import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export const DB_CONNECTION = 'DB_CONNECTION';

@Module({
  providers: [
    {
      provide: DB_CONNECTION,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const connectionString = configService.get<string>(
          'DATABASE_URL',
          'postgresql://localhost:5432/booktracker',
        );
        const client = postgres(connectionString);
        return drizzle(client, { schema });
      },
    },
  ],
  exports: [DB_CONNECTION],
})
export class DbModule {}

