"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useState, useEffect } from "react"
import { useThemedStyles } from "@/hooks/use-themed-styles"
import { 
  DollarSign, 
  Plus,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Calendar,
  Eye,
  Edit3,
  Download,
  Upload,
  PieChart,
  BarChart3,
  Target,
  AlertCircle,
  CheckCircle,
  CreditCard,
  Wallet,
  Building2,
  Users,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Calculator,
  Bell,
  Clock,
  Activity,
  Zap,
  MapPin,
  User,
  Calendar as CalendarIcon,
  Star,
  Settings,
  RefreshCw,
  ExternalLink,
  Info,
  Award
} from "lucide-react"

interface TransacaoFinanceira {
  id: string
  tipo: 'RECEITA' | 'DESPESA'
  categoria: string
  subcategoria?: string
  valor: number
  descricao: string
  data: string
  unidade: string
  status: 'PAGO' | 'PENDENTE' | 'VENCIDO' | 'CANCELADO'
  formaPagamento: 'DINHEIRO' | 'PIX' | 'CARTAO' | 'TRANSFERENCIA' | 'BOLETO'
  dataPagamento?: string
  dataVencimento?: string
  numeroDocumento?: string
  fornecedor?: string
  cliente?: string
  centro_custo?: string
  observacoes?: string
  prioridade?: 'ALTA' | 'MEDIA' | 'BAIXA'
}

interface Budget {
  categoria: string
  orcado: number
  realizado: number
  porcentagem: number
  variacao: number
  tendencia: 'up' | 'down' | 'stable'
}

interface CentrosCusto {
  nome: string
  receitas: number
  despesas: number
  lucro: number
  margem: number
  meta: number
}

interface AlertaFinanceiro {
  id: string
  tipo: 'warning' | 'danger' | 'info' | 'success'
  titulo: string
  descricao: string
  valor?: number
  dataVencimento?: string
  categoria: string
  prioridade: 'ALTA' | 'MEDIA' | 'BAIXA'
}

interface ProjecaoMensal {
  mes: string
  receitasPrevistas: number
  receitasRealizadas: number
  despesasPrevistas: number
  despesasRealizadas: number
  fluxoCaixa: number
}

