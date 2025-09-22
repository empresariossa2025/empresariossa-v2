"use client"
import { useState } from "react"
import { useThemedStyles } from "@/hooks/use-themed-styles"
import { ProMembersSidebar } from "@/components/layout/pro-members-sidebar"
import { SimpleEnhancedHeader } from "@/components/layout/simple-enhanced-header"
import {
  UserPlus,
  Save,
  X,
  Check,
  AlertCircle,
  User,
  Mail,
  Phone,
  Building2,
  MapPin,
  FileText,
  Calendar,
  Briefcase,
  Users,
  Target
} from "lucide-react"

interface ConvidadoForm {
  nome: string
  sobrenome: string
  email: string
  telefone: string
  empresa: string
  cargo: string
  setor: string
  endereco: string
  cidade: string
  estado: string
  cep: string
  motivoConvite: string
  objetivos: string
  conheceuComo: string
  observacoes: string
}

export default function CadastrarConvidadosPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const { colors, getCardStyle } = useThemedStyles()

  const [formData, setFormData] = useState<ConvidadoForm>({
    nome: '',
    sobrenome: '',
    email: '',
    telefone: '',
    empresa: '',
    cargo: '',
    setor: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    motivoConvite: '',
    objetivos: '',
    conheceuComo: '',
    observacoes: ''
  })

  const handleInputChange = (field: keyof ConvidadoForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Validação básica
      if (!formData.nome || !formData.sobrenome || !formData.email || !formData.telefone || !formData.empresa) {
        throw new Error('Por favor, preencha todos os campos obrigatórios')
      }

      // Validação de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        throw new Error('Por favor, insira um email válido')
      }

      // Simulação de envio para API
      await new Promise(resolve => setTimeout(resolve, 2000))

      console.log('Dados do convidado:', formData)
      
      setSuccess(true)
      
      // Reset form após 3 segundos
      setTimeout(() => {
        setSuccess(false)
        setFormData({
          nome: '',
          sobrenome: '',
          email: '',
          telefone: '',
          empresa: '',
          cargo: '',
          setor: '',
          endereco: '',
          cidade: '',
          estado: '',
          cep: '',
          motivoConvite: '',
          objetivos: '',
          conheceuComo: '',
          observacoes: ''
        })
      }, 3000)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao cadastrar convidado')
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setFormData({
      nome: '',
      sobrenome: '',
      email: '',
      telefone: '',
      empresa: '',
      cargo: '',
      setor: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: '',
      motivoConvite: '',
      objetivos: '',
      conheceuComo: '',
      observacoes: ''
    })
    setError('')
    setSuccess(false)
  }

  const isFormValid = formData.nome && formData.sobrenome && formData.email && formData.telefone && formData.empresa

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
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
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
                <UserPlus style={{ color: 'white', width: '24px', height: '24px' }} />
              </div>
              <div>
                <h1 style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: colors.text.primary,
                  margin: 0
                }}>
                  Cadastrar Convidados
                </h1>
                <p style={{
                  color: colors.text.secondary,
                  margin: 0,
                  fontSize: '16px'
                }}>
                  Indique um potencial membro para participar da nossa rede
                </p>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {success && (
            <div style={{
              ...getCardStyle(),
              backgroundColor: '#10b981',
              color: 'white',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <Check size={24} />
              <div>
                <h3 style={{ margin: 0, marginBottom: '4px', fontSize: '16px', fontWeight: 'bold' }}>
                  Convite Enviado com Sucesso!
                </h3>
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
                  O convidado foi registrado e será analisado pela administração.
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div style={{
              ...getCardStyle(),
              backgroundColor: '#ef4444',
              color: 'white',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <AlertCircle size={24} />
              <div>
                <h3 style={{ margin: 0, marginBottom: '4px', fontSize: '16px', fontWeight: 'bold' }}>
                  Erro ao Cadastrar
                </h3>
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div style={{
              display: 'grid',
              gap: '24px'
            }}>
              {/* Dados Pessoais */}
              <div style={getCardStyle()}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '24px'
                }}>
                  <User size={20} style={{ color: '#8b5cf6' }} />
                  <h2 style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: colors.text.primary,
                    margin: 0
                  }}>
                    Dados Pessoais
                  </h2>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '16px'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: colors.text.primary,
                      marginBottom: '8px'
                    }}>
                      Nome *
                    </label>
                    <input
                      type="text"
                      value={formData.nome}
                      onChange={(e) => handleInputChange('nome', e.target.value)}
                      placeholder="Digite o nome"
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: `1px solid ${colors.border.primary}`,
                        borderRadius: '8px',
                        backgroundColor: colors.bg.secondary,
                        color: colors.text.primary,
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: colors.text.primary,
                      marginBottom: '8px'
                    }}>
                      Sobrenome *
                    </label>
                    <input
                      type="text"
                      value={formData.sobrenome}
                      onChange={(e) => handleInputChange('sobrenome', e.target.value)}
                      placeholder="Digite o sobrenome"
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: `1px solid ${colors.border.primary}`,
                        borderRadius: '8px',
                        backgroundColor: colors.bg.secondary,
                        color: colors.text.primary,
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: colors.text.primary,
                      marginBottom: '8px'
                    }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="exemplo@email.com"
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: `1px solid ${colors.border.primary}`,
                        borderRadius: '8px',
                        backgroundColor: colors.bg.secondary,
                        color: colors.text.primary,
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: colors.text.primary,
                      marginBottom: '8px'
                    }}>
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      value={formData.telefone}
                      onChange={(e) => handleInputChange('telefone', e.target.value)}
                      placeholder="(21) 99999-9999"
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: `1px solid ${colors.border.primary}`,
                        borderRadius: '8px',
                        backgroundColor: colors.bg.secondary,
                        color: colors.text.primary,
                        fontSize: '14px'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Dados Profissionais */}
              <div style={getCardStyle()}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '24px'
                }}>
                  <Briefcase size={20} style={{ color: '#8b5cf6' }} />
                  <h2 style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: colors.text.primary,
                    margin: 0
                  }}>
                    Dados Profissionais
                  </h2>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '16px'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: colors.text.primary,
                      marginBottom: '8px'
                    }}>
                      Empresa *
                    </label>
                    <input
                      type="text"
                      value={formData.empresa}
                      onChange={(e) => handleInputChange('empresa', e.target.value)}
                      placeholder="Nome da empresa"
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: `1px solid ${colors.border.primary}`,
                        borderRadius: '8px',
                        backgroundColor: colors.bg.secondary,
                        color: colors.text.primary,
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: colors.text.primary,
                      marginBottom: '8px'
                    }}>
                      Cargo
                    </label>
                    <input
                      type="text"
                      value={formData.cargo}
                      onChange={(e) => handleInputChange('cargo', e.target.value)}
                      placeholder="Cargo/função"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: `1px solid ${colors.border.primary}`,
                        borderRadius: '8px',
                        backgroundColor: colors.bg.secondary,
                        color: colors.text.primary,
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: colors.text.primary,
                      marginBottom: '8px'
                    }}>
                      Setor de Atuação
                    </label>
                    <select
                      value={formData.setor}
                      onChange={(e) => handleInputChange('setor', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: `1px solid ${colors.border.primary}`,
                        borderRadius: '8px',
                        backgroundColor: colors.bg.secondary,
                        color: colors.text.primary,
                        fontSize: '14px'
                      }}
                    >
                      <option value="">Selecione o setor</option>
                      <option value="Tecnologia">Tecnologia</option>
                      <option value="Saúde">Saúde</option>
                      <option value="Educação">Educação</option>
                      <option value="Varejo">Varejo</option>
                      <option value="Serviços">Serviços</option>
                      <option value="Indústria">Indústria</option>
                      <option value="Construção">Construção</option>
                      <option value="Alimentação">Alimentação</option>
                      <option value="Turismo">Turismo</option>
                      <option value="Consultoria">Consultoria</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Informações de Convite */}
              <div style={getCardStyle()}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '24px'
                }}>
                  <Target size={20} style={{ color: '#8b5cf6' }} />
                  <h2 style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: colors.text.primary,
                    margin: 0
                  }}>
                    Informações do Convite
                  </h2>
                </div>

                <div style={{ display: 'grid', gap: '16px' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: colors.text.primary,
                      marginBottom: '8px'
                    }}>
                      Motivo do Convite
                    </label>
                    <textarea
                      value={formData.motivoConvite}
                      onChange={(e) => handleInputChange('motivoConvite', e.target.value)}
                      placeholder="Por que você está convidando esta pessoa? Quais são os benefícios mútuos?"
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: `1px solid ${colors.border.primary}`,
                        borderRadius: '8px',
                        backgroundColor: colors.bg.secondary,
                        color: colors.text.primary,
                        fontSize: '14px',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: colors.text.primary,
                      marginBottom: '8px'
                    }}>
                      Como Conheceu
                    </label>
                    <select
                      value={formData.conheceuComo}
                      onChange={(e) => handleInputChange('conheceuComo', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: `1px solid ${colors.border.primary}`,
                        borderRadius: '8px',
                        backgroundColor: colors.bg.secondary,
                        color: colors.text.primary,
                        fontSize: '14px'
                      }}
                    >
                      <option value="">Como você conheceu esta pessoa?</option>
                      <option value="Trabalho">Trabalho</option>
                      <option value="Evento de Negócios">Evento de Negócios</option>
                      <option value="Networking">Networking</option>
                      <option value="Amigo em Comum">Amigo em Comum</option>
                      <option value="Cliente/Fornecedor">Cliente/Fornecedor</option>
                      <option value="Universidade">Universidade</option>
                      <option value="Redes Sociais">Redes Sociais</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: colors.text.primary,
                      marginBottom: '8px'
                    }}>
                      Observações Adicionais
                    </label>
                    <textarea
                      value={formData.observacoes}
                      onChange={(e) => handleInputChange('observacoes', e.target.value)}
                      placeholder="Informações adicionais que possam ser úteis para a avaliação..."
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: `1px solid ${colors.border.primary}`,
                        borderRadius: '8px',
                        backgroundColor: colors.bg.secondary,
                        color: colors.text.primary,
                        fontSize: '14px',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div style={{
                display: 'flex',
                gap: '16px',
                justifyContent: 'flex-end',
                marginTop: '24px'
              }}>
                <button
                  type="button"
                  onClick={handleClear}
                  disabled={loading}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: 'transparent',
                    color: colors.text.secondary,
                    border: `1px solid ${colors.border.primary}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    opacity: loading ? 0.5 : 1,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <X size={16} />
                  Limpar
                </button>

                <button
                  type="submit"
                  disabled={!isFormValid || loading}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: isFormValid && !loading ? '#8b5cf6' : '#64748b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: isFormValid && !loading ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Save size={16} />
                  {loading ? 'Enviando...' : 'Enviar Convite'}
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}
