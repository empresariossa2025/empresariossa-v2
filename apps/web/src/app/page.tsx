"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Users, Building2, Calendar, TrendingUp, Plus, AlertTriangle, CheckCircle } from "lucide-react"
import { useThemedStyles } from "@/hooks/use-themed-styles"

export default function Dashboard() {
  const { colors, getCardStyle } = useThemedStyles()
  
  // Dati statici per ora invece di API calls che falliscono
  const stats = {
    events: 1,
    organizations: 3,
    totalMembers: 28,
    revenue: 15240
  }

  return (
    <DashboardLayout>
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Stats Cards Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px' }}>
          {/* Eventos Hoje */}
          <div style={{
            background: colors.brand.gradient,
            borderRadius: '12px',
            padding: '16px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.2)',
            minHeight: '120px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <Calendar style={{ width: '20px', height: '20px', opacity: 0.8 }} />
              <span style={{ fontSize: '11px', opacity: 0.8 }}>+6.2%</span>
            </div>
            <h3 style={{ fontSize: '12px', fontWeight: '500', margin: 0, marginBottom: '4px', opacity: 0.9 }}>
              Eventos Hoje
            </h3>
            <div style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
              {stats.events}
            </div>
          </div>

          {/* Taxa de Participação - COLORATA con gradient arancione */}
          <div style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            borderRadius: '12px',
            padding: '16px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)',
            minHeight: '120px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h3 style={{ fontSize: '12px', fontWeight: '500', margin: 0, marginBottom: '8px', opacity: 0.9 }}>
              Taxa de Participação
            </h3>
            <div style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
              85%
            </div>
            <div style={{ fontSize: '11px', marginTop: '4px', fontWeight: '500', opacity: 0.8 }}>
              +5.3%
            </div>
          </div>

          {/* Receita Mensal - COLORATA con gradient verde scuro */}
          <div style={{
            background: 'linear-gradient(135deg, #059669, #047857)',
            borderRadius: '12px',
            padding: '16px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(5, 150, 105, 0.2)',
            minHeight: '120px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h3 style={{ fontSize: '12px', fontWeight: '500', margin: 0, marginBottom: '8px', opacity: 0.9 }}>
              Receita Mensal
            </h3>
            <div style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>
              R$ {stats.revenue.toLocaleString()}
            </div>
            <div style={{ fontSize: '11px', marginTop: '4px', fontWeight: '500', opacity: 0.8 }}>
              +12.4%
            </div>
          </div>

          {/* Org. Pendentes - COLORATA con gradient rosso */}
          <div style={{
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            borderRadius: '12px',
            padding: '16px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)',
            minHeight: '120px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h3 style={{ fontSize: '12px', fontWeight: '500', margin: 0, marginBottom: '8px', opacity: 0.9 }}>
              Org. Pendentes
            </h3>
            <div style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
              {stats.organizations}
            </div>
            <div style={{ fontSize: '11px', marginTop: '4px', fontWeight: '500', opacity: 0.8 }}>
              2 vencidas
            </div>
          </div>

          {/* Novos Membros */}
          <div style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            borderRadius: '12px',
            padding: '16px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)',
            minHeight: '120px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <Users style={{ width: '20px', height: '20px', opacity: 0.8 }} />
              <span style={{ fontSize: '11px', opacity: 0.8 }}>+15.2%</span>
            </div>
            <h3 style={{ fontSize: '12px', fontWeight: '500', margin: 0, marginBottom: '4px', opacity: 0.9 }}>
              Novos Membros
            </h3>
            <div style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
              {stats.totalMembers}
            </div>
          </div>

          {/* Ticket Médio */}
          <div style={{
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            borderRadius: '12px',
            padding: '16px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)',
            minHeight: '120px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <TrendingUp style={{ width: '20px', height: '20px', opacity: 0.8 }} />
              <span style={{ fontSize: '11px', opacity: 0.8 }}>+3.8%</span>
            </div>
            <h3 style={{ fontSize: '12px', fontWeight: '500', margin: 0, marginBottom: '4px', opacity: 0.9 }}>
              Ticket Médio
            </h3>
            <div style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>
              R$ 127
            </div>
          </div>
        </div>

        {/* Rest of the dashboard content */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Atalhos Rápidos */}
          <div style={{
            ...getCardStyle(),
            padding: '20px'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0, marginBottom: '16px', color: colors.text.primary }}>
              Atalhos Rápidos
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button style={{
                height: '70px',
                backgroundColor: colors.theme === 'dark' ? '#faf5ff20' : '#faf5ff',
                border: `1px solid ${colors.theme === 'dark' ? '#8b5cf640' : '#e9d5ff'}`,
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                <Plus style={{ width: '18px', height: '18px', color: '#8b5cf6', marginBottom: '6px' }} />
                <span style={{ fontSize: '11px', color: '#7c3aed', fontWeight: '500' }}>Novo Evento</span>
              </button>

              <button style={{
                height: '70px',
                backgroundColor: colors.theme === 'dark' ? '#f0fdf420' : '#f0fdf4',
                border: `1px solid ${colors.theme === 'dark' ? '#10b98140' : '#bbf7d0'}`,
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                <Users style={{ width: '18px', height: '18px', color: '#10b981', marginBottom: '6px' }} />
                <span style={{ fontSize: '11px', color: '#059669', fontWeight: '500' }}>Novo Membro</span>
              </button>

              <button style={{
                height: '70px',
                backgroundColor: colors.theme === 'dark' ? '#eff6ff20' : '#eff6ff',
                border: `1px solid ${colors.theme === 'dark' ? '#3b82f640' : '#bfdbfe'}`,
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                <Building2 style={{ width: '18px', height: '18px', color: '#3b82f6', marginBottom: '6px' }} />
                <span style={{ fontSize: '11px', color: '#2563eb', fontWeight: '500' }}>Nova Organização</span>
              </button>

              <button style={{
                height: '70px',
                backgroundColor: colors.theme === 'dark' ? '#fff7ed20' : '#fff7ed',
                border: `1px solid ${colors.theme === 'dark' ? '#f59e0b40' : '#fed7aa'}`,
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                <TrendingUp style={{ width: '18px', height: '18px', color: '#f59e0b', marginBottom: '6px' }} />
                <span style={{ fontSize: '11px', color: '#d97706', fontWeight: '500' }}>Gerar Relatório</span>
              </button>
            </div>
          </div>

          {/* Notificações */}
          <div style={{
            ...getCardStyle(),
            padding: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0, color: colors.text.primary }}>
                Notificações & Alertas
              </h3>
              <button style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: colors.brand.primary,
                fontSize: '12px',
                cursor: 'pointer'
              }}>
                Marcar todas como lidas
              </button>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '14px',
              backgroundColor: colors.theme === 'dark' ? '#fefbf220' : '#fefbf2',
              borderRadius: '10px',
              border: `1px solid ${colors.theme === 'dark' ? '#f59e0b40' : '#fde68a'}`
            }}>
              <AlertTriangle style={{ width: '18px', height: '18px', color: '#f59e0b', marginTop: '1px' }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '13px', fontWeight: '500', color: colors.text.primary, margin: 0, marginBottom: '2px' }}>
                  Evento com baixa adesão
                </p>
                <p style={{ fontSize: '11px', color: colors.text.secondary, margin: 0, marginBottom: '2px' }}>
                  Workshop IA - apenas 5 inscritos para 50 vagas
                </p>
                <p style={{ fontSize: '10px', color: '#f59e0b', fontWeight: '500', margin: 0 }}>
                  há 2 horas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
