"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useThemedStyles } from "@/hooks/use-themed-styles"
import { Calendar1, Construction } from "lucide-react"

export default function EventosPage() {
  const { colors, getCardStyle } = useThemedStyles()

  return (
    <DashboardLayout>
      <div style={{ padding: '24px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: colors.text.primary,
            margin: 0,
            marginBottom: '8px',
            transition: 'color 0.3s ease'
          }}>
            Eventos
          </h1>
          <p style={{
            fontSize: '16px',
            color: colors.text.secondary,
            margin: 0,
            transition: 'color 0.3s ease'
          }}>
            Gerencie eventos, reuniões e atividades da rede
          </p>
        </div>

        <div style={{
          ...getCardStyle(),
          padding: '60px',
          textAlign: 'center',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          <Construction style={{ 
            width: '64px', 
            height: '64px', 
            color: colors.text.tertiary, 
            margin: '0 auto 20px' 
          }} />
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: colors.text.primary,
            margin: '0 0 12px 0',
            transition: 'color 0.3s ease'
          }}>
            Página em Desenvolvimento
          </h3>
          <p style={{
            fontSize: '14px',
            color: colors.text.secondary,
            margin: 0,
            lineHeight: '1.5',
            transition: 'color 0.3s ease'
          }}>
            Esta funcionalidade está sendo desenvolvida e estará disponível em breve.
            Aqui você poderá criar, editar e gerenciar eventos, reuniões, workshops e atividades da rede CNE.
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}