export default function FinanceiroPage() {
  const [transacoes, setTransacoes] = useState<TransacaoFinanceira[]>([])
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [centrosCusto, setCentrosCusto] = useState<CentrosCusto[]>([])
  const [alertasFinanceiros, setAlertasFinanceiros] = useState<AlertaFinanceiro[]>([])
  const [projecaoMensal, setProjecaoMensal] = useState<ProjecaoMensal[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [tipoFilter, setTipoFilter] = useState('todos')
  const [categoriaFilter, setCategoriaFilter] = useState('todas')
  const [statusFilter, setStatusFilter] = useState('todos')
  const [unidadeFilter, setUnidadeFilter] = useState('todas')
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<'dashboard' | 'transacoes' | 'budget' | 'centros-custo' | 'alertas' | 'relatorios'>('dashboard')
  const { colors, getCardStyle } = useThemedStyles()

  useEffect(() => {
    // Mock data completo para sistema financeiro enterprise
    const mockTransacoes: TransacaoFinanceira[] = [
      {
        id: 'F001',
        tipo: 'RECEITA',
        categoria: 'Mensalidades',
        valor: 31050.00,
        descricao: 'Mensalidades Outubro 2025 - 10 membros',
        data: '05/10/2025',
        unidade: 'Todas as unidades',
        status: 'PAGO',
        formaPagamento: 'PIX',
        dataPagamento: '05/10/2025',
        centro_custo: 'RECEITAS_OPERACIONAIS',
        prioridade: 'ALTA'
      },
      {
        id: 'F002',
        tipo: 'RECEITA',
        categoria: 'Eventos',
        subcategoria: 'Workshop IA',
        valor: 6300.00,
        descricao: 'Workshop IA para Empresas - 42 participantes',
        data: '01/10/2025',
        unidade: 'Matriz - Barra da Tijuca',
        status: 'PAGO',
        formaPagamento: 'CARTAO',
        dataPagamento: '01/10/2025',
        centro_custo: 'RECEITAS_EVENTOS',
        prioridade: 'MEDIA'
      },
      {
        id: 'F003',
        tipo: 'DESPESA',
        categoria: 'Operacional',
        subcategoria: 'Aluguel',
        valor: 8500.00,
        descricao: 'Aluguel escritório Barra Prime Office - Outubro 2025',
        data: '01/10/2025',
        unidade: 'Matriz - Barra da Tijuca',
        status: 'PAGO',
        formaPagamento: 'TRANSFERENCIA',
        dataPagamento: '01/10/2025',
        fornecedor: 'Barra Prime Administração',
        centro_custo: 'DESPESAS_OPERACIONAIS',
        prioridade: 'ALTA'
      },
      {
        id: 'F004',
        tipo: 'DESPESA',
        categoria: 'Eventos',
        subcategoria: 'Jantar Negócios',
        valor: 2800.00,
        descricao: 'Jantar de Negócios - OUTBACK Nova América',
        data: '23/09/2025',
        unidade: 'Nova América - Del Castilho',
        status: 'PAGO',
        formaPagamento: 'CARTAO',
        dataPagamento: '23/09/2025',
        fornecedor: 'OUTBACK Steakhouse',
        centro_custo: 'DESPESAS_EVENTOS',
        prioridade: 'MEDIA'
      },
      {
        id: 'F005',
        tipo: 'RECEITA',
        categoria: 'Patrocínios',
        valor: 15000.00,
        descricao: 'Patrocínio Trimestral - TechSolutions Corp',
        data: '30/09/2025',
        unidade: 'Matriz - Barra da Tijuca',
        status: 'PENDENTE',
        formaPagamento: 'TRANSFERENCIA',
        dataVencimento: '15/10/2025',
        cliente: 'TechSolutions Ltda',
        centro_custo: 'RECEITAS_PATROCINIOS',
        prioridade: 'ALTA'
      },
      {
        id: 'F006',
        tipo: 'DESPESA',
        categoria: 'Marketing',
        subcategoria: 'Google Ads',
        valor: 2400.00,
        descricao: 'Campanhas Google Ads - Outubro 2025',
        data: '01/10/2025',
        unidade: 'Todas as unidades',
        status: 'VENCIDO',
        formaPagamento: 'CARTAO',
        dataVencimento: '05/10/2025',
        fornecedor: 'Google Ads',
        centro_custo: 'DESPESAS_MARKETING',
        prioridade: 'ALTA'
      },
      {
        id: 'F007',
        tipo: 'DESPESA',
        categoria: 'Pessoal',
        subcategoria: 'Salários',
        valor: 18000.00,
        descricao: 'Folha de pagamento - Outubro 2025',
        data: '30/10/2025',
        unidade: 'Todas as unidades',
        status: 'PENDENTE',
        formaPagamento: 'TRANSFERENCIA',
        dataVencimento: '05/11/2025',
        centro_custo: 'DESPESAS_PESSOAL',
        prioridade: 'ALTA'
      },
      {
        id: 'F008',
        tipo: 'RECEITA',
        categoria: 'Consultoria',
        valor: 12500.00,
        descricao: 'Consultoria Empresarial Premium - Q4 2025',
        data: '25/09/2025',
        unidade: 'Matriz - Barra da Tijuca',
        status: 'PAGO',
        formaPagamento: 'PIX',
        dataPagamento: '26/09/2025',
        cliente: 'Empresa Premium Corp',
        centro_custo: 'RECEITAS_SERVICOS',
        prioridade: 'MEDIA'
      },
      {
        id: 'F009',
        tipo: 'RECEITA',
        categoria: 'Networking',
        valor: 4500.00,
        descricao: 'Evento Networking Empresarial - 60 participantes',
        data: '15/10/2025',
        unidade: 'Matriz - Barra da Tijuca',
        status: 'PAGO',
        formaPagamento: 'PIX',
        dataPagamento: '15/10/2025',
        centro_custo: 'RECEITAS_EVENTOS',
        prioridade: 'MEDIA'
      },
      {
        id: 'F010',
        tipo: 'DESPESA',
        categoria: 'Tecnologia',
        subcategoria: 'Software',
        valor: 1200.00,
        descricao: 'Licenças Microsoft 365 + Ferramentas',
        data: '01/10/2025',
        unidade: 'Todas as unidades',
        status: 'PAGO',
        formaPagamento: 'CARTAO',
        dataPagamento: '01/10/2025',
        fornecedor: 'Microsoft Brasil',
        centro_custo: 'DESPESAS_TECNOLOGIA',
        prioridade: 'MEDIA'
      }
    ]

    const mockBudgets: Budget[] = [
      { categoria: 'Mensalidades', orcado: 35000, realizado: 31050, porcentagem: 88.7, variacao: -3950, tendencia: 'down' },
      { categoria: 'Eventos', orcado: 30000, realizado: 32100, porcentagem: 107.0, variacao: 2100, tendencia: 'up' },
      { categoria: 'Patrocínios', orcado: 20000, realizado: 15000, porcentagem: 75.0, variacao: -5000, tendencia: 'down' },
      { categoria: 'Consultoria', orcado: 15000, realizado: 12500, porcentagem: 83.3, variacao: -2500, tendencia: 'stable' },
      { categoria: 'Operacional', orcado: 12000, realizado: 8500, porcentagem: 70.8, variacao: -3500, tendencia: 'down' },
      { categoria: 'Marketing', orcado: 8000, realizado: 9200, porcentagem: 115.0, variacao: 1200, tendencia: 'up' },
      { categoria: 'Pessoal', orcado: 20000, realizado: 18000, porcentagem: 90.0, variacao: -2000, tendencia: 'stable' },
      { categoria: 'Tecnologia', orcado: 3000, realizado: 2800, porcentagem: 93.3, variacao: -200, tendencia: 'stable' }
    ]

    const mockCentrosCusto: CentrosCusto[] = [
      { nome: 'Matriz - Barra da Tijuca', receitas: 45800, despesas: 28200, lucro: 17600, margem: 38.4, meta: 20000 },
      { nome: 'Nova América - Del Castilho', receitas: 12400, despesas: 8900, lucro: 3500, margem: 28.2, meta: 4000 },
      { nome: 'Duque de Caxias', receitas: 8200, despesas: 5400, lucro: 2800, margem: 34.1, meta: 3500 },
      { nome: 'Conexão Brasil', receitas: 15600, despesas: 11200, lucro: 4400, margem: 28.2, meta: 5000 }
    ]

    const mockAlertas: AlertaFinanceiro[] = [
      {
        id: 'A001',
        tipo: 'danger',
        titulo: 'Campanhas Google Ads Vencidas',
        descricao: 'Pagamento vencido há 3 dias',
        valor: 2400,
        dataVencimento: '05/10/2025',
        categoria: 'Marketing',
        prioridade: 'ALTA'
      },
      {
        id: 'A002',
        tipo: 'warning',
        titulo: 'Patrocínio TechSolutions',
        descricao: 'Vence em 7 dias',
        valor: 15000,
        dataVencimento: '15/10/2025',
        categoria: 'Patrocínios',
        prioridade: 'ALTA'
      },
      {
        id: 'A003',
        tipo: 'warning',
        titulo: 'Folha de Pagamento',
        descricao: 'Vence em 15 dias',
        valor: 18000,
        dataVencimento: '05/11/2025',
        categoria: 'Pessoal',
        prioridade: 'ALTA'
      },
      {
        id: 'A004',
        tipo: 'info',
        titulo: 'Meta de Receitas - 88%',
        descricao: 'Faltam R$ 12.000 para atingir a meta mensal',
        categoria: 'Metas',
        prioridade: 'MEDIA'
      },
      {
        id: 'A005',
        tipo: 'success',
        titulo: 'Eventos Superaram Meta',
        descricao: 'Receitas de eventos 7% acima do orçado',
        categoria: 'Eventos',
        prioridade: 'BAIXA'
      }
    ]

    const mockProjecao: ProjecaoMensal[] = [
      { 
        mes: 'Set/25', 
        receitasPrevistas: 95000, 
        receitasRealizadas: 87500,
        despesasPrevistas: 65000,
        despesasRealizadas: 61200,
        fluxoCaixa: 26300
      },
      { 
        mes: 'Out/25', 
        receitasPrevistas: 105000, 
        receitasRealizadas: 82000,
        despesasPrevistas: 70000,
        despesasRealizadas: 45000,
        fluxoCaixa: 37000
      },
      { 
        mes: 'Nov/25', 
        receitasPrevistas: 110000, 
        receitasRealizadas: 0,
        despesasPrevistas: 75000,
        despesasRealizadas: 0,
        fluxoCaixa: 35000
      },
      { 
        mes: 'Dez/25', 
        receitasPrevistas: 125000, 
        receitasRealizadas: 0,
        despesasPrevistas: 85000,
        despesasRealizadas: 0,
        fluxoCaixa: 40000
      }
    ]

    setTimeout(() => {
      setTransacoes(mockTransacoes)
      setBudgets(mockBudgets)
      setCentrosCusto(mockCentrosCusto)
      setAlertasFinanceiros(mockAlertas)
      setProjecaoMensal(mockProjecao)
      setLoading(false)
    }, 800)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAGO': return '#10b981'
      case 'PENDENTE': return '#f59e0b'
      case 'VENCIDO': return '#ef4444'
      case 'CANCELADO': return '#6b7280'
      default: return '#64748b'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PAGO': return CheckCircle
      case 'PENDENTE': return Clock
      case 'VENCIDO': return AlertCircle
      case 'CANCELADO': return ArrowDownRight
      default: return Calendar
    }
  }

  const getTipoColor = (tipo: string) => {
    return tipo === 'RECEITA' ? '#10b981' : '#ef4444'
  }

  const getTipoIcon = (tipo: string) => {
    return tipo === 'RECEITA' ? ArrowUpRight : ArrowDownRight
  }

  const getAlertColor = (tipo: string) => {
    switch (tipo) {
      case 'danger': return '#ef4444'
      case 'warning': return '#f59e0b'
      case 'success': return '#10b981'
      case 'info': return '#3b82f6'
      default: return '#64748b'
    }
  }

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'ALTA': return '#ef4444'
      case 'MEDIA': return '#f59e0b'
      case 'BAIXA': return '#10b981'
      default: return '#64748b'
    }
  }

  const filteredTransacoes = transacoes.filter(transacao => {
    const matchesSearch = transacao.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (transacao.fornecedor && transacao.fornecedor.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (transacao.cliente && transacao.cliente.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesTipo = tipoFilter === 'todos' || transacao.tipo === tipoFilter
    const matchesCategoria = categoriaFilter === 'todas' || transacao.categoria === categoriaFilter
    const matchesStatus = statusFilter === 'todos' || transacao.status === statusFilter
    const matchesUnidade = unidadeFilter === 'todas' || transacao.unidade.toLowerCase().includes(unidadeFilter.toLowerCase())
    
    return matchesSearch && matchesTipo && matchesCategoria && matchesStatus && matchesUnidade
  })

  const itemsPerPage = 8
  const totalPages = Math.ceil(filteredTransacoes.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedTransacoes = filteredTransacoes.slice(startIndex, startIndex + itemsPerPage)

  // Cálculos financeiros
  const totalReceitas = transacoes.filter(t => t.tipo === 'RECEITA' && t.status === 'PAGO').reduce((acc, t) => acc + t.valor, 0)
  const totalDespesas = transacoes.filter(t => t.tipo === 'DESPESA' && t.status === 'PAGO').reduce((acc, t) => acc + t.valor, 0)
  const receitasPendentes = transacoes.filter(t => t.tipo === 'RECEITA' && t.status === 'PENDENTE').reduce((acc, t) => acc + t.valor, 0)
  const despesasPendentes = transacoes.filter(t => t.tipo === 'DESPESA' && (t.status === 'PENDENTE' || t.status === 'VENCIDO')).reduce((acc, t) => acc + t.valor, 0)
  const lucroLiquido = totalReceitas - totalDespesas
  const margemLucro = totalReceitas > 0 ? ((lucroLiquido / totalReceitas) * 100) : 0
  const fluxoCaixaProjetado = totalReceitas + receitasPendentes - totalDespesas - despesasPendentes

  const alertasCount = alertasFinanceiros.length
  const alertasAlta = alertasFinanceiros.filter(a => a.prioridade === 'ALTA').length
  const contasVencidas = transacoes.filter(t => t.status === 'VENCIDO').length

  return (
    <DashboardLayout>
      <div style={{ padding: '24px', maxWidth: '100%', overflow: 'hidden' }}>
        {/* Header com navegação */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h1 style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: colors.text.primary,
                margin: '0 0 8px 0',
                transition: 'color 0.3s ease'
              }}>
                Centro Financeiro
              </h1>
              <p style={{
                fontSize: '16px',
                color: colors.text.secondary,
                margin: 0,
                transition: 'color 0.3s ease'
              }}>
                Gestão completa e analytics financeiros em tempo real
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button style={{
                padding: '8px 12px',
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
                <RefreshCw style={{ width: '16px', height: '16px' }} />
                Atualizar
              </button>
              
              <button style={{
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
                boxShadow: '0 4px 12px rgba(139, 92, 246, 0.25)',
                transition: 'all 0.3s ease'
              }}>
                <Plus style={{ width: '18px', height: '18px' }} />
                Nova Transação
              </button>
            </div>
          </div>

          {/* Navigation Pills */}
          <div style={{ 
            display: 'flex', 
            gap: '8px',
            padding: '8px',
            backgroundColor: colors.bg.tertiary,
            borderRadius: '12px',
            marginBottom: '8px'
          }}>
            {[
              { key: 'dashboard', label: 'Dashboard', icon: Activity },
              { key: 'transacoes', label: 'Transações', icon: Calculator },
              { key: 'budget', label: 'Budget', icon: Target },
              { key: 'centros-custo', label: 'Centros Custo', icon: Building2 },
              { key: 'alertas', label: 'Alertas', icon: Bell },
              { key: 'relatorios', label: 'Relatórios', icon: FileText }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setViewMode(key as any)}
                style={{
                  padding: '12px 16px',
                  backgroundColor: viewMode === key ? colors.brand.primary : 'transparent',
                  color: viewMode === key ? 'white' : colors.text.primary,
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
              >
                <Icon style={{ width: '16px', height: '16px' }} />
                {label}
                {key === 'alertas' && alertasAlta > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '6px',
                    right: '6px',
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#ef4444',
                    borderRadius: '50%'
                  }} />
                )}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{
            ...getCardStyle(),
            padding: '80px',
            textAlign: 'center'
          }}>
            <Activity style={{ 
              width: '64px', 
              height: '64px', 
              color: colors.text.tertiary, 
              margin: '0 auto 24px',
              animation: 'pulse 2s infinite'
            }} />
            <p style={{ 
              color: colors.text.secondary, 
              fontSize: '18px', 
              margin: 0,
              fontWeight: '500'
            }}>
              Carregando dados financeiros...
            </p>
          </div>
        ) : (
          <>
            {/* Dashboard View */}
            {viewMode === 'dashboard' && (
              <div style={{ display: 'grid', gap: '24px' }}>
                {/* KPIs Principais */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    borderRadius: '16px',
                    padding: '24px',
                    color: 'white',
                    boxShadow: '0 8px 25px rgba(16, 185, 129, 0.25)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{ position: 'absolute', top: '16px', right: '16px', opacity: 0.3 }}>
                      <ArrowUpRight style={{ width: '32px', height: '32px' }} />
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9, fontWeight: '500' }}>Total Receitas</h3>
                    </div>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>
                      R$ {totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                    <div style={{ fontSize: '13px', opacity: 0.8 }}>
                      + R$ {receitasPendentes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} pendentes
                    </div>
                  </div>

                  <div style={{
                    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                    borderRadius: '16px',
                    padding: '24px',
                    color: 'white',
                    boxShadow: '0 8px 25px rgba(239, 68, 68, 0.25)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{ position: 'absolute', top: '16px', right: '16px', opacity: 0.3 }}>
                      <ArrowDownRight style={{ width: '32px', height: '32px' }} />
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9, fontWeight: '500' }}>Total Despesas</h3>
                    </div>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>
                      R$ {totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                    <div style={{ fontSize: '13px', opacity: 0.8 }}>
                      + R$ {despesasPendentes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} pendentes
                    </div>
                  </div>

                  <div style={{
                    background: colors.brand.gradient,
                    borderRadius: '16px',
                    padding: '24px',
                    color: 'white',
                    boxShadow: '0 8px 25px rgba(139, 92, 246, 0.25)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{ position: 'absolute', top: '16px', right: '16px', opacity: 0.3 }}>
                      <TrendingUp style={{ width: '32px', height: '32px' }} />
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9, fontWeight: '500' }}>Lucro Líquido</h3>
                    </div>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px', color: lucroLiquido >= 0 ? 'white' : '#fecaca' }}>
                      R$ {lucroLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                    <div style={{ fontSize: '13px', opacity: 0.8 }}>
                      Margem: {margemLucro.toFixed(1)}%
                    </div>
                  </div>

                  <div style={{
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    borderRadius: '16px',
                    padding: '24px',
                    color: 'white',
                    boxShadow: '0 8px 25px rgba(245, 158, 11, 0.25)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{ position: 'absolute', top: '16px', right: '16px', opacity: 0.3 }}>
                      <Wallet style={{ width: '32px', height: '32px' }} />
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9, fontWeight: '500' }}>Fluxo de Caixa</h3>
                    </div>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>
                      R$ {fluxoCaixaProjetado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                    <div style={{ fontSize: '13px', opacity: 0.8 }}>
                      Projeção mensal
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                  <div style={{
                    ...getCardStyle(),
                    padding: '20px',
                    textAlign: 'center',
                    border: alertasCount > 0 ? `2px solid ${colors.brand.primary}` : undefined
                  }}>
                    <Bell style={{ width: '24px', height: '24px', color: colors.brand.primary, margin: '0 auto 8px' }} />
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: colors.text.primary, marginBottom: '4px' }}>
                      {alertasCount}
                    </div>
                    <div style={{ fontSize: '12px', color: colors.text.secondary }}>
                      Alertas Ativos
                    </div>
                  </div>

                  <div style={{
                    ...getCardStyle(),
                    padding: '20px',
                    textAlign: 'center',
                    border: contasVencidas > 0 ? '2px solid #ef4444' : undefined
                  }}>
                    <AlertCircle style={{ width: '24px', height: '24px', color: contasVencidas > 0 ? '#ef4444' : colors.text.tertiary, margin: '0 auto 8px' }} />
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: contasVencidas > 0 ? '#ef4444' : colors.text.primary, marginBottom: '4px' }}>
                      {contasVencidas}
                    </div>
                    <div style={{ fontSize: '12px', color: colors.text.secondary }}>
                      Contas Vencidas
                    </div>
                  </div>

                  <div style={{
                    ...getCardStyle(),
                    padding: '20px',
                    textAlign: 'center'
                  }}>
                    <Calculator style={{ width: '24px', height: '24px', color: colors.brand.primary, margin: '0 auto 8px' }} />
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: colors.text.primary, marginBottom: '4px' }}>
                      {transacoes.length}
                    </div>
                    <div style={{ fontSize: '12px', color: colors.text.secondary }}>
                      Transações
                    </div>
                  </div>

                  <div style={{
                    ...getCardStyle(),
                    padding: '20px',
                    textAlign: 'center'
                  }}>
                    <Building2 style={{ width: '24px', height: '24px', color: colors.brand.primary, margin: '0 auto 8px' }} />
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: colors.text.primary, marginBottom: '4px' }}>
                      {centrosCusto.length}
                    </div>
                    <div style={{ fontSize: '12px', color: colors.text.secondary }}>
                      Centros Custo
                    </div>
                  </div>
                </div>

                {/* Alertas Críticos e Projeção */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  {/* Alertas Críticos */}
                  <div style={{
                    ...getCardStyle(),
                    padding: '24px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: '600', color: colors.text.primary, margin: 0 }}>
                        🚨 Alertas Críticos
                      </h3>
                      <button
                        onClick={() => setViewMode('alertas')}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: 'transparent',
                          color: colors.brand.primary,
                          border: `1px solid ${colors.brand.primary}`,
                          borderRadius: '6px',
                          fontSize: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        Ver Todos
                      </button>
                    </div>
                    
                    <div style={{ display: 'grid', gap: '12px' }}>
                      {alertasFinanceiros.slice(0, 4).map((alerta) => (
                        <div
                          key={alerta.id}
                          style={{
                            padding: '16px',
                            backgroundColor: `${getAlertColor(alerta.tipo)}10`,
                            borderLeft: `4px solid ${getAlertColor(alerta.tipo)}`,
                            borderRadius: '8px'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                            <div style={{ flex: 1 }}>
                              <h4 style={{ fontSize: '14px', fontWeight: '600', color: colors.text.primary, margin: '0 0 4px 0' }}>
                                {alerta.titulo}
                              </h4>
                              <p style={{ fontSize: '13px', color: colors.text.secondary, margin: '0 0 8px 0' }}>
                                {alerta.descricao}
                              </p>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                {alerta.valor && (
                                  <span style={{ fontSize: '12px', fontWeight: '600', color: getAlertColor(alerta.tipo) }}>
                                    R$ {alerta.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                  </span>
                                )}
                                {alerta.dataVencimento && (
                                  <span style={{ fontSize: '11px', color: colors.text.tertiary }}>
                                    {alerta.dataVencimento}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div style={{
                              padding: '4px 8px',
                              backgroundColor: `${getPrioridadeColor(alerta.prioridade)}20`,
                              color: getPrioridadeColor(alerta.prioridade),
                              borderRadius: '4px',
                              fontSize: '10px',
                              fontWeight: '600',
                              marginLeft: '8px'
                            }}>
                              {alerta.prioridade}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Projeção Fluxo de Caixa */}
                  <div style={{
                    ...getCardStyle(),
                    padding: '24px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: '600', color: colors.text.primary, margin: 0 }}>
                        📈 Projeção 4 Meses
                      </h3>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <div style={{ width: '12px', height: '12px', backgroundColor: '#10b981', borderRadius: '2px' }} />
                          <span style={{ fontSize: '11px', color: colors.text.secondary }}>Receitas</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <div style={{ width: '12px', height: '12px', backgroundColor: '#ef4444', borderRadius: '2px' }} />
                          <span style={{ fontSize: '11px', color: colors.text.secondary }}>Despesas</span>
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ display: 'grid', gap: '16px' }}>
                      {projecaoMensal.map((projecao, index) => (
                        <div key={projecao.mes}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontSize: '14px', fontWeight: '500', color: colors.text.primary }}>
                              {projecao.mes}
                            </span>
                            <span style={{ 
                              fontSize: '14px', 
                              fontWeight: '600', 
                              color: projecao.fluxoCaixa >= 0 ? '#10b981' : '#ef4444' 
                            }}>
                              R$ {projecao.fluxoCaixa.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}k
                            </span>
                          </div>
                          
                          <div style={{ marginBottom: '4px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                              <span style={{ fontSize: '11px', color: colors.text.secondary }}>
                                Receitas: R$ {(projecao.receitasRealizadas || projecao.receitasPrevistas).toLocaleString('pt-BR', { minimumFractionDigits: 0 })}k
                              </span>
                              <span style={{ fontSize: '10px', color: index < 2 ? '#10b981' : colors.text.tertiary }}>
                                {index < 2 ? 'Realizado' : 'Previsto'}
                              </span>
                            </div>
                            <div style={{
                              width: '100%',
                              height: '6px',
                              backgroundColor: colors.bg.tertiary,
                              borderRadius: '3px',
                              marginBottom: '4px'
                            }}>
                              <div style={{
                                width: `${Math.min((projecao.receitasRealizadas || projecao.receitasPrevistas) / 125000 * 100, 100)}%`,
                                height: '100%',
                                backgroundColor: index < 2 ? '#10b981' : '#10b98150',
                                borderRadius: '3px'
                              }} />
                            </div>
                          </div>

                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                              <span style={{ fontSize: '11px', color: colors.text.secondary }}>
                                Despesas: R$ {(projecao.despesasRealizadas || projecao.despesasPrevistas).toLocaleString('pt-BR', { minimumFractionDigits: 0 })}k
                              </span>
                            </div>
                            <div style={{
                              width: '100%',
                              height: '6px',
                              backgroundColor: colors.bg.tertiary,
                              borderRadius: '3px'
                            }}>
                              <div style={{
                                width: `${Math.min((projecao.despesasRealizadas || projecao.despesasPrevistas) / 85000 * 100, 100)}%`,
                                height: '100%',
                                backgroundColor: index < 2 ? '#ef4444' : '#ef444450',
                                borderRadius: '3px'
                              }} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Outras views continuam... (transacoes, budget, etc.) */}
            {viewMode === 'transacoes' && (
              <div style={{ display: 'grid', gap: '20px' }}>
                {/* Filters para transações */}
                <div style={{
                  ...getCardStyle(),
                  padding: '20px'
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', alignItems: 'end' }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: '500',
                        color: colors.text.secondary,
                        marginBottom: '6px'
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
                          placeholder="Descrição, fornecedor..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '10px 12px 10px 36px',
                            border: `1px solid ${colors.border.primary}`,
                            borderRadius: '8px',
                            backgroundColor: colors.bg.tertiary,
                            color: colors.text.primary,
                            fontSize: '14px'
                          }}
                        />
                      </div>
                    </div>

                    {['Tipo', 'Status', 'Categoria'].map((filterName) => (
                      <div key={filterName}>
                        <label style={{
                          display: 'block',
                          fontSize: '12px',
                          fontWeight: '500',
                          color: colors.text.secondary,
                          marginBottom: '6px'
                        }}>
                          {filterName}
                        </label>
                        <select style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: `1px solid ${colors.border.primary}`,
                          borderRadius: '8px',
                          backgroundColor: colors.bg.tertiary,
                          color: colors.text.primary,
                          fontSize: '14px',
                          cursor: 'pointer'
                        }}>
                          <option>{filterName === 'Tipo' ? 'Todos' : filterName === 'Status' ? 'Todos' : 'Todas'}</option>
                        </select>
                      </div>
                    ))}

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
                      justifyContent: 'center'
                    }}>
                      <Download style={{ width: '16px', height: '16px' }} />
                      Exportar
                    </button>
                  </div>
                </div>

                {/* Lista de Transações */}
                <div style={{ display: 'grid', gap: '12px' }}>
                  {paginatedTransacoes.map((transacao) => {
                    const StatusIcon = getStatusIcon(transacao.status)
                    const TipoIcon = getTipoIcon(transacao.tipo)
                    
                    return (
                      <div
                        key={transacao.id}
                        style={{
                          ...getCardStyle(),
                          padding: '20px',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                            <div style={{
                              width: '48px',
                              height: '48px',
                              borderRadius: '12px',
                              backgroundColor: `${getTipoColor(transacao.tipo)}15`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}>
                              <TipoIcon style={{ width: '24px', height: '24px', color: getTipoColor(transacao.tipo) }} />
                            </div>
                            
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                <h3 style={{
                                  fontSize: '16px',
                                  fontWeight: '600',
                                  color: colors.text.primary,
                                  margin: 0,
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis'
                                }}>
                                  {transacao.descricao}
                                </h3>
                                
                                <span style={{
                                  padding: '2px 6px',
                                  borderRadius: '4px',
                                  fontSize: '10px',
                                  fontWeight: '600',
                                  backgroundColor: `${colors.brand.primary}20`,
                                  color: colors.brand.primary,
                                  flexShrink: 0
                                }}>
                                  {transacao.id}
                                </span>
                              </div>

                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                                <span style={{
                                  padding: '4px 8px',
                                  borderRadius: '6px',
                                  fontSize: '11px',
                                  fontWeight: '500',
                                  backgroundColor: `${getTipoColor(transacao.tipo)}15`,
                                  color: getTipoColor(transacao.tipo)
                                }}>
                                  {transacao.categoria}
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

                                <span style={{ fontSize: '12px', color: colors.text.secondary }}>
                                  {transacao.data}
                                </span>

                                <span style={{ fontSize: '12px', color: colors.text.tertiary }}>
                                  {transacao.formaPagamento}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0 }}>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: getTipoColor(transacao.tipo)
                              }}>
                                {transacao.tipo === 'RECEITA' ? '+' : '-'} R$ {transacao.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                              </div>
                              <div style={{ fontSize: '12px', color: colors.text.secondary }}>
                                {transacao.unidade.length > 20 ? transacao.unidade.substring(0, 20) + '...' : transacao.unidade}
                              </div>
                            </div>

                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button style={{
                                padding: '8px',
                                backgroundColor: colors.bg.tertiary,
                                border: `1px solid ${colors.border.primary}`,
                                borderRadius: '8px',
                                color: colors.text.primary,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                              }}>
                                <Eye style={{ width: '16px', height: '16px' }} />
                              </button>
                              <button style={{
                                padding: '8px',
                                backgroundColor: colors.bg.tertiary,
                                border: `1px solid ${colors.border.primary}`,
                                borderRadius: '8px',
                                color: colors.text.primary,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                              }}>
                                <Edit3 style={{ width: '16px', height: '16px' }} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Budget View */}
            {viewMode === 'budget' && (
              <div style={{ display: 'grid', gap: '24px' }}>
                <div style={{
                  ...getCardStyle(),
                  padding: '24px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '600', color: colors.text.primary, margin: 0 }}>
                      💰 Controle Orçamentário - Outubro 2025
                    </h3>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button style={{
                        padding: '8px 12px',
                        backgroundColor: colors.bg.tertiary,
                        border: `1px solid ${colors.border.primary}`,
                        borderRadius: '6px',
                        color: colors.text.primary,
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}>
                        Editar Orçamento
                      </button>
                      <button style={{
                        padding: '8px 12px',
                        backgroundColor: colors.brand.primary,
                        border: 'none',
                        borderRadius: '6px',
                        color: 'white',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}>
                        Exportar PDF
                      </button>
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gap: '20px' }}>
                    {budgets.map((budget) => (
                      <div key={budget.categoria} style={{
                        padding: '20px',
                        backgroundColor: colors.bg.tertiary,
                        borderRadius: '12px',
                        transition: 'all 0.3s ease'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                          <div>
                            <h4 style={{ fontSize: '16px', fontWeight: '600', color: colors.text.primary, margin: '0 0 4px 0' }}>
                              {budget.categoria}
                            </h4>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontSize: '14px', color: colors.text.secondary }}>
                                R$ {budget.realizado.toLocaleString('pt-BR')} / R$ {budget.orcado.toLocaleString('pt-BR')}
                              </span>
                              <span style={{
                                fontSize: '12px',
                                fontWeight: '600',
                                color: budget.variacao >= 0 ? '#10b981' : '#ef4444',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}>
                                {budget.variacao >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                {budget.variacao >= 0 ? '+' : ''}R$ {budget.variacao.toLocaleString('pt-BR')}
                              </span>
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{
                              fontSize: '20px',
                              fontWeight: 'bold',
                              color: budget.porcentagem >= 100 ? '#ef4444' : budget.porcentagem >= 80 ? '#f59e0b' : '#10b981'
                            }}>
                              {budget.porcentagem.toFixed(1)}%
                            </div>
                            <div style={{
                              fontSize: '12px',
                              color: colors.text.secondary,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              justifyContent: 'flex-end'
                            }}>
                              {budget.tendencia === 'up' && <TrendingUp size={12} color="#10b981" />}
                              {budget.tendencia === 'down' && <TrendingDown size={12} color="#ef4444" />}
                              {budget.tendencia === 'stable' && <Activity size={12} color="#f59e0b" />}
                              Tendência
                            </div>
                          </div>
                        </div>
                        
                        <div style={{
                          width: '100%',
                          height: '12px',
                          backgroundColor: colors.bg.secondary,
                          borderRadius: '6px',
                          overflow: 'hidden',
                          position: 'relative'
                        }}>
                          <div style={{
                            width: `${Math.min(budget.porcentagem, 100)}%`,
                            height: '100%',
                            background: budget.porcentagem >= 100 
                              ? 'linear-gradient(90deg, #ef4444, #dc2626)' 
                              : budget.porcentagem >= 80 
                                ? 'linear-gradient(90deg, #f59e0b, #d97706)' 
                                : 'linear-gradient(90deg, #10b981, #059669)',
                            borderRadius: '6px',
                            transition: 'all 0.5s ease'
                          }} />
                          {budget.porcentagem > 100 && (
                            <div style={{
                              position: 'absolute',
                              right: '8px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              fontSize: '10px',
                              fontWeight: 'bold',
                              color: 'white'
                            }}>
                              EXCEDIDO
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Centros de Custo View */}
            {viewMode === 'centros-custo' && (
              <div style={{ display: 'grid', gap: '20px' }}>
                <div style={{
                  ...getCardStyle(),
                  padding: '24px'
                }}>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', color: colors.text.primary, marginBottom: '24px' }}>
                    🏢 Performance por Centro de Custo
                  </h3>
                  
                  <div style={{ display: 'grid', gap: '20px' }}>
                    {centrosCusto.map((centro) => (
                      <div key={centro.nome} style={{
                        padding: '24px',
                        backgroundColor: colors.bg.tertiary,
                        borderRadius: '12px',
                        border: `1px solid ${colors.border.primary}`
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                          <h4 style={{ fontSize: '16px', fontWeight: '600', color: colors.text.primary, margin: 0 }}>
                            {centro.nome}
                          </h4>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '600',
                            backgroundColor: centro.lucro >= centro.meta ? '#10b98120' : '#f59e0b20',
                            color: centro.lucro >= centro.meta ? '#10b981' : '#f59e0b'
                          }}>
                            {centro.lucro >= centro.meta ? '✅ Meta Atingida' : '⏳ Abaixo da Meta'}
                          </span>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '16px' }}>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981', marginBottom: '4px' }}>
                              R$ {centro.receitas.toLocaleString('pt-BR')}
                            </div>
                            <div style={{ fontSize: '12px', color: colors.text.secondary }}>Receitas</div>
                          </div>
                          
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#ef4444', marginBottom: '4px' }}>
                              R$ {centro.despesas.toLocaleString('pt-BR')}
                            </div>
                            <div style={{ fontSize: '12px', color: colors.text.secondary }}>Despesas</div>
                          </div>
                          
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: colors.text.primary, marginBottom: '4px' }}>
                              R$ {centro.lucro.toLocaleString('pt-BR')}
                            </div>
                            <div style={{ fontSize: '12px', color: colors.text.secondary }}>Lucro</div>
                          </div>
                          
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: colors.brand.primary, marginBottom: '4px' }}>
                              {centro.margem.toFixed(1)}%
                            </div>
                            <div style={{ fontSize: '12px', color: colors.text.secondary }}>Margem</div>
                          </div>
                        </div>
                        
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <span style={{ fontSize: '12px', color: colors.text.secondary }}>
                              Progresso da Meta: R$ {centro.lucro.toLocaleString('pt-BR')} / R$ {centro.meta.toLocaleString('pt-BR')}
                            </span>
                            <span style={{ fontSize: '12px', fontWeight: '600', color: colors.text.primary }}>
                              {((centro.lucro / centro.meta) * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div style={{
                            width: '100%',
                            height: '8px',
                            backgroundColor: colors.bg.secondary,
                            borderRadius: '4px',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              width: `${Math.min((centro.lucro / centro.meta) * 100, 100)}%`,
                              height: '100%',
                              background: centro.lucro >= centro.meta 
                                ? 'linear-gradient(90deg, #10b981, #059669)' 
                                : 'linear-gradient(90deg, #f59e0b, #d97706)',
                              borderRadius: '4px',
                              transition: 'width 0.5s ease'
                            }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Alertas View */}
            {viewMode === 'alertas' && (
              <div style={{ display: 'grid', gap: '20px' }}>
                <div style={{
                  ...getCardStyle(),
                  padding: '24px'
                }}>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', color: colors.text.primary, marginBottom: '24px' }}>
                    🔔 Central de Alertas Financeiros
                  </h3>
                  
                  <div style={{ display: 'grid', gap: '16px' }}>
                    {alertasFinanceiros.map((alerta) => (
                      <div
                        key={alerta.id}
                        style={{
                          padding: '20px',
                          backgroundColor: `${getAlertColor(alerta.tipo)}08`,
                          borderLeft: `4px solid ${getAlertColor(alerta.tipo)}`,
                          borderRadius: '12px',
                          border: `1px solid ${getAlertColor(alerta.tipo)}20`
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                              <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '8px',
                                backgroundColor: getAlertColor(alerta.tipo),
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                {alerta.tipo === 'danger' && <AlertCircle style={{ width: '18px', height: '18px', color: 'white' }} />}
                                {alerta.tipo === 'warning' && <Clock style={{ width: '18px', height: '18px', color: 'white' }} />}
                                {alerta.tipo === 'success' && <CheckCircle style={{ width: '18px', height: '18px', color: 'white' }} />}
                                {alerta.tipo === 'info' && <Info style={{ width: '18px', height: '18px', color: 'white' }} />}
                              </div>
                              
                              <div>
                                <h4 style={{ fontSize: '16px', fontWeight: '600', color: colors.text.primary, margin: '0 0 4px 0' }}>
                                  {alerta.titulo}
                                </h4>
                                <p style={{ fontSize: '14px', color: colors.text.secondary, margin: 0 }}>
                                  {alerta.descricao}
                                </p>
                              </div>
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                              {alerta.valor && (
                                <span style={{ 
                                  fontSize: '14px', 
                                  fontWeight: '700',
                                  color: getAlertColor(alerta.tipo),
                                  backgroundColor: `${getAlertColor(alerta.tipo)}15`,
                                  padding: '4px 8px',
                                  borderRadius: '6px'
                                }}>
                                  R$ {alerta.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </span>
                              )}
                              {alerta.dataVencimento && (
                                <span style={{ fontSize: '12px', color: colors.text.tertiary, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <CalendarIcon style={{ width: '14px', height: '14px' }} />
                                  {alerta.dataVencimento}
                                </span>
                              )}
                              <span style={{
                                padding: '4px 8px',
                                backgroundColor: `${getPrioridadeColor(alerta.prioridade)}20`,
                                color: getPrioridadeColor(alerta.prioridade),
                                borderRadius: '6px',
                                fontSize: '11px',
                                fontWeight: '600'
                              }}>
                                {alerta.prioridade}
                              </span>
                            </div>
                          </div>
                          
                          <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
                            <button style={{
                              padding: '8px 12px',
                              backgroundColor: getAlertColor(alerta.tipo),
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              fontSize: '12px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease'
                            }}>
                              Resolver
                            </button>
                            <button style={{
                              padding: '8px',
                              backgroundColor: colors.bg.tertiary,
                              border: `1px solid ${colors.border.primary}`,
                              borderRadius: '6px',
                              color: colors.text.secondary,
                              cursor: 'pointer',
                              transition: 'all 0.3s ease'
                            }}>
                              <Settings style={{ width: '16px', height: '16px' }} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Relatórios View */}
            {viewMode === 'relatorios' && (
              <div style={{ display: 'grid', gap: '20px' }}>
                <div style={{
                  ...getCardStyle(),
                  padding: '24px'
                }}>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', color: colors.text.primary, marginBottom: '24px' }}>
                    📊 Relatórios Executivos
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                    {[
                      { 
                        titulo: 'DRE - Demonstração Resultado',
                        descricao: 'Relatório completo de receitas e despesas',
                        icone: FileText,
                        cor: '#10b981'
                      },
                      { 
                        titulo: 'Fluxo de Caixa Projetado',
                        descricao: 'Projeções financeiras próximos 6 meses',
                        icone: TrendingUp,
                        cor: '#3b82f6'
                      },
                      { 
                        titulo: 'Performance por Centro Custo',
                        descricao: 'Análise detalhada por unidade de negócio',
                        icone: Building2,
                        cor: '#f59e0b'
                      },
                      { 
                        titulo: 'Budget vs Realizado',
                        descricao: 'Comparativo orçamento x execução',
                        icone: Target,
                        cor: '#8b5cf6'
                      }
                    ].map((relatorio, index) => (
                      <div key={index} style={{
                        padding: '24px',
                        backgroundColor: colors.bg.tertiary,
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        border: `1px solid ${colors.border.primary}`
                      }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
                          <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '12px',
                            backgroundColor: `${relatorio.cor}15`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <relatorio.icone style={{ width: '24px', height: '24px', color: relatorio.cor }} />
                          </div>
                          
                          <div style={{ flex: 1 }}>
                            <h4 style={{ fontSize: '16px', fontWeight: '600', color: colors.text.primary, margin: '0 0 8px 0' }}>
                              {relatorio.titulo}
                            </h4>
                            <p style={{ fontSize: '14px', color: colors.text.secondary, margin: 0 }}>
                              {relatorio.descricao}
                            </p>
                          </div>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button style={{
                            flex: 1,
                            padding: '8px 16px',
                            backgroundColor: relatorio.cor,
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}>
                            Gerar Relatório
                          </button>
                          <button style={{
                            padding: '8px 12px',
                            backgroundColor: colors.bg.secondary,
                            border: `1px solid ${colors.border.primary}`,
                            borderRadius: '6px',
                            color: colors.text.secondary,
                            fontSize: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}>
                            <Download style={{ width: '14px', height: '14px' }} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  )
}
