"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useState, useEffect } from "react"
import { useThemedStyles } from "@/hooks/use-themed-styles"
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Users, 
  Calendar,
  Edit3, 
  Trash2, 
  Eye,
  Plus,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  Award,
  Clock,
  MoreVertical
} from "lucide-react"

interface Unidade {
  id: string
  nome: string
  cnpj: string
  endereco: {
    rua: string
    bairro: string
    cidade: string
    estado: string
    cep: string
  }
  contato: {
    telefone: string
    email: string
    responsavel: string
  }
  stats: {
    totalMembros: number
    membrosAtivos: number
    eventosEsteAno: number
    pontuacaoMedia: number
  }
  status: 'ativa' | 'inativa' | 'manutencao'
  dataCadastro: string
  ultimaAtualizacao: string
}

export default function UnidadesPage() {
  const [unidades, setUnidades] = useState<Unidade[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [tipoFilter, setTipoFilter] = useState('todos')
  const [estadoFilter, setEstadoFilter] = useState('todos')
  const [cidadeFilter, setCidadeFilter] = useState('todos')
  const [currentPage, setCurrentPage] = useState(1)
  const { colors, getCardStyle } = useThemedStyles()

  useEffect(() => {
    const mockUnidades: Unidade[] = [
      {
        id: '9',
        nome: 'Matriz - Barra da Tijuca',
        cnpj: '50.765.960/0001-48',
        endereco: {
          rua: 'Av. das Américas, 3434',
          bairro: 'Barra da Tijuca',
          cidade: 'Rio de Janeiro',
          estado: 'Rio de Janeiro',
          cep: '22640-102'
        },
        contato: {
          telefone: '(21) 3434-5678',
          email: 'matriz@cne.com.br',
          responsavel: 'Carlos Silva'
        },
        stats: {
          totalMembros: 156,
          membrosAtivos: 142,
          eventosEsteAno: 24,
          pontuacaoMedia: 1250
        },
        status: 'ativa',
        dataCadastro: '13/02/2024',
        ultimaAtualizacao: '17/09/2025'
      },
      {
        id: '14',
        nome: 'Unidade Nova América',
        cnpj: '25.299.270/0001-76',
        endereco: {
          rua: 'Av. Pastor Martin Luther King Jr, 126',
          bairro: 'Del Castilho',
          cidade: 'Rio de Janeiro',
          estado: 'Rio de Janeiro',
          cep: '20765-000'
        },
        contato: {
          telefone: '(21) 2567-8901',
          email: 'delcastilho@cne.com.br',
          responsavel: 'Maria Santos'
        },
        stats: {
          totalMembros: 89,
          membrosAtivos: 76,
          eventosEsteAno: 18,
          pontuacaoMedia: 980
        },
        status: 'ativa',
        dataCadastro: '19/08/2024',
        ultimaAtualizacao: '16/09/2025'
      },
      {
        id: '15',
        nome: 'Empresários SA Conexão Brasil',
        cnpj: '25.299.270/0001-76',
        endereco: {
          rua: 'Rua da Assembléia, 10',
          bairro: 'Barra da Tijuca',
          cidade: 'Rio de Janeiro',
          estado: 'Rio de Janeiro',
          cep: '22071-900'
        },
        contato: {
          telefone: '(21) 3456-7890',
          email: 'conexao@cne.com.br',
          responsavel: 'João Costa'
        },
        stats: {
          totalMembros: 67,
          membrosAtivos: 58,
          eventosEsteAno: 15,
          pontuacaoMedia: 890
        },
        status: 'ativa',
        dataCadastro: '20/09/2024',
        ultimaAtualizacao: '15/09/2025'
      },
      {
        id: '16',
        nome: 'Unidade Duque de Caxias',
        cnpj: '28.595.244/0001-83',
        endereco: {
          rua: 'Rua Frei Fidélis, 77',
          bairro: 'Jardim Vinte e Cinco de Agosto',
          cidade: 'Duque de Caxias',
          estado: 'Rio de Janeiro',
          cep: '25071-160'
        },
        contato: {
          telefone: '(21) 2671-3456',
          email: 'caxias@cne.com.br',
          responsavel: 'Ana Oliveira'
        },
        stats: {
          totalMembros: 43,
          membrosAtivos: 38,
          eventosEsteAno: 12,
          pontuacaoMedia: 750
        },
        status: 'manutencao',
        dataCadastro: '20/09/2024',
        ultimaAtualizacao: '14/09/2025'
      }
    ]

    setTimeout(() => {
      setUnidades(mockUnidades)
      setLoading(false)
    }, 500)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativa': return '#10b981'
      case 'inativa': return '#ef4444'
      case 'manutencao': return '#f59e0b'
      default: return '#64748b'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ativa': return 'Ativa'
      case 'inativa': return 'Inativa'
      case 'manutencao': return 'Manutenção'
      default: return 'Desconhecido'
    }
  }

  const filteredUnidades = unidades.filter(unidade => {
    const matchesSearch = unidade.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         unidade.cnpj.includes(searchTerm) ||
                         unidade.endereco.cidade.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesEstado = estadoFilter === 'todos' || unidade.endereco.estado === estadoFilter
    const matchesCidade = cidadeFilter === 'todos' || unidade.endereco.cidade === cidadeFilter
    
    return matchesSearch && matchesEstado && matchesCidade
  })

  const itemsPerPage = 8
  const totalPages = Math.ceil(filteredUnidades.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUnidades = filteredUnidades.slice(startIndex, startIndex + itemsPerPage)

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
              Unidades
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
              Adicionar Unidade
            </button>
          </div>
          <p style={{
            fontSize: '16px',
            color: colors.text.secondary,
            margin: 0,
            transition: 'color 0.3s ease'
          }}>
            Gerencie todas as unidades da rede CNE
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
              <Building2 style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Total Unidades</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{unidades.length}</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            borderRadius: '12px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <Users style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Total Membros</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
              {unidades.reduce((acc, u) => acc + u.stats.totalMembros, 0)}
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
              <Calendar style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Eventos 2025</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
              {unidades.reduce((acc, u) => acc + u.stats.eventosEsteAno, 0)}
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
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
              {unidades.length > 0 ? Math.round(unidades.reduce((acc, u) => acc + u.stats.pontuacaoMedia, 0) / unidades.length) : 0}
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
                Tipo
              </label>
              <select
                value={tipoFilter}
                onChange={(e) => setTipoFilter(e.target.value)}
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
                <option value="matriz">Matriz</option>
                <option value="filial">Filial</option>
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
                Estado
              </label>
              <select
                value={estadoFilter}
                onChange={(e) => setEstadoFilter(e.target.value)}
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
                <option value="Rio de Janeiro">Rio de Janeiro</option>
                <option value="São Paulo">São Paulo</option>
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
                Cidade
              </label>
              <select
                value={cidadeFilter}
                onChange={(e) => setCidadeFilter(e.target.value)}
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
                <option value="Rio de Janeiro">Rio de Janeiro</option>
                <option value="Duque de Caxias">Duque de Caxias</option>
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
                  placeholder="Nome, CNPJ ou cidade..."
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

        {/* Units Grid */}
        {loading ? (
          <div style={{
            ...getCardStyle(),
            padding: '60px',
            textAlign: 'center'
          }}>
            <Building2 style={{ width: '48px', height: '48px', color: colors.text.tertiary, margin: '0 auto 16px' }} />
            <p style={{ color: colors.text.secondary, fontSize: '16px', margin: 0 }}>
              Carregando unidades...
            </p>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              {paginatedUnidades.map((unidade) => (
                <div
                  key={unidade.id}
                  style={{
                    ...getCardStyle(),
                    padding: '24px',
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
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: colors.text.primary,
                        margin: 0,
                        marginBottom: '4px',
                        transition: 'color 0.3s ease'
                      }}>
                        {unidade.nome}
                      </h3>
                      <p style={{
                        fontSize: '12px',
                        color: colors.text.secondary,
                        margin: 0,
                        fontFamily: 'monospace',
                        transition: 'color 0.3s ease'
                      }}>
                        CNPJ: {unidade.cnpj}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '500',
                        backgroundColor: `${getStatusColor(unidade.status)}15`,
                        color: getStatusColor(unidade.status)
                      }}>
                        {getStatusText(unidade.status)}
                      </span>
                      <button style={{
                        padding: '6px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <MoreVertical style={{ width: '16px', height: '16px', color: colors.text.tertiary }} />
                      </button>
                    </div>
                  </div>

                  {/* Endereço */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                      <MapPin style={{ width: '16px', height: '16px', color: colors.text.tertiary, marginTop: '2px' }} />
                      <div>
                        <p style={{
                          fontSize: '14px',
                          color: colors.text.primary,
                          margin: 0,
                          lineHeight: '1.4',
                          transition: 'color 0.3s ease'
                        }}>
                          {unidade.endereco.rua}
                        </p>
                        <p style={{
                          fontSize: '12px',
                          color: colors.text.secondary,
                          margin: 0,
                          transition: 'color 0.3s ease'
                        }}>
                          {unidade.endereco.bairro}, {unidade.endereco.cidade} - {unidade.endereco.estado}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contato */}
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <Phone style={{ width: '14px', height: '14px', color: colors.text.tertiary }} />
                      <span style={{
                        fontSize: '13px',
                        color: colors.text.primary,
                        transition: 'color 0.3s ease'
                      }}>
                        {unidade.contato.telefone}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <Mail style={{ width: '14px', height: '14px', color: colors.text.tertiary }} />
                      <span style={{
                        fontSize: '13px',
                        color: colors.text.primary,
                        transition: 'color 0.3s ease'
                      }}>
                        {unidade.contato.email}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Users style={{ width: '14px', height: '14px', color: colors.text.tertiary }} />
                      <span style={{
                        fontSize: '13px',
                        color: colors.text.primary,
                        transition: 'color 0.3s ease'
                      }}>
                        Responsável: {unidade.contato.responsavel}
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
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
                        color: colors.text.primary,
                        transition: 'color 0.3s ease'
                      }}>
                        {unidade.stats.totalMembros}
                      </div>
                      <div style={{
                        fontSize: '11px',
                        color: colors.text.secondary,
                        transition: 'color 0.3s ease'
                      }}>
                        Membros
                      </div>
                      <div style={{
                        fontSize: '10px',
                        color: '#10b981',
                        marginTop: '2px'
                      }}>
                        {unidade.stats.membrosAtivos} ativos
                      </div>
                    </div>

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
                        color: colors.text.primary,
                        transition: 'color 0.3s ease'
                      }}>
                        {unidade.stats.eventosEsteAno}
                      </div>
                      <div style={{
                        fontSize: '11px',
                        color: colors.text.secondary,
                        transition: 'color 0.3s ease'
                      }}>
                        Eventos 2025
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{
                      flex: 1,
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
                      <Eye style={{ width: '14px', height: '14px' }} />
                      Visualizar
                    </button>
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
                      <Edit3 style={{ width: '14px', height: '14px' }} />
                      Editar
                    </button>
                  </div>

                  {/* Footer com data */}
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
                        Cadastro: {unidade.dataCadastro}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock style={{ width: '12px', height: '12px', color: colors.text.tertiary }} />
                      <span style={{
                        fontSize: '11px',
                        color: colors.text.secondary,
                        transition: 'color 0.3s ease'
                      }}>
                        Atualizado: {unidade.ultimaAtualizacao}
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
                Mostrando página {currentPage} de {totalPages}. Total de registros é de {filteredUnidades.length}.
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
