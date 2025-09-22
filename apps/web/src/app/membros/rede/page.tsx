'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { useThemedStyles } from '@/hooks/use-themed-styles';
import { ProMembersSidebar } from '@/components/layout/pro-members-sidebar';
import { SimpleEnhancedHeader } from '@/components/layout/simple-enhanced-header';
import {
  Users,
  Search,
  Filter,
  MapPin,
  Building,
  Star,
  Clock,
  Edit,
  Eye,
  MessageCircle,
  X,
  Plus,
  UserPlus,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function MinhaRedePage() {
  const { user } = useAuth();
  const { colors } = useThemedStyles();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllMembers, setShowAllMembers] = useState(false);
  const [filters, setFilters] = useState({
    ramo: 'todos',
    unidade: 'todas',
    estado: 'todos',
    cidade: 'todas'
  });
  const [myNetwork, setMyNetwork] = useState<number[]>([1, 2]); // IDs dos membros na minha rede

  // Todos os membros disponíveis
  const allMembers = [
    {
      id: 1,
      name: "Thaina Adriano de Alcantara",
      empresa: "Groll Data-Driven",
      ramo: "Tecnologia da Informação",
      especialidade: "Engenharia de Dados & Arquiteta de Soluções",
      cidade: "Rio de Janeiro",
      estado: "Rio de Janeiro",
      unidade: "Matriz - Barra da Tijuca",
      telefone: "(21) 97373-5255",
      email: "thaina@grollero.com",
      rating: 4.8
    },
    {
      id: 2,
      name: "Marco Carvalho",
      empresa: "Tech Solutions",
      ramo: "Consultoria",
      especialidade: "Transformação Digital",
      cidade: "São Paulo",
      estado: "São Paulo", 
      unidade: "Empresários SA Conexão Brasil",
      telefone: "(11) 99999-9999",
      email: "marco@techsolutions.com",
      rating: 4.9
    },
    {
      id: 3,
      name: "Ana Silva",
      empresa: "Marketing Pro",
      ramo: "Marketing Digital",
      especialidade: "Growth Hacking & Performance",
      cidade: "Belo Horizonte",
      estado: "Minas Gerais",
      unidade: "Unidade Nova América - Del Castilho",
      telefone: "(31) 88888-8888", 
      email: "ana@marketingpro.com",
      rating: 4.7
    },
    {
      id: 4,
      name: "Adenias G. Filho",
      empresa: "Consultoria Financeira",
      ramo: "Consultoria Financeira",
      especialidade: "Consultoria Financeira para Empresas",
      cidade: "Rio de Janeiro",
      estado: "Rio de Janeiro",
      unidade: "Unidade Nova América - Del Castilho",
      telefone: "(21) 99999-1111",
      email: "adenias@consultoria.com",
      rating: 4.8
    },
    {
      id: 5,
      name: "Alessandro Schlomer",
      empresa: "Gestão Financeira",
      ramo: "Gestão Financeira",
      especialidade: "Gestão Financeira pessoa física",
      cidade: "Rio de Janeiro",
      estado: "Rio de Janeiro",
      unidade: "Matriz - Barra da Tijuca",
      telefone: "(21) 99999-5555",
      email: "alessandro@gestao.com",
      rating: 4.5
    },
    {
      id: 6,
      name: "André Freitas",
      empresa: "Tech Solutions RJ",
      ramo: "Tecnologia da Informação",
      especialidade: "Desenvolvimento de Software",
      cidade: "Rio de Janeiro",
      estado: "Rio de Janeiro",
      unidade: "Empresários SA Conexão Brasil",
      telefone: "(21) 99999-6666",
      email: "andre@techsolutions.com",
      rating: 4.8
    }
  ];

  const filterOptions = {
    ramos: ['todos', 'Tecnologia da Informação', 'Consultoria', 'Marketing Digital', 'Consultoria Financeira', 'Gestão Financeira'],
    unidades: ['todas', 'Matriz - Barra da Tijuca', 'Empresários SA Conexão Brasil', 'Unidade Nova América - Del Castilho'],
    estados: ['todos', 'Rio de Janeiro', 'São Paulo', 'Minas Gerais'],
    cidades: ['todas', 'Rio de Janeiro', 'São Paulo', 'Belo Horizonte']
  };

  // Filtrar todos os membros
  const filteredAllMembers = allMembers.filter(member => {
    const matchesSearch = searchTerm === '' || 
                         member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.especialidade.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRamo = filters.ramo === 'todos' || member.ramo === filters.ramo;
    const matchesUnidade = filters.unidade === 'todas' || member.unidade === filters.unidade;
    const matchesEstado = filters.estado === 'todos' || member.estado === filters.estado;
    const matchesCidade = filters.cidade === 'todas' || member.cidade === filters.cidade;
    
    return matchesSearch && matchesRamo && matchesUnidade && matchesEstado && matchesCidade;
  });

  // Membros da minha rete
  const networkMembers = allMembers.filter(member => myNetwork.includes(member.id));

  const addToNetwork = (memberId: number) => {
    if (!myNetwork.includes(memberId)) {
      setMyNetwork(prev => [...prev, memberId]);
    }
  };

  const removeFromNetwork = (memberId: number) => {
    setMyNetwork(prev => prev.filter(id => id !== memberId));
  };

  const AllMemberCard = ({ member }: any) => (
    <div style={{
      background: colors.bg.primary,
      borderRadius: '12px',
      border: `1px solid ${colors.border.primary}`,
      padding: '16px',
      transition: 'all 0.2s ease'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-1px)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}>
      
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{
          width: '50px',
          height: '50px',
          background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '16px',
          fontWeight: 'bold'
        }}>
          {member.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
        </div>
        
        <div style={{ flex: 1 }}>
          <h4 style={{ 
            margin: '0 0 2px 0', 
            fontSize: '15px', 
            fontWeight: '600',
            color: colors.text.primary 
          }}>
            {member.name}
          </h4>
          
          <p style={{ 
            margin: '0 0 2px 0', 
            fontSize: '13px', 
            color: colors.text.secondary,
            fontWeight: '500'
          }}>
            {member.empresa}
          </p>
          
          <p style={{ 
            margin: '0 0 6px 0', 
            fontSize: '12px', 
            color: colors.text.tertiary 
          }}>
            {member.especialidade}
          </p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            <span style={{
              fontSize: '11px',
              color: colors.text.tertiary,
              background: colors.bg.secondary,
              padding: '2px 6px',
              borderRadius: '8px'
            }}>
              {member.cidade}, {member.estado}
            </span>
            <span style={{
              fontSize: '11px',
              color: colors.text.tertiary,
              background: colors.bg.secondary,
              padding: '2px 6px',
              borderRadius: '8px'
            }}>
              {member.ramo}
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '6px' }}>
        <button style={{
          flex: 1,
          background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          padding: '6px 8px',
          fontSize: '11px',
          fontWeight: '500',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px'
        }}>
          <Eye size={12} />
          Ver
        </button>
        
        <button 
          onClick={() => addToNetwork(member.id)}
          disabled={myNetwork.includes(member.id)}
          style={{
            background: myNetwork.includes(member.id) ? colors.bg.tertiary : 'linear-gradient(135deg, #10b981, #059669)',
            color: myNetwork.includes(member.id) ? colors.text.tertiary : 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '6px 8px',
            fontSize: '11px',
            fontWeight: '500',
            cursor: myNetwork.includes(member.id) ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px'
          }}
        >
          <Plus size={12} />
          {myNetwork.includes(member.id) ? 'Na rede' : 'Adicionar'}
        </button>
      </div>
    </div>
  );

  const NetworkMemberCard = ({ member }: any) => (
    <div style={{
      background: colors.bg.primary,
      borderRadius: '16px',
      border: `1px solid ${colors.border.primary}`,
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
    }}>
      
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
        <div style={{
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          {member.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
        </div>
        
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            margin: '0 0 4px 0', 
            fontSize: '18px', 
            fontWeight: '600',
            color: colors.text.primary 
          }}>
            {member.name}
          </h3>
          
          <p style={{ 
            margin: '0 0 4px 0', 
            fontSize: '14px', 
            color: colors.text.secondary,
            fontWeight: '500'
          }}>
            {member.empresa}
          </p>
          
          <p style={{ 
            margin: '0 0 8px 0', 
            fontSize: '13px', 
            color: colors.text.tertiary 
          }}>
            {member.especialidade}
          </p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
            <Star size={14} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
            <span style={{ fontSize: '13px', color: colors.text.secondary, fontWeight: '500' }}>
              {member.rating}
            </span>
            <span style={{ fontSize: '12px', color: colors.text.tertiary, marginLeft: '8px' }}>
              • {member.ramo}
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px',
              color: colors.text.tertiary,
              background: colors.bg.secondary,
              padding: '2px 8px',
              borderRadius: '12px'
            }}>
              <MapPin size={12} />
              {member.cidade}, {member.estado}
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px',
              color: colors.text.tertiary,
              background: colors.bg.secondary,
              padding: '2px 8px',
              borderRadius: '12px'
            }}>
              <Building size={12} />
              {member.unidade}
            </div>
          </div>
        </div>

        <button
          onClick={() => removeFromNetwork(member.id)}
          style={{
            background: 'transparent',
            border: `1px solid ${colors.border.primary}`,
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: colors.text.tertiary
          }}
        >
          <X size={16} />
        </button>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button style={{
          flex: 1,
          background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '8px 12px',
          fontSize: '13px',
          fontWeight: '500',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px'
        }}>
          <Eye size={14} />
          Ver Perfil
        </button>
        
        <button style={{
          background: colors.bg.secondary,
          color: colors.text.primary,
          border: `1px solid ${colors.border.primary}`,
          borderRadius: '8px',
          padding: '8px 12px',
          fontSize: '13px',
          fontWeight: '500',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px'
        }}>
          <MessageCircle size={14} />
          Contato
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar Sticky */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        alignSelf: 'flex-start'
      }}>
        <ProMembersSidebar />
      </div>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <SimpleEnhancedHeader area="member" />
        
        <main style={{ 
          flex: 1, 
          padding: '24px',
          background: colors.bg.secondary,
          overflowY: 'auto'
        }}>
          {/* Header Section */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <Users size={28} style={{ color: '#8b5cf6' }} />
              <h1 style={{ 
                margin: 0, 
                fontSize: '28px', 
                fontWeight: '700',
                color: colors.text.primary 
              }}>
                Minha Rede
              </h1>
            </div>
            <p style={{ 
              margin: 0, 
              fontSize: '16px', 
              color: colors.text.secondary 
            }}>
              Conecte-se com outros membros e descubra oportunidades de negócio
            </p>
          </div>

          {/* Search and Filter Section */}
          <div style={{
            background: colors.bg.primary,
            borderRadius: '16px',
            border: `1px solid ${colors.border.primary}`,
            padding: '24px',
            marginBottom: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            {/* Search Bar */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ position: 'relative' }}>
                <Search 
                  size={20} 
                  style={{ 
                    position: 'absolute', 
                    left: '12px', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    color: colors.text.tertiary
                  }} 
                />
                <input
                  type="text"
                  placeholder="Buscar por nome, empresa ou especialidade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 44px',
                    border: `1px solid ${colors.border.primary}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    background: colors.bg.secondary,
                    color: colors.text.primary,
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Filters */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                <select
                  value={filters.ramo}
                  onChange={(e) => setFilters(prev => ({ ...prev, ramo: e.target.value }))}
                  style={{
                    padding: '8px 12px',
                    border: `1px solid ${colors.border.primary}`,
                    borderRadius: '6px',
                    fontSize: '13px',
                    background: colors.bg.secondary,
                    color: colors.text.primary,
                    outline: 'none'
                  }}
                >
                  {filterOptions.ramos.map(ramo => (
                    <option key={ramo} value={ramo}>
                      {ramo === 'todos' ? 'Todos os ramos' : ramo}
                    </option>
                  ))}
                </select>

                <select
                  value={filters.unidade}
                  onChange={(e) => setFilters(prev => ({ ...prev, unidade: e.target.value }))}
                  style={{
                    padding: '8px 12px',
                    border: `1px solid ${colors.border.primary}`,
                    borderRadius: '6px',
                    fontSize: '13px',
                    background: colors.bg.secondary,
                    color: colors.text.primary,
                    outline: 'none'
                  }}
                >
                  {filterOptions.unidades.map(unidade => (
                    <option key={unidade} value={unidade}>
                      {unidade === 'todas' ? 'Todas as unidades' : unidade}
                    </option>
                  ))}
                </select>

                <select
                  value={filters.estado}
                  onChange={(e) => setFilters(prev => ({ ...prev, estado: e.target.value }))}
                  style={{
                    padding: '8px 12px',
                    border: `1px solid ${colors.border.primary}`,
                    borderRadius: '6px',
                    fontSize: '13px',
                    background: colors.bg.secondary,
                    color: colors.text.primary,
                    outline: 'none'
                  }}
                >
                  {filterOptions.estados.map(estado => (
                    <option key={estado} value={estado}>
                      {estado === 'todos' ? 'Todos os estados' : estado}
                    </option>
                  ))}
                </select>

                <select
                  value={filters.cidade}
                  onChange={(e) => setFilters(prev => ({ ...prev, cidade: e.target.value }))}
                  style={{
                    padding: '8px 12px',
                    border: `1px solid ${colors.border.primary}`,
                    borderRadius: '6px',
                    fontSize: '13px',
                    background: colors.bg.secondary,
                    color: colors.text.primary,
                    outline: 'none'
                  }}
                >
                  {filterOptions.cidades.map(cidade => (
                    <option key={cidade} value={cidade}>
                      {cidade === 'todas' ? 'Todas as cidades' : cidade}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '14px', color: colors.text.secondary }}>
                {filteredAllMembers.length} membros encontrados
              </span>
              
              <button 
                onClick={() => setShowAllMembers(!showAllMembers)}
                style={{
                  background: showAllMembers ? colors.bg.tertiary : 'linear-gradient(135deg, #10b981, #059669)',
                  color: showAllMembers ? colors.text.primary : 'white',
                  border: showAllMembers ? `1px solid ${colors.border.primary}` : 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginLeft: 'auto'
                }}
              >
                {showAllMembers ? <ChevronUp size={14} /> : <UserPlus size={14} />}
                {showAllMembers ? 'Ocultar membros' : 'Veja todos os membros'}
              </button>
            </div>
          </div>

          {/* Seção Todos os Membros (Expansível) */}
          {showAllMembers && (
            <div style={{
              background: colors.bg.primary,
              borderRadius: '16px',
              border: `1px solid ${colors.border.primary}`,
              padding: '24px',
              marginBottom: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '600', color: colors.text.primary }}>
                  Todos os Membros
                </h2>
                <span style={{ fontSize: '14px', color: colors.text.secondary }}>
                  {filteredAllMembers.length} membros disponíveis
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '16px'
              }}>
                {filteredAllMembers.map(member => (
                  <AllMemberCard key={member.id} member={member} />
                ))}
              </div>

              {filteredAllMembers.length === 0 && (
                <div style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                  color: colors.text.secondary
                }}>
                  <Users size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                  <p style={{ margin: 0 }}>Nenhum membro encontrado com os filtros selecionados</p>
                </div>
              )}
            </div>
          )}

          {/* Minha Rede Header */}
          <div style={{
            background: colors.bg.primary,
            borderRadius: '16px',
            border: `1px solid ${colors.border.primary}`,
            padding: '20px 24px',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h2 style={{ margin: '0 0 4px 0', fontSize: '20px', fontWeight: '600', color: colors.text.primary }}>
                  Minha Rede Pessoal
                </h2>
                <p style={{ margin: 0, fontSize: '14px', color: colors.text.secondary }}>
                  {networkMembers.length} membros na sua rede
                </p>
              </div>
              
              <button 
                onClick={() => router.push('/membros/perfil')}
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Edit size={14} />
                Editar Meu Perfil
              </button>
            </div>
          </div>

          {/* Network Members Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '24px'
          }}>
            {networkMembers.map(member => (
              <NetworkMemberCard key={member.id} member={member} />
            ))}
          </div>

          {networkMembers.length === 0 && (
            <div style={{
              background: colors.bg.primary,
              borderRadius: '16px',
              border: `1px solid ${colors.border.primary}`,
              padding: '48px 24px',
              textAlign: 'center'
            }}>
              <Users size={48} style={{ color: colors.text.tertiary, margin: '0 auto 16px' }} />
              <h3 style={{ margin: '0 0 8px 0', color: colors.text.primary }}>
                Sua rede está vazia
              </h3>
              <p style={{ margin: '0 0 16px 0', color: colors.text.secondary }}>
                Adicione membros à sua rede para começar a fazer conexões
              </p>
              <button 
                onClick={() => setShowAllMembers(true)}
                style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  margin: '0 auto'
                }}
              >
                <UserPlus size={14} />
                Encontrar Membros
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
