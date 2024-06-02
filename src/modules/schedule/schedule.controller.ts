import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ScheduleService } from '~modules/schedule/schedule.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateScheduleInputDto,
  GetAllSchedulesOutputDto,
  GetOneScheduleOutputDto,
  UpdateScheduleInputDto,
  UpdateScheduleSeatsInputDto,
} from '~modules/schedule/dto';

@ApiTags('schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get schedule  by id', operationId: 'getScheduleById' })
  public async getScheduleById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetOneScheduleOutputDto> {
    return this.scheduleService.getOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all schedules', operationId: 'getAllSchedules' })
  public async getAllSchedules(): Promise<GetAllSchedulesOutputDto> {
    return this.scheduleService.getAll();
  }

  @Get('all/:roomId')
  @ApiOperation({ summary: 'Get all room schedules', operationId: 'getAllRoomSchedules' })
  public async getAllSchedulesByRoomId(
    @Param('roomId', ParseIntPipe) roomId: number,
  ): Promise<GetAllSchedulesOutputDto> {
    return this.scheduleService.getAllByRoomId(roomId);
  }

  @Post()
  @ApiOperation({ summary: 'Create Schedule', operationId: 'createSchedule' })
  public async createSchedule(
    @Body() createScheduleInputDto: CreateScheduleInputDto,
  ): Promise<void> {
    return this.scheduleService.createOne(createScheduleInputDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Schedule', operationId: 'updateSchedule' })
  public async updateSchedule(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateScheduleInputDto: UpdateScheduleInputDto,
  ): Promise<void> {
    return this.scheduleService.updateOne(id, updateScheduleInputDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Schedule', operationId: 'deleteSchedule' })
  public async deleteSchedule(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.scheduleService.deleteOne(id);
  }

  @Patch('book/:id')
  @ApiOperation({ summary: 'Book Schedule Seats', operationId: 'updateScheduleSeats' })
  public async updateScheduleSeats(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateScheduleSeatsInputDto: UpdateScheduleSeatsInputDto,
  ): Promise<void> {
    return this.scheduleService.updateScheduleSeats(id, updateScheduleSeatsInputDto);
  }
}
