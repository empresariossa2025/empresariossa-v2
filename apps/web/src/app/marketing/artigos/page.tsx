"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useState, useEffect } from "react"
import { useThemedStyles } from "@/hooks/use-themed-styles"
import { 
  FileText, 
  Plus,
  Search,
  Filter,
  Calendar,
  Eye,
  Edit3,
  Trash2,
  Clock,
  User,
  Tag,
  TrendingUp,
  BookOpen,
  Heart,
  Share
} from "lucide-react"

interface Artigo {
  id: string
  titulo: string
  categoria: 'dicas' | 'agenda' | 'ferramentas' | 'desenvolvimento' | 'networking' | 'manual'
  status: 'publicado' | 'rascunho' | 'revisao'
  dataPublicacao: string
  dataCadastro: string
  autor: string
  visualizacoes: number
  curtidas: number
  resumo: string
  thumbnail: string
  tags: string[]
}

export default function ArtigosPage() {
  const [artigos, setArtigos] = useState<Artigo[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoriaFilter, setCategoriaFilter] = useState('todas')
  const [statusFilter, setStatusFilter] = useState('todos')
  const { colors, getCardStyle } = useThemedStyles()

  useEffect(() => {
    // Mock data baseado nos artigos do sistema existente
    const mockArtigos: Artigo[] = [
      {
        id: '8',
        titulo: '5 dicas para Gerenciar Melhor seu tempo',
        categoria: 'dicas',
        status: 'publicado',
        dataPublicacao: '28/04/2024',
        dataCadastro: '28/04/2024 - 22:07',
        autor: 'CNE Editorial',
        visualizacoes: 1847,
        curtidas: 156,
        resumo: 'Estratégias eficazes para otimizar sua produtividade e organizar melhor o seu dia.',
        thumbnail: '/placeholder-article.jpg',
        tags: ['produtividade', 'gestão', 'tempo']
      },
      {
        id: '9',
        titulo: 'AGENDA 2025 EMPRESÁRIOS SA',
        categoria: 'agenda',
        status: 'publicado',
        dataPublicacao: '09/02/2025',
        dataCadastro: '09/02/2025 - 18:10',
        autor: 'CNE Editorial',
        visualizacoes: 2341,
        curtidas: 287,
        resumo: 'Calendário completo de eventos e oportunidades para empresários em 2025.',
        thumbnail: '/placeholder-agenda.jpg',
        tags: ['agenda', '2025', 'eventos']
      },
      {
        id: '7',
        titulo: 'As melhores ferramentas para ajudar na gestão da sua empresa',
        categoria: 'ferramentas',
        status: 'publicado',
        dataPublicacao: '28/04/2024',
        dataCadastro: '28/04/2024 - 22:03',
        autor: 'CNE Editorial',
        visualizacoes: 1654,
        curtidas: 198,
        resumo: 'Conheça as principais ferramentas digitais que podem revolucionar a gestão do seu negócio.',
        thumbnail: '/placeholder-tools.jpg',
        tags: ['ferramentas', 'gestão', 'tecnologia']
      },
      {
        id: '6',
        titulo: 'Desenvolvendo uma Empresa Resiliente',
        categoria: 'desenvolvimento',
        status: 'publicado',
        dataPublicacao: '28/04/2024',
        dataCadastro: '28/04/2024 - 21:59',
        autor: 'CNE Editorial',
        visualizacoes: 1298,
        curtidas: 142,
        resumo: 'Como construir uma empresa capaz de superar crises e se adaptar às mudanças do mercado.',
        thumbnail: '/placeholder-resilience.jpg',
        tags: ['resiliência', 'empresa', 'crise']
      },
      {
        id: '5',
        titulo: 'Faça seu Pich',
        categoria: 'desenvolvimento',
        status: 'publicado',
        dataPublicacao: '15/02/2024',
        dataCadastro: '09/03/2024 - 16:14',
        autor: 'CNE Editorial',
        visualizacoes: 987,
        curtidas: 89,
        resumo: 'Aprenda a criar um pitch convincente e impactante para apresentar seu negócio.',
        thumbnail: '/placeholder-pitch.jpg',
        tags: ['pitch', 'apresentação', 'vendas']
      },
      {
        id: '10',
        titulo: 'MANUAL DO MEMBRO',
        categoria: 'manual',
        status: 'publicado',
        dataPublicacao: '03/04/2025',
        dataCadastro: '03/04/2025 - 21:17',
        autor: 'CNE Editorial',
        visualizacoes: 3456,
        curtidas: 412,
        resumo: 'Guia completo para novos membros aproveitarem ao máximo os benefícios da rede CNE.',
        thumbnail: '/placeholder-manual.jpg',
        tags: ['manual', 'membro', 'guia']
      },
      {
        id: '4',
        titulo: 'Networking vale mais do que dinheiro',
        categoria: 'networking',
        status: 'publicado',
        dataPublicacao: '15/02/2024',
        dataCadastro: '09/03/2024 - 15:53',
        autor: 'CNE Editorial',
        visualizacoes: 2187,
        curtidas: 234,
        resumo: 'Descubra porque investir em relacionamentos pode ser mais valioso que capital financeiro.',
        thumbnail: '/placeholder-networking.jpg',
        tags: ['networking', 'relacionamentos', 'negócios']
      }
    ]

    setTimeout(() => {
      setArtigos(mockArtigos)
      setLoading(false)
    }, 500)
  }, [])

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case 'dicas': return '#10b981'
      case 'agenda': return '#8b5cf6'
      case 'ferramentas': return '#3b82f6'
      case 'desenvolvimento': return '#f59e0b'
      case 'networking': return '#06b6d4'
      case 'manual': return '#ef4444'
      default: return '#64748b'
    }
  }

  const getCategoriaText = (categoria: string) => {
    switch (categoria) {
      case 'dicas': return 'Dicas'
      case 'agenda': return 'Agenda'
      case 'ferramentas': return 'Ferramentas'
      case 'desenvolvimento': return 'Desenvolvimento'
      case 'networking': return 'Networking'
      case 'manual': return 'Manual'
      default: return 'Geral'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'publicado': return '#10b981'
      case 'rascunho': return '#f59e0b'
      case 'revisao': return '#3b82f6'
      default: return '#64748b'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'publicado': return 'Publicado'
      case 'rascunho': return 'Rascunho'
      case 'revisao': return 'Em Revisão'
      default: return 'Desconhecido'
    }
  }

  const filteredArtigos = artigos.filter(artigo => {
    const matchesSearch = artigo.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artigo.resumo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artigo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategoria = categoriaFilter === 'todas' || artigo.categoria === categoriaFilter
    const matchesStatus = statusFilter === 'todos' || artigo.status === statusFilter
    
    return matchesSearch && matchesCategoria && matchesStatus
  })

  const totalArtigos = artigos.length
  const artigosPublicados = artigos.filter(a => a.status === 'publicado').length
  const totalVisualizacoes = artigos.reduce((acc, a) => acc + a.visualizacoes, 0)
  const totalCurtidas = artigos.reduce((acc, a) => acc + a.curtidas, 0)

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
              Artigos
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
              Novo Artigo
            </button>
          </div>
          <p style={{
            fontSize: '16px',
            color: colors.text.secondary,
            margin: 0,
            transition: 'color 0.3s ease'
          }}>
            Gerencie blog, artigos e conteúdo editorial da plataforma
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
              <FileText style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Total Artigos</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{totalArtigos}</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            borderRadius: '12px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <BookOpen style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Publicados</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{artigosPublicados}</div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>
              {Math.round((artigosPublicados / totalArtigos) * 100)}% do total
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
              <Eye style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Visualizações</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
              {totalVisualizacoes.toLocaleString()}
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            borderRadius: '12px',
            padding: '20px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <Heart style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Curtidas</h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
              {totalCurtidas.toLocaleString()}
            </div>
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
                  placeholder="Título, resumo, tags..."
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
                <option value="dicas">Dicas</option>
                <option value="agenda">Agenda</option>
                <option value="ferramentas">Ferramentas</option>
                <option value="desenvolvimento">Desenvolvimento</option>
                <option value="networking">Networking</option>
                <option value="manual">Manual</option>
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
                <option value="publicado">Publicado</option>
                <option value="rascunho">Rascunho</option>
                <option value="revisao">Em Revisão</option>
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

        {/* Artigos Grid */}
        {loading ? (
          <div style={{
            ...getCardStyle(),
            padding: '60px',
            textAlign: 'center'
          }}>
            <FileText style={{ width: '48px', height: '48px', color: colors.text.tertiary, margin: '0 auto 16px' }} />
            <p style={{ color: colors.text.secondary, fontSize: '16px', margin: 0 }}>
              Carregando artigos...
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
            {filteredArtigos.map((artigo) => (
              <div
                key={artigo.id}
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
              >
                {/* Thumbnail */}
                <div style={{
                  height: '160px',
                  backgroundColor: '#f8fafc',
                  backgroundImage: `linear-gradient(135deg, ${getCategoriaColor(artigo.categoria)}20, ${getCategoriaColor(artigo.categoria)}05)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  <FileText style={{
                    width: '48px',
                    height: '48px',
                    color: getCategoriaColor(artigo.categoria),
                    opacity: 0.7
                  }} />
                  
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
                      backgroundColor: getCategoriaColor(artigo.categoria),
                      color: 'white'
                    }}>
                      {getCategoriaText(artigo.categoria)}
                    </span>
                  </div>

                  {/* Status */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px'
                  }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: '500',
                      backgroundColor: `${getStatusColor(artigo.status)}20`,
                      color: getStatusColor(artigo.status)
                    }}>
                      {getStatusText(artigo.status)}
                    </span>
                  </div>
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
                    {artigo.titulo}
                  </h3>
                  
                  <p style={{
                    fontSize: '14px',
                    color: colors.text.secondary,
                    margin: '0 0 16px 0',
                    lineHeight: '1.4',
                    transition: 'color 0.3s ease'
                  }}>
                    {artigo.resumo}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                    {artigo.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        style={{
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          backgroundColor: `${colors.brand.primary}15`,
                          color: colors.brand.primary,
                          border: `1px solid ${colors.brand.primary}30`
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Métricas */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Eye style={{ width: '14px', height: '14px', color: colors.text.tertiary }} />
                        <span style={{ fontSize: '12px', color: colors.text.secondary }}>
                          {artigo.visualizacoes.toLocaleString()}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Heart style={{ width: '14px', height: '14px', color: '#ef4444' }} />
                        <span style={{ fontSize: '12px', color: colors.text.secondary }}>
                          {artigo.curtidas}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar style={{ width: '12px', height: '12px', color: colors.text.tertiary }} />
                      <span style={{ fontSize: '11px', color: colors.text.tertiary }}>
                        {artigo.dataPublicacao}
                      </span>
                    </div>
                  </div>

                  {/* Author */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <User style={{ width: '14px', height: '14px', color: colors.text.tertiary }} />
                    <span style={{ fontSize: '12px', color: colors.text.secondary }}>
                      {artigo.autor}
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
                    <button style={{
                      padding: '8px 12px',
                      backgroundColor: colors.bg.tertiary,
                      border: `1px solid ${colors.border.primary}`,
                      borderRadius: '6px',
                      color: colors.text.secondary,
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'all 0.3s ease'
                    }}>
                      <Share style={{ width: '14px', height: '14px' }} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No results */}
        {!loading && filteredArtigos.length === 0 && (
          <div style={{
            ...getCardStyle(),
            padding: '60px',
            textAlign: 'center'
          }}>
            <Search style={{ width: '48px', height: '48px', color: colors.text.tertiary, margin: '0 auto 16px' }} />
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: colors.text.primary,
              margin: '0 0 8px 0',
              transition: 'color 0.3s ease'
            }}>
              Nenhum artigo encontrado
            </h3>
            <p style={{ color: colors.text.secondary, fontSize: '14px', margin: 0 }}>
              Tente ajustar os filtros ou termos de busca.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
