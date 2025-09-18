"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useState, useEffect } from "react"
import { useThemedStyles } from "@/hooks/use-themed-styles"
import { 
  CreditCard, 
  Plus,
  Search,
  Filter,
  Calendar,
  Eye,
  Edit3,
  Check,
  AlertTriangle,
  DollarSign,
  User,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle,
  FileText,
  TrendingUp,
  Receipt,
  Banknote
} from "lucide-react"

interface Pagamento {
  id: string
  patrocinadorMembro: string
  status: 'Pago' | 'Em aberto' | 'Vencido' | 'Cancelado'
  vencimento: string
  dataPagamento?: string
  valor: number
  valorPago?: number
  parcelas: string
  formaPagamento: 'Pix' | 'Cartão de crédito' | 'Dinheiro' | 'Transferência'
  servico: 'Mensalidade' | 'Taxa' | 'Evento'
  competencia: string
  observacoes?: string
}

export default function PagamentosPage() {
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('todos')
  const [formaPagamentoFilter, setFormaPagamentoFilter] = useState('todas')
  const [servicoFilter, setServicoFilter] = useState('todos')
  const [currentPage, setCurrentPage] = useState(1)
  const { colors, getCardStyle } = useThemedStyles()

  useEffect(() => {
    // Mock data baseado no sistema existente
    const mockPagamentos: Pagamento[] = [
      {
        id: '284',
        patrocinadorMembro: 'Felipe Herculano',
        status: 'Pago',
        vencimento: '05/09/2025',
        dataPagamento: '02/09/2025',
        valor: 3105.00,
        valorPago: 3105.00,
        parcelas: '1/1',
        formaPagamento: 'Pix',
        servico: 'Mensalidade',
        competencia: 'September 2025'
      },
      {
        id: '30',
        patrocinadorMembro: 'Giovanni Menezes',
        status: 'Em aberto',
        vencimento: '10/09/2025',
        valor: 3105.00,
        parcelas: '1/1',
        formaPagamento: 'Cartão de crédito',
        servico: 'Mensalidade',
        competencia: 'September 2025'
      },
      {
        id: '286',
        patrocinadorMembro: 'Diego Souza',
        status: 'Pago',
        vencimento: '15/09/2025',
        dataPagamento: '16/09/2025',
        valor: 3105.00,
        valorPago: 3105.00,
        parcelas: '1/1',
        formaPagamento: 'Pix',
        servico: 'Mensalidade',
        competencia: 'September 2025'
      },
      {
        id: '38',
        patrocinadorMembro: 'Alessandro Schlomer',
        status: 'Em aberto',
        vencimento: '20/09/2025',
        valor: 3105.00,
        parcelas: '1/1',
        formaPagamento: 'Cartão de crédito',
        servico: 'Mensalidade',
        competencia: 'September 2025'
      },
      {
        id: '10',
        patrocinadorMembro: 'Stephanie',
        status: 'Vencido',
        vencimento: '25/09/2025',
        valor: 3105.00,
        parcelas: '1/1',
        formaPagamento: 'Cartão de crédito',
        servico: 'Mensalidade',
        competencia: 'September 2025'
      },
      {
        id: '16',
        patrocinadorMembro: 'PEDRO DELGADO',
        status: 'Em aberto',
        vencimento: '25/09/2025',
        valor: 3105.00,
        parcelas: '1/1',
        formaPagamento: 'Cartão de crédito',
        servico: 'Mensalidade',
        competencia: 'September 2025'
      },
      {
        id: '18',
        patrocinadorMembro: 'Ana Clara',
        status: 'Em aberto',
        vencimento: '25/09/2025',
        valor: 3105.00,
        parcelas: '1/1',
        formaPagamento: 'Cartão de crédito',
        servico: 'Mensalidade',
        competencia: 'September 2025'
      },
      {
        id: '20',
        patrocinadorMembro: 'Rosangela Fraga',
        status: 'Em aberto',
        vencimento: '25/09/2025',
        valor: 3105.00,
        parcelas: '1/1',
        formaPagamento: 'Pix',
        servico: 'Mensalidade',
        competencia: 'September 2025'
      },
      {
        id: '24',
        patrocinadorMembro: 'Veri Nascimento',
        status: 'Pago',
        vencimento: '25/09/2025',
        dataPagamento: '09/07/2025',
        valor: 3105.00,
        valorPago: 3100.30,
        parcelas: '1/1',
        formaPagamento: 'Dinheiro',
        servico: 'Mensalidade',
        competencia: 'September 2025'
      },
      {
        id: '25',
        patrocinadorMembro: 'EMPRESÁRIOS SA',
        status: 'Em aberto',
        vencimento: '25/09/2025',
        valor: 3105.00,
        parcelas: '1/1',
        formaPagamento: 'Pix',
        servico: 'Mensalidade',
        competencia: 'September 2025'
      }
    ]

    setTimeout(() => {
      setPagamentos(mockPagamentos)
      setLoading(false)
    }, 500)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pago': return '#10b981'
      case 'Em aberto': return '#f59e0b'
      case 'Vencido': return '#ef4444'
      case 'Cancelado': return '#6b7280'
      default: return '#64748b'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pago': return CheckCircle
      case 'Em aberto': return Clock
      case 'Vencido': return AlertTriangle
      case 'Cancelado': return X
      default: return Clock
    }
  }

  const getFormaPagamentoIcon = (forma: string) => {
    switch (forma) {
      case 'Pix': return Receipt
      case 'Cartão de crédito': return CreditCard
      case 'Dinheiro': return Banknote
      case 'Transferência': return DollarSign
      default: return CreditCard
    }
  }

  const getFormaPagamentoColor = (forma: string) => {
    switch (forma) {
      case 'Pix': return '#8b5cf6'
      case 'Cartão de crédito': return '#3b82f6'
      case 'Dinheiro': return '#10b981'
      case 'Transferência': return '#f59e0b'
      default: return '#64748b'
    }
  }

  const isVencido = (vencimento: string, status: string) => {
    if (status === 'Pago') return false
    const hoje = new Date()
    const dataVencimento = new Date(vencimento.split('/').reverse().join('-'))
    return dataVencimento < hoje
  }

  const filteredPagamentos = pagamentos.filter(pagamento => {
    const matchesSearch = pagamento.patrocinadorMembro.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pagamento.id.includes(searchTerm)
    const matchesStatus = statusFilter === 'todos' || pagamento.status === statusFilter
    const matchesForma = formaPagamentoFilter === 'todas' || pagamento.formaPagamento === formaPagamentoFilter
    const matchesServico = servicoFilter === 'todos' || pagamento.servico === servicoFilter
    
    return matchesSearch && matchesStatus && matchesForma && matchesServico
  })

  const itemsPerPage = 6
  const totalPages = Math.ceil(filteredPagamentos.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedPagamentos = filteredPagamentos.slice(startIndex, startIndex + itemsPerPage)

  const totalPagamentos = pagamentos.length
  const pagosCount = pagamentos.filter(p => p.status === 'Pago').length
  const emAbertoCount = pagamentos.filter(p => p.status === 'Em aberto').length
  const vencidosCount = pagamentos.filter(p => p.status === 'Em aberto' && isVencido(p.vencimento, p.status)).length
  const valorTotal = pagamentos.reduce((acc, p) => acc + p.valor, 0)
  const valorRecebido = pagamentos.filter(p => p.status === 'Pago').reduce((acc, p) => acc + (p.valorPago || p.valor), 0)

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
              Pagamentos
            </h1>
            <button style={{
              ...getCardStyle(),
              padding: '12px 20px',
              background: colors.brand.gradient,
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.25)'
            }}>
              <Plus style={{ width: '18px', height: '18px' }} />
              Nova Cobrança
            </button>
          </div>
          <p style={{
            fontSize: '16px',
            color: colors.text.secondary,
            margin: 0,
            transition: 'color 0.3s ease'
          }}>
            Gerencie mensalidades e pagamentos dos membros
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
              <FileText style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Total Cobranças</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{totalPagamentos}</div>
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
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Pagos</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{pagosCount}</div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>
              {Math.round((pagosCount / totalPagamentos) * 100)}% do total
            </div>
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
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Em Aberto</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{emAbertoCount}</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            borderRadius: '12px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <AlertTriangle style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Vencidos</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{vencidosCount}</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            borderRadius: '12px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <DollarSign style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Valor Total</h3>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
              R$ {valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
            borderRadius: '12px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(6, 182, 212, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <TrendingUp style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Recebido</h3>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
              R$ {valorRecebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div style={{
          ...getCardStyle(),
          padding: '20px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', alignItems: 'end' }}>
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
                  placeholder="Nome, ID..."
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
                <option value="Pago">Pago</option>
                <option value="Em aberto">Em Aberto</option>
                <option value="Vencido">Vencido</option>
                <option value="Cancelado">Cancelado</option>
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
                Forma de Pagamento
              </label>
              <select
                value={formaPagamentoFilter}
                onChange={(e) => setFormaPagamentoFilter(e.target.value)}
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
                <option value="Pix">Pix</option>
                <option value="Cartão de crédito">Cartão de Crédito</option>
                <option value="Dinheiro">Dinheiro</option>
                <option value="Transferência">Transferência</option>
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
                Serviço
              </label>
              <select
                value={servicoFilter}
                onChange={(e) => setServicoFilter(e.target.value)}
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
                <option value="Mensalidade">Mensalidade</option>
                <option value="Taxa">Taxa</option>
                <option value="Evento">Evento</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{
                padding: '10px 16px',
                backgroundColor: colors.bg.tertiary,
                border: `1px solid ${colors.border.primary}`,
                borderRadius: '8px',
                color: colors.text.primary,
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.3s ease'
              }}>
                <Filter style={{ width: '16px', height: '16px' }} />
                Filtrar
              </button>
            </div>
          </div>
        </div>

        {/* Pagamentos Grid */}
        {loading ? (
          <div style={{
            ...getCardStyle(),
            padding: '60px',
            textAlign: 'center'
          }}>
            <CreditCard style={{ width: '48px', height: '48px', color: colors.text.tertiary, margin: '0 auto 16px' }} />
            <p style={{ color: colors.text.secondary, fontSize: '16px', margin: 0 }}>
              Carregando pagamentos...
            </p>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              {paginatedPagamentos.map((pagamento) => {
                const StatusIcon = getStatusIcon(pagamento.status)
                const FormaPagamentoIcon = getFormaPagamentoIcon(pagamento.formaPagamento)
                const statusFinal = isVencido(pagamento.vencimento, pagamento.status) ? 'Vencido' : pagamento.status
                
                return (
                  <div
                    key={pagamento.id}
                    style={{
                      ...getCardStyle(),
                      padding: '20px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'
                    }}
                  >
                    {/* Header da Card */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <h3 style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            color: colors.text.primary,
                            margin: 0,
                            transition: 'color 0.3s ease'
                          }}>
                            {pagamento.patrocinadorMembro}
                          </h3>
                          <span style={{
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontSize: '10px',
                            fontWeight: '500',
                            backgroundColor: `${colors.brand.primary}20`,
                            color: colors.brand.primary
                          }}>
                            #{pagamento.id}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: '500',
                            backgroundColor: `${getStatusColor(statusFinal)}15`,
                            color: getStatusColor(statusFinal),
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            <StatusIcon style={{ width: '12px', height: '12px' }} />
                            {statusFinal}
                          </span>
                          <span style={{
                            fontSize: '12px',
                            color: colors.text.secondary,
                            transition: 'color 0.3s ease'
                          }}>
                            {pagamento.servico}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Valor */}
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{
                        padding: '16px',
                        backgroundColor: colors.bg.tertiary,
                        borderRadius: '8px',
                        textAlign: 'center',
                        transition: 'background-color 0.3s ease'
                      }}>
                        <div style={{
                          fontSize: '24px',
                          fontWeight: 'bold',
                          color: colors.text.primary,
                          marginBottom: '4px',
                          transition: 'color 0.3s ease'
                        }}>
                          R$ {pagamento.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>
                        {pagamento.valorPago && pagamento.valorPago !== pagamento.valor && (
                          <div style={{
                            fontSize: '14px',
                            color: getStatusColor('Pago'),
                            fontWeight: '500'
                          }}>
                            Pago: R$ {pagamento.valorPago.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </div>
                        )}
                        <div style={{
                          fontSize: '12px',
                          color: colors.text.secondary,
                          transition: 'color 0.3s ease'
                        }}>
                          Parcela {pagamento.parcelas}
                        </div>
                      </div>
                    </div>

                    {/* Datas */}
                    <div style={{ marginBottom: '16px', display: 'grid', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Calendar style={{ width: '14px', height: '14px', color: colors.text.tertiary }} />
                        <span style={{
                          fontSize: '13px',
                          color: colors.text.secondary,
                          transition: 'color 0.3s ease'
                        }}>
                          Vencimento: {pagamento.vencimento}
                        </span>
                      </div>
                      {pagamento.dataPagamento && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <CheckCircle style={{ width: '14px', height: '14px', color: getStatusColor('Pago') }} />
                          <span style={{
                            fontSize: '13px',
                            color: getStatusColor('Pago'),
                            fontWeight: '500'
                          }}>
                            Pago em: {pagamento.dataPagamento}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Forma de Pagamento */}
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        backgroundColor: `${getFormaPagamentoColor(pagamento.formaPagamento)}15`,
                        border: `1px solid ${getFormaPagamentoColor(pagamento.formaPagamento)}30`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <FormaPagamentoIcon style={{
                          width: '16px',
                          height: '16px',
                          color: getFormaPagamentoColor(pagamento.formaPagamento)
                        }} />
                        <span style={{
                          fontSize: '13px',
                          fontWeight: '500',
                          color: getFormaPagamentoColor(pagamento.formaPagamento)
                        }}>
                          {pagamento.formaPagamento}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                      {pagamento.status === 'Em aberto' && (
                        <button style={{
                          flex: 1,
                          padding: '8px 12px',
                          background: 'linear-gradient(135deg, #10b981, #059669)',
                          border: 'none',
                          borderRadius: '6px',
                          color: 'white',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          transition: 'all 0.3s ease'
                        }}>
                          <Check style={{ width: '14px', height: '14px' }} />
                          Confirmar Pagamento
                        </button>
                      )}
                      {pagamento.status === 'Pago' && (
                        <button style={{
                          flex: 1,
                          padding: '8px 12px',
                          backgroundColor: colors.brand.primary,
                          border: 'none',
                          borderRadius: '6px',
                          color: 'white',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          transition: 'all 0.3s ease'
                        }}>
                          <Eye style={{ width: '14px', height: '14px' }} />
                          Ver Comprovante
                        </button>
                      )}
                      <button style={{
                        padding: '8px 12px',
                        backgroundColor: colors.bg.tertiary,
                        border: `1px solid ${colors.border.primary}`,
                        borderRadius: '6px',
                        color: colors.text.primary,
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'all 0.3s ease'
                      }}>
                        <Edit3 style={{ width: '14px', height: '14px' }} />
                      </button>
                    </div>

                    {/* Footer */}
                    <div style={{ 
                      paddingTop: '12px', 
                      borderTop: `1px solid ${colors.border.primary}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <span style={{
                        fontSize: '11px',
                        color: colors.text.secondary,
                        transition: 'color 0.3s ease'
                      }}>
                        Competência: {pagamento.competencia}
                      </span>
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
                Mostrando página {currentPage} de {totalPages}. Total de registros é de {filteredPagamentos.length}.
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
