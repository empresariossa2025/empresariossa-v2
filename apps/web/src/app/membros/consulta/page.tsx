"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useState, useEffect } from "react"
import { useThemedStyles } from "@/hooks/use-themed-styles"
import { 
  UserPlus, 
  Plus,
  Search,
  Filter,
  Users,
  Calendar,
  Eye,
  Edit3,
  Trash2,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Star,
  ChevronLeft,
  ChevronRight,
  Building,
  User,
  Award,
  TrendingUp
} from "lucide-react"

interface Membro {
  id: string
  nome: string
  cpf: string
  celular: string
  email: string
  unidade: string
  plano: 'Plano Anual' | 'Semestral'
  pontuacao: number
  status: 'Ativo e em dia' | 'Inativo' | 'Pendente'
  dataCadastro: string
  dataAtivacao: string
  ramoNegocio: string
  avatar?: string
}

export default function ConsultaCadastroPage() {
  const [membros, setMembros] = useState<Membro[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('todos')
  const [planoFilter, setPlanoFilter] = useState('todos')
  const [unidadeFilter, setUnidadeFilter] = useState('todas')
  const [currentPage, setCurrentPage] = useState(1)
  const { colors, getCardStyle } = useThemedStyles()

  useEffect(() => {
    // Mock data baseado nos membros do sistema existente
    const mockMembros: Membro[] = [
      {
        id: '142',
        nome: 'Adenias Filho',
        cpf: '758.323.218-04',
        celular: '(21) 96912-1170',
        email: 'a.goncalves@brexperts.com.br',
        unidade: 'Unidade Nova América - Del Castilho - Rio de Janeiro - RJ',
        plano: 'Plano Anual',
        pontuacao: 0,
        status: 'Ativo e em dia',
        dataCadastro: '29/11/2024 - 09:03',
        dataAtivacao: '-',
        ramoNegocio: 'Consultoria'
      },
      {
        id: '197',
        nome: 'Adryelle Ferrer',
        cpf: '136.555.137-71',
        celular: '(21) 99443-6736',
        email: 'adryelleivest@gmail.com',
        unidade: 'Matriz - Barra da Tijuca - Rio de Janeiro/RJ',
        plano: 'Plano Anual',
        pontuacao: 0,
        status: 'Ativo e em dia',
        dataCadastro: '22/04/2025 - 20:41',
        dataAtivacao: '-',
        ramoNegocio: 'Investimentos'
      },
      {
        id: '131',
        nome: 'Agencia Pacific Lead',
        cpf: '140.239.077-74',
        celular: '(21) 97720-8981',
        email: 'wandreytratego@gmail.com',
        unidade: 'Empresários SA Conexão Brasil',
        plano: 'Plano Anual',
        pontuacao: 0,
        status: 'Ativo e em dia',
        dataCadastro: '30/10/2024 - 11:48',
        dataAtivacao: '-',
        ramoNegocio: 'Marketing Digital'
      },
      {
        id: '192',
        nome: 'Alessander',
        cpf: '013.840.717-76',
        celular: '(21) 98234-6808',
        email: 'alessander.antunes@icloud.com',
        unidade: 'Matriz - Barra da Tijuca - Rio de Janeiro/RJ',
        plano: 'Plano Anual',
        pontuacao: 0,
        status: 'Ativo e em dia',
        dataCadastro: '26/03/2025 - 22:32',
        dataAtivacao: '-',
        ramoNegocio: 'Tecnologia'
      },
      {
        id: '93',
        nome: 'Alessandro Schlomer',
        cpf: '092.984.427-17',
        celular: '(21) 98789-1807',
        email: 'alessandro@potencer.com.br',
        unidade: 'Matriz - Barra da Tijuca - Rio de Janeiro/RJ',
        plano: 'Plano Anual',
        pontuacao: 0,
        status: 'Ativo e em dia',
        dataCadastro: '28/09/2024 - 20:34',
        dataAtivacao: '-',
        ramoNegocio: 'Desenvolvimento'
      },
      {
        id: '159',
        nome: 'Lex - Pipoca e Guaraná',
        cpf: '052.349.847-02',
        celular: '(21) 97988-3034',
        email: 'pipocaeguarana.oficial@gmail.com',
        unidade: 'Matriz - Barra da Tijuca - Rio de Janeiro/RJ',
        plano: 'Plano Anual',
        pontuacao: 0,
        status: 'Ativo e em dia',
        dataCadastro: '21/01/2025 - 16:02',
        dataAtivacao: '-',
        ramoNegocio: 'Alimentação'
      },
      {
        id: '138',
        nome: 'Aline',
        cpf: '108.314.387-54',
        celular: '(21) 99610-2081',
        email: 'aline@atofiscal.com.br',
        unidade: 'Unidade Nova América - Del Castilho - Rio de Janeiro - RJ',
        plano: 'Plano Anual',
        pontuacao: 0,
        status: 'Ativo e em dia',
        dataCadastro: '08/11/2024 - 13:13',
        dataAtivacao: '-',
        ramoNegocio: 'Contabilidade'
      },
      {
        id: '193',
        nome: 'Aline Fox',
        cpf: '134.085.307-85',
        celular: '(21) 98098-9022',
        email: 'contato@alinefox.com.br',
        unidade: 'Empresários SA Conexão Brasil',
        plano: 'Plano Anual',
        pontuacao: 0,
        status: 'Ativo e em dia',
        dataCadastro: '04/04/2025 - 18:15',
        dataAtivacao: '-',
        ramoNegocio: 'Consultoria'
      },
      {
        id: '149',
        nome: 'Amada',
        cpf: '084.196.057-78',
        celular: '(21) 99989-9475',
        email: 'amadazambrana@yahoo.com.br',
        unidade: 'Matriz - Barra da Tijuca - Rio de Janeiro/RJ',
        plano: 'Plano Anual',
        pontuacao: 0,
        status: 'Ativo e em dia',
        dataCadastro: '06/12/2024 - 15:17',
        dataAtivacao: '-',
        ramoNegocio: 'Serviços'
      },
      {
        id: '124',
        nome: 'Bernardo',
        cpf: '058.777.757-58',
        celular: '(21) 96553-6348',
        email: 'bernardo@bernardodesigner.com',
        unidade: 'Matriz - Barra da Tijuca - Rio de Janeiro/RJ',
        plano: 'Semestral',
        pontuacao: 0,
        status: 'Ativo e em dia',
        dataCadastro: '17/10/2024 - 09:25',
        dataAtivacao: '-',
        ramoNegocio: 'Design'
      }
    ]

    setTimeout(() => {
      setMembros(mockMembros)
      setLoading(false)
    }, 500)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo e em dia': return '#10b981'
      case 'Inativo': return '#6b7280'
      case 'Pendente': return '#f59e0b'
      default: return '#64748b'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Ativo e em dia': return 'Ativo'
      case 'Inativo': return 'Inativo'
      case 'Pendente': return 'Pendente'
      default: return status
    }
  }

  const getPlanoColor = (plano: string) => {
    switch (plano) {
      case 'Plano Anual': return '#8b5cf6'
      case 'Semestral': return '#3b82f6'
      default: return '#64748b'
    }
  }

  const getInitials = (nome: string) => {
    return nome.split(' ').map(n => n.charAt(0)).join('').substring(0, 2).toUpperCase()
  }

  const filteredMembros = membros.filter(membro => {
    const matchesSearch = membro.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         membro.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         membro.cpf.includes(searchTerm) ||
                         membro.celular.includes(searchTerm)
    const matchesStatus = statusFilter === 'todos' || membro.status === statusFilter
    const matchesPlano = planoFilter === 'todos' || membro.plano === planoFilter
    const matchesUnidade = unidadeFilter === 'todas' || membro.unidade.includes(unidadeFilter)
    
    return matchesSearch && matchesStatus && matchesPlano && matchesUnidade
  })

  const itemsPerPage = 8
  const totalPages = Math.ceil(filteredMembros.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedMembros = filteredMembros.slice(startIndex, startIndex + itemsPerPage)

  const totalMembros = membros.length
  const membrosAtivos = membros.filter(m => m.status === 'Ativo e em dia').length
  const membrosPlanoAnual = membros.filter(m => m.plano === 'Plano Anual').length
  const mediaPontuacao = membros.length > 0 ? membros.reduce((acc, m) => acc + m.pontuacao, 0) / membros.length : 0

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
              Consulta/Cadastro
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
              Novo Membro
            </button>
          </div>
          <p style={{
            fontSize: '16px',
            color: colors.text.secondary,
            margin: 0,
            transition: 'color 0.3s ease'
          }}>
            Consulte e gerencie membros da rede empresarial
          </p>
        </div>

        {/* Stats Overview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          <div style={{
            background: colors.brand.gradient,
            borderRadius: '12px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <Users style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Total Membros</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{totalMembros}</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            borderRadius: '12px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <TrendingUp style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Ativos</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{membrosAtivos}</div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>
              {Math.round((membrosAtivos / totalMembros) * 100)}% do total
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            borderRadius: '12px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <CreditCard style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Plano Anual</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{membrosPlanoAnual}</div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>
              {Math.round((membrosPlanoAnual / totalMembros) * 100)}% do total
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
              <Award style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Pontuação Média</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{mediaPontuacao.toFixed(0)}</div>
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
                  placeholder="Nome, email, CPF..."
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
                <option value="Ativo e em dia">Ativo e em dia</option>
                <option value="Inativo">Inativo</option>
                <option value="Pendente">Pendente</option>
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
                Plano
              </label>
              <select
                value={planoFilter}
                onChange={(e) => setPlanoFilter(e.target.value)}
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
                <option value="Plano Anual">Plano Anual</option>
                <option value="Semestral">Semestral</option>
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
                Unidade
              </label>
              <select
                value={unidadeFilter}
                onChange={(e) => setUnidadeFilter(e.target.value)}
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
                <option value="Matriz">Matriz - Barra da Tijuca</option>
                <option value="Nova América">Nova América - Del Castilho</option>
                <option value="Conexão Brasil">Empresários SA Conexão Brasil</option>
                <option value="Duque de Caxias">Unidade Duque de Caxias</option>
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

        {/* Membros Grid */}
        {loading ? (
          <div style={{
            ...getCardStyle(),
            padding: '60px',
            textAlign: 'center'
          }}>
            <Users style={{ width: '48px', height: '48px', color: colors.text.tertiary, margin: '0 auto 16px' }} />
            <p style={{ color: colors.text.secondary, fontSize: '16px', margin: 0 }}>
              Carregando membros...
            </p>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              {paginatedMembros.map((membro) => (
                <div
                  key={membro.id}
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
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
                    {/* Avatar */}
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '12px',
                      background: colors.brand.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      flexShrink: 0
                    }}>
                      {getInitials(membro.nome)}
                    </div>

                    {/* Info Principal */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <h3 style={{
                          fontSize: '18px',
                          fontWeight: '600',
                          color: colors.text.primary,
                          margin: 0,
                          truncate: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          transition: 'color 0.3s ease'
                        }}>
                          {membro.nome}
                        </h3>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '500',
                          backgroundColor: `${getStatusColor(membro.status)}15`,
                          color: getStatusColor(membro.status),
                          flexShrink: 0,
                          marginLeft: '8px'
                        }}>
                          {getStatusText(membro.status)}
                        </span>
                      </div>
                      <p style={{
                        fontSize: '12px',
                        color: colors.text.secondary,
                        margin: '0 0 4px 0',
                        fontFamily: 'monospace',
                        transition: 'color 0.3s ease'
                      }}>
                        CPF: {membro.cpf} • ID: {membro.id}
                      </p>
                      <p style={{
                        fontSize: '13px',
                        color: colors.text.secondary,
                        margin: 0,
                        transition: 'color 0.3s ease'
                      }}>
                        {membro.ramoNegocio}
                      </p>
                    </div>
                  </div>

                  {/* Plano */}
                  <div style={{ marginBottom: '16px' }}>
                    <span style={{
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: `${getPlanoColor(membro.plano)}20`,
                      color: getPlanoColor(membro.plano),
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <CreditCard style={{ width: '14px', height: '14px' }} />
                      {membro.plano}
                    </span>
                  </div>

                  {/* Contato */}
                  <div style={{ marginBottom: '16px', display: 'grid', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Phone style={{ width: '14px', height: '14px', color: colors.text.tertiary, flexShrink: 0 }} />
                      <span style={{
                        fontSize: '13px',
                        color: colors.text.primary,
                        transition: 'color 0.3s ease'
                      }}>
                        {membro.celular}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Mail style={{ width: '14px', height: '14px', color: colors.text.tertiary, flexShrink: 0 }} />
                      <span style={{
                        fontSize: '13px',
                        color: colors.text.primary,
                        transition: 'color 0.3s ease',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {membro.email}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <MapPin style={{ width: '14px', height: '14px', color: colors.text.tertiary, flexShrink: 0, marginTop: '2px' }} />
                      <span style={{
                        fontSize: '12px',
                        color: colors.text.secondary,
                        transition: 'color 0.3s ease',
                        lineHeight: '1.3'
                      }}>
                        {membro.unidade}
                      </span>
                    </div>
                  </div>

                  {/* Pontuação */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{
                      padding: '12px',
                      backgroundColor: colors.bg.tertiary,
                      borderRadius: '8px',
                      textAlign: 'center',
                      transition: 'background-color 0.3s ease'
                    }}>
                      <div style={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#f59e0b'
                      }}>
                        {membro.pontuacao}
                      </div>
                      <div style={{
                        fontSize: '11px',
                        color: colors.text.secondary,
                        transition: 'color 0.3s ease'
                      }}>
                        Pontuação
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px' }}>
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
                      Visualizar
                    </button>
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
                    marginTop: '16px', 
                    paddingTop: '12px', 
                    borderTop: `1px solid ${colors.border.primary}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar style={{ width: '12px', height: '12px', color: colors.text.tertiary }} />
                      <span style={{
                        fontSize: '11px',
                        color: colors.text.secondary,
                        transition: 'color 0.3s ease'
                      }}>
                        Cadastro: {membro.dataCadastro.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
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
                Mostrando página {currentPage} de {totalPages}. Total de registros é de {filteredMembros.length}.
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
