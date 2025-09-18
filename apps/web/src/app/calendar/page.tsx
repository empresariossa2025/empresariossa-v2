"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useState, useEffect } from "react"
import { useThemedStyles } from "@/hooks/use-themed-styles"
import { 
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Users,
  MapPin,
  Clock,
  Filter,
  Search,
  MoreVertical,
  Eye,
  Edit3,
  Trash2,
  X,
  Check
} from "lucide-react"

interface CalendarEvent {
  id: string
  title: string
  description?: string
  startTime: string
  endTime: string
  date: string
  category: 'meeting' | 'event' | 'networking' | 'training' | 'other'
  location?: string
  attendees?: number
  maxAttendees?: number
  status: 'confirmed' | 'pending' | 'cancelled'
  organizer: string
}

type ViewMode = 'month' | 'week' | 'day'

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<ViewMode>('month')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [filteredCategories, setFilteredCategories] = useState<string[]>(['meeting', 'event', 'networking', 'training', 'other'])
  const [showEventModal, setShowEventModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const { colors, getCardStyle } = useThemedStyles()

  // Mock events data
  useEffect(() => {
    const mockEvents: CalendarEvent[] = [
      {
        id: '1',
        title: 'Reunião Mensal CNE',
        description: 'Reunião mensal de todos os membros da CNE Barra da Tijuca',
        startTime: '19:00',
        endTime: '21:00',
        date: '2025-09-20',
        category: 'meeting',
        location: 'CNE Barra da Tijuca',
        attendees: 45,
        maxAttendees: 60,
        status: 'confirmed',
        organizer: 'Carlos Silva'
      },
      {
        id: '2',
        title: 'Workshop: Marketing Digital',
        description: 'Estratégias de marketing digital para pequenas empresas',
        startTime: '14:00',
        endTime: '17:00',
        date: '2025-09-22',
        category: 'training',
        location: 'Auditório CNE',
        attendees: 23,
        maxAttendees: 30,
        status: 'confirmed',
        organizer: 'Maria Santos'
      },
      {
        id: '3',
        title: 'Networking Coffee',
        description: 'Café de networking informal entre membros',
        startTime: '08:00',
        endTime: '10:00',
        date: '2025-09-25',
        category: 'networking',
        location: 'Café da Esquina',
        attendees: 12,
        maxAttendees: 20,
        status: 'confirmed',
        organizer: 'João Costa'
      },
      {
        id: '4',
        title: 'Apresentação Novos Membros',
        description: 'Apresentação dos novos membros aprovados este mês',
        startTime: '19:30',
        endTime: '20:30',
        date: '2025-09-27',
        category: 'event',
        location: 'CNE Barra da Tijuca',
        attendees: 8,
        maxAttendees: 15,
        status: 'pending',
        organizer: 'Ana Oliveira'
      },
      {
        id: '5',
        title: 'Reunião Diretoria',
        description: 'Reunião mensal da diretoria executiva',
        startTime: '18:00',
        endTime: '20:00',
        date: '2025-09-18',
        category: 'meeting',
        location: 'Sala da Diretoria',
        attendees: 7,
        maxAttendees: 7,
        status: 'confirmed',
        organizer: 'Presidente CNE'
      }
    ]
    setEvents(mockEvents)
  }, [])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'meeting': return '#8b5cf6'
      case 'event': return '#10b981'
      case 'networking': return '#f59e0b'
      case 'training': return '#3b82f6'
      default: return '#64748b'
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'meeting': return 'Reunião'
      case 'event': return 'Evento'
      case 'networking': return 'Networking'
      case 'training': return 'Treinamento'
      default: return 'Outro'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return '#10b981'
      case 'pending': return '#f59e0b'
      case 'cancelled': return '#ef4444'
      default: return '#64748b'
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }
    
    return days
  }

  const getEventsForDate = (date: Date | null) => {
    if (!date) return []
    const dateStr = date.toISOString().split('T')[0]
    return events.filter(event => 
      event.date === dateStr && 
      filteredCategories.includes(event.category) &&
      (searchTerm === '' || event.title.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  }

  const isToday = (date: Date | null) => {
    if (!date) return false
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isSelected = (date: Date | null) => {
    if (!date || !selectedDate) return false
    return date.toDateString() === selectedDate.toDateString()
  }

  const handleCategoryToggle = (category: string) => {
    setFilteredCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const days = getDaysInMonth()
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

  return (
    <DashboardLayout>
      <div style={{ padding: '24px', display: 'flex', gap: '24px', height: 'calc(100vh - 120px)' }}>
        {/* Sidebar */}
        <div style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Create Event Button */}
          <button
            onClick={() => setShowEventModal(true)}
            style={{
              ...getCardStyle(),
              padding: '16px',
              background: colors.brand.gradient,
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.25)',
              width: '100%'
            }}
          >
            <Plus style={{ width: '20px', height: '20px' }} />
            Criar Evento
          </button>

          {/* Mini Calendar */}
          <div style={{
            ...getCardStyle(),
            padding: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: colors.text.primary,
                margin: 0
              }}>
                {getMonthName(currentDate)}
              </h3>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button
                  onClick={() => navigateMonth('prev')}
                  style={{
                    padding: '4px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <ChevronLeft style={{ width: '16px', height: '16px', color: colors.text.secondary }} />
                </button>
                <button
                  onClick={() => navigateMonth('next')}
                  style={{
                    padding: '4px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <ChevronRight style={{ width: '16px', height: '16px', color: colors.text.secondary }} />
                </button>
              </div>
            </div>

            {/* Mini calendar grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
              {weekDays.map(day => (
                <div
                  key={day}
                  style={{
                    padding: '6px 2px',
                    textAlign: 'center',
                    fontSize: '11px',
                    fontWeight: '500',
                    color: colors.text.secondary
                  }}
                >
                  {day}
                </div>
              ))}
              {days.map((date, index) => (
                <div
                  key={index}
                  onClick={() => date && setSelectedDate(date)}
                  style={{
                    padding: '6px 2px',
                    textAlign: 'center',
                    fontSize: '12px',
                    cursor: date ? 'pointer' : 'default',
                    borderRadius: '4px',
                    backgroundColor: date && isSelected(date) ? colors.brand.primary : 
                                   date && isToday(date) ? `${colors.brand.primary}20` : 'transparent',
                    color: date && isSelected(date) ? 'white' :
                           date && isToday(date) ? colors.brand.primary :
                           date ? colors.text.primary : colors.text.tertiary,
                    transition: 'all 0.2s ease'
                  }}
                >
                  {date ? date.getDate() : ''}
                  {date && getEventsForDate(date).length > 0 && (
                    <div style={{
                      width: '4px',
                      height: '4px',
                      backgroundColor: colors.brand.primary,
                      borderRadius: '50%',
                      margin: '1px auto 0'
                    }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Search */}
          <div style={{
            ...getCardStyle(),
            padding: '16px'
          }}>
            <h4 style={{
              fontSize: '14px',
              fontWeight: '600',
              color: colors.text.primary,
              margin: '0 0 12px 0'
            }}>
              Buscar Eventos
            </h4>
            <div style={{ position: 'relative' }}>
              <Search style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '16px',
                height: '16px',
                color: colors.text.tertiary
              }} />
              <input
                type="text"
                placeholder="Buscar por título..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 36px',
                  border: `1px solid ${colors.border.primary}`,
                  borderRadius: '8px',
                  backgroundColor: colors.bg.tertiary,
                  color: colors.text.primary,
                  fontSize: '14px',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>
          </div>

          {/* Categories Filter */}
          <div style={{
            ...getCardStyle(),
            padding: '16px'
          }}>
            <h4 style={{
              fontSize: '14px',
              fontWeight: '600',
              color: colors.text.primary,
              margin: '0 0 12px 0'
            }}>
              Categorias
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['meeting', 'event', 'networking', 'training', 'other'].map(category => (
                <label
                  key={category}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    padding: '6px 8px',
                    borderRadius: '6px',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.bg.tertiary
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={filteredCategories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                    style={{ marginRight: '4px' }}
                  />
                  <div
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '3px',
                      backgroundColor: getCategoryColor(category)
                    }}
                  />
                  <span style={{
                    fontSize: '13px',
                    color: colors.text.primary,
                    transition: 'color 0.3s ease'
                  }}>
                    {getCategoryLabel(category)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Today's Events */}
          {selectedDate && (
            <div style={{
              ...getCardStyle(),
              padding: '16px'
            }}>
              <h4 style={{
                fontSize: '14px',
                fontWeight: '600',
                color: colors.text.primary,
                margin: '0 0 12px 0'
              }}>
                Eventos - {selectedDate.toLocaleDateString('pt-BR')}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {getEventsForDate(selectedDate).length > 0 ? (
                  getEventsForDate(selectedDate).map(event => (
                    <div
                      key={event.id}
                      onClick={() => setSelectedEvent(event)}
                      style={{
                        padding: '8px',
                        borderRadius: '6px',
                        backgroundColor: colors.bg.tertiary,
                        cursor: 'pointer',
                        borderLeft: `3px solid ${getCategoryColor(event.category)}`,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{
                        fontSize: '12px',
                        fontWeight: '500',
                        color: colors.text.primary,
                        marginBottom: '2px'
                      }}>
                        {event.title}
                      </div>
                      <div style={{
                        fontSize: '11px',
                        color: colors.text.secondary
                      }}>
                        {event.startTime} - {event.endTime}
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{
                    fontSize: '12px',
                    color: colors.text.secondary,
                    margin: 0,
                    textAlign: 'center',
                    padding: '16px'
                  }}>
                    Nenhum evento nesta data
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Main Calendar Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Calendar Header */}
          <div style={{
            ...getCardStyle(),
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <h1 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: colors.text.primary,
                margin: 0
              }}>
                {getMonthName(currentDate)}
              </h1>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button
                  onClick={() => navigateMonth('prev')}
                  style={{
                    padding: '8px',
                    backgroundColor: colors.bg.tertiary,
                    border: `1px solid ${colors.border.primary}`,
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <ChevronLeft style={{ width: '18px', height: '18px', color: colors.text.secondary }} />
                </button>
                <button
                  onClick={() => setCurrentDate(new Date())}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: colors.bg.tertiary,
                    border: `1px solid ${colors.border.primary}`,
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: colors.text.primary,
                    fontWeight: '500'
                  }}
                >
                  Hoje
                </button>
                <button
                  onClick={() => navigateMonth('next')}
                  style={{
                    padding: '8px',
                    backgroundColor: colors.bg.tertiary,
                    border: `1px solid ${colors.border.primary}`,
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <ChevronRight style={{ width: '18px', height: '18px', color: colors.text.secondary }} />
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              {['month', 'week', 'day'].map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as ViewMode)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: viewMode === mode ? colors.brand.primary : colors.bg.tertiary,
                    color: viewMode === mode ? 'white' : colors.text.primary,
                    border: viewMode === mode ? 'none' : `1px solid ${colors.border.primary}`,
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    textTransform: 'capitalize',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {mode === 'month' ? 'Mês' : mode === 'week' ? 'Semana' : 'Dia'}
                </button>
              ))}
            </div>
          </div>

          {/* Calendar Grid */}
          <div style={{
            ...getCardStyle(),
            padding: '20px',
            flex: 1,
            overflow: 'hidden'
          }}>
            {/* Week days header */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', marginBottom: '16px' }}>
              {weekDays.map(day => (
                <div
                  key={day}
                  style={{
                    padding: '12px 8px',
                    textAlign: 'center',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: colors.text.secondary,
                    backgroundColor: colors.bg.tertiary,
                    borderRadius: '6px'
                  }}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(7, 1fr)', 
              gridTemplateRows: 'repeat(6, 1fr)',
              gap: '1px',
              height: 'calc(100% - 60px)'
            }}>
              {days.map((date, index) => {
                const dayEvents = date ? getEventsForDate(date) : []
                const isCurrentMonth = date && date.getMonth() === currentDate.getMonth()
                
                return (
                  <div
                    key={index}
                    onClick={() => date && setSelectedDate(date)}
                    style={{
                      padding: '8px',
                      backgroundColor: date && isSelected(date) ? `${colors.brand.primary}10` :
                                     date && isToday(date) ? `${colors.brand.primary}05` :
                                     colors.bg.tertiary,
                      border: date && isSelected(date) ? `2px solid ${colors.brand.primary}` :
                             date && isToday(date) ? `2px solid ${colors.brand.primary}40` :
                             `1px solid ${colors.border.primary}`,
                      borderRadius: '8px',
                      cursor: date ? 'pointer' : 'default',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'hidden',
                      minHeight: '80px'
                    }}
                  >
                    {date && (
                      <>
                        <div style={{
                          fontSize: '14px',
                          fontWeight: isToday(date) ? '600' : '500',
                          color: isCurrentMonth ? colors.text.primary : colors.text.tertiary,
                          marginBottom: '4px',
                          textAlign: 'center'
                        }}>
                          {date.getDate()}
                        </div>
                        
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          {dayEvents.slice(0, 3).map((event, eventIndex) => (
                            <div
                              key={event.id}
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedEvent(event)
                              }}
                              style={{
                                padding: '2px 6px',
                                backgroundColor: getCategoryColor(event.category),
                                color: 'white',
                                borderRadius: '3px',
                                fontSize: '10px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                lineHeight: '14px'
                              }}
                              title={event.title}
                            >
                              {event.startTime} {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 3 && (
                            <div style={{
                              fontSize: '9px',
                              color: colors.text.secondary,
                              textAlign: 'center',
                              padding: '2px'
                            }}>
                              +{dayEvents.length - 3} mais
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Event Details Modal */}
        {selectedEvent && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              ...getCardStyle(),
              width: '500px',
              maxWidth: '90vw',
              maxHeight: '80vh',
              padding: '24px',
              overflow: 'auto'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: colors.text.primary,
                  margin: 0
                }}>
                  {selectedEvent.title}
                </h3>
                <button
                  onClick={() => setSelectedEvent(null)}
                  style={{
                    padding: '8px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <X style={{ width: '18px', height: '18px', color: colors.text.secondary }} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '3px',
                      backgroundColor: getCategoryColor(selectedEvent.category)
                    }}
                  />
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '500',
                    backgroundColor: `${getCategoryColor(selectedEvent.category)}15`,
                    color: getCategoryColor(selectedEvent.category)
                  }}>
                    {getCategoryLabel(selectedEvent.category)}
                  </span>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '500',
                    backgroundColor: `${getStatusColor(selectedEvent.status)}15`,
                    color: getStatusColor(selectedEvent.status)
                  }}>
                    {selectedEvent.status === 'confirmed' ? 'Confirmado' : 
                     selectedEvent.status === 'pending' ? 'Pendente' : 'Cancelado'}
                  </span>
                </div>

                {selectedEvent.description && (
                  <p style={{
                    fontSize: '14px',
                    color: colors.text.primary,
                    margin: 0,
                    lineHeight: '1.5'
                  }}>
                    {selectedEvent.description}
                  </p>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock style={{ width: '16px', height: '16px', color: colors.text.tertiary }} />
                  <span style={{ fontSize: '14px', color: colors.text.primary }}>
                    {selectedEvent.date} • {selectedEvent.startTime} - {selectedEvent.endTime}
                  </span>
                </div>

                {selectedEvent.location && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin style={{ width: '16px', height: '16px', color: colors.text.tertiary }} />
                    <span style={{ fontSize: '14px', color: colors.text.primary }}>
                      {selectedEvent.location}
                    </span>
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Users style={{ width: '16px', height: '16px', color: colors.text.tertiary }} />
                  <span style={{ fontSize: '14px', color: colors.text.primary }}>
                    {selectedEvent.attendees}/{selectedEvent.maxAttendees} participantes
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '14px', color: colors.text.secondary }}>
                    Organizado por: {selectedEvent.organizer}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                  <button style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: colors.brand.primary,
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}>
                    <Edit3 style={{ width: '16px', height: '16px' }} />
                    Editar
                  </button>
                  <button style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: colors.bg.tertiary,
                    color: colors.text.primary,
                    border: `1px solid ${colors.border.primary}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}>
                    <Trash2 style={{ width: '16px', height: '16px' }} />
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
