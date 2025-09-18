"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useState, useEffect } from "react"
import { useThemedStyles } from "@/hooks/use-themed-styles"
import { 
  Play, 
  Plus,
  Search,
  Filter,
  BookOpen,
  Clock,
  CheckCircle,
  Eye,
  Edit3,
  X,
  PlayCircle
} from "lucide-react"

interface Aula {
  id: string
  nome: string
  categoria: 'plataforma' | 'vendas' | 'networking' | 'marketing' | 'gestao' | 'tecnologia'
  nivel: 'iniciante' | 'intermediario' | 'avancado'
  videoUrl: string
  videoId: string // YouTube video ID
  duracao: string
  visualizacoes: number
  concluida: boolean
  dataCriacao: string
  descricao: string
}

export default function AulasPage() {
  const [aulas, setAulas] = useState<Aula[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoriaFilter, setCategoriaFilter] = useState('todas')
  const [nivelFilter, setNivelFilter] = useState('todos')
  const [selectedAula, setSelectedAula] = useState<Aula | null>(null)
  const { colors, getCardStyle } = useThemedStyles()

  useEffect(() => {
    // Mock data baseado nas aulas existentes do sistema
    const mockAulas: Aula[] = [
      {
        id: '1',
        nome: 'Como Editar Minha Página na Plataforma',
        categoria: 'plataforma',
        nivel: 'iniciante',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        videoId: 'dQw4w9WgXcQ',
        duracao: '8:45',
        visualizacoes: 1245,
        concluida: true,
        dataCriacao: '23/02/2025',
        descricao: 'Aprenda a personalizar seu perfil na plataforma CNE'
      },
      {
        id: '2',
        nome: 'Como Fazer um Anúncio Dentro da Plataforma',
        categoria: 'marketing',
        nivel: 'intermediario',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        videoId: 'dQw4w9WgXcQ',
        duracao: '12:30',
        visualizacoes: 987,
        concluida: false,
        dataCriacao: '24/02/2025',
        descricao: 'Crie anúncios eficazes para divulgar seu negócio'
      },
      {
        id: '3',
        nome: 'Como Fazer um Pitch Eficiente',
        categoria: 'vendas',
        nivel: 'avancado',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        videoId: 'dQw4w9WgXcQ',
        duracao: '15:20',
        visualizacoes: 1456,
        concluida: false,
        dataCriacao: '24/02/2025',
        descricao: 'Técnicas avançadas de apresentação e persuasão'
      },
      {
        id: '4',
        nome: 'Como Fazer Vendas Humanizadas',
        categoria: 'vendas',
        nivel: 'intermediario',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        videoId: 'dQw4w9WgXcQ',
        duracao: '18:45',
        visualizacoes: 2134,
        concluida: true,
        dataCriacao: '01/03/2025',
        descricao: 'Desenvolva relacionamentos autênticos com seus clientes'
      },
      {
        id: '5',
        nome: 'Como Registrar as Suas Recomendações',
        categoria: 'networking',
        nivel: 'iniciante',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        videoId: 'dQw4w9WgXcQ',
        duracao: '6:15',
        visualizacoes: 876,
        concluida: false,
        dataCriacao: '24/02/2025',
        descricao: 'Sistema de recomendações e networking eficaz'
      },
      {
        id: '6',
        nome: 'Como Registrar Convidados',
        categoria: 'networking',
        nivel: 'iniciante',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        videoId: 'dQw4w9WgXcQ',
        duracao: '7:30',
        visualizacoes: 654,
        concluida: true,
        dataCriacao: '24/02/2025',
        descricao: 'Gerencie convites e acompanhe participações'
      }
    ]

    setTimeout(() => {
      setAulas(mockAulas)
      setLoading(false)
    }, 500)
  }, [])

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case 'plataforma': return '#8b5cf6'
      case 'vendas': return '#10b981'
      case 'networking': return '#3b82f6'
      case 'marketing': return '#f59e0b'
      case 'gestao': return '#ef4444'
      case 'tecnologia': return '#06b6d4'
      default: return '#64748b'
    }
  }

  const getCategoriaText = (categoria: string) => {
    switch (categoria) {
      case 'plataforma': return 'Plataforma'
      case 'vendas': return 'Vendas'
      case 'networking': return 'Networking'
      case 'marketing': return 'Marketing'
      case 'gestao': return 'Gestão'
      case 'tecnologia': return 'Tecnologia'
      default: return 'Geral'
    }
  }

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'iniciante': return '#10b981'
      case 'intermediario': return '#f59e0b'
      case 'avancado': return '#ef4444'
      default: return '#64748b'
    }
  }

  const getNivelText = (nivel: string) => {
    switch (nivel) {
      case 'iniciante': return 'Iniciante'
      case 'intermediario': return 'Intermediário'
      case 'avancado': return 'Avançado'
      default: return 'Geral'
    }
  }

  const filteredAulas = aulas.filter(aula => {
    const matchesSearch = aula.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         aula.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategoria = categoriaFilter === 'todas' || aula.categoria === categoriaFilter
    const matchesNivel = nivelFilter === 'todos' || aula.nivel === nivelFilter
    
    return matchesSearch && matchesCategoria && matchesNivel
  })

  const totalAulas = aulas.length
  const aulasCompletas = aulas.filter(a => a.concluida).length
  const progressoPercentual = totalAulas > 0 ? Math.round((aulasCompletas / totalAulas) * 100) : 0
  const duracaoTotal = "2h 45m" // Calculada dinamicamente in futuro

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
              Aulas
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
              Nova Aula
            </button>
          </div>
          <p style={{
            fontSize: '16px',
            color: colors.text.secondary,
            margin: 0,
            transition: 'color 0.3s ease'
          }}>
            Conteúdo educacional e treinamentos para desenvolvimento profissional
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
              <BookOpen style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Total de Aulas</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{totalAulas}</div>
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
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Completadas</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{aulasCompletas}</div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>{progressoPercentual}% do total</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            borderRadius: '12px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <Eye style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Visualizações</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
              {aulas.reduce((acc, a) => acc + a.visualizacoes, 0).toLocaleString()}
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
              <Clock style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Tempo Total</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{duracaoTotal}</div>
          </div>
        </div>

        {/* Filters */}
        <div style={{
          ...getCardStyle(),
          padding: '20px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', alignItems: 'end' }}>
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
                  placeholder="Nome da aula, descrição..."
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
                <option value="plataforma">Plataforma</option>
                <option value="vendas">Vendas</option>
                <option value="networking">Networking</option>
                <option value="marketing">Marketing</option>
                <option value="gestao">Gestão</option>
                <option value="tecnologia">Tecnologia</option>
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
                Nível
              </label>
              <select
                value={nivelFilter}
                onChange={(e) => setNivelFilter(e.target.value)}
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
                <option value="iniciante">Iniciante</option>
                <option value="intermediario">Intermediário</option>
                <option value="avancado">Avançado</option>
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

        {/* Aulas Grid */}
        {loading ? (
          <div style={{
            ...getCardStyle(),
            padding: '60px',
            textAlign: 'center'
          }}>
            <BookOpen style={{ width: '48px', height: '48px', color: colors.text.tertiary, margin: '0 auto 16px' }} />
            <p style={{ color: colors.text.secondary, fontSize: '16px', margin: 0 }}>
              Carregando aulas...
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
            {filteredAulas.map((aula) => (
              <div
                key={aula.id}
                style={{
                  ...getCardStyle(),
                  padding: '0',
                  overflow: 'hidden',
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
                onClick={() => setSelectedAula(aula)}
              >
                {/* Thumbnail do Video */}
                <div style={{
                  position: 'relative',
                  height: '200px',
                  backgroundColor: '#f0f0f0',
                  backgroundImage: `url(https://img.youtube.com/vi/${aula.videoId}/maxresdefault.jpg)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <PlayCircle style={{
                      width: '60px',
                      height: '60px',
                      color: 'white',
                      opacity: 0.9
                    }} />
                  </div>
                  
                  {/* Badges */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    display: 'flex',
                    gap: '8px'
                  }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: '500',
                      backgroundColor: getCategoriaColor(aula.categoria),
                      color: 'white'
                    }}>
                      {getCategoriaText(aula.categoria)}
                    </span>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: '500',
                      backgroundColor: getNivelColor(aula.nivel),
                      color: 'white'
                    }}>
                      {getNivelText(aula.nivel)}
                    </span>
                  </div>

                  {/* Duração */}
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '500',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    color: 'white'
                  }}>
                    {aula.duracao}
                  </div>

                  {/* Status Conclusão */}
                  {aula.concluida && (
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      padding: '4px',
                      borderRadius: '50%',
                      backgroundColor: '#10b981'
                    }}>
                      <CheckCircle style={{ width: '16px', height: '16px', color: 'white' }} />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: '20px' }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: colors.text.primary,
                    margin: '0 0 8px 0',
                    lineHeight: '1.3',
                    transition: 'color 0.3s ease'
                  }}>
                    {aula.nome}
                  </h3>
                  
                  <p style={{
                    fontSize: '14px',
                    color: colors.text.secondary,
                    margin: '0 0 16px 0',
                    lineHeight: '1.4',
                    transition: 'color 0.3s ease'
                  }}>
                    {aula.descricao}
                  </p>

                  {/* Métricas */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Eye style={{ width: '14px', height: '14px', color: colors.text.tertiary }} />
                        <span style={{ fontSize: '12px', color: colors.text.secondary }}>
                          {aula.visualizacoes.toLocaleString()}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock style={{ width: '14px', height: '14px', color: colors.text.tertiary }} />
                        <span style={{ fontSize: '12px', color: colors.text.secondary }}>
                          {aula.duracao}
                        </span>
                      </div>
                    </div>
                    <span style={{ fontSize: '11px', color: colors.text.tertiary }}>
                      {aula.dataCriacao}
                    </span>
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
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedAula(aula)
                    }}>
                      <Play style={{ width: '14px', height: '14px' }} />
                      {aula.concluida ? 'Assistir Novamente' : 'Assistir Aula'}
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
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal Player */}
        {selectedAula && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}>
            <div style={{
              backgroundColor: colors.bg.primary,
              borderRadius: '12px',
              width: '90%',
              maxWidth: '1000px',
              maxHeight: '90%',
              overflow: 'hidden',
              position: 'relative'
            }}>
              {/* Header Modal */}
              <div style={{
                padding: '20px',
                borderBottom: `1px solid ${colors.border.primary}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <h2 style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: colors.text.primary,
                    margin: '0 0 4px 0',
                    transition: 'color 0.3s ease'
                  }}>
                    {selectedAula.nome}
                  </h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: '500',
                      backgroundColor: `${getCategoriaColor(selectedAula.categoria)}20`,
                      color: getCategoriaColor(selectedAula.categoria)
                    }}>
                      {getCategoriaText(selectedAula.categoria)}
                    </span>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: '500',
                      backgroundColor: `${getNivelColor(selectedAula.nivel)}20`,
                      color: getNivelColor(selectedAula.nivel)
                    }}>
                      {getNivelText(selectedAula.nivel)}
                    </span>
                    <span style={{ fontSize: '12px', color: colors.text.secondary }}>
                      {selectedAula.duracao}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAula(null)}
                  style={{
                    padding: '8px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    color: colors.text.secondary,
                    transition: 'all 0.3s ease'
                  }}
                >
                  <X style={{ width: '20px', height: '20px' }} />
                </button>
              </div>

              {/* Video Player */}
              <div style={{ padding: '20px' }}>
                <div style={{
                  position: 'relative',
                  paddingBottom: '56.25%', // 16:9 aspect ratio
                  height: 0,
                  overflow: 'hidden',
                  borderRadius: '8px'
                }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedAula.videoId}?autoplay=1`}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none'
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {/* Descrição */}
                <div style={{ marginTop: '20px' }}>
                  <p style={{
                    fontSize: '14px',
                    color: colors.text.secondary,
                    lineHeight: '1.5',
                    margin: 0,
                    transition: 'color 0.3s ease'
                  }}>
                    {selectedAula.descricao}
                  </p>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                  {!selectedAula.concluida && (
                    <button style={{
                      padding: '12px 24px',
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.3s ease'
                    }}>
                      <CheckCircle style={{ width: '16px', height: '16px' }} />
                      Marcar como Concluída
                    </button>
                  )}
                  <button style={{
                    padding: '12px 24px',
                    backgroundColor: colors.bg.tertiary,
                    border: `1px solid ${colors.border.primary}`,
                    borderRadius: '8px',
                    color: colors.text.primary,
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}>
                    Fazer Download
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
