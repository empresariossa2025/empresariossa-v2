"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Users, Building2, Calendar, TrendingUp, Plus, AlertTriangle, CheckCircle } from "lucide-react"

export default function Dashboard() {
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
            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
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

          {/* Taxa de Participação */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid #f1f5f9',
            minHeight: '120px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h3 style={{ fontSize: '12px', fontWeight: '500', margin: 0, marginBottom: '8px', color: '#64748b' }}>
              Taxa de Participação
            </h3>
            <div style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#0f172a' }}>
              85%
            </div>
            <div style={{ fontSize: '11px', marginTop: '4px', color: '#22c55e', fontWeight: '500' }}>
              +5.3%
            </div>
          </div>

          {/* Receita Mensal */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid #f1f5f9',
            minHeight: '120px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h3 style={{ fontSize: '12px', fontWeight: '500', margin: 0, marginBottom: '8px', color: '#64748b' }}>
              Receita Mensal
            </h3>
            <div style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: '#0f172a' }}>
              R$ {stats.revenue.toLocaleString()}
            </div>
            <div style={{ fontSize: '11px', marginTop: '4px', color: '#22c55e', fontWeight: '500' }}>
              +12.4%
            </div>
          </div>

          {/* Org. Pendentes */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid #f1f5f9',
            minHeight: '120px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h3 style={{ fontSize: '12px', fontWeight: '500', margin: 0, marginBottom: '8px', color: '#64748b' }}>
              Org. Pendentes
            </h3>
            <div style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#0f172a' }}>
              {stats.organizations}
            </div>
            <div style={{ fontSize: '11px', marginTop: '4px', color: '#ef4444', fontWeight: '500' }}>
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
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid #f1f5f9'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0, marginBottom: '16px', color: '#0f172a' }}>
              Atalhos Rápidos
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button style={{
                height: '70px',
                backgroundColor: '#faf5ff',
                border: '1px solid #e9d5ff',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}>
                <Plus style={{ width: '18px', height: '18px', color: '#8b5cf6', marginBottom: '6px' }} />
                <span style={{ fontSize: '11px', color: '#7c3aed', fontWeight: '500' }}>Novo Evento</span>
              </button>

              <button style={{
                height: '70px',
                backgroundColor: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}>
                <Users style={{ width: '18px', height: '18px', color: '#10b981', marginBottom: '6px' }} />
                <span style={{ fontSize: '11px', color: '#059669', fontWeight: '500' }}>Novo Membro</span>
              </button>

              <button style={{
                height: '70px',
                backgroundColor: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}>
                <Building2 style={{ width: '18px', height: '18px', color: '#3b82f6', marginBottom: '6px' }} />
                <span style={{ fontSize: '11px', color: '#2563eb', fontWeight: '500' }}>Nova Organização</span>
              </button>

              <button style={{
                height: '70px',
                backgroundColor: '#fff7ed',
                border: '1px solid #fed7aa',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}>
                <TrendingUp style={{ width: '18px', height: '18px', color: '#f59e0b', marginBottom: '6px' }} />
                <span style={{ fontSize: '11px', color: '#d97706', fontWeight: '500' }}>Gerar Relatório</span>
              </button>
            </div>
          </div>

          {/* Notificações */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid #f1f5f9'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0, color: '#0f172a' }}>
                Notificações & Alertas
              </h3>
              <button style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#8b5cf6',
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
              backgroundColor: '#fefbf2',
              borderRadius: '10px',
              border: '1px solid #fde68a'
            }}>
              <AlertTriangle style={{ width: '18px', height: '18px', color: '#f59e0b', marginTop: '1px' }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '13px', fontWeight: '500', color: '#0f172a', margin: 0, marginBottom: '2px' }}>
                  Evento com baixa adesão
                </p>
                <p style={{ fontSize: '11px', color: '#6b7280', margin: 0, marginBottom: '2px' }}>
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
