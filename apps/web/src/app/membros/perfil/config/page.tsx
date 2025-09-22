"use client"
import { useState, useEffect } from "react"
import { useThemedStyles } from "@/hooks/use-themed-styles"
import { ProMembersSidebar } from "@/components/layout/pro-members-sidebar"
import { SimpleEnhancedHeader } from "@/components/layout/simple-enhanced-header"
import {
  Settings,
  Bell,
  Shield,
  Palette,
  Globe,
  Smartphone,
  Mail,
  Eye,
  EyeOff,
  Lock,
  Key,
  Download,
  Trash2,
  Moon,
  Sun,
  Monitor,
  Calendar,
  CreditCard,
  Users,
  Link,
  Zap,
  HelpCircle,
  MessageSquare,
  FileText,
  Database,
  AlertTriangle,
  CheckCircle,
  X,
  Save,
  RotateCcw,
  LogOut,
  Smartphone as Phone,
  AtSign,
  Clock,
  MapPin,
  DollarSign,
  Languages,
  Wifi,
  Activity
} from "lucide-react"

interface ConfigSection {
  id: string
  title: string
  icon: any
  settings: ConfigSetting[]
}

interface ConfigSetting {
  id: string
  type: 'toggle' | 'select' | 'input' | 'button' | 'slider' | 'radio'
  label: string
  description?: string
  value: any
  options?: { label: string; value: any }[]
  min?: number
  max?: number
  step?: number
  danger?: boolean
  premium?: boolean
}

