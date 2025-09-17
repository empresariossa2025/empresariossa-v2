"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useState, useEffect } from "react"
import { User } from "@/types"
import { api } from "@/lib/api"
import { Users, Plus, Search, Edit, Trash2, Eye, UserCheck } from "lucide-react"

export default function MembrosConsultaPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await api.get('/users')
      setUsers(response.data.users || [])
    } catch (error) {
      console.error('Erro ao carregar membros:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = users.filter(user => 
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <DashboardLayout>
      <div style={{ padding: '24px' }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          marginBottom: '24px' 
        }}>
          <div>
            <h1 style={{ 
              fontSize: '28px', 
              fontWeight: 'bold', 
              color: '#1e293b', 
              margin: 0,
              marginBottom: '8px'
            }}>
              Membros - Consulta/Cadastro
            </h1>
            <p style={{ 
              fontSize: '16px', 
              color: '#64748b', 
              margin: 0 
            }}>
              Gerencie membros do clube de negócios
            </p>
          </div>
          
          <button style={{
            backgroundColor: '#06b6d4',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            padding: '12px 20px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(6, 182, 212, 0.3)'
          }}>
            <Plus style={{ width: '18px', height: '18px' }} />
            Novo Membro
          </button>
        </div>

        {/* Search and Filters */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          border: '1px solid #f1f5f9'
        }}>
          <div style={{ position: 'relative', maxWidth: '400px' }}>
            <Search style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '18px',
              height: '18px',
              color: '#94a3b8'
            }} />
            <input
              type="text"
              placeholder="Buscar membros..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 12px 12px 40px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#06b6d4'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>
        </div>

        {/* Members Table */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          border: '1px solid #f1f5f9',
          overflow: 'hidden'
        }}>
          <div style={{ 
            padding: '20px', 
            borderBottom: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <UserCheck style={{ width: '20px', height: '20px', color: '#06b6d4' }} />
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: '600', 
              color: '#1e293b', 
              margin: 0 
            }}>
              Lista de Membros ({filteredUsers.length})
            </h3>
          </div>

          {loading ? (
            <div style={{ 
              padding: '60px', 
              textAlign: 'center', 
              color: '#64748b' 
            }}>
              Carregando membros...
            </div>
          ) : filteredUsers.length === 0 ? (
            <div style={{ 
              padding: '60px', 
              textAlign: 'center', 
              color: '#64748b' 
            }}>
              Nenhum membro encontrado
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc' }}>
                    <th style={{ 
                      padding: '16px 20px', 
                      textAlign: 'left', 
                      fontSize: '12px', 
                      fontWeight: '600', 
                      color: '#64748b',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Membro
                    </th>
                    <th style={{ 
                      padding: '16px 20px', 
                      textAlign: 'left', 
                      fontSize: '12px', 
                      fontWeight: '600', 
                      color: '#64748b',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Documento
                    </th>
                    <th style={{ 
                      padding: '16px 20px', 
                      textAlign: 'left', 
                      fontSize: '12px', 
                      fontWeight: '600', 
                      color: '#64748b',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Nível
                    </th>
                    <th style={{ 
                      padding: '16px 20px', 
                      textAlign: 'left', 
                      fontSize: '12px', 
                      fontWeight: '600', 
                      color: '#64748b',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Status
                    </th>
                    <th style={{ 
                      padding: '16px 20px', 
                      textAlign: 'center', 
                      fontSize: '12px', 
                      fontWeight: '600', 
                      color: '#64748b',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr 
                      key={user.id}
                      style={{ 
                        borderBottom: index < filteredUsers.length - 1 ? '1px solid #f1f5f9' : 'none'
                      }}
                    >
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            backgroundColor: '#f0fdff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <span style={{ 
                              color: '#0891b2', 
                              fontWeight: '600',
                              fontSize: '14px'
                            }}>
                              {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p style={{ 
                              fontSize: '14px', 
                              fontWeight: '500', 
                              color: '#1e293b', 
                              margin: 0,
                              marginBottom: '2px'
                            }}>
                              {user.firstName} {user.lastName}
                            </p>
                            <p style={{ 
                              fontSize: '13px', 
                              color: '#64748b', 
                              margin: 0 
                            }}>
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{ 
                          fontSize: '14px', 
                          color: '#475569' 
                        }}>
                          {user.cpf || user.cnpj || '-'}
                        </span>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500',
                          backgroundColor: user.role === 'ADMIN' ? '#fef3c7' : 
                                         user.role === 'MANAGER' ? '#dbeafe' : '#f0fdf4',
                          color: user.role === 'ADMIN' ? '#92400e' : 
                                 user.role === 'MANAGER' ? '#1e40af' : '#166534'
                        }}>
                          {user.role}
                        </span>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500',
                          backgroundColor: user.isActive ? '#dcfce7' : '#fee2e2',
                          color: user.isActive ? '#166534' : '#dc2626'
                        }}>
                          {user.isActive ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                          <button style={{
                            padding: '6px',
                            borderRadius: '6px',
                            border: 'none',
                            backgroundColor: '#f1f5f9',
                            cursor: 'pointer'
                          }}>
                            <Eye style={{ width: '14px', height: '14px', color: '#64748b' }} />
                          </button>
                          <button style={{
                            padding: '6px',
                            borderRadius: '6px',
                            border: 'none',
                            backgroundColor: '#f0fdff',
                            cursor: 'pointer'
                          }}>
                            <Edit style={{ width: '14px', height: '14px', color: '#0891b2' }} />
                          </button>
                          <button style={{
                            padding: '6px',
                            borderRadius: '6px',
                            border: 'none',
                            backgroundColor: '#fef2f2',
                            cursor: 'pointer'
                          }}>
                            <Trash2 style={{ width: '14px', height: '14px', color: '#dc2626' }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
