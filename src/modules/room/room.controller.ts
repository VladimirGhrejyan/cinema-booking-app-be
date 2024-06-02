import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoomService } from './room.service';
import {
  CreateRoomInputDto,
  GetAllRoomsOutputDto,
  GetOneRoomOutputDto,
  UpdateRoomInputDto,
} from './dto';

@ApiTags('room')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get room by id', operationId: 'getRoomById' })
  public async getOneRoom(@Param('id', ParseIntPipe) id: number): Promise<GetOneRoomOutputDto> {
    return this.roomService.getOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all rooms', operationId: 'getRooms' })
  public async getAllRooms(): Promise<GetAllRoomsOutputDto> {
    return this.roomService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create Room', operationId: 'createRoom' })
  public async createRoom(@Body() createRoomInputDto: CreateRoomInputDto): Promise<void> {
    return this.roomService.createOne(createRoomInputDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Room', operationId: 'updateRoom' })
  public async updateRoom(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoomInputDto: UpdateRoomInputDto,
  ): Promise<void> {
    return this.roomService.updateOne(id, updateRoomInputDto);
  }

  @ApiOperation({ summary: 'Delete Room', operationId: 'deleteRoom' })
  @Delete(':id')
  public async deleteRoom(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.roomService.deleteOne(id);
  }
}
