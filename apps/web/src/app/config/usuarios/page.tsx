"use client"
import { useState, useEffect } from 'react'
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useThemedStyles } from "@/hooks/use-themed-styles"
import { 
  UserCog, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  UserPlus,
  Shield,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Key,
  UserX,
  MoreVertical,
  Check,
  X
} from "lucide-react"

export default function UsuariosPage() {
  const { colors, getCardStyle } = useThemedStyles()
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [selectedAction, setSelectedAction] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [newUser, setNewUser] = useState({
    nome: '',
    email: '',
    cpf: '',
    celular: '',
    tipo: 'Admin',
    unidade: '',
    senha: ''
  })

  // Dados mock baseados na imagem mostrada
  const [usuarios, setUsuarios] = useState([
    { 
      id: 240, 
      nome: "Alexgroll", 
      tipo: "Admin", 
      cpf: "", 
      email: "alexgroll@admin.com", 
      celular: "", 
      unidade: "", 
      status: "Ativo", 
      cadastro: "30/07/2025 - 20:36" 
    },
    { 
      id: 190, 
      nome: "Dani Usuário", 
      tipo: "Admin", 
      cpf: "000.000.000-00", 
      email: "institutotdvidicial@gmail.com", 
      celular: "(00) 00000-000", 
      unidade: "Matriz - Barra da Tijuca - Rio de Janeiro/RJ", 
      status: "Ativo", 
      cadastro: "24/03/2025 - 17:13" 
    },
    { 
      id: 7, 
      nome: "Glauber Admin", 
      tipo: "Admin", 
      cpf: "000.000.000-00", 
      email: "glauber@glauberoficial.com", 
      celular: "(51) 99618-6704", 
      unidade: "", 
      status: "Ativo", 
      cadastro: "30/08/2023 - 12:24" 
    },
    { 
      id: 178, 
      nome: "Ginaha Pimenta", 
      tipo: "Admin", 
      cpf: "000.000.000-00", 
      email: "ginainapimentaoficial@gmail.com", 
      celular: "(21) 99232-1609", 
      unidade: "Unidade Nova América - Del Castilho - Rio de Janeiro - RJ", 
      status: "Ativo", 
      cadastro: "17/03/2025 - 18:32" 
    },
    { 
      id: 234, 
      nome: "Márcia Alves", 
      tipo: "Administrativo", 
      cpf: "000.000.000-00", 
      email: "avmarciaalves@gmail.com", 
      celular: "(00) 00000-0000", 
      unidade: "Matriz - Barra da Tijuca - Rio de Janeiro/RJ", 
      status: "Ativo", 
      cadastro: "11/07/2025 - 17:55" 
    },
    { 
      id: 181, 
      nome: "Pamela", 
      tipo: "Admin", 
      cpf: "000.000.000-00", 
      email: "pamifalcao@gmail.com", 
      celular: "(21) 98225-6063", 
      unidade: "Unidade Duque de Caxias", 
      status: "Suspenso", 
      cadastro: "18/03/2025 - 12:05" 
    },
    { 
      id: 140, 
      nome: "Pra cima Rh", 
      tipo: "Admin", 
      cpf: "149.608.197-82", 
      email: "pracimarh@gmail.com", 
      celular: "(21) 98289-4118", 
      unidade: "Matriz - Barra da Tijuca - Rio de Janeiro/RJ", 
      status: "Ativo", 
      cadastro: "22/11/2024 - 12:23" 
    },
    { 
      id: 66, 
      nome: "Priscila de Jesus", 
      tipo: "Admin", 
      cpf: "102.238.647-65", 
      email: "leoas4leoas@gmail.com", 
      celular: "(21) 98329-3250", 
      unidade: "Matriz - Barra da Tijuca - Rio de Janeiro/RJ", 
      status: "Ativo", 
      cadastro: "16/09/2024 - 11:24" 
    },
    { 
      id: 182, 
      nome: "Raquel Gomes", 
      tipo: "Admin", 
      cpf: "000.000.000-00", 
      email: "rqg1125@gmail.com", 
      celular: "(00) 00000-0000", 
      unidade: "Unidade Nova América - Del Castilho - Rio de Janeiro - RJ", 
      status: "Ativo", 
      cadastro: "18/03/2025 - 18:12" 
    },
    { 
      id: 222, 
      nome: "Rodrigo adm", 
      tipo: "Admin", 
      cpf: "000.000.000-00", 
      email: "terrasolus23@gmail.com", 
      celular: "(00) 00000-000", 
      unidade: "Empresários SA Conexão Brasil", 
      status: "Ativo", 
      cadastro: "16/06/2025 - 16:33" 
    },
    { 
      id: 179, 
      nome: "Verinaldo Nascimento", 
      tipo: "Admin", 
      cpf: "000.000.000-00", 
      email: "veriverinaldo@gmail.com", 
      celular: "(21) 99771-3356", 
      unidade: "Unidade Duque de Caxias", 
      status: "Ativo", 
      cadastro: "17/03/2025 - 20:07" 
    },
    { 
      id: 184, 
      nome: "Viviane G", 
      tipo: "Admin", 
      cpf: "000.000.000-00", 
      email: "vivigoncalves.okeo@gmail.com", 
      celular: "(00) 00000-0000", 
      unidade: "Matriz - Barra da Tijuca - Rio de Janeiro/RJ", 
      status: "Ativo", 
      cadastro: "20/03/2025 - 06:34" 
    },
    { 
      id: 29, 
      nome: "Wallace Admin", 
      tipo: "Admin", 
      cpf: "056.320.987-96", 
      email: "empresariossa1@gmail.com", 
      celular: "(21) 98028-0886", 
      unidade: "Matriz - Barra da Tijuca - Rio de Janeiro/RJ", 
      status: "Ativo", 
      cadastro: "27/04/2024 - 17:57" 
    },
    { 
      id: 64, 
      nome: "Wallace Entrevista", 
      tipo: "Administrativo", 
      cpf: "", 
      email: "wallace174@hotmail.com", 
      celular: "(21) 98028-0186", 
      unidade: "Unidade Nova América - Del Castilho - Rio de Janeiro - RJ", 
      status: "Ativo", 
      cadastro: "19/08/2024 - 12:56" 
    }
  ])

  const filteredUsuarios = usuarios.filter(usuario =>
    usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.cpf.includes(searchTerm)
  )

  const userTypes = ["Admin", "Administrativo", "Usuário", "Guest"]
  const unidades = [
    "Matriz - Barra da Tijuca - Rio de Janeiro/RJ",
    "Unidade Nova América - Del Castilho - Rio de Janeiro - RJ",
    "Unidade Duque de Caxias",
    "Empresários SA Conexão Brasil"
  ]

  const handleAddUser = () => {
    if (newUser.nome.trim() && newUser.email.trim()) {
      const newId = Math.max(...usuarios.map(u => u.id), 0) + 1
      setUsuarios([...usuarios, {
        id: newId,
        nome: newUser.nome,
        tipo: newUser.tipo,
        cpf: newUser.cpf,
        email: newUser.email,
        celular: newUser.celular,
        unidade: newUser.unidade,
        status: "Ativo",
        cadastro: new Date().toLocaleString('pt-BR')
      }])
      
      setNewUser({ nome: '', email: '', cpf: '', celular: '', tipo: 'Admin', unidade: '', senha: '' })
      setShowAddModal(false)
    }
  }

  const handleUserAction = (userId, action) => {
    setUsuarios(usuarios.map(user => {
      if (user.id === userId) {
        switch(action) {
          case 'inativar':
            return { ...user, status: 'Inativo' }
          case 'restar':
            alert(`Senha resetada para usuário ${user.nome}`)
            return user
          case 'suspender':
            return { ...user, status: 'Suspenso' }
          case 'ativar':
            return { ...user, status: 'Ativo' }
          default:
            return user
        }
      }
      return user
    }))
    setSelectedAction('')
    setSelectedUser(null)
  }

  const handleDeleteUser = (id) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      setUsuarios(usuarios.filter(user => user.id !== id))
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'Ativo': return '#10b981'
      case 'Inativo': return '#6b7280'
      case 'Suspenso': return '#ef4444'
      default: return colors.text.tertiary
    }
  }

  const getTipoIcon = (tipo) => {
    switch(tipo) {
      case 'Admin': return ShieldCheck
      case 'Administrativo': return Shield
      case 'Usuário': return UserCog
      default: return UserCog
    }
  }

  const formatCPF = (cpf) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  const formatPhone = (phone) => {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
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
            Usuários
          </h1>
          <p style={{
            fontSize: '16px',
            color: colors.text.secondary,
            margin: 0,
            transition: 'color 0.3s ease'
          }}>
            Gerencie usuários do sistema e permissões de acesso
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
              placeholder="Buscar usuário, email ou CPF..."
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
              <UserPlus style={{ width: '16px', height: '16px' }} />
              ADICIONAR
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={getCardStyle()}>
          {/* Table Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '60px 80px 80px 2fr 120px 180px 120px 2fr 80px 120px',
            gap: '12px',
            padding: '16px 24px',
            borderBottom: `1px solid ${colors.border.primary}`,
            background: colors.bg.secondary,
            borderRadius: '12px 12px 0 0'
          }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: colors.text.secondary, textTransform: 'uppercase' }}>
              AÇÕES
            </div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: colors.text.secondary, textTransform: 'uppercase' }}>
              STATUS
            </div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: colors.text.secondary, textTransform: 'uppercase' }}>
              TIPO
            </div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: colors.text.secondary, textTransform: 'uppercase' }}>
              NOME
            </div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: colors.text.secondary, textTransform: 'uppercase' }}>
              CPF
            </div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: colors.text.secondary, textTransform: 'uppercase' }}>
              EMAIL
            </div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: colors.text.secondary, textTransform: 'uppercase' }}>
              CELULAR
            </div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: colors.text.secondary, textTransform: 'uppercase' }}>
              UNIDADE
            </div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: colors.text.secondary, textTransform: 'uppercase' }}>
              ID
            </div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: colors.text.secondary, textTransform: 'uppercase' }}>
              CADASTRO
            </div>
          </div>

          {/* Table Body */}
          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {filteredUsuarios.map((usuario, index) => {
              const TipoIcon = getTipoIcon(usuario.tipo)
              return (
                <div key={usuario.id} style={{
                  display: 'grid',
                  gridTemplateColumns: '60px 80px 80px 2fr 120px 180px 120px 2fr 80px 120px',
                  gap: '12px',
                  padding: '16px 24px',
                  borderBottom: index < filteredUsuarios.length - 1 ? `1px solid ${colors.border.primary}` : 'none',
                  transition: 'background-color 0.2s ease',
                  alignItems: 'center'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = colors.bg.tertiary
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}>
                  
                  {/* Ações Dropdown */}
                  <div style={{ position: 'relative' }}>
                    <select
                      value={selectedUser === usuario.id ? selectedAction : ''}
                      onChange={(e) => {
                        if (e.target.value) {
                          setSelectedUser(usuario.id)
                          setSelectedAction(e.target.value)
                          handleUserAction(usuario.id, e.target.value)
                        }
                      }}
                      style={{
                        width: '50px',
                        height: '24px',
                        fontSize: '10px',
                        padding: '2px 4px',
                        border: `1px solid ${colors.border.primary}`,
                        borderRadius: '4px',
                        background: '#10b981',
                        color: 'white',
                        cursor: 'pointer'
                      }}>
                      <option value="">Ações</option>
                      <option value="ver">Ver / Editar</option>
                      {usuario.status === 'Ativo' && <option value="inativar">Inativar</option>}
                      {usuario.status !== 'Ativo' && <option value="ativar">Ativar</option>}
                      <option value="restar">Resetar senha</option>
                      {usuario.status !== 'Suspenso' && <option value="suspender">Suspender</option>}
                    </select>
                  </div>

                  {/* Status */}
                  <div>
                    <span style={{
                      padding: '2px 6px',
                      borderRadius: '12px',
                      fontSize: '10px',
                      fontWeight: '500',
                      background: getStatusColor(usuario.status) + '20',
                      color: getStatusColor(usuario.status),
                      border: `1px solid ${getStatusColor(usuario.status)}`
                    }}>
                      {usuario.status}
                    </span>
                  </div>

                  {/* Tipo */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <TipoIcon style={{ 
                      width: '14px', 
                      height: '14px', 
                      color: usuario.tipo === 'Admin' ? '#8b5cf6' : '#3b82f6'
                    }} />
                    <span style={{
                      fontSize: '12px',
                      color: colors.text.primary,
                      fontWeight: '500'
                    }}>
                      {usuario.tipo}
                    </span>
                  </div>

                  {/* Nome */}
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: colors.text.primary,
                    transition: 'color 0.3s ease'
                  }}>
                    {usuario.nome}
                  </div>

                  {/* CPF */}
                  <div style={{
                    fontSize: '12px',
                    color: colors.text.secondary,
                    fontFamily: 'monospace',
                    transition: 'color 0.3s ease'
                  }}>
                    {usuario.cpf || '-'}
                  </div>

                  {/* Email */}
                  <div style={{
                    fontSize: '12px',
                    color: colors.text.secondary,
                    transition: 'color 0.3s ease',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {usuario.email}
                  </div>

                  {/* Celular */}
                  <div style={{
                    fontSize: '12px',
                    color: colors.text.secondary,
                    fontFamily: 'monospace',
                    transition: 'color 0.3s ease'
                  }}>
                    {usuario.celular || '-'}
                  </div>

                  {/* Unidade */}
                  <div style={{
                    fontSize: '11px',
                    color: colors.text.tertiary,
                    transition: 'color 0.3s ease',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {usuario.unidade || '-'}
                  </div>

                  {/* ID */}
                  <div style={{
                    fontSize: '14px',
                    color: colors.text.secondary,
                    fontFamily: 'monospace',
                    fontWeight: '600',
                    transition: 'color 0.3s ease'
                  }}>
                    {usuario.id}
                  </div>

                  {/* Cadastro */}
                  <div style={{
                    fontSize: '11px',
                    color: colors.text.tertiary,
                    transition: 'color 0.3s ease'
                  }}>
                    {usuario.cadastro}
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
            <span>Mostrando página 1 de 1. | Total de registros é de {usuarios.length}.</span>
            <span>Página 1</span>
          </div>

          {/* Empty State */}
          {filteredUsuarios.length === 0 && (
            <div style={{
              padding: '60px 24px',
              textAlign: 'center'
            }}>
              <UserCog style={{
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
                Nenhum usuário encontrado
              </h3>
              <p style={{
                fontSize: '14px',
                color: colors.text.secondary,
                margin: 0,
                transition: 'color 0.3s ease'
              }}>
                {searchTerm ? 'Tente ajustar sua busca' : 'Adicione o primeiro usuário'}
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
                Adicionar Novo Usuário
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
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    value={newUser.nome}
                    onChange={(e) => setNewUser({ ...newUser, nome: e.target.value })}
                    placeholder="Nome completo do usuário"
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
                    Email *
                  </label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="email@exemplo.com"
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
                    CPF
                  </label>
                  <input
                    type="text"
                    value={newUser.cpf}
                    onChange={(e) => setNewUser({ ...newUser, cpf: e.target.value })}
                    placeholder="000.000.000-00"
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
                    Celular
                  </label>
                  <input
                    type="text"
                    value={newUser.celular}
                    onChange={(e) => setNewUser({ ...newUser, celular: e.target.value })}
                    placeholder="(21) 99999-9999"
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
                    Tipo de Usuário *
                  </label>
                  <select
                    value={newUser.tipo}
                    onChange={(e) => setNewUser({ ...newUser, tipo: e.target.value })}
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
                    }}>
                    {userTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
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
                    Unidade
                  </label>
                  <select
                    value={newUser.unidade}
                    onChange={(e) => setNewUser({ ...newUser, unidade: e.target.value })}
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
                    }}>
                    <option value="">Selecione uma unidade</option>
                    {unidades.map(unidade => (
                      <option key={unidade} value={unidade}>{unidade}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: colors.text.secondary,
                  marginBottom: '8px',
                  transition: 'color 0.3s ease'
                }}>
                  Senha Inicial *
                </label>
                <input
                  type="password"
                  value={newUser.senha}
                  onChange={(e) => setNewUser({ ...newUser, senha: e.target.value })}
                  placeholder="Senha de acesso inicial"
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
                  onClick={handleAddUser}
                  disabled={!newUser.nome.trim() || !newUser.email.trim() || !newUser.senha.trim()}
                  style={{
                    padding: '12px 24px',
                    background: (newUser.nome.trim() && newUser.email.trim() && newUser.senha.trim()) ? 
                      'linear-gradient(135deg, #10b981, #059669)' : colors.bg.tertiary,
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: (newUser.nome.trim() && newUser.email.trim() && newUser.senha.trim()) ? 
                      'pointer' : 'not-allowed',
                    transition: 'all 0.2s ease',
                    opacity: (newUser.nome.trim() && newUser.email.trim() && newUser.senha.trim()) ? 1 : 0.5
                  }}>
                  Adicionar Usuário
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
