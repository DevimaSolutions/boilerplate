import { ConsoleLogger, Logger, Module } from '@nestjs/common';

@Module({
  providers: [
    {
      provide: Logger,
      useFactory() {
        // add more logging functionality here
        // by default console logger is used
        return new ConsoleLogger();
      },
    },
  ],
  exports: [Logger],
})
export class LoggerModule {}
