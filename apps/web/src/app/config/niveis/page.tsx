"use client"
import { useState, useEffect } from 'react'
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useThemedStyles } from "@/hooks/use-themed-styles"
import { 
  Shield, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  ShieldCheck,
  UserCheck,
  Users,
  UserPlus,
  Crown,
  User,
  Check,
  X,
  Info
} from "lucide-react"

export default function NiveisUsuarioPage() {
  const { colors, getCardStyle } = useThemedStyles()
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [newNivel, setNewNivel] = useState({
    nome: '',
    descricao: '',
    permissoes: []
  })

  // Dados mock baseados na imagem + adição do Visitante
  const [niveisUsuario, setNiveisUsuario] = useState([
    { 
      id: 2, 
      nome: "Admin", 
      descricao: "Acesso total ao sistema - Gerenciamento completo",
      permissoes: ["dashboard", "usuarios", "configuracoes", "relatorios", "membros", "eventos", "financeiro"],
      cor: "#8b5cf6",
      icone: "Crown",
      usuariosCount: 8,
      cadastro: "26/08/2023 - 17:54",
      ativo: true 
    },
    { 
      id: 4, 
      nome: "Administrativo", 
      descricao: "Gerenciamento administrativo e operacional",
      permissoes: ["dashboard", "membros", "eventos", "relatorios"],
      cor: "#3b82f6",
      icone: "ShieldCheck",
      usuariosCount: 3,
      cadastro: "26/08/2023 - 17:54",
      ativo: true 
    },
    { 
      id: 5, 
      nome: "Entrevistador", 
      descricao: "Condução de entrevistas e avaliação de candidatos",
      permissoes: ["dashboard", "membros", "candidatos"],
      cor: "#10b981",
      icone: "UserCheck",
      usuariosCount: 2,
      cadastro: "26/08/2023 - 17:54",
      ativo: true 
    },
    { 
      id: 3, 
      nome: "Franqueado", 
      descricao: "Gerenciamento de franquia e operações regionais",
      permissoes: ["dashboard", "membros", "eventos", "financeiro"],
      cor: "#f59e0b",
      icone: "Users",
      usuariosCount: 5,
      cadastro: "26/08/2023 - 17:54",
      ativo: true 
    },
    { 
      id: 6, 
      nome: "Membro", 
      descricao: "Acesso básico para membros da rede",
      permissoes: ["dashboard", "perfil", "eventos"],
      cor: "#06b6d4",
      icone: "User",
      usuariosCount: 120,
      cadastro: "26/08/2023 - 17:54",
      ativo: true 
    },
    { 
      id: 7, 
      nome: "Visitante", 
      descricao: "Acesso limitado para demonstração do sistema",
      permissoes: ["dashboard-demo", "eventos-visualizar"],
      cor: "#6b7280",
      icone: "UserPlus",
      usuariosCount: 0,
      cadastro: new Date().toLocaleString('pt-BR'),
      ativo: true 
    }
  ])

  const filteredNiveis = niveisUsuario.filter(nivel =>
    nivel.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nivel.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const permissoesDisponiveis = [
    { id: "dashboard", nome: "Dashboard", descricao: "Acesso ao painel principal" },
    { id: "dashboard-demo", nome: "Dashboard Demo", descricao: "Versão limitada do dashboard" },
    { id: "usuarios", nome: "Usuários", descricao: "Gerenciar usuários do sistema" },
    { id: "membros", nome: "Membros", descricao: "Gerenciar membros da rede" },
    { id: "candidatos", nome: "Candidatos", descricao: "Gerenciar candidatos" },
    { id: "eventos", nome: "Eventos", descricao: "Gerenciar eventos completo" },
    { id: "eventos-visualizar", nome: "Eventos (Visualizar)", descricao: "Apenas visualizar eventos" },
    { id: "financeiro", nome: "Financeiro", descricao: "Acesso ao módulo financeiro" },
    { id: "relatorios", nome: "Relatórios", descricao: "Gerar e visualizar relatórios" },
    { id: "configuracoes", nome: "Configurações", descricao: "Configurações do sistema" },
    { id: "perfil", nome: "Perfil", descricao: "Gerenciar próprio perfil" }
  ]

  const getIconComponent = (iconName) => {
    const icons = { Crown, ShieldCheck, UserCheck, Users, User, UserPlus }
    return icons[iconName] || Shield
  }

  const handleAddNivel = () => {
    if (newNivel.nome.trim() && newNivel.descricao.trim()) {
      const newId = Math.max(...niveisUsuario.map(n => n.id), 0) + 1
      setNiveisUsuario([...niveisUsuario, {
        id: newId,
        nome: newNivel.nome,
        descricao: newNivel.descricao,
        permissoes: newNivel.permissoes,
        cor: "#6366f1",
        icone: "Shield",
        usuariosCount: 0,
        cadastro: new Date().toLocaleString('pt-BR'),
        ativo: true
      }])
      
      setNewNivel({ nome: '', descricao: '', permissoes: [] })
      setShowAddModal(false)
    }
  }

  const handleEditNivel = (id, newName, newDescription) => {
    setNiveisUsuario(niveisUsuario.map(nivel => 
      nivel.id === id ? { 
        ...nivel, 
        nome: newName,
        descricao: newDescription
      } : nivel
    ))
    setEditingItem(null)
  }

  const handleDeleteNivel = (id) => {
    const nivel = niveisUsuario.find(n => n.id === id)
    if (nivel.usuariosCount > 0) {
      alert(`Não é possível excluir o nível "${nivel.nome}" pois existem ${nivel.usuariosCount} usuários vinculados.`)
      return
    }
    
    if (confirm('Tem certeza que deseja excluir este nível de usuário?')) {
      setNiveisUsuario(niveisUsuario.filter(nivel => nivel.id !== id))
    }
  }

  const toggleAtivo = (id) => {
    setNiveisUsuario(niveisUsuario.map(nivel => 
      nivel.id === id ? { ...nivel, ativo: !nivel.ativo } : nivel
    ))
  }

  const togglePermissao = (permissaoId) => {
    if (newNivel.permissoes.includes(permissaoId)) {
      setNewNivel({
        ...newNivel,
        permissoes: newNivel.permissoes.filter(p => p !== permissaoId)
      })
    } else {
      setNewNivel({
        ...newNivel,
        permissoes: [...newNivel.permissoes, permissaoId]
      })
    }
  }

  return (
    <DashboardLayout>
      <div style={{ padding: '24px' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: colors.text.primary,
            margin: 0,
            marginBottom: '8px',
            transition: 'color 0.3s ease'
          }}>
            Nível de Usuário
          </h1>
          <p style={{
            fontSize: '16px',
            color: colors.text.secondary,
            margin: 0,
            transition: 'color 0.3s ease'
          }}>
            Configure níveis de acesso, hierarquias e permissões do sistema
          </p>
        </div>

        {/* Info Box */}
        <div style={{
          ...getCardStyle(),
          padding: '16px',
          marginBottom: '24px',
          background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
          border: 'none',
          color: 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <Info style={{ width: '20px', height: '20px', marginTop: '2px' }} />
            <div>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600' }}>
                Sistema de Permissões Hierárquico
              </h4>
              <p style={{ margin: 0, fontSize: '13px', opacity: 0.9, lineHeight: '1.4' }}>
                • <strong>Admin:</strong> Acesso total ao sistema<br/>
                • <strong>Visitante:</strong> Acesso demo limitado para apresentação<br/>
                • Cada nível controla o acesso a módulos específicos
              </p>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          gap: '16px'
        }}>
          {/* Search */}
          <div style={{ 
            position: 'relative',
            flex: 1,
            maxWidth: '400px'
          }}>
            <Search style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '20px',
              height: '20px',
              color: colors.text.tertiary
            }} />
            <input
              type="text"
              placeholder="Buscar nível de usuário..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 12px 12px 44px',
                border: `1px solid ${colors.border.primary}`,
                borderRadius: '8px',
                background: colors.bg.primary,
                color: colors.text.primary,
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#8b5cf6'
                e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = colors.border.primary
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: colors.bg.secondary,
              border: `1px solid ${colors.border.primary}`,
              borderRadius: '8px',
              color: colors.text.primary,
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = colors.bg.tertiary
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = colors.bg.secondary
            }}>
              <Filter style={{ width: '16px', height: '16px' }} />
              FILTRAR
            </button>

            <button 
              onClick={() => setShowAddModal(true)}
              style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.3)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.2)'
            }}>
              <Plus style={{ width: '16px', height: '16px' }} />
              ADICIONAR
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={getCardStyle()}>
          {/* Table Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '60px 80px 2fr 120px 150px 120px',
            gap: '16px',
            padding: '16px 24px',
            borderBottom: `1px solid ${colors.border.primary}`,
            background: colors.bg.secondary,
            borderRadius: '12px 12px 0 0'
          }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: colors.text.secondary, textTransform: 'uppercase' }}>
              AÇÕES
            </div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: colors.text.secondary, textTransform: 'uppercase' }}>
              NÍVEL
            </div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: colors.text.secondary, textTransform: 'uppercase' }}>
              NOME / DESCRIÇÃO
            </div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: colors.text.secondary, textTransform: 'uppercase' }}>
              USUÁRIOS
            </div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: colors.text.secondary, textTransform: 'uppercase' }}>
              ID / CADASTRO
            </div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: colors.text.secondary, textTransform: 'uppercase' }}>
              ACTIONS
            </div>
          </div>

          {/* Table Body */}
          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {filteredNiveis.map((nivel, index) => {
              const IconComponent = getIconComponent(nivel.icone)
              return (
                <div key={nivel.id} style={{
                  display: 'grid',
                  gridTemplateColumns: '60px 80px 2fr 120px 150px 120px',
                  gap: '16px',
                  padding: '16px 24px',
                  borderBottom: index < filteredNiveis.length - 1 ? `1px solid ${colors.border.primary}` : 'none',
                  transition: 'background-color 0.2s ease',
                  alignItems: 'center'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = colors.bg.tertiary
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}>
                  
                  {/* Ações */}
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button style={{
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#10b981',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#059669'}
                    onMouseOut={(e) => e.currentTarget.style.background = '#10b981'}>
                      <Eye style={{ width: '12px', height: '12px', color: 'white' }} />
                    </button>
                  </div>

                  {/* Nível Visual */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      background: nivel.cor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 2px 8px ${nivel.cor}30`
                    }}>
                      <IconComponent style={{ 
                        width: '20px', 
                        height: '20px', 
                        color: 'white'
                      }} />
                    </div>
                  </div>

                  {/* Nome e Descrição */}
                  <div>
                    {editingItem === nivel.id ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <input
                          type="text"
                          defaultValue={nivel.nome}
                          style={{
                            padding: '6px 8px',
                            border: `1px solid ${colors.border.primary}`,
                            borderRadius: '4px',
                            background: colors.bg.primary,
                            color: colors.text.primary,
                            fontSize: '14px',
                            fontWeight: '500'
                          }}
                          id={`edit-name-${nivel.id}`}
                          autoFocus
                        />
                        <input
                          type="text"
                          defaultValue={nivel.descricao}
                          style={{
                            padding: '6px 8px',
                            border: `1px solid ${colors.border.primary}`,
                            borderRadius: '4px',
                            background: colors.bg.primary,
                            color: colors.text.primary,
                            fontSize: '12px'
                          }}
                          id={`edit-desc-${nivel.id}`}
                        />
                      </div>
                    ) : (
                      <div>
                        <div style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: colors.text.primary,
                          marginBottom: '4px',
                          transition: 'color 0.3s ease'
                        }}>
                          {nivel.nome}
                        </div>
                        <div style={{
                          fontSize: '12px',
                          color: colors.text.secondary,
                          lineHeight: '1.3',
                          transition: 'color 0.3s ease'
                        }}>
                          {nivel.descricao}
                        </div>
                        <div style={{
                          fontSize: '10px',
                          color: colors.text.tertiary,
                          marginTop: '4px'
                        }}>
                          {nivel.permissoes.length} permissões
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Usuários Count */}
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: nivel.usuariosCount > 0 ? '#10b981' : colors.text.tertiary,
                      transition: 'color 0.3s ease'
                    }}>
                      {nivel.usuariosCount}
                    </div>
                    <div style={{
                      fontSize: '11px',
                      color: colors.text.tertiary,
                      transition: 'color 0.3s ease'
                    }}>
                      usuários
                    </div>
                  </div>

                  {/* ID e Cadastro */}
                  <div>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: colors.text.primary,
                      fontFamily: 'monospace',
                      marginBottom: '2px'
                    }}>
                      ID: {nivel.id}
                    </div>
                    <div style={{
                      fontSize: '11px',
                      color: colors.text.tertiary,
                      transition: 'color 0.3s ease'
                    }}>
                      {nivel.cadastro}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ position: 'relative' }}>
                    {editingItem === nivel.id ? (
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button
                          onClick={() => {
                            const nameInput = document.getElementById(`edit-name-${nivel.id}`)
                            const descInput = document.getElementById(`edit-desc-${nivel.id}`)
                            handleEditNivel(nivel.id, nameInput.value, descInput.value)
                          }}
                          style={{
                            background: '#10b981',
                            border: 'none',
                            borderRadius: '4px',
                            color: 'white',
                            cursor: 'pointer',
                            padding: '6px 8px',
                            fontSize: '12px'
                          }}>
                          <Check style={{ width: '12px', height: '12px' }} />
                        </button>
                        <button
                          onClick={() => setEditingItem(null)}
                          style={{
                            background: '#ef4444',
                            border: 'none',
                            borderRadius: '4px',
                            color: 'white',
                            cursor: 'pointer',
                            padding: '6px 8px',
                            fontSize: '12px'
                          }}>
                          <X style={{ width: '12px', height: '12px' }} />
                        </button>
                      </div>
                    ) : (
                      <div style={{
                        display: 'flex',
                        gap: '4px',
                        justifyContent: 'flex-end'
                      }}>
                        <button
                          onClick={() => setEditingItem(nivel.id)}
                          style={{
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: '#3b82f6',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s ease'
                          }}
                          onMouseOver={(e) => e.currentTarget.style.background = '#2563eb'}
                          onMouseOut={(e) => e.currentTarget.style.background = '#3b82f6'}>
                          <Edit style={{ width: '12px', height: '12px', color: 'white' }} />
                        </button>
                        
                        <button
                          onClick={() => handleDeleteNivel(nivel.id)}
                          disabled={nivel.usuariosCount > 0}
                          style={{
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: nivel.usuariosCount > 0 ? colors.bg.tertiary : '#ef4444',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: nivel.usuariosCount > 0 ? 'not-allowed' : 'pointer',
                            transition: 'background-color 0.2s ease',
                            opacity: nivel.usuariosCount > 0 ? 0.5 : 1
                          }}
                          onMouseOver={(e) => {
                            if (nivel.usuariosCount === 0) {
                              e.currentTarget.style.background = '#dc2626'
                            }
                          }}
                          onMouseOut={(e) => {
                            if (nivel.usuariosCount === 0) {
                              e.currentTarget.style.background = '#ef4444'
                            }
                          }}>
                          <Trash2 style={{ width: '12px', height: '12px', color: 'white' }} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Footer info */}
          <div style={{
            padding: '12px 24px',
            borderTop: `1px solid ${colors.border.primary}`,
            background: colors.bg.secondary,
            fontSize: '12px',
            color: colors.text.tertiary,
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <span>Mostrando página 1 de 1. | Total de registros é de {niveisUsuario.length}.</span>
            <span>Página 1</span>
          </div>

          {/* Empty State */}
          {filteredNiveis.length === 0 && (
            <div style={{
              padding: '60px 24px',
              textAlign: 'center'
            }}>
              <Shield style={{
                width: '48px',
                height: '48px',
                color: colors.text.tertiary,
                margin: '0 auto 16px'
              }} />
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: colors.text.primary,
                margin: '0 0 8px 0',
                transition: 'color 0.3s ease'
              }}>
                Nenhum nível encontrado
              </h3>
              <p style={{
                fontSize: '14px',
                color: colors.text.secondary,
                margin: 0,
                transition: 'color 0.3s ease'
              }}>
                {searchTerm ? 'Tente ajustar sua busca' : 'Adicione o primeiro nível de usuário'}
              </p>
            </div>
          )}
        </div>

        {/* Add Modal */}
        {showAddModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: colors.bg.primary,
              borderRadius: '12px',
              padding: '32px',
              width: '100%',
              maxWidth: '700px',
              margin: '0 24px',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: colors.text.primary,
                margin: '0 0 24px 0',
                transition: 'color 0.3s ease'
              }}>
                Adicionar Novo Nível de Usuário
              </h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: colors.text.secondary,
                    marginBottom: '8px',
                    transition: 'color 0.3s ease'
                  }}>
                    Nome do Nível *
                  </label>
                  <input
                    type="text"
                    value={newNivel.nome}
                    onChange={(e) => setNewNivel({ ...newNivel, nome: e.target.value })}
                    placeholder="Ex: Supervisor"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: `1px solid ${colors.border.primary}`,
                      borderRadius: '8px',
                      background: colors.bg.secondary,
                      color: colors.text.primary,
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'all 0.2s ease'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: colors.text.secondary,
                    marginBottom: '8px',
                    transition: 'color 0.3s ease'
                  }}>
                    Descrição *
                  </label>
                  <input
                    type="text"
                    value={newNivel.descricao}
                    onChange={(e) => setNewNivel({ ...newNivel, descricao: e.target.value })}
                    placeholder="Breve descrição das responsabilidades"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: `1px solid ${colors.border.primary}`,
                      borderRadius: '8px',
                      background: colors.bg.secondary,
                      color: colors.text.primary,
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'all 0.2s ease'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: colors.text.secondary,
                  marginBottom: '12px',
                  transition: 'color 0.3s ease'
                }}>
                  Permissões do Nível
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '8px',
                  padding: '16px',
                  background: colors.bg.tertiary,
                  borderRadius: '8px',
                  maxHeight: '200px',
                  overflowY: 'auto'
                }}>
                  {permissoesDisponiveis.map(permissao => (
                    <label key={permissao.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease',
                      background: newNivel.permissoes.includes(permissao.id) ? colors.bg.secondary : 'transparent'
                    }}
                    onMouseOver={(e) => {
                      if (!newNivel.permissoes.includes(permissao.id)) {
                        e.currentTarget.style.background = colors.bg.secondary
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!newNivel.permissoes.includes(permissao.id)) {
                        e.currentTarget.style.background = 'transparent'
                      }
                    }}>
                      <input
                        type="checkbox"
                        checked={newNivel.permissoes.includes(permissao.id)}
                        onChange={() => togglePermissao(permissao.id)}
                        style={{ margin: 0 }}
                      />
                      <div>
                        <div style={{
                          fontSize: '13px',
                          fontWeight: '500',
                          color: colors.text.primary
                        }}>
                          {permissao.nome}
                        </div>
                        <div style={{
                          fontSize: '11px',
                          color: colors.text.tertiary
                        }}>
                          {permissao.descricao}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: colors.text.tertiary,
                  marginTop: '8px'
                }}>
                  {newNivel.permissoes.length} permissões selecionadas
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setShowAddModal(false)}
                  style={{
                    padding: '12px 24px',
                    background: colors.bg.secondary,
                    border: `1px solid ${colors.border.primary}`,
                    borderRadius: '8px',
                    color: colors.text.primary,
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}>
                  Cancelar
                </button>
                
                <button
                  onClick={handleAddNivel}
                  disabled={!newNivel.nome.trim() || !newNivel.descricao.trim()}
                  style={{
                    padding: '12px 24px',
                    background: (newNivel.nome.trim() && newNivel.descricao.trim()) ? 
                      'linear-gradient(135deg, #10b981, #059669)' : colors.bg.tertiary,
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: (newNivel.nome.trim() && newNivel.descricao.trim()) ? 
                      'pointer' : 'not-allowed',
                    transition: 'all 0.2s ease',
                    opacity: (newNivel.nome.trim() && newNivel.descricao.trim()) ? 1 : 0.5
                  }}>
                  Adicionar Nível
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
