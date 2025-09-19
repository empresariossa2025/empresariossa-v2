"use client"
import { useState, useEffect } from 'react'
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useThemedStyles } from "@/hooks/use-themed-styles"
import { 
  Building, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  MoreVertical,
  Check,
  X
} from "lucide-react"

export default function RamosNegocioPage() {
  const { colors, getCardStyle } = useThemedStyles()
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [newRamo, setNewRamo] = useState({ nome: '', descricao: '' })

  // Dados mock baseados na imagem mostrada
  const [ramosNegocio, setRamosNegocio] = useState([
    { id: 196, nome: "Administradora de condomínios", cadastro: "25/02/2025 - 11:09", ativo: true },
    { id: 198, nome: "Advocacia Empresarial", cadastro: "26/02/2025 - 10:36", ativo: true },
    { id: 11, nome: "Advocacia Especializada em Startups e Empreendedorismo", cadastro: "13/02/2024 - 14:18", ativo: true },
    { id: 197, nome: "Advogado Empresarial especialista em contratos", cadastro: "26/02/2025 - 10:34", ativo: true },
    { id: 69, nome: "Agência de Viagens e Turismo", cadastro: "13/02/2024 - 14:18", ativo: true },
    { id: 97, nome: "Animação de Eventos e Festas", cadastro: "13/02/2024 - 14:18", ativo: true },
    { id: 124, nome: "Animação de Festas Infantis", cadastro: "13/02/2024 - 14:18", ativo: true },
    { id: 125, nome: "Animação de Festas Temáticas", cadastro: "13/02/2024 - 14:18", ativo: true },
    { id: 67, nome: "Arquitetura e Design de Interiores", cadastro: "13/02/2024 - 14:18", ativo: true },
    { id: 13, nome: "Arquitetura Residencial e Comercial", cadastro: "13/02/2024 - 14:18", ativo: true },
    { id: 72, nome: "Assessoria em Comunicação e Relações Públicas", cadastro: "13/02/2024 - 14:18", ativo: true },
    { id: 30, nome: "Assessoria em Fusões e Aquisições", cadastro: "13/02/2024 - 14:18", ativo: true },
    { id: 166, nome: "Assessoria Micro market", cadastro: "22/09/2024 - 22:58", ativo: true },
    { id: 113, nome: "Assessoria para Empresas em Licitações Governamentais", cadastro: "13/02/2024 - 14:18", ativo: true },
    { id: 117, nome: "Assessoria para Obtenção de Capital de Giro e Investimento", cadastro: "13/02/2024 - 14:18", ativo: true },
    { id: 28, nome: "Auditoria Contábil e Fiscal", cadastro: "13/02/2024 - 14:18", ativo: true },
    { id: 192, nome: "Automação de Conversas (Alguns dizem CHATBOT para WhatsApp)", cadastro: "24/01/2025 - 11:42", ativo: true },
    { id: 186, nome: "Autorizado Especialista em Alavancagem Patrimonial", cadastro: "17/12/2024 - 14:13", ativo: true },
    { id: 195, nome: "BPO-financeiro", cadastro: "17/02/2025 - 11:09", ativo: true },
    { id: 161, nome: "Buffet", cadastro: "28/04/2024 - 18:56", ativo: true }
  ])

  const filteredRamos = ramosNegocio.filter(ramo =>
    ramo.nome.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddRamo = () => {
    if (newRamo.nome.trim()) {
      const newId = Math.max(...ramosNegocio.map(r => r.id)) + 1
      setRamosNegocio([...ramosNegocio, {
        id: newId,
        nome: newRamo.nome,
        cadastro: new Date().toLocaleString('pt-BR'),
        ativo: true
      }])
      setNewRamo({ nome: '', descricao: '' })
      setShowAddModal(false)
    }
  }

  const handleEditRamo = (id, newName) => {
    setRamosNegocio(ramosNegocio.map(ramo => 
      ramo.id === id ? { ...ramo, nome: newName } : ramo
    ))
    setEditingItem(null)
  }

  const handleDeleteRamo = (id) => {
    if (confirm('Tem certeza que deseja excluir este ramo de negócio?')) {
      setRamosNegocio(ramosNegocio.filter(ramo => ramo.id !== id))
    }
  }

  const toggleAtivo = (id) => {
    setRamosNegocio(ramosNegocio.map(ramo => 
      ramo.id === id ? { ...ramo, ativo: !ramo.ativo } : ramo
    ))
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
            Ramos de Negócio
          </h1>
          <p style={{
            fontSize: '16px',
            color: colors.text.secondary,
            margin: 0,
            transition: 'color 0.3s ease'
          }}>
            Configure setores e categorias empresariais
          </p>
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
              placeholder="Buscar ramo de negócio..."
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
            gridTemplateColumns: '60px 1fr 120px 200px 100px 80px',
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
              NOME
            </div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: colors.text.secondary, textTransform: 'uppercase' }}>
              ID
            </div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: colors.text.secondary, textTransform: 'uppercase' }}>
              CADASTRO
            </div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: colors.text.secondary, textTransform: 'uppercase' }}>
              STATUS
            </div>
            <div></div>
          </div>

          {/* Table Body */}
          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {filteredRamos.map((ramo, index) => (
              <div key={ramo.id} style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr 120px 200px 100px 80px',
                gap: '16px',
                padding: '16px 24px',
                borderBottom: index < filteredRamos.length - 1 ? `1px solid ${colors.border.primary}` : 'none',
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

                {/* Nome */}
                <div>
                  {editingItem === ramo.id ? (
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input
                        type="text"
                        defaultValue={ramo.nome}
                        style={{
                          flex: 1,
                          padding: '6px 8px',
                          border: `1px solid ${colors.border.primary}`,
                          borderRadius: '4px',
                          background: colors.bg.primary,
                          color: colors.text.primary,
                          fontSize: '14px'
                        }}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleEditRamo(ramo.id, e.target.value)
                          }
                        }}
                        autoFocus
                      />
                      <button
                        onClick={() => {
                          const input = document.querySelector(`input[defaultValue="${ramo.nome}"]`)
                          handleEditRamo(ramo.id, input.value)
                        }}
                        style={{
                          background: '#10b981',
                          border: 'none',
                          borderRadius: '4px',
                          color: 'white',
                          cursor: 'pointer',
                          padding: '4px'
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
                          padding: '4px'
                        }}>
                        <X style={{ width: '12px', height: '12px' }} />
                      </button>
                    </div>
                  ) : (
                    <span style={{
                      fontSize: '14px',
                      color: colors.text.primary,
                      transition: 'color 0.3s ease'
                    }}>
                      {ramo.nome}
                    </span>
                  )}
                </div>

                {/* ID */}
                <div style={{
                  fontSize: '14px',
                  color: colors.text.secondary,
                  fontFamily: 'monospace',
                  transition: 'color 0.3s ease'
                }}>
                  {ramo.id}
                </div>

                {/* Cadastro */}
                <div style={{
                  fontSize: '12px',
                  color: colors.text.tertiary,
                  transition: 'color 0.3s ease'
                }}>
                  {ramo.cadastro}
                </div>

                {/* Status */}
                <div>
                  <button
                    onClick={() => toggleAtivo(ramo.id)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      border: 'none',
                      fontSize: '10px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      background: ramo.ativo ? '#10b981' : '#ef4444',
                      color: 'white',
                      transition: 'all 0.2s ease'
                    }}>
                    {ramo.ativo ? 'ATIVO' : 'INATIVO'}
                  </button>
                </div>

                {/* Menu Actions */}
                <div style={{ position: 'relative' }}>
                  <div style={{
                    display: 'flex',
                    gap: '4px',
                    justifyContent: 'flex-end'
                  }}>
                    <button
                      onClick={() => setEditingItem(ramo.id)}
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
                      onClick={() => handleDeleteRamo(ramo.id)}
                      style={{
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#ef4444',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.background = '#dc2626'}
                      onMouseOut={(e) => e.currentTarget.style.background = '#ef4444'}>
                      <Trash2 style={{ width: '12px', height: '12px', color: 'white' }} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredRamos.length === 0 && (
            <div style={{
              padding: '60px 24px',
              textAlign: 'center'
            }}>
              <Building style={{
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
                Nenhum ramo encontrado
              </h3>
              <p style={{
                fontSize: '14px',
                color: colors.text.secondary,
                margin: 0,
                transition: 'color 0.3s ease'
              }}>
                {searchTerm ? 'Tente ajustar sua busca' : 'Adicione o primeiro ramo de negócio'}
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
              maxWidth: '500px',
              margin: '0 24px'
            }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: colors.text.primary,
                margin: '0 0 24px 0',
                transition: 'color 0.3s ease'
              }}>
                Adicionar Ramo de Negócio
              </h2>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: colors.text.secondary,
                  marginBottom: '8px',
                  transition: 'color 0.3s ease'
                }}>
                  Nome do Ramo de Negócio
                </label>
                <input
                  type="text"
                  value={newRamo.nome}
                  onChange={(e) => setNewRamo({ ...newRamo, nome: e.target.value })}
                  placeholder="Ex: Advocacia Empresarial"
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
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = colors.bg.tertiary
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = colors.bg.secondary
                  }}>
                  Cancelar
                </button>
                
                <button
                  onClick={handleAddRamo}
                  disabled={!newRamo.nome.trim()}
                  style={{
                    padding: '12px 24px',
                    background: newRamo.nome.trim() ? 'linear-gradient(135deg, #10b981, #059669)' : colors.bg.tertiary,
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: newRamo.nome.trim() ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s ease',
                    opacity: newRamo.nome.trim() ? 1 : 0.5
                  }}>
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
