import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';
@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Performs HTTP health checks.' })
  @HealthCheck()
  check() {
    return this.health.check([
      () =>
        this.http.pingCheck(
          'designli-code-test',
          'http://localhost:3000/health/ping',
        ),
    ]);
  }

  @Get('ping')
  @ApiOperation({
    summary:
      'Returns a ping response indicating that the HTTP health indicator of this app is up and running.',
  })
  @ApiOkResponse({
    example: 'OK',
  })
  pingCheck() {
    return 'OK';
  }
}
