"use client"
import { useState, useEffect } from "react"
import { useThemedStyles } from "@/hooks/use-themed-styles"
import { ProMembersSidebar } from "@/components/layout/pro-members-sidebar"
import { SimpleEnhancedHeader } from "@/components/layout/simple-enhanced-header"
import {
  User,
  Mail,
  Phone,
  Building2,
  MapPin,
  Edit3,
  Save,
  X,
  Camera,
  Globe,
  Linkedin,
  Instagram,
  Calendar,
  Briefcase,
  Users,
  CheckCircle,
  AlertCircle
} from "lucide-react"

interface DadosPessoais {
  nome: string
  sobrenome: string
  email: string
  telefone: string
  celular: string
  empresa: string
  cargo: string
  setor: string
  endereco: string
  cidade: string
  estado: string
  cep: string
  dataNascimento: string
  dataIngresso: string
  biografia: string
  website: string
  linkedin: string
  instagram: string
  avatar?: string
}

export default function DadosPage() {
  const [dados, setDados] = useState<DadosPessoais | null>(null)
  const [dadosEdit, setDadosEdit] = useState<DadosPessoais | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const { colors, getCardStyle } = useThemedStyles()

  useEffect(() => {
    const mockDados: DadosPessoais = {
      nome: "Marco",
      sobrenome: "Carvalho",
      email: "marco.carvalho@consultingpro.com.br",
      telefone: "(21) 3344-5566",
      celular: "(21) 98877-6655",
      empresa: "Consulting Pro",
      cargo: "Diretor Executivo",
      setor: "Consultoria Empresarial",
      endereco: "Av. Presidente Vargas, 1000 - Sala 2401",
      cidade: "Rio de Janeiro",
      estado: "RJ",
      cep: "20071-910",
      dataNascimento: "15/03/1985",
      dataIngresso: "10/01/2024",
      biografia: "Profissional com mais de 15 anos de experiência em consultoria empresarial, especializado em transformação digital e gestão estratégica. Apaixonado por networking e desenvolvimento de negócios.",
      website: "https://consultingpro.com.br",
      linkedin: "https://linkedin.com/in/marcocarvalho",
      instagram: "@marcocarvalho_consulting"
    }

    setTimeout(() => {
      setDados(mockDados)
      setLoading(false)
    }, 1000)
  }, [])

  const handleEdit = () => {
    setDadosEdit({ ...dados! })
    setIsEditing(true)
  }

  const handleCancel = () => {
    setDadosEdit(null)
    setIsEditing(false)
  }

  const handleSave = async () => {
    setSaving(true)
    
    // Simular salvamento
    setTimeout(() => {
      setDados({ ...dadosEdit! })
      setDadosEdit(null)
      setIsEditing(false)
      setSaving(false)
      setShowSuccess(true)
      
      setTimeout(() => setShowSuccess(false), 3000)
    }, 1500)
  }

  const handleInputChange = (field: keyof DadosPessoais, value: string) => {
    if (dadosEdit) {
      setDadosEdit({ ...dadosEdit, [field]: value })
    }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <ProMembersSidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <SimpleEnhancedHeader area="member" />
          <main style={{ 
            flex: 1, 
            padding: '32px', 
            backgroundColor: colors.bg.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ textAlign: 'center', color: colors.text.secondary }}>
              Carregando dados pessoais...
            </div>
          </main>
        </div>
      </div>
    )
  }

  const currentData = isEditing ? dadosEdit! : dados!

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <ProMembersSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <SimpleEnhancedHeader area="member" />
        
        <main style={{ 
          flex: 1, 
          padding: '32px', 
          backgroundColor: colors.bg.primary,
          overflow: 'auto'
        }}>
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundImage: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(139, 92, 246, 0.2)'
                }}>
                  <User style={{ color: 'white', width: '24px', height: '24px' }} />
                </div>
                <div>
                  <h1 style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: colors.text.primary,
                    margin: 0
                  }}>
                    Dados Pessoais
                  </h1>
                  <p style={{
                    color: colors.text.secondary,
                    margin: 0,
                    fontSize: '16px'
                  }}>
                    Gerencie suas informações pessoais e profissionais
                  </p>
                </div>
              </div>

              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#8b5cf6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Edit3 size={16} />
                  Editar Perfil
                </button>
              ) : (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={handleCancel}
                    style={{
                      padding: '12px 20px',
                      backgroundColor: 'transparent',
                      color: colors.text.secondary,
                      border: `1px solid ${colors.border.primary}`,
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <X size={16} />
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    style={{
                      padding: '12px 20px',
                      backgroundColor: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: saving ? 'not-allowed' : 'pointer',
                      opacity: saving ? 0.7 : 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Save size={16} />
                    {saving ? 'Salvando...' : 'Salvar'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div style={{
              ...getCardStyle(),
              marginBottom: '24px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle size={20} />
                <span style={{ fontWeight: '500' }}>Dados atualizados com sucesso!</span>
              </div>
            </div>
          )}

          {/* Profile Photo & Basic Info */}
          <div style={{
            ...getCardStyle(),
            marginBottom: '24px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              marginBottom: '24px'
            }}>
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  backgroundColor: colors.bg.tertiary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: colors.text.secondary,
                  border: `3px solid ${colors.border.primary}`
                }}>
                  {currentData.nome.charAt(0)}{currentData.sobrenome.charAt(0)}
                </div>
                {isEditing && (
                  <button style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#8b5cf6',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Camera size={16} />
                  </button>
                )}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: colors.text.secondary,
                      marginBottom: '6px'
                    }}>
                      Nome
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={currentData.nome}
                        onChange={(e) => handleInputChange('nome', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: `1px solid ${colors.border.primary}`,
                          borderRadius: '6px',
                          backgroundColor: colors.bg.secondary,
                          color: colors.text.primary,
                          fontSize: '14px'
                        }}
                      />
                    ) : (
                      <div style={{
                        padding: '10px 0',
                        fontSize: '16px',
                        fontWeight: '600',
                        color: colors.text.primary
                      }}>
                        {currentData.nome}
                      </div>
                    )}
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: colors.text.secondary,
                      marginBottom: '6px'
                    }}>
                      Sobrenome
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={currentData.sobrenome}
                        onChange={(e) => handleInputChange('sobrenome', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: `1px solid ${colors.border.primary}`,
                          borderRadius: '6px',
                          backgroundColor: colors.bg.secondary,
                          color: colors.text.primary,
                          fontSize: '14px'
                        }}
                      />
                    ) : (
                      <div style={{
                        padding: '10px 0',
                        fontSize: '16px',
                        fontWeight: '600',
                        color: colors.text.primary
                      }}>
                        {currentData.sobrenome}
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ marginTop: '16px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: colors.text.secondary,
                    marginBottom: '6px'
                  }}>
                    Biografia
                  </label>
                  {isEditing ? (
                    <textarea
                      value={currentData.biografia}
                      onChange={(e) => handleInputChange('biografia', e.target.value)}
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: `1px solid ${colors.border.primary}`,
                        borderRadius: '6px',
                        backgroundColor: colors.bg.secondary,
                        color: colors.text.primary,
                        fontSize: '14px',
                        resize: 'vertical'
                      }}
                    />
                  ) : (
                    <div style={{
                      padding: '10px 0',
                      fontSize: '14px',
                      color: colors.text.secondary,
                      lineHeight: '1.5'
                    }}>
                      {currentData.biografia}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div style={{
            ...getCardStyle(),
            marginBottom: '24px'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: colors.text.primary,
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Mail size={20} style={{ color: '#8b5cf6' }} />
              Informações de Contato
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: colors.text.secondary,
                  marginBottom: '6px'
                }}>
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={currentData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: `1px solid ${colors.border.primary}`,
                      borderRadius: '6px',
                      backgroundColor: colors.bg.secondary,
                      color: colors.text.primary,
                      fontSize: '14px'
                    }}
                  />
                ) : (
                  <div style={{
                    padding: '10px 0',
                    fontSize: '14px',
                    color: colors.text.primary
                  }}>
                    {currentData.email}
                  </div>
                )}
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: colors.text.secondary,
                  marginBottom: '6px'
                }}>
                  Telefone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={currentData.telefone}
                    onChange={(e) => handleInputChange('telefone', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: `1px solid ${colors.border.primary}`,
                      borderRadius: '6px',
                      backgroundColor: colors.bg.secondary,
                      color: colors.text.primary,
                      fontSize: '14px'
                    }}
                  />
                ) : (
                  <div style={{
                    padding: '10px 0',
                    fontSize: '14px',
                    color: colors.text.primary
                  }}>
                    {currentData.telefone}
                  </div>
                )}
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: colors.text.secondary,
                  marginBottom: '6px'
                }}>
                  Celular
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={currentData.celular}
                    onChange={(e) => handleInputChange('celular', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: `1px solid ${colors.border.primary}`,
                      borderRadius: '6px',
                      backgroundColor: colors.bg.secondary,
                      color: colors.text.primary,
                      fontSize: '14px'
                    }}
                  />
                ) : (
                  <div style={{
                    padding: '10px 0',
                    fontSize: '14px',
                    color: colors.text.primary
                  }}>
                    {currentData.celular}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div style={{
            ...getCardStyle(),
            marginBottom: '24px'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: colors.text.primary,
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Briefcase size={20} style={{ color: '#8b5cf6' }} />
              Informações Profissionais
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: colors.text.secondary,
                  marginBottom: '6px'
                }}>
                  Empresa
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={currentData.empresa}
                    onChange={(e) => handleInputChange('empresa', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: `1px solid ${colors.border.primary}`,
                      borderRadius: '6px',
                      backgroundColor: colors.bg.secondary,
                      color: colors.text.primary,
                      fontSize: '14px'
                    }}
                  />
                ) : (
                  <div style={{
                    padding: '10px 0',
                    fontSize: '14px',
                    color: colors.text.primary
                  }}>
                    {currentData.empresa}
                  </div>
                )}
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: colors.text.secondary,
                  marginBottom: '6px'
                }}>
                  Cargo
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={currentData.cargo}
                    onChange={(e) => handleInputChange('cargo', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: `1px solid ${colors.border.primary}`,
                      borderRadius: '6px',
                      backgroundColor: colors.bg.secondary,
                      color: colors.text.primary,
                      fontSize: '14px'
                    }}
                  />
                ) : (
                  <div style={{
                    padding: '10px 0',
                    fontSize: '14px',
                    color: colors.text.primary
                  }}>
                    {currentData.cargo}
                  </div>
                )}
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: colors.text.secondary,
                  marginBottom: '6px'
                }}>
                  Setor
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={currentData.setor}
                    onChange={(e) => handleInputChange('setor', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: `1px solid ${colors.border.primary}`,
                      borderRadius: '6px',
                      backgroundColor: colors.bg.secondary,
                      color: colors.text.primary,
                      fontSize: '14px'
                    }}
                  />
                ) : (
                  <div style={{
                    padding: '10px 0',
                    fontSize: '14px',
                    color: colors.text.primary
                  }}>
                    {currentData.setor}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Address */}
          <div style={{
            ...getCardStyle(),
            marginBottom: '24px'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: colors.text.primary,
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <MapPin size={20} style={{ color: '#8b5cf6' }} />
              Endereço
            </h2>

            <div style={{
              display: 'grid',
              gap: '20px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: colors.text.secondary,
                  marginBottom: '6px'
                }}>
                  Endereço Completo
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={currentData.endereco}
                    onChange={(e) => handleInputChange('endereco', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: `1px solid ${colors.border.primary}`,
                      borderRadius: '6px',
                      backgroundColor: colors.bg.secondary,
                      color: colors.text.primary,
                      fontSize: '14px'
                    }}
                  />
                ) : (
                  <div style={{
                    padding: '10px 0',
                    fontSize: '14px',
                    color: colors.text.primary
                  }}>
                    {currentData.endereco}
                  </div>
                )}
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr',
                gap: '16px'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: colors.text.secondary,
                    marginBottom: '6px'
                  }}>
                    Cidade
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={currentData.cidade}
                      onChange={(e) => handleInputChange('cidade', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: `1px solid ${colors.border.primary}`,
                        borderRadius: '6px',
                        backgroundColor: colors.bg.secondary,
                        color: colors.text.primary,
                        fontSize: '14px'
                      }}
                    />
                  ) : (
                    <div style={{
                      padding: '10px 0',
                      fontSize: '14px',
                      color: colors.text.primary
                    }}>
                      {currentData.cidade}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: colors.text.secondary,
                    marginBottom: '6px'
                  }}>
                    Estado
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={currentData.estado}
                      onChange={(e) => handleInputChange('estado', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: `1px solid ${colors.border.primary}`,
                        borderRadius: '6px',
                        backgroundColor: colors.bg.secondary,
                        color: colors.text.primary,
                        fontSize: '14px'
                      }}
                    />
                  ) : (
                    <div style={{
                      padding: '10px 0',
                      fontSize: '14px',
                      color: colors.text.primary
                    }}>
                      {currentData.estado}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: colors.text.secondary,
                    marginBottom: '6px'
                  }}>
                    CEP
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={currentData.cep}
                      onChange={(e) => handleInputChange('cep', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: `1px solid ${colors.border.primary}`,
                        borderRadius: '6px',
                        backgroundColor: colors.bg.secondary,
                        color: colors.text.primary,
                        fontSize: '14px'
                      }}
                    />
                  ) : (
                    <div style={{
                      padding: '10px 0',
                      fontSize: '14px',
                      color: colors.text.primary
                    }}>
                      {currentData.cep}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Social Media & Additional Info */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {/* Social Media */}
            <div style={getCardStyle()}>
              <h2 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: colors.text.primary,
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Globe size={18} style={{ color: '#8b5cf6' }} />
                Redes Sociais
              </h2>

              <div style={{ display: 'grid', gap: '16px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: colors.text.secondary,
                    marginBottom: '6px'
                  }}>
                    Website
                  </label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={currentData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: `1px solid ${colors.border.primary}`,
                        borderRadius: '6px',
                        backgroundColor: colors.bg.secondary,
                        color: colors.text.primary,
                        fontSize: '14px'
                      }}
                    />
                  ) : (
                    <div style={{
                      padding: '10px 0',
                      fontSize: '14px',
                      color: '#3b82f6'
                    }}>
                      {currentData.website}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: colors.text.secondary,
                    marginBottom: '6px'
                  }}>
                    LinkedIn
                  </label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={currentData.linkedin}
                      onChange={(e) => handleInputChange('linkedin', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: `1px solid ${colors.border.primary}`,
                        borderRadius: '6px',
                        backgroundColor: colors.bg.secondary,
                        color: colors.text.primary,
                        fontSize: '14px'
                      }}
                    />
                  ) : (
                    <div style={{
                      padding: '10px 0',
                      fontSize: '14px',
                      color: '#3b82f6'
                    }}>
                      {currentData.linkedin}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: colors.text.secondary,
                    marginBottom: '6px'
                  }}>
                    Instagram
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={currentData.instagram}
                      onChange={(e) => handleInputChange('instagram', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: `1px solid ${colors.border.primary}`,
                        borderRadius: '6px',
                        backgroundColor: colors.bg.secondary,
                        color: colors.text.primary,
                        fontSize: '14px'
                      }}
                    />
                  ) : (
                    <div style={{
                      padding: '10px 0',
                      fontSize: '14px',
                      color: '#3b82f6'
                    }}>
                      {currentData.instagram}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div style={getCardStyle()}>
              <h2 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: colors.text.primary,
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Calendar size={18} style={{ color: '#8b5cf6' }} />
                Informações Adicionais
              </h2>

              <div style={{ display: 'grid', gap: '16px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: colors.text.secondary,
                    marginBottom: '6px'
                  }}>
                    Data de Nascimento
                  </label>
                  <div style={{
                    padding: '10px 0',
                    fontSize: '14px',
                    color: colors.text.primary
                  }}>
                    {currentData.dataNascimento}
                  </div>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: colors.text.secondary,
                    marginBottom: '6px'
                  }}>
                    Data de Ingresso no CNE
                  </label>
                  <div style={{
                    padding: '10px 0',
                    fontSize: '14px',
                    color: colors.text.primary
                  }}>
                    {currentData.dataIngresso}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
