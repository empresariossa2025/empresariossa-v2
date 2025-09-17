import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  HttpStatus
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam
} from '@nestjs/swagger';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AttendeeStatus } from '@prisma/client';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new event' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Event created successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid date range or past date' })
  async create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all events' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'upcoming', required: false, type: Boolean, description: 'Filter upcoming events only' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Events retrieved successfully' })
  async findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('search') search?: string,
    @Query('upcoming') upcoming?: string
  ) {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    let where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' as const } },
        { description: { contains: search, mode: 'insensitive' as const } },
        { location: { contains: search, mode: 'insensitive' as const } }
      ];
    }

    if (upcoming === 'true') {
      where.startDate = {
        gte: new Date()
      };
    }

    const result = await this.eventsService.findAll({
      skip,
      take: limitNumber,
      where,
      orderBy: { startDate: 'asc' }
    });

    return {
      ...result,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total: result.total,
        pages: Math.ceil(result.total / limitNumber)
      }
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get event by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Event retrieved successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Event not found' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update event' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Event updated successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Event not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid date range' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEventDto: UpdateEventDto
  ) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete event' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Event deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Event not found' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.eventsService.remove(id);
  }

  // Gestão de participantes
  @Post(':id/register')
  @ApiOperation({ summary: 'Register user for event' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'User registered successfully' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'User already registered or event at capacity' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Event not found' })
  async registerAttendee(
    @Param('id', ParseUUIDPipe) eventId: string,
    @Body() body: { userId: string }
  ) {
    return this.eventsService.registerAttendee(eventId, body.userId);
  }

  @Patch(':id/attendees/:userId/status')
  @ApiOperation({ summary: 'Update attendee status' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Attendee status updated successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Attendee registration not found' })
  async updateAttendeeStatus(
    @Param('id', ParseUUIDPipe) eventId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() body: { status: AttendeeStatus }
  ) {
    return this.eventsService.updateAttendeeStatus(eventId, userId, body.status);
  }

  @Delete(':id/attendees/:userId')
  @ApiOperation({ summary: 'Cancel user registration' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Registration cancelled successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Attendee registration not found' })
  async cancelRegistration(
    @Param('id', ParseUUIDPipe) eventId: string,
    @Param('userId', ParseUUIDPipe) userId: string
  ) {
    return this.eventsService.cancelRegistration(eventId, userId);
  }

  @Get('users/:userId/events')
  @ApiOperation({ summary: 'Get user events' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User events retrieved successfully' })
  async getUserEvents(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.eventsService.getUserEvents(userId);
  }

  @Get('calendar/:startDate/:endDate')
  @ApiOperation({ summary: 'Get events by date range' })
  @ApiParam({ name: 'startDate', description: 'Start date (YYYY-MM-DD)' })
  @ApiParam({ name: 'endDate', description: 'End date (YYYY-MM-DD)' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Events retrieved successfully' })
  async getEventsByDateRange(
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string
  ) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return this.eventsService.getEventsByDateRange(start, end);
  }
}
