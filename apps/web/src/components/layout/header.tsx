"use client"

import { Bell, RotateCcw, ChevronDown } from "lucide-react"

export function Header() {
  return (
    <header style={{
      backgroundColor: 'white',
      borderBottom: '1px solid #f1f5f9',
      padding: '16px 24px',
      width: '100%',
      height: '72px', // Fixed height to match
      display: 'flex',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ marginLeft: '8px' }}> {/* Align with sidebar content */}
          <h1 style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            color: '#0f172a',
            margin: 0,
            marginBottom: '2px'
          }}>
            Dashboard Admin
          </h1>
          <p style={{ 
            fontSize: '14px', 
            color: '#64748b',
            margin: 0
          }}>
            Bem-vindo de volta! Aqui está o resumo do seu negócio.
          </p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button style={{
            backgroundColor: '#faf5ff',
            border: '1px solid #e9d5ff',
            color: '#7c3aed',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <RotateCcw style={{ width: '16px', height: '16px' }} />
            Backup Dados
          </button>
          
          <button style={{
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
            padding: '8px'
          }}>
            <Bell style={{ width: '20px', height: '20px', color: '#6b7280' }} />
            <span style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              width: '8px',
              height: '8px',
              backgroundColor: '#ef4444',
              borderRadius: '50%'
            }} />
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#dcfce7',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ color: '#16a34a', fontWeight: '600', fontSize: '14px' }}>AS</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#0f172a' }}>Admin Sistema</span>
              <ChevronDown style={{ width: '16px', height: '16px', color: '#6b7280' }} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
