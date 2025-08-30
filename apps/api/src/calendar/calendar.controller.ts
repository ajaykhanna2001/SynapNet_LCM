import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Response } from 'express';
import { CalendarService } from './calendar.service';
import { EventType, Priority, UserRole } from '@fleetops/shared';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiTags('calendar')
@Controller('calendar')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class CalendarController {
  constructor(private calendarService: CalendarService) {}

  @Get('events')
  @ApiOperation({ summary: 'Get calendar events' })
  @ApiQuery({ name: 'eventType', required: false, enum: EventType })
  @ApiQuery({ name: 'startDate', required: false, type: 'string' })
  @ApiQuery({ name: 'endDate', required: false, type: 'string' })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiQuery({ name: 'limit', required: false, type: 'number' })
  @ApiResponse({ status: 200, description: 'Events retrieved successfully' })
  async getEvents(
    @Query('eventType') eventType?: EventType,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    const startDateObj = startDate ? new Date(startDate) : undefined;
    const endDateObj = endDate ? new Date(endDate) : undefined;
    
    return this.calendarService.getEvents(
      eventType,
      startDateObj,
      endDateObj,
      page || 1,
      limit || 20,
    );
  }

  @Post('events')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  @ApiOperation({ summary: 'Create calendar event' })
  @ApiResponse({ status: 201, description: 'Event created successfully' })
  async createEvent(@Body() createEventDto: {
    title: string;
    description?: string;
    startDate: string;
    endDate: string;
    eventType: EventType;
    priority?: Priority;
    assetId?: string;
    contractId?: string;
  }) {
    return this.calendarService.createEvent({
      ...createEventDto,
      startDate: new Date(createEventDto.startDate),
      endDate: new Date(createEventDto.endDate),
    });
  }

  @Put('events/:id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  @ApiOperation({ summary: 'Update calendar event' })
  @ApiResponse({ status: 200, description: 'Event updated successfully' })
  async updateEvent(
    @Param('id') id: string,
    @Body() updateEventDto: Partial<{
      title: string;
      description: string;
      startDate: string;
      endDate: string;
      eventType: EventType;
      priority: Priority;
    }>,
  ) {
    const data = { ...updateEventDto };
    if (updateEventDto.startDate) {
      (data as any).startDate = new Date(updateEventDto.startDate);
    }
    if (updateEventDto.endDate) {
      (data as any).endDate = new Date(updateEventDto.endDate);
    }
    
    return this.calendarService.updateEvent(id, data);
  }

  @Delete('events/:id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete calendar event' })
  @ApiResponse({ status: 200, description: 'Event deleted successfully' })
  async deleteEvent(@Param('id') id: string) {
    return this.calendarService.deleteEvent(id);
  }

  @Get('events/:id')
  @ApiOperation({ summary: 'Get calendar event by ID' })
  @ApiResponse({ status: 200, description: 'Event retrieved successfully' })
  async getEventById(@Param('id') id: string) {
    return this.calendarService.getEventById(id);
  }

  @Get('export')
  @ApiOperation({ summary: 'Export calendar events to CSV' })
  @ApiQuery({ name: 'eventType', required: false, enum: EventType })
  @ApiResponse({ status: 200, description: 'CSV export generated' })
  async exportEvents(
    @Query('eventType') eventType?: EventType,
    @Res() res?: Response,
  ) {
    const csvContent = await this.calendarService.exportEventsToCSV(eventType);
    
    if (res) {
      res.header('Content-Type', 'text/csv');
      res.header('Content-Disposition', 'attachment; filename="calendar-events.csv"');
      res.send(csvContent);
    }
    
    return { csv: csvContent };
  }
}