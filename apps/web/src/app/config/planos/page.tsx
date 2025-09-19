"use client"
import { useState, useEffect } from 'react'
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useThemedStyles } from "@/hooks/use-themed-styles"
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  DollarSign,
  Calendar,
  Check,
  X,
  Info
} from "lucide-react"

export default function PlanosPage() {
  const { colors, getCardStyle } = useThemedStyles()
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [newPlano, setNewPlano] = useState({
    nome: '',
    valorAnual: '',
    taxaMensal: 1.8, // Taxa típica brasileira para associações
    descontoAnual: 10 // Desconto para pagamento à vista anual
  })

  // Dados mock baseados na realidade brasileira
  const [planos, setPlanos] = useState([
    { 
      id: 5, 
      nome: "Plano Anual", 
      valorAnual: 3105.00, // Valor com desconto à vista
      valorBase: 3450.00, // Valor sem desconto
      taxaMensal: 1.8, // 1.8% ao mês
      descontoAnual: 10, // 10% desconto à vista
      valorMensal: 306.21, // Calculado com juros
      valorTrimestral: 897.54, // 3 parcelas com juros
      valorSemestral: 1734.78, // 6 parcelas com juros
      cadastro: "26/06/2024 - 16:22", 
      ativo: true 
    }
  ])

  const filteredPlanos = planos.filter(plano =>
    plano.nome.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Função para calcular parcelas com juros compostos (sistema brasileiro)
  const calculatePayments = (valorAnual, taxaMensal, descontoAnual) => {
    // 1. Calcular valor base (sem desconto)
    const valorBase = valorAnual / (1 - descontoAnual / 100)
    
    // 2. Taxa mensal decimal
    const taxa = taxaMensal / 100
    
    // 3. Calcular PMT (Payment) usando fórmula brasileira
    // PMT = PV * [taxa * (1 + taxa)^n] / [(1 + taxa)^n - 1]
    
    // Mensal (12 parcelas)
    const n12 = 12
    const factor12 = Math.pow(1 + taxa, n12)
    const valorMensal = valorBase * (taxa * factor12) / (factor12 - 1)
    
    // Trimestral (4 parcelas)  
    const n4 = 4
    const taxaTrimestral = Math.pow(1 + taxa, 3) - 1 // Taxa trimestral equivalente
    const factor4 = Math.pow(1 + taxaTrimestral, n4)
    const valorTrimestral = valorBase * (taxaTrimestral * factor4) / (factor4 - 1)
    
    // Semestral (2 parcelas)
    const n2 = 2
    const taxaSemestral = Math.pow(1 + taxa, 6) - 1 // Taxa semestral equivalente
    const factor2 = Math.pow(1 + taxaSemestral, n2)
    const valorSemestral = valorBase * (taxaSemestral * factor2) / (factor2 - 1)

    return {
      valorBase: valorBase,
      mensal: valorMensal,
      trimestral: valorTrimestral,
      semestral: valorSemestral,
      anual: valorAnual // Com desconto à vista
    }
  }

  const handleAddPlano = () => {
    if (newPlano.nome.trim() && newPlano.valorAnual) {
      const newId = Math.max(...planos.map(p => p.id), 0) + 1
      const values = calculatePayments(
        parseFloat(newPlano.valorAnual), 
        newPlano.taxaMensal, 
        newPlano.descontoAnual
      )
      
      setPlanos([...planos, {
        id: newId,
        nome: newPlano.nome,
        valorAnual: parseFloat(newPlano.valorAnual),
        valorBase: values.valorBase,
        taxaMensal: newPlano.taxaMensal,
        descontoAnual: newPlano.descontoAnual,
        valorMensal: values.mensal,
        valorTrimestral: values.trimestral,
        valorSemestral: values.semestral,
        cadastro: new Date().toLocaleString('pt-BR'),
        ativo: true
      }])
      
      setNewPlano({ 
        nome: '', 
        valorAnual: '', 
        taxaMensal: 1.8, 
        descontoAnual: 10 
      })
      setShowAddModal(false)
    }
  }

  const handleEditPlano = (id, newName, newValue) => {
    const plano = planos.find(p => p.id === id)
    const values = calculatePayments(
      parseFloat(newValue), 
      plano.taxaMensal, 
      plano.descontoAnual
    )
    
    setPlanos(planos.map(p => 
      p.id === id ? { 
        ...p, 
        nome: newName,
        valorAnual: parseFloat(newValue),
        valorBase: values.valorBase,
        valorMensal: values.mensal,
        valorTrimestral: values.trimestral,
        valorSemestral: values.semestral
      } : p
    ))
    setEditingItem(null)
  }

  const handleDeletePlano = (id) => {
    if (confirm('Tem certeza que deseja excluir este plano?')) {
      setPlanos(planos.filter(plano => plano.id !== id))
    }
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(value)
  }

  // Preview dos valores para o modal
  const previewValues = newPlano.valorAnual ? 
    calculatePayments(
      parseFloat(newPlano.valorAnual), 
      newPlano.taxaMensal, 
      newPlano.descontoAnual
    ) : null

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
            Planos
          </h1>
          <p style={{
            fontSize: '16px',
            color: colors.text.secondary,
            margin: 0,
            transition: 'color 0.3s ease'
          }}>
            Configure planos de associação com cálculo de juros brasileiro
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
                Sistema de Cálculo Brasileiro
              </h4>
              <p style={{ margin: 0, fontSize: '13px', opacity: 0.9, lineHeight: '1.4' }}>
                • Valor anual com <strong>desconto à vista</strong> (padrão: 10%)<br/>
                • Parcelas mensais com <strong>juros compostos</strong> (padrão: 1,8% a.m.)<br/>
                • Cálculo segue normas financeiras brasileiras para associações
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
              placeholder="Buscar plano..."
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
            gridTemplateColumns: '60px 2fr 1fr 1fr 1fr 1fr 80px 150px 80px',
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
              MENSAL*
            </div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: colors.text.secondary, textTransform: 'uppercase' }}>
              TRIMESTRAL*
            </div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: colors.text.secondary, textTransform: 'uppercase' }}>
              SEMESTRAL*
            </div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: colors.text.secondary, textTransform: 'uppercase' }}>
              ANUAL**
            </div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: colors.text.secondary, textTransform: 'uppercase' }}>
              ID
            </div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: colors.text.secondary, textTransform: 'uppercase' }}>
              CADASTRO
            </div>
            <div></div>
          </div>

          {/* Table Body */}
          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {filteredPlanos.map((plano, index) => (
              <div key={plano.id} style={{
                display: 'grid',
                gridTemplateColumns: '60px 2fr 1fr 1fr 1fr 1fr 80px 150px 80px',
                gap: '16px',
                padding: '16px 24px',
                borderBottom: index < filteredPlanos.length - 1 ? `1px solid ${colors.border.primary}` : 'none',
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
                  {editingItem === plano.id ? (
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input
                        type="text"
                        defaultValue={plano.nome}
                        style={{
                          flex: 1,
                          padding: '6px 8px',
                          border: `1px solid ${colors.border.primary}`,
                          borderRadius: '4px',
                          background: colors.bg.primary,
                          color: colors.text.primary,
                          fontSize: '14px'
                        }}
                        id={`edit-name-${plano.id}`}
                        autoFocus
                      />
                    </div>
                  ) : (
                    <div>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        color: colors.text.primary,
                        transition: 'color 0.3s ease'
                      }}>
                        {plano.nome}
                      </span>
                      <div style={{
                        fontSize: '11px',
                        color: colors.text.tertiary,
                        marginTop: '2px'
                      }}>
                        Taxa: {plano.taxaMensal}% a.m.
                      </div>
                    </div>
                  )}
                </div>

                {/* Valor Mensal */}
                <div style={{
                  fontSize: '14px',
                  color: colors.text.primary,
                  fontFamily: 'monospace',
                  transition: 'color 0.3s ease'
                }}>
                  {formatCurrency(plano.valorMensal)}
                </div>

                {/* Valor Trimestral */}
                <div style={{
                  fontSize: '14px',
                  color: colors.text.primary,
                  fontFamily: 'monospace',
                  transition: 'color 0.3s ease'
                }}>
                  {formatCurrency(plano.valorTrimestral)}
                </div>

                {/* Valor Semestral */}
                <div style={{
                  fontSize: '14px',
                  color: colors.text.primary,
                  fontFamily: 'monospace',
                  transition: 'color 0.3s ease'
                }}>
                  {formatCurrency(plano.valorSemestral)}
                </div>

                {/* Valor Anual */}
                <div>
                  {editingItem === plano.id ? (
                    <input
                      type="number"
                      step="0.01"
                      defaultValue={plano.valorAnual}
                      style={{
                        width: '100%',
                        padding: '6px 8px',
                        border: `1px solid ${colors.border.primary}`,
                        borderRadius: '4px',
                        background: colors.bg.primary,
                        color: colors.text.primary,
                        fontSize: '14px',
                        fontFamily: 'monospace'
                      }}
                      id={`edit-value-${plano.id}`}
                    />
                  ) : (
                    <div>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#10b981',
                        fontFamily: 'monospace'
                      }}>
                        {formatCurrency(plano.valorAnual)}
                      </span>
                      <div style={{
                        fontSize: '11px',
                        color: '#10b981',
                        marginTop: '2px'
                      }}>
                        -{plano.descontoAnual}% desc.
                      </div>
                    </div>
                  )}
                </div>

                {/* ID */}
                <div style={{
                  fontSize: '14px',
                  color: colors.text.secondary,
                  fontFamily: 'monospace',
                  transition: 'color 0.3s ease'
                }}>
                  {plano.id}
                </div>

                {/* Cadastro */}
                <div style={{
                  fontSize: '12px',
                  color: colors.text.tertiary,
                  transition: 'color 0.3s ease'
                }}>
                  {plano.cadastro}
                </div>

                {/* Menu Actions */}
                <div style={{ position: 'relative' }}>
                  {editingItem === plano.id ? (
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button
                        onClick={() => {
                          const nameInput = document.getElementById(`edit-name-${plano.id}`)
                          const valueInput = document.getElementById(`edit-value-${plano.id}`)
                          handleEditPlano(plano.id, nameInput.value, valueInput.value)
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
                    <div style={{
                      display: 'flex',
                      gap: '4px',
                      justifyContent: 'flex-end'
                    }}>
                      <button
                        onClick={() => setEditingItem(plano.id)}
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
                        onClick={() => handleDeletePlano(plano.id)}
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
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div style={{
            padding: '12px 24px',
            borderTop: `1px solid ${colors.border.primary}`,
            background: colors.bg.secondary,
            fontSize: '11px',
            color: colors.text.tertiary
          }}>
            * Valores com juros compostos • ** Valor à vista com desconto
          </div>

          {/* Empty State */}
          {filteredPlanos.length === 0 && (
            <div style={{
              padding: '60px 24px',
              textAlign: 'center'
            }}>
              <Package style={{
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
                Nenhum plano encontrado
              </h3>
              <p style={{
                fontSize: '14px',
                color: colors.text.secondary,
                margin: 0,
                transition: 'color 0.3s ease'
              }}>
                {searchTerm ? 'Tente ajustar sua busca' : 'Adicione o primeiro plano'}
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
              maxWidth: '600px',
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
                Adicionar Novo Plano
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
                    Nome do Plano
                  </label>
                  <input
                    type="text"
                    value={newPlano.nome}
                    onChange={(e) => setNewPlano({ ...newPlano, nome: e.target.value })}
                    placeholder="Ex: Plano Premium"
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
                    Valor Anual à Vista (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newPlano.valorAnual}
                    onChange={(e) => setNewPlano({ ...newPlano, valorAnual: e.target.value })}
                    placeholder="3105.00"
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
                    Taxa Mensal (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={newPlano.taxaMensal}
                    onChange={(e) => setNewPlano({ ...newPlano, taxaMensal: parseFloat(e.target.value) || 1.8 })}
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
                    Desconto Anual (%)
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={newPlano.descontoAnual}
                    onChange={(e) => setNewPlano({ ...newPlano, descontoAnual: parseInt(e.target.value) || 10 })}
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

              {/* Preview dos valores calculados */}
              {previewValues && (
                <div style={{
                  marginBottom: '24px',
                  padding: '16px',
                  background: colors.bg.tertiary,
                  borderRadius: '8px',
                  fontSize: '14px'
                }}>
                  <h4 style={{ margin: '0 0 12px 0', color: colors.text.primary }}>Simulação de Valores:</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div>
                      <strong style={{ color: '#10b981' }}>À Vista Anual:</strong><br/>
                      <span style={{ fontFamily: 'monospace' }}>{formatCurrency(parseFloat(newPlano.valorAnual))}</span>
                      <span style={{ fontSize: '12px', color: '#10b981' }}> (-{newPlano.descontoAnual}% desc.)</span>
                    </div>
                    <div>
                      <strong style={{ color: colors.text.primary }}>Valor Base:</strong><br/>
                      <span style={{ fontFamily: 'monospace' }}>{formatCurrency(previewValues.valorBase)}</span>
                    </div>
                    <div>
                      <strong style={{ color: colors.text.primary }}>12x Mensal:</strong><br/>
                      <span style={{ fontFamily: 'monospace' }}>{formatCurrency(previewValues.mensal)}</span>
                    </div>
                    <div>
                      <strong style={{ color: colors.text.primary }}>4x Trimestral:</strong><br/>
                      <span style={{ fontFamily: 'monospace' }}>{formatCurrency(previewValues.trimestral)}</span>
                    </div>
                    <div>
                      <strong style={{ color: colors.text.primary }}>2x Semestral:</strong><br/>
                      <span style={{ fontFamily: 'monospace' }}>{formatCurrency(previewValues.semestral)}</span>
                    </div>
                  </div>
                  <div style={{ 
                    marginTop: '12px', 
                    padding: '8px', 
                    background: colors.bg.secondary, 
                    borderRadius: '4px',
                    fontSize: '12px',
                    color: colors.text.secondary
                  }}>
                    Taxa equivalente anual: {((Math.pow(1 + newPlano.taxaMensal/100, 12) - 1) * 100).toFixed(2)}%
                  </div>
                </div>
              )}

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
                  onClick={handleAddPlano}
                  disabled={!newPlano.nome.trim() || !newPlano.valorAnual}
                  style={{
                    padding: '12px 24px',
                    background: (newPlano.nome.trim() && newPlano.valorAnual) ? 'linear-gradient(135deg, #10b981, #059669)' : colors.bg.tertiary,
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: (newPlano.nome.trim() && newPlano.valorAnual) ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s ease',
                    opacity: (newPlano.nome.trim() && newPlano.valorAnual) ? 1 : 0.5
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
