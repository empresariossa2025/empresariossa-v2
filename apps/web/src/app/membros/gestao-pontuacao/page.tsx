"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useState, useEffect } from "react"
import { useThemedStyles } from "@/hooks/use-themed-styles"
import { 
  Shield, 
  Plus,
  Search,
  Filter,
  Users,
  Calendar,
  Eye,
  Check,
  X,
  User,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertTriangle,
  Award,
  TrendingUp,
  UserPlus,
  FileText,
  Star,
  Zap
} from "lucide-react"

interface TransacaoPontos {
  id: string
  membroId: string
  membroNome: string
  categoria: 'ATTENDANCE' | 'MEETING' | 'VISITOR' | 'RECOMMENDATION' | 'BUSINESS_DEAL'
  tipo: 'EARNED' | 'PENALTY' | 'BONUS'
  pontos: number
  descricao: string
  dataTransacao: string
  status: 'PENDENTE' | 'APROVADO' | 'REJEITADO'
  observacoes?: string
  aprovadoPor?: string
  dataAprovacao?: string
}

export default function GestaoPontuacaoPage() {
  const [transacoes, setTransacoes] = useState<TransacaoPontos[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('todos')
  const [categoriaFilter, setCategoriaFilter] = useState('todas')
  const [membroFilter, setMembroFilter] = useState('todos')
  const [selectedTransacoes, setSelectedTransacoes] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const { colors, getCardStyle } = useThemedStyles()

  useEffect(() => {
    // Mock data representando transações pendentes de aprovação
    const mockTransacoes: TransacaoPontos[] = [
      {
        id: '1',
        membroId: 'u1',
        membroNome: 'Alessandro Schlomer',
        categoria: 'MEETING',
        tipo: 'EARNED',
        pontos: 30,
        descricao: 'Reunião individual completada - Projeto Web Development',
        dataTransacao: '18/09/2025',
        status: 'PENDENTE'
      },
      {
        id: '2',
        membroId: 'u1',
        membroNome: 'Alessandro Schlomer',
        categoria: 'BUSINESS_DEAL',
        tipo: 'EARNED',
        pontos: 50,
        descricao: 'Negócio fechado - Consultoria para startup fintech',
        dataTransacao: '17/09/2025',
        status: 'PENDENTE'
      },
      {
        id: '3',
        membroId: 'u2',
        membroNome: 'Felipe Herculano',
        categoria: 'VISITOR',
        tipo: 'EARNED',
        pontos: 30,
        descricao: 'Visitante trazido para evento de networking',
        dataTransacao: '16/09/2025',
        status: 'PENDENTE'
      },
      {
        id: '4',
        membroId: 'u3',
        membroNome: 'Diego Souza',
        categoria: 'ATTENDANCE',
        tipo: 'PENALTY',
        pontos: -30,
        descricao: 'Ausência no evento mensal - Taxa abaixo de 75%',
        dataTransacao: '15/09/2025',
        status: 'PENDENTE'
      },
      {
        id: '5',
        membroId: 'u2',
        membroNome: 'Felipe Herculano',
        categoria: 'RECOMMENDATION',
        tipo: 'BONUS',
        pontos: 100,
        descricao: 'Recomendação fechada - Novo membro Giovanni Menezes',
        dataTransacao: '14/09/2025',
        status: 'APROVADO',
        aprovadoPor: 'Admin',
        dataAprovacao: '16/09/2025'
      },
      {
        id: '6',
        membroId: 'u4',
        membroNome: 'Adenias Filho',
        categoria: 'MEETING',
        tipo: 'EARNED',
        pontos: 30,
        descricao: 'Reunião individual - Planejamento estratégico Q4',
        dataTransacao: '13/09/2025',
        status: 'PENDENTE'
      },
      {
        id: '7',
        membroId: 'u5',
        membroNome: 'Bruno Soares',
        categoria: 'BUSINESS_DEAL',
        tipo: 'EARNED',
        pontos: 25,
        descricao: 'Venda realizada - Serviços de mentoria empresarial',
        dataTransacao: '12/09/2025',
        status: 'REJEITADO',
        aprovadoPor: 'Admin',
        dataAprovacao: '15/09/2025',
        observacoes: 'Falta comprovação da venda'
      },
      {
        id: '8',
        membroId: 'u3',
        membroNome: 'Diego Souza',
        categoria: 'VISITOR',
        tipo: 'EARNED',
        pontos: 30,
        descricao: 'Dois visitantes trazidos - Evento Barra da Tijuca',
        dataTransacao: '11/09/2025',
        status: 'PENDENTE'
      }
    ]

    setTimeout(() => {
      setTransacoes(mockTransacoes)
      setLoading(false)
    }, 500)
  }, [])

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case 'MEETING': return '#8b5cf6'
      case 'ATTENDANCE': return '#10b981'
      case 'VISITOR': return '#3b82f6'
      case 'RECOMMENDATION': return '#f59e0b'
      case 'BUSINESS_DEAL': return '#ef4444'
      default: return '#64748b'
    }
  }

  const getCategoriaText = (categoria: string) => {
    switch (categoria) {
      case 'MEETING': return 'Reunião'
      case 'ATTENDANCE': return 'Presença'
      case 'VISITOR': return 'Visitante'
      case 'RECOMMENDATION': return 'Recomendação'
      case 'BUSINESS_DEAL': return 'Negócio'
      default: return categoria
    }
  }

  const getCategoriaIcon = (categoria: string) => {
    switch (categoria) {
      case 'MEETING': return Users
      case 'ATTENDANCE': return Calendar
      case 'VISITOR': return UserPlus
      case 'RECOMMENDATION': return Star
      case 'BUSINESS_DEAL': return TrendingUp
      default: return FileText
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDENTE': return '#f59e0b'
      case 'APROVADO': return '#10b981'
      case 'REJEITADO': return '#ef4444'
      default: return '#64748b'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDENTE': return Clock
      case 'APROVADO': return CheckCircle
      case 'REJEITADO': return X
      default: return Clock
    }
  }

  const filteredTransacoes = transacoes.filter(transacao => {
    const matchesSearch = transacao.membroNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transacao.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'todos' || transacao.status === statusFilter
    const matchesCategoria = categoriaFilter === 'todas' || transacao.categoria === categoriaFilter
    const matchesMembro = membroFilter === 'todos' || transacao.membroNome === membroFilter
    
    return matchesSearch && matchesStatus && matchesCategoria && matchesMembro
  })

  const handleSelectTransacao = (id: string) => {
    setSelectedTransacoes(prev => 
      prev.includes(id) 
        ? prev.filter(t => t !== id)
        : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    const pendentes = filteredTransacoes.filter(t => t.status === 'PENDENTE').map(t => t.id)
    setSelectedTransacoes(selectedTransacoes.length === pendentes.length ? [] : pendentes)
  }

  const handleAprovarIndividual = (id: string) => {
    setTransacoes(prev => prev.map(t => 
      t.id === id 
        ? { ...t, status: 'APROVADO' as const, aprovadoPor: 'Admin', dataAprovacao: new Date().toLocaleDateString('pt-BR') }
        : t
    ))
  }

  const handleRejeitarIndividual = (id: string) => {
    setTransacoes(prev => prev.map(t => 
      t.id === id 
        ? { ...t, status: 'REJEITADO' as const, aprovadoPor: 'Admin', dataAprovacao: new Date().toLocaleDateString('pt-BR') }
        : t
    ))
  }

  const handleAprovarSelecionados = () => {
    setTransacoes(prev => prev.map(t => 
      selectedTransacoes.includes(t.id)
        ? { ...t, status: 'APROVADO' as const, aprovadoPor: 'Admin', dataAprovacao: new Date().toLocaleDateString('pt-BR') }
        : t
    ))
    setSelectedTransacoes([])
  }

  const itemsPerPage = 8
  const totalPages = Math.ceil(filteredTransacoes.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedTransacoes = filteredTransacoes.slice(startIndex, startIndex + itemsPerPage)

  const totalTransacoes = transacoes.length
  const pendentes = transacoes.filter(t => t.status === 'PENDENTE').length
  const aprovadas = transacoes.filter(t => t.status === 'APROVADO').length
  const rejeitadas = transacoes.filter(t => t.status === 'REJEITADO').length
  const pontosPendentes = transacoes.filter(t => t.status === 'PENDENTE').reduce((acc, t) => acc + Math.abs(t.pontos), 0)

  const membrosUnicos = [...new Set(transacoes.map(t => t.membroNome))]

  return (
    <DashboardLayout>
      <div style={{ padding: '24px' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <h1 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: colors.text.primary,
              margin: 0,
              transition: 'color 0.3s ease'
            }}>
              Gestão Pontuações
            </h1>
            <div style={{ display: 'flex', gap: '12px' }}>
              {selectedTransacoes.length > 0 && (
                <button
                  onClick={handleAprovarSelecionados}
                  style={{
                    ...getCardStyle(),
                    padding: '12px 20px',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
                  }}
                >
                  <Check style={{ width: '18px', height: '18px' }} />
                  Aprovar Selecionados ({selectedTransacoes.length})
                </button>
              )}
            </div>
          </div>
          <p style={{
            fontSize: '16px',
            color: colors.text.secondary,
            margin: 0,
            transition: 'color 0.3s ease'
          }}>
            Convalidação e aprovação de pontuações dos membros
          </p>
        </div>

        {/* Stats Overview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div style={{
            background: colors.brand.gradient,
            borderRadius: '12px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <Shield style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Total Transações</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{totalTransacoes}</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            borderRadius: '12px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <Clock style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Pendentes</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{pendentes}</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            borderRadius: '12px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <CheckCircle style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Aprovadas</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{aprovadas}</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            borderRadius: '12px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <X style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Rejeitadas</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{rejeitadas}</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            borderRadius: '12px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <Award style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Pontos Pendentes</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{pontosPendentes}</div>
          </div>
        </div>

        {/* Filters */}
        <div style={{
          ...getCardStyle(),
          padding: '20px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'end' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '500',
                color: colors.text.secondary,
                marginBottom: '6px',
                transition: 'color 0.3s ease'
              }}>
                Buscar
              </label>
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
                  placeholder="Membro, descrição..."
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

            <div>
              <label style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '500',
                color: colors.text.secondary,
                marginBottom: '6px',
                transition: 'color 0.3s ease'
              }}>
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `1px solid ${colors.border.primary}`,
                  borderRadius: '8px',
                  backgroundColor: colors.bg.tertiary,
                  color: colors.text.primary,
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <option value="todos">Todos</option>
                <option value="PENDENTE">Pendente</option>
                <option value="APROVADO">Aprovado</option>
                <option value="REJEITADO">Rejeitado</option>
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '500',
                color: colors.text.secondary,
                marginBottom: '6px',
                transition: 'color 0.3s ease'
              }}>
                Categoria
              </label>
              <select
                value={categoriaFilter}
                onChange={(e) => setCategoriaFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `1px solid ${colors.border.primary}`,
                  borderRadius: '8px',
                  backgroundColor: colors.bg.tertiary,
                  color: colors.text.primary,
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <option value="todas">Todas</option>
                <option value="MEETING">Reunião</option>
                <option value="ATTENDANCE">Presença</option>
                <option value="VISITOR">Visitante</option>
                <option value="RECOMMENDATION">Recomendação</option>
                <option value="BUSINESS_DEAL">Negócio</option>
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '500',
                color: colors.text.secondary,
                marginBottom: '6px',
                transition: 'color 0.3s ease'
              }}>
                Membro
              </label>
              <select
                value={membroFilter}
                onChange={(e) => setMembroFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `1px solid ${colors.border.primary}`,
                  borderRadius: '8px',
                  backgroundColor: colors.bg.tertiary,
                  color: colors.text.primary,
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <option value="todos">Todos</option>
                {membrosUnicos.map(membro => (
                  <option key={membro} value={membro}>{membro}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handleSelectAll}
                style={{
                  padding: '10px 16px',
                  backgroundColor: colors.brand.primary,
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.3s ease'
                }}
              >
                {selectedTransacoes.length > 0 ? 'Desselecionar' : 'Selecionar Pendentes'}
              </button>
            </div>
          </div>
        </div>

        {/* Lista de Transações */}
        {loading ? (
          <div style={{
            ...getCardStyle(),
            padding: '60px',
            textAlign: 'center'
          }}>
            <Shield style={{ width: '48px', height: '48px', color: colors.text.tertiary, margin: '0 auto 16px' }} />
            <p style={{ color: colors.text.secondary, fontSize: '16px', margin: 0 }}>
              Carregando transações...
            </p>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
              {paginatedTransacoes.map((transacao) => {
                const StatusIcon = getStatusIcon(transacao.status)
                const CategoriaIcon = getCategoriaIcon(transacao.categoria)
                const isSelected = selectedTransacoes.includes(transacao.id)
                const isPendente = transacao.status === 'PENDENTE'
                
                return (
                  <div
                    key={transacao.id}
                    style={{
                      ...getCardStyle(),
                      padding: '20px',
                      transition: 'all 0.3s ease',
                      border: isSelected ? `2px solid ${colors.brand.primary}` : `1px solid ${colors.border.primary}`,
                      backgroundColor: isSelected ? `${colors.brand.primary}05` : colors.bg.primary
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                      {/* Checkbox */}
                      {isPendente && (
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectTransacao(transacao.id)}
                          style={{
                            width: '18px',
                            height: '18px',
                            marginTop: '2px',
                            cursor: 'pointer'
                          }}
                        />
                      )}
                      
                      {/* Content */}
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                              <h3 style={{
                                fontSize: '18px',
                                fontWeight: '600',
                                color: colors.text.primary,
                                margin: 0,
                                transition: 'color 0.3s ease'
                              }}>
                                {transacao.membroNome}
                              </h3>
                              
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{
                                  padding: '4px 8px',
                                  borderRadius: '6px',
                                  fontSize: '11px',
                                  fontWeight: '500',
                                  backgroundColor: `${getCategoriaColor(transacao.categoria)}15`,
                                  color: getCategoriaColor(transacao.categoria),
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}>
                                  <CategoriaIcon style={{ width: '12px', height: '12px' }} />
                                  {getCategoriaText(transacao.categoria)}
                                </span>

                                <span style={{
                                  padding: '4px 8px',
                                  borderRadius: '6px',
                                  fontSize: '11px',
                                  fontWeight: '500',
                                  backgroundColor: `${getStatusColor(transacao.status)}15`,
                                  color: getStatusColor(transacao.status),
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}>
                                  <StatusIcon style={{ width: '12px', height: '12px' }} />
                                  {transacao.status}
                                </span>
                              </div>
                            </div>

                            <p style={{
                              fontSize: '14px',
                              color: colors.text.secondary,
                              margin: '0 0 8px 0',
                              lineHeight: '1.4',
                              transition: 'color 0.3s ease'
                            }}>
                              {transacao.descricao}
                            </p>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Calendar style={{ width: '14px', height: '14px', color: colors.text.tertiary }} />
                                <span style={{ fontSize: '13px', color: colors.text.secondary }}>
                                  {transacao.dataTransacao}
                                </span>
                              </div>

                              <div style={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                color: transacao.pontos > 0 ? '#10b981' : '#ef4444'
                              }}>
                                {transacao.pontos > 0 ? '+' : ''}{transacao.pontos} pts
                              </div>
                            </div>

                            {transacao.observacoes && (
                              <div style={{
                                marginTop: '8px',
                                padding: '8px 12px',
                                backgroundColor: `${getStatusColor(transacao.status)}10`,
                                borderRadius: '6px',
                                fontSize: '12px',
                                color: colors.text.secondary,
                                fontStyle: 'italic'
                              }}>
                                Obs: {transacao.observacoes}
                              </div>
                            )}

                            {transacao.dataAprovacao && (
                              <div style={{ marginTop: '8px', fontSize: '12px', color: colors.text.tertiary }}>
                                {transacao.status} por {transacao.aprovadoPor} em {transacao.dataAprovacao}
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          {isPendente && (
                            <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
                              <button
                                onClick={() => handleAprovarIndividual(transacao.id)}
                                style={{
                                  padding: '8px 16px',
                                  background: 'linear-gradient(135deg, #10b981, #059669)',
                                  border: 'none',
                                  borderRadius: '6px',
                                  color: 'white',
                                  fontSize: '12px',
                                  fontWeight: '500',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  transition: 'all 0.3s ease'
                                }}
                              >
                                <Check style={{ width: '14px', height: '14px' }} />
                                Aprovar
                              </button>
                              <button
                                onClick={() => handleRejeitarIndividual(transacao.id)}
                                style={{
                                  padding: '8px 16px',
                                  background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                                  border: 'none',
                                  borderRadius: '6px',
                                  color: 'white',
                                  fontSize: '12px',
                                  fontWeight: '500',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  transition: 'all 0.3s ease'
                                }}
                              >
                                <X style={{ width: '14px', height: '14px' }} />
                                Rejeitar
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Pagination */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '24px'
            }}>
              <p style={{
                fontSize: '14px',
                color: colors.text.secondary,
                margin: 0,
                transition: 'color 0.3s ease'
              }}>
                Mostrando página {currentPage} de {totalPages}. Total de registros é de {filteredTransacoes.length}.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: colors.bg.tertiary,
                    border: `1px solid ${colors.border.primary}`,
                    borderRadius: '6px',
                    color: colors.text.primary,
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    opacity: currentPage === 1 ? 0.5 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '14px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <ChevronLeft style={{ width: '16px', height: '16px' }} />
                  Anterior
                </button>

                <span style={{
                  padding: '8px 16px',
                  fontSize: '14px',
                  color: colors.text.primary,
                  transition: 'color 0.3s ease'
                }}>
                  Página {currentPage}
                </span>

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: colors.bg.tertiary,
                    border: `1px solid ${colors.border.primary}`,
                    borderRadius: '6px',
                    color: colors.text.primary,
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    opacity: currentPage === totalPages ? 0.5 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '14px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Próximo
                  <ChevronRight style={{ width: '16px', height: '16px' }} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  )
}