export default function ConfiguracoesPage() {
  const [configs, setConfigs] = useState<ConfigSection[]>([])
  const [activeSection, setActiveSection] = useState('account')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const { colors, getCardStyle } = useThemedStyles()

  useEffect(() => {
    const mockConfigs: ConfigSection[] = [
      {
        id: 'account',
        title: 'Conta & Perfil',
        icon: Settings,
        settings: [
          {
            id: 'profile_visibility',
            type: 'select',
            label: 'Visibilidade do Perfil',
            description: 'Controle quem pode ver suas informações de perfil',
            value: 'members',
            options: [
              { label: 'Público', value: 'public' },
              { label: 'Somente Membros', value: 'members' },
              { label: 'Privado', value: 'private' }
            ]
          },
          {
            id: 'account_status',
            type: 'toggle',
            label: 'Conta Ativa',
            description: 'Seu status de participação na rede',
            value: true
          },
          {
            id: 'show_online_status',
            type: 'toggle',
            label: 'Mostrar Status Online',
            description: 'Permitir que outros vejam quando você está online',
            value: true
          },
          {
            id: 'show_business_info',
            type: 'toggle',
            label: 'Exibir Informações de Negócio',
            description: 'Mostrar empresa e cargo no seu perfil público',
            value: true
          }
        ]
      },
      {
        id: 'notifications',
        title: 'Notificações',
        icon: Bell,
        settings: [
          {
            id: 'email_notifications',
            type: 'toggle',
            label: 'Notificações por Email',
            description: 'Receber notificações importantes por email',
            value: true
          },
          {
            id: 'push_notifications',
            type: 'toggle',
            label: 'Notificações Push',
            description: 'Receber notificações push no navegador/app',
            value: true
          },
          {
            id: 'sms_notifications',
            type: 'toggle',
            label: 'Notificações SMS',
            description: 'Receber SMS para eventos urgentes',
            value: false,
            premium: true
          },
          {
            id: 'notification_frequency',
            type: 'select',
            label: 'Frequência de Notificações',
            description: 'Com que frequência receber resumos',
            value: 'daily',
            options: [
              { label: 'Imediata', value: 'immediate' },
              { label: 'Diária', value: 'daily' },
              { label: 'Semanal', value: 'weekly' },
              { label: 'Nunca', value: 'never' }
            ]
          },
          {
            id: 'event_reminders',
            type: 'slider',
            label: 'Lembrete de Eventos (horas antes)',
            description: 'Quantas horas antes do evento ser notificado',
            value: 24,
            min: 1,
            max: 168,
            step: 1
          },
          {
            id: 'new_member_notifications',
            type: 'toggle',
            label: 'Novos Membros',
            description: 'Notificar quando novos membros se juntarem',
            value: true
          },
          {
            id: 'business_deal_notifications',
            type: 'toggle',
            label: 'Oportunidades de Negócio',
            description: 'Notificar sobre novas oportunidades',
            value: true
          },
          {
            id: 'points_notifications',
            type: 'toggle',
            label: 'Atualizações de Pontos',
            description: 'Notificar quando ganhar ou perder pontos',
            value: true
          }
        ]
      },
      {
        id: 'privacy',
        title: 'Privacidade & Segurança',
        icon: Shield,
        settings: [
          {
            id: 'change_password',
            type: 'button',
            label: 'Alterar Senha',
            description: 'Modificar sua senha de acesso',
            value: 'change_password'
          },
          {
            id: 'two_factor_auth',
            type: 'toggle',
            label: 'Autenticação de Dois Fatores',
            description: 'Adicionar uma camada extra de segurança',
            value: false
          },
          {
            id: 'login_alerts',
            type: 'toggle',
            label: 'Alertas de Login',
            description: 'Notificar sobre novos acessos à sua conta',
            value: true
          },
          {
            id: 'data_export',
            type: 'button',
            label: 'Exportar Meus Dados',
            description: 'Baixar uma cópia de todos seus dados',
            value: 'export_data'
          },
          {
            id: 'session_timeout',
            type: 'select',
            label: 'Timeout de Sessão',
            description: 'Tempo para logout automático por inatividade',
            value: '4h',
            options: [
              { label: '30 minutos', value: '30m' },
              { label: '1 hora', value: '1h' },
              { label: '4 horas', value: '4h' },
              { label: '1 dia', value: '24h' },
              { label: 'Nunca', value: 'never' }
            ]
          },
          {
            id: 'delete_account',
            type: 'button',
            label: 'Excluir Conta',
            description: 'Remover permanentemente sua conta e dados',
            value: 'delete_account',
            danger: true
          }
        ]
      },
      {
        id: 'appearance',
        title: 'Aparência & Interface',
        icon: Palette,
        settings: [
          {
            id: 'theme',
            type: 'radio',
            label: 'Tema',
            description: 'Escolha o tema de cores da interface',
            value: 'system',
            options: [
              { label: 'Claro', value: 'light' },
              { label: 'Escuro', value: 'dark' },
              { label: 'Sistema', value: 'system' }
            ]
          },
          {
            id: 'language',
            type: 'select',
            label: 'Idioma',
            description: 'Idioma da interface',
            value: 'pt-BR',
            options: [
              { label: 'Português (Brasil)', value: 'pt-BR' },
              { label: 'English (US)', value: 'en-US' },
              { label: 'Español', value: 'es-ES' }
            ]
          },
          {
            id: 'timezone',
            type: 'select',
            label: 'Fuso Horário',
            description: 'Seu fuso horário local',
            value: 'America/Sao_Paulo',
            options: [
              { label: 'Brasília (GMT-3)', value: 'America/Sao_Paulo' },
              { label: 'New York (GMT-5)', value: 'America/New_York' },
              { label: 'London (GMT+0)', value: 'Europe/London' }
            ]
          },
          {
            id: 'date_format',
            type: 'select',
            label: 'Formato de Data',
            description: 'Como as datas são exibidas',
            value: 'dd/mm/yyyy',
            options: [
              { label: 'DD/MM/AAAA', value: 'dd/mm/yyyy' },
              { label: 'MM/DD/AAAA', value: 'mm/dd/yyyy' },
              { label: 'AAAA-MM-DD', value: 'yyyy-mm-dd' }
            ]
          },
          {
            id: 'currency_format',
            type: 'select',
            label: 'Formato de Moeda',
            description: 'Como valores monetários são exibidos',
            value: 'BRL',
            options: [
              { label: 'Real (R$)', value: 'BRL' },
              { label: 'Dólar ($)', value: 'USD' },
              { label: 'Euro (€)', value: 'EUR' }
            ]
          },
          {
            id: 'compact_mode',
            type: 'toggle',
            label: 'Modo Compacto',
            description: 'Interface mais densa com menos espaçamento',
            value: false
          }
        ]
      },
      {
        id: 'communication',
        title: 'Comunicação',
        icon: Mail,
        settings: [
          {
            id: 'newsletter',
            type: 'toggle',
            label: 'Newsletter CNE',
            description: 'Receber newsletter semanal com novidades',
            value: true
          },
          {
            id: 'marketing_emails',
            type: 'toggle',
            label: 'Emails Promocionais',
            description: 'Receber ofertas e promoções especiais',
            value: false
          },
          {
            id: 'event_invitations',
            type: 'toggle',
            label: 'Convites para Eventos',
            description: 'Receber convites para eventos especiais',
            value: true
          },
          {
            id: 'survey_requests',
            type: 'toggle',
            label: 'Pesquisas e Feedback',
            description: 'Receber solicitações de pesquisas',
            value: true
          },
          {
            id: 'direct_messages',
            type: 'select',
            label: 'Mensagens Diretas',
            description: 'Quem pode enviar mensagens diretas',
            value: 'members',
            options: [
              { label: 'Todos', value: 'all' },
              { label: 'Somente Membros', value: 'members' },
              { label: 'Ninguém', value: 'none' }
            ]
          }
        ]
      },
      {
        id: 'integrations',
        title: 'Integrações',
        icon: Link,
        settings: [
          {
            id: 'calendar_sync',
            type: 'toggle',
            label: 'Sincronização de Calendário',
            description: 'Sincronizar eventos com Google Calendar',
            value: false,
            premium: true
          },
          {
            id: 'linkedin_integration',
            type: 'toggle',
            label: 'Integração LinkedIn',
            description: 'Conectar com seu perfil LinkedIn',
            value: false
          },
          {
            id: 'crm_integration',
            type: 'select',
            label: 'Integração CRM',
            description: 'Conectar com seu sistema CRM',
            value: 'none',
            options: [
              { label: 'Nenhum', value: 'none' },
              { label: 'Salesforce', value: 'salesforce' },
              { label: 'HubSpot', value: 'hubspot' },
              { label: 'Pipedrive', value: 'pipedrive' }
            ],
            premium: true
          },
          {
            id: 'webhook_url',
            type: 'input',
            label: 'Webhook URL',
            description: 'URL para receber notificações via webhook',
            value: '',
            premium: true
          },
          {
            id: 'api_access',
            type: 'button',
            label: 'Gerenciar API Keys',
            description: 'Configurar chaves de acesso à API',
            value: 'manage_api',
            premium: true
          }
        ]
      },
      {
        id: 'advanced',
        title: 'Configurações Avançadas',
        icon: Zap,
        settings: [
          {
            id: 'beta_features',
            type: 'toggle',
            label: 'Recursos Beta',
            description: 'Participar do programa de testes de novos recursos',
            value: false
          },
          {
            id: 'analytics_tracking',
            type: 'toggle',
            label: 'Rastreamento Analytics',
            description: 'Permitir coleta de dados para melhorar a plataforma',
            value: true
          },
          {
            id: 'auto_backup',
            type: 'toggle',
            label: 'Backup Automático',
            description: 'Backup automático dos seus dados',
            value: true,
            premium: true
          },
          {
            id: 'debug_mode',
            type: 'toggle',
            label: 'Modo Debug',
            description: 'Exibir informações técnicas para suporte',
            value: false
          },
          {
            id: 'data_retention',
            type: 'select',
            label: 'Retenção de Dados',
            description: 'Por quanto tempo manter histórico de atividades',
            value: '2years',
            options: [
              { label: '6 meses', value: '6months' },
              { label: '1 ano', value: '1year' },
              { label: '2 anos', value: '2years' },
              { label: 'Sempre', value: 'forever' }
            ]
          }
        ]
      },
      {
        id: 'support',
        title: 'Suporte & Ajuda',
        icon: HelpCircle,
        settings: [
          {
            id: 'contact_support',
            type: 'button',
            label: 'Contatar Suporte',
            description: 'Abrir ticket de suporte',
            value: 'contact_support'
          },
          {
            id: 'documentation',
            type: 'button',
            label: 'Documentação',
            description: 'Acessar guias e documentação',
            value: 'documentation'
          },
          {
            id: 'send_feedback',
            type: 'button',
            label: 'Enviar Feedback',
            description: 'Compartilhar sugestões e feedback',
            value: 'send_feedback'
          },
          {
            id: 'system_status',
            type: 'button',
            label: 'Status do Sistema',
            description: 'Verificar status dos serviços',
            value: 'system_status'
          },
          {
            id: 'keyboard_shortcuts',
            type: 'button',
            label: 'Atalhos do Teclado',
            description: 'Ver lista de atalhos disponíveis',
            value: 'shortcuts'
          }
        ]
      }
    ]

    setTimeout(() => {
      setConfigs(mockConfigs)
      setLoading(false)
    }, 1000)
  }, [])

  const handleSettingChange = (sectionId: string, settingId: string, newValue: any) => {
    setConfigs(prev => prev.map(section => 
      section.id === sectionId 
        ? {
            ...section,
            settings: section.settings.map(setting =>
              setting.id === settingId 
                ? { ...setting, value: newValue }
                : setting
            )
          }
        : section
    ))
    setHasChanges(true)
  }

  const handleSave = async () => {
    setSaving(true)
    
    // Simular salvamento
    setTimeout(() => {
      setSaving(false)
      setHasChanges(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }, 1500)
  }

  const handleReset = () => {
    // Reset to original values
    setHasChanges(false)
    window.location.reload()
  }

  const activeConfig = configs.find(config => config.id === activeSection)

  const renderSetting = (setting: ConfigSetting, sectionId: string) => {
    switch (setting.type) {
      case 'toggle':
        return (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '14px',
                fontWeight: '500',
                color: colors.text.primary,
                marginBottom: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                {setting.label}
                {setting.premium && (
                  <span style={{
                    fontSize: '10px',
                    padding: '2px 6px',
                    backgroundColor: '#f59e0b',
                    color: 'white',
                    borderRadius: '4px',
                    fontWeight: 'bold'
                  }}>
                    PRO
                  </span>
                )}
              </div>
              {setting.description && (
                <div style={{
                  fontSize: '12px',
                  color: colors.text.secondary
                }}>
                  {setting.description}
                </div>
              )}
            </div>
            <button
              onClick={() => handleSettingChange(sectionId, setting.id, !setting.value)}
              style={{
                width: '44px',
                height: '24px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: setting.value ? '#10b981' : colors.border.primary,
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: 'white',
                position: 'absolute',
                top: '2px',
                left: setting.value ? '22px' : '2px',
                transition: 'all 0.2s ease',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }} />
            </button>
          </div>
        )

      case 'select':
        return (
          <div>
            <div style={{
              fontSize: '14px',
              fontWeight: '500',
              color: colors.text.primary,
              marginBottom: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {setting.label}
              {setting.premium && (
                <span style={{
                  fontSize: '10px',
                  padding: '2px 6px',
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  borderRadius: '4px',
                  fontWeight: 'bold'
                }}>
                  PRO
                </span>
              )}
            </div>
            {setting.description && (
              <div style={{
                fontSize: '12px',
                color: colors.text.secondary,
                marginBottom: '8px'
              }}>
                {setting.description}
              </div>
            )}
            <select
              value={setting.value}
              onChange={(e) => handleSettingChange(sectionId, setting.id, e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: `1px solid ${colors.border.primary}`,
                borderRadius: '6px',
                backgroundColor: colors.bg.secondary,
                color: colors.text.primary,
                fontSize: '13px'
              }}
            >
              {setting.options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )

      case 'input':
        return (
          <div>
            <div style={{
              fontSize: '14px',
              fontWeight: '500',
              color: colors.text.primary,
              marginBottom: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {setting.label}
              {setting.premium && (
                <span style={{
                  fontSize: '10px',
                  padding: '2px 6px',
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  borderRadius: '4px',
                  fontWeight: 'bold'
                }}>
                  PRO
                </span>
              )}
            </div>
            {setting.description && (
              <div style={{
                fontSize: '12px',
                color: colors.text.secondary,
                marginBottom: '8px'
              }}>
                {setting.description}
              </div>
            )}
            <input
              type="text"
              value={setting.value}
              onChange={(e) => handleSettingChange(sectionId, setting.id, e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: `1px solid ${colors.border.primary}`,
                borderRadius: '6px',
                backgroundColor: colors.bg.secondary,
                color: colors.text.primary,
                fontSize: '13px'
              }}
            />
          </div>
        )

      case 'slider':
        return (
          <div>
            <div style={{
              fontSize: '14px',
              fontWeight: '500',
              color: colors.text.primary,
              marginBottom: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span>{setting.label}</span>
              <span style={{
                fontSize: '12px',
                color: colors.text.secondary,
                backgroundColor: colors.bg.tertiary,
                padding: '2px 8px',
                borderRadius: '4px'
              }}>
                {setting.value}
              </span>
            </div>
            {setting.description && (
              <div style={{
                fontSize: '12px',
                color: colors.text.secondary,
                marginBottom: '8px'
              }}>
                {setting.description}
              </div>
            )}
            <input
              type="range"
              min={setting.min}
              max={setting.max}
              step={setting.step}
              value={setting.value}
              onChange={(e) => handleSettingChange(sectionId, setting.id, parseInt(e.target.value))}
              style={{
                width: '100%',
                height: '4px',
                backgroundColor: colors.border.primary,
                borderRadius: '2px',
                outline: 'none'
              }}
            />
          </div>
        )

      case 'radio':
        return (
          <div>
            <div style={{
              fontSize: '14px',
              fontWeight: '500',
              color: colors.text.primary,
              marginBottom: '4px'
            }}>
              {setting.label}
            </div>
            {setting.description && (
              <div style={{
                fontSize: '12px',
                color: colors.text.secondary,
                marginBottom: '12px'
              }}>
                {setting.description}
              </div>
            )}
            <div style={{ display: 'grid', gap: '8px' }}>
              {setting.options?.map(option => (
                <label key={option.value} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '6px',
                  backgroundColor: setting.value === option.value ? '#8b5cf620' : 'transparent',
                  border: `1px solid ${setting.value === option.value ? '#8b5cf6' : colors.border.primary}`
                }}>
                  <input
                    type="radio"
                    name={setting.id}
                    value={option.value}
                    checked={setting.value === option.value}
                    onChange={(e) => handleSettingChange(sectionId, setting.id, e.target.value)}
                    style={{ margin: 0 }}
                  />
                  <span style={{
                    fontSize: '13px',
                    color: colors.text.primary
                  }}>
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )

      case 'button':
        return (
          <div>
            <div style={{
              fontSize: '14px',
              fontWeight: '500',
              color: colors.text.primary,
              marginBottom: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {setting.label}
              {setting.premium && (
                <span style={{
                  fontSize: '10px',
                  padding: '2px 6px',
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  borderRadius: '4px',
                  fontWeight: 'bold'
                }}>
                  PRO
                </span>
              )}
            </div>
            {setting.description && (
              <div style={{
                fontSize: '12px',
                color: colors.text.secondary,
                marginBottom: '8px'
              }}>
                {setting.description}
              </div>
            )}
            <button
              onClick={() => {/* Handle button action */}}
              style={{
                padding: '8px 16px',
                backgroundColor: setting.danger ? '#ef4444' : '#8b5cf6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {setting.label}
            </button>
          </div>
        )

      default:
        return null
    }
  }

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
                  backgroundImage: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)'
                }}>
                  <Settings style={{ color: 'white', width: '24px', height: '24px' }} />
                </div>
                <div>
                  <h1 style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: colors.text.primary,
                    margin: 0
                  }}>
                    Configurações
                  </h1>
                  <p style={{
                    color: colors.text.secondary,
                    margin: 0,
                    fontSize: '16px'
                  }}>
                    Personalize sua experiência na plataforma
                  </p>
                </div>
              </div>

              {hasChanges && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={handleReset}
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
                    <RotateCcw size={16} />
                    Descartar
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
                    {saving ? 'Salvando...' : 'Salvar Alterações'}
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
                <span style={{ fontWeight: '500' }}>Configurações salvas com sucesso!</span>
              </div>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '32px' }}>
            {/* Sidebar */}
            <div style={getCardStyle()}>
              <nav style={{ display: 'grid', gap: '4px' }}>
                {configs.map(config => {
                  const IconComponent = config.icon
                  const isActive = activeSection === config.id
                  
                  return (
                    <button
                      key={config.id}
                      onClick={() => setActiveSection(config.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px',
                        backgroundColor: isActive ? '#8b5cf620' : 'transparent',
                        color: isActive ? '#8b5cf6' : colors.text.secondary,
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: isActive ? '600' : '500',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease',
                        width: '100%'
                      }}
                    >
                      <IconComponent size={18} />
                      {config.title}
                    </button>
                  )
                })}
              </nav>
            </div>

            {/* Main Content */}
            <div style={getCardStyle()}>
              {loading ? (
                <div style={{
                  textAlign: 'center',
                  padding: '64px',
                  color: colors.text.secondary
                }}>
                  Carregando configurações...
                </div>
              ) : activeConfig ? (
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '24px'
                  }}>
                    <activeConfig.icon size={24} style={{ color: '#8b5cf6' }} />
                    <h2 style={{
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: colors.text.primary,
                      margin: 0
                    }}>
                      {activeConfig.title}
                    </h2>
                  </div>

                  <div style={{
                    display: 'grid',
                    gap: '24px'
                  }}>
                    {activeConfig.settings.map(setting => (
                      <div key={setting.id} style={{
                        padding: '20px',
                        backgroundColor: colors.bg.tertiary,
                        borderRadius: '8px',
                        border: `1px solid ${colors.border.primary}`
                      }}>
                        {renderSetting(setting, activeConfig.id)}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '64px',
                  color: colors.text.secondary
                }}>
                  Selecione uma categoria de configuração
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
