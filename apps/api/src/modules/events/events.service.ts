import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { Event, EventAttendee, Prisma, AttendeeStatus } from '@prisma/client';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

type EventWithAttendees = Event & {
  attendees: (EventAttendee & {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
    };
  })[];
  _count: {
    attendees: number;
  };
};

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto): Promise<EventWithAttendees> {
    const startDate = new Date(createEventDto.startDate);
    const endDate = new Date(createEventDto.endDate);

    // Validação de datas
    if (startDate >= endDate) {
      throw new BadRequestException('Start date must be before end date');
    }

    if (startDate < new Date()) {
      throw new BadRequestException('Start date cannot be in the past');
    }

    const event = await this.prisma.event.create({
      data: {
        ...createEventDto,
        startDate,
        endDate,
      },
      include: {
        attendees: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
              }
            }
          }
        },
        _count: {
          select: {
            attendees: true
          }
        }
      }
    });

    return event;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.EventWhereInput;
    orderBy?: Prisma.EventOrderByWithRelationInput;
  } = {}): Promise<{ events: EventWithAttendees[]; total: number }> {
    const { skip = 0, take = 10, where, orderBy } = params;

    const [events, total] = await Promise.all([
      this.prisma.event.findMany({
        skip,
        take,
        where,
        orderBy: orderBy || { startDate: 'asc' },
        include: {
          attendees: {
            include: {
              user: {
                select: {
                  id: true,
                  email: true,
                  firstName: true,
                  lastName: true,
                }
              }
            }
          },
          _count: {
            select: {
              attendees: true
            }
          }
        }
      }),
      this.prisma.event.count({ where })
    ]);

    return { events, total };
  }

  async findOne(id: string): Promise<EventWithAttendees> {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        attendees: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                cpf: true,
                role: true
              }
            }
          },
          orderBy: {
            createdAt: 'asc'
          }
        },
        _count: {
          select: {
            attendees: true
          }
        }
      }
    });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<EventWithAttendees> {
    const existingEvent = await this.prisma.event.findUnique({
      where: { id }
    });

    if (!existingEvent) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    // Validações de data se fornecidas
    const updateData: any = { ...updateEventDto };
    
    if (updateEventDto.startDate) {
      updateData.startDate = new Date(updateEventDto.startDate);
    }
    
    if (updateEventDto.endDate) {
      updateData.endDate = new Date(updateEventDto.endDate);
    }

    if (updateData.startDate && updateData.endDate && updateData.startDate >= updateData.endDate) {
      throw new BadRequestException('Start date must be before end date');
    }

    const updatedEvent = await this.prisma.event.update({
      where: { id },
      data: updateData,
      include: {
        attendees: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
              }
            }
          }
        },
        _count: {
          select: {
            attendees: true
          }
        }
      }
    });

    return updatedEvent;
  }

  async remove(id: string): Promise<{ message: string }> {
    const existingEvent = await this.prisma.event.findUnique({
      where: { id }
    });

    if (!existingEvent) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    await this.prisma.event.delete({
      where: { id }
    });

    return { message: 'Event deleted successfully' };
  }

  // Gestão de participantes
  async registerAttendee(eventId: string, userId: string): Promise<EventAttendee> {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      include: { _count: { select: { attendees: true } } }
    });

    if (!event) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }

    // Verifica capacidade
    if (event.capacity && event._count.attendees >= event.capacity) {
      throw new ConflictException('Event is at full capacity');
    }

    // Verifica se já está inscrito
    const existingAttendee = await this.prisma.eventAttendee.findUnique({
      where: {
        eventId_userId: {
          eventId,
          userId
        }
      }
    });

    if (existingAttendee) {
      throw new ConflictException('User is already registered for this event');
    }

    const attendee = await this.prisma.eventAttendee.create({
      data: {
        eventId,
        userId,
        status: AttendeeStatus.REGISTERED
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          }
        }
      }
    });

    return attendee;
  }

  async updateAttendeeStatus(eventId: string, userId: string, status: AttendeeStatus): Promise<EventAttendee> {
    const existingAttendee = await this.prisma.eventAttendee.findUnique({
      where: {
        eventId_userId: {
          eventId,
          userId
        }
      }
    });

    if (!existingAttendee) {
      throw new NotFoundException('Attendee registration not found');
    }

    const updatedAttendee = await this.prisma.eventAttendee.update({
      where: {
        eventId_userId: {
          eventId,
          userId
        }
      },
      data: { status },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          }
        }
      }
    });

    return updatedAttendee;
  }

  async cancelRegistration(eventId: string, userId: string): Promise<{ message: string }> {
    const existingAttendee = await this.prisma.eventAttendee.findUnique({
      where: {
        eventId_userId: {
          eventId,
          userId
        }
      }
    });

    if (!existingAttendee) {
      throw new NotFoundException('Attendee registration not found');
    }

    await this.prisma.eventAttendee.delete({
      where: {
        eventId_userId: {
          eventId,
          userId
        }
      }
    });

    return { message: 'Registration cancelled successfully' };
  }

  async getUserEvents(userId: string): Promise<EventWithAttendees[]> {
    const attendances = await this.prisma.eventAttendee.findMany({
      where: { userId },
      include: {
        event: {
          include: {
            attendees: {
              include: {
                user: {
                  select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                  }
                }
              }
            },
            _count: {
              select: {
                attendees: true
              }
            }
          }
        }
      }
    });

    return attendances.map(attendance => attendance.event);
  }

  async getEventsByDateRange(startDate: Date, endDate: Date): Promise<EventWithAttendees[]> {
    return this.prisma.event.findMany({
      where: {
        startDate: {
          gte: startDate,
          lte: endDate
        }
      },
      include: {
        attendees: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
              }
            }
          }
        },
        _count: {
          select: {
            attendees: true
          }
        }
      },
      orderBy: {
        startDate: 'asc'
      }
    });
  }
}
