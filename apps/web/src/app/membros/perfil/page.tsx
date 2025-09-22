'use client';
import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useThemedStyles } from '@/hooks/use-themed-styles';
import { ProMembersSidebar } from '@/components/layout/pro-members-sidebar';
import { SimpleEnhancedHeader } from '@/components/layout/simple-enhanced-header';
import {
  User,
  Building,
  FileText,
  Globe,
  MapPin,
  Video,
  Calendar,
  Camera,
  Save,
  ArrowLeft,
  ArrowRight,
  Check,
  Upload,
  Eye,
  EyeOff
} from 'lucide-react';

export default function EditarPerfilPage() {
  const { user } = useAuth();
  const { colors } = useThemedStyles();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    // Dados Pessoais
    nomeCompleto: 'Marco Carvalho',
    cpf: '123.456.789-00',
    nascimento: '1985-10-15',
    celular: '(11) 99999-9999',
    email: 'marco@test.com',
    comoSerChamado: 'Marco',
    
    // Dados da Empresa
    nomeEmpresa: 'Tech Solutions',
    cnpj: '12.345.678/0001-90',
    ramoEmpresa: 'Tecnologia da Informação (Desenvolvimento de Softwares, Consulting)',
    funcaoEmpresa: 'CEO',
    tempoAtuacao: '5',
    
    // Descrição
    descricao: `Especialista em transformação digital com mais de 10 anos de experiência.

**Minha Proposta para o Empresários SA:**
Trago para vocês não apenas conhecimento técnico, mas uma perspectiva única: a visão de quem viveu na pele as dores do negócio e desenvolveu as ferramentas para curá-las.

**Nossos serviços:**
- Consultoria em Transformação Digital
- Desenvolvimento de Soluções Customizadas  
- Otimização de Processos
- Treinamento de Equipes

Conte comigo!`,
    
    // Website e Redes Sociais
    website: 'techsolutions.com',
    facebook: '',
    instagram: 'https://www.instagram.com',
    twitter: '',
    linkedin: '',
    tiktok: '',
    youtube: '',
    
    // Endereço
    endereco: 'Rua Brasília',
    numero: '15',
    bairro: 'Centro',
    complemento: 'Sala 408 e 409',
    cep: '01310-000',
    pais: 'Brasil',
    estado: 'São Paulo',
    cidade: 'São Paulo',
    
    // Vídeo
    videoYoutube: '',
    
    // Horários
    horarios: {
      segunda: { inicio: '09:00', fim: '17:00', ativo: true },
      terca: { inicio: '09:00', fim: '17:00', ativo: true },
      quarta: { inicio: '09:00', fim: '17:00', ativo: true },
      quinta: { inicio: '09:00', fim: '17:00', ativo: true },
      sexta: { inicio: '09:00', fim: '17:00', ativo: true },
      sabado: { inicio: '09:00', fim: '12:00', ativo: false },
      domingo: { inicio: '09:00', fim: '17:00', ativo: false }
    },
    
    // Configurações
    quantosFuncionarios: '1 a 5',
    tipoCliente: 'Imobiliárias, construturas, ecommerces, agencias de Marketing, empresas que já possuem sistemas e/ou estruturas de coleta de dados',
    expectativaGrupo: 'O momento incrível de troca e possibilidades',
    atividadeBloquear: 'Atividades relacionadas a dados.',
    passarContato: 'Sim',
    urgenciaAgendamento: 'Marketing digital/rede social'
  });

  const steps = [
    { id: 1, title: 'Dados Pessoais', icon: User },
    { id: 2, title: 'Dados da Empresa', icon: Building },
    { id: 3, title: 'Descrição', icon: FileText },
    { id: 4, title: 'Website e Redes', icon: Globe },
    { id: 5, title: 'Endereço', icon: MapPin },
    { id: 6, title: 'Vídeo', icon: Video },
    { id: 7, title: 'Horários', icon: Calendar },
    { id: 8, title: 'Avatar', icon: Camera }
  ];

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const InputField = ({ label, type = 'text', field, placeholder, required = false }: any) => (
    <div style={{ marginBottom: '16px' }}>
      <label style={{
        display: 'block',
        marginBottom: '6px',
        fontSize: '14px',
        fontWeight: '500',
        color: colors.text.primary
      }}>
        {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
      </label>
      <input
        type={type}
        value={formData[field as keyof typeof formData] || ''}
        onChange={(e) => updateFormData(field, e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '12px',
          border: `1px solid ${colors.border.primary}`,
          borderRadius: '8px',
          fontSize: '14px',
          background: colors.bg.secondary,
          color: colors.text.primary,
          outline: 'none'
        }}
      />
    </div>
  );

  const SelectField = ({ label, field, options, required = false }: any) => (
    <div style={{ marginBottom: '16px' }}>
      <label style={{
        display: 'block',
        marginBottom: '6px',
        fontSize: '14px',
        fontWeight: '500',
        color: colors.text.primary
      }}>
        {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
      </label>
      <select
        value={formData[field as keyof typeof formData] || ''}
        onChange={(e) => updateFormData(field, e.target.value)}
        style={{
          width: '100%',
          padding: '12px',
          border: `1px solid ${colors.border.primary}`,
          borderRadius: '8px',
          fontSize: '14px',
          background: colors.bg.secondary,
          color: colors.text.primary,
          outline: 'none'
        }}
      >
        {options.map((option: any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  const TextAreaField = ({ label, field, placeholder, rows = 4 }: any) => (
    <div style={{ marginBottom: '16px' }}>
      <label style={{
        display: 'block',
        marginBottom: '6px',
        fontSize: '14px',
        fontWeight: '500',
        color: colors.text.primary
      }}>
        {label}
      </label>
      <textarea
        value={formData[field as keyof typeof formData] || ''}
        onChange={(e) => updateFormData(field, e.target.value)}
        placeholder={placeholder}
        rows={rows}
        style={{
          width: '100%',
          padding: '12px',
          border: `1px solid ${colors.border.primary}`,
          borderRadius: '8px',
          fontSize: '14px',
          background: colors.bg.secondary,
          color: colors.text.primary,
          outline: 'none',
          resize: 'vertical',
          fontFamily: 'inherit'
        }}
      />
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Dados Pessoais
        return (
          <div>
            <h3 style={{ marginBottom: '24px', color: colors.text.primary }}>Dados Pessoais</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <InputField label="Nome Completo" field="nomeCompleto" placeholder="Seu nome completo" required />
                <InputField label="CPF" field="cpf" placeholder="000.000.000-00" required />
                <InputField label="Data de Nascimento" field="nascimento" type="date" required />
              </div>
              <div>
                <InputField label="Celular" field="celular" placeholder="(00) 00000-0000" required />
                <InputField label="E-mail" field="email" type="email" placeholder="seu@email.com" required />
                <InputField label="Como deseja ser chamado" field="comoSerChamado" placeholder="Nome de preferência" />
              </div>
            </div>
          </div>
        );

      case 2: // Dados da Empresa
        return (
          <div>
            <h3 style={{ marginBottom: '24px', color: colors.text.primary }}>Dados da Empresa</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <InputField label="Nome da Sua Empresa" field="nomeEmpresa" placeholder="Nome da empresa" required />
                <InputField label="CNPJ da sua empresa" field="cnpj" placeholder="00.000.000/0000-00" />
                <SelectField 
                  label="Qual o Ramo da Sua empresa?" 
                  field="ramoEmpresa" 
                  options={[
                    { value: '', label: 'Selecione...' },
                    { value: 'Tecnologia da Informação (Desenvolvimento de Softwares, Consulting)', label: 'Tecnologia da Informação (Desenvolvimento de Softwares, Consulting)' },
                    { value: 'Marketing e Publicidade', label: 'Marketing e Publicidade' },
                    { value: 'Consultoria Empresarial', label: 'Consultoria Empresarial' },
                    { value: 'Vendas e Comércio', label: 'Vendas e Comércio' },
                    { value: 'Serviços Financeiros', label: 'Serviços Financeiros' }
                  ]}
                  required 
                />
              </div>
              <div>
                <InputField label="Qual sua função na Empresa?" field="funcaoEmpresa" placeholder="Ex: CEO, Diretor, Gerente" />
                <SelectField 
                  label="Quanto tempo você tem de atuação no seu mercado?" 
                  field="tempoAtuacao" 
                  options={[
                    { value: '', label: 'Selecione...' },
                    { value: '1', label: '1 ano' },
                    { value: '2', label: '2 anos' },
                    { value: '3', label: '3 anos' },
                    { value: '4', label: '4 anos' },
                    { value: '5', label: '5 anos' },
                    { value: '10+', label: '10+ anos' }
                  ]}
                />
                <SelectField 
                  label="Sua empresa possui quantos funcionários?" 
                  field="quantosFuncionarios" 
                  options={[
                    { value: '', label: 'Selecione...' },
                    { value: '1 a 5', label: '1 a 5' },
                    { value: '6 a 10', label: '6 a 10' },
                    { value: '11 a 50', label: '11 a 50' },
                    { value: '51 a 100', label: '51 a 100' },
                    { value: '100+', label: '100+' }
                  ]}
                />
              </div>
            </div>
          </div>
        );

      case 3: // Descrição
        return (
          <div>
            <h3 style={{ marginBottom: '24px', color: colors.text.primary }}>Descrição</h3>
            <TextAreaField 
              label="Explique em sua e com poucas palavras o que sua empresa atua?" 
              field="descricao" 
              placeholder="Descreva sua empresa e seus serviços..."
              rows={12}
            />
            <TextAreaField 
              label="Qual o tipo de cliente ou parceria você busca?" 
              field="tipoCliente" 
              placeholder="Descreva seu cliente ideal..."
              rows={3}
            />
          </div>
        );

      case 4: // Website e Redes Sociais
        return (
          <div>
            <h3 style={{ marginBottom: '24px', color: colors.text.primary }}>Website e Redes Sociais</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <InputField label="Website" field="website" placeholder="seusite.com" />
                <InputField label="Facebook" field="facebook" placeholder="https://facebook.com/..." />
                <InputField label="Instagram" field="instagram" placeholder="https://instagram.com/..." />
                <InputField label="Twitter" field="twitter" placeholder="https://twitter.com/..." />
              </div>
              <div>
                <InputField label="LinkedIn" field="linkedin" placeholder="https://linkedin.com/..." />
                <InputField label="TikTok" field="tiktok" placeholder="https://tiktok.com/..." />
                <InputField label="YouTube" field="youtube" placeholder="https://youtube.com/..." />
              </div>
            </div>
          </div>
        );

      case 5: // Endereço
        return (
          <div>
            <h3 style={{ marginBottom: '24px', color: colors.text.primary }}>Endereço</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <InputField label="Endereço" field="endereco" placeholder="Nome da rua" />
              <InputField label="Número" field="numero" placeholder="123" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <InputField label="Bairro" field="bairro" placeholder="Nome do bairro" />
              <InputField label="Complemento" field="complemento" placeholder="Apto, sala, etc." />
              <InputField label="CEP" field="cep" placeholder="00000-000" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <SelectField 
                label="País" 
                field="pais" 
                options={[
                  { value: 'Brasil', label: 'Brasil' },
                  { value: 'Argentina', label: 'Argentina' },
                  { value: 'Chile', label: 'Chile' }
                ]}
              />
              <SelectField 
                label="Estado" 
                field="estado" 
                options={[
                  { value: '', label: 'Selecione...' },
                  { value: 'São Paulo', label: 'São Paulo' },
                  { value: 'Rio de Janeiro', label: 'Rio de Janeiro' },
                  { value: 'Minas Gerais', label: 'Minas Gerais' }
                ]}
              />
              <SelectField 
                label="Cidade" 
                field="cidade" 
                options={[
                  { value: '', label: 'Selecione...' },
                  { value: 'São Paulo', label: 'São Paulo' },
                  { value: 'Rio de Janeiro', label: 'Rio de Janeiro' },
                  { value: 'Belo Horizonte', label: 'Belo Horizonte' }
                ]}
              />
            </div>
          </div>
        );

      case 6: // Vídeo
        return (
          <div>
            <h3 style={{ marginBottom: '24px', color: colors.text.primary }}>Vídeo Apresentação YouTube</h3>
            <InputField 
              label="Link do vídeo no YouTube" 
              field="videoYoutube" 
              placeholder="https://youtube.com/watch?v=..." 
            />
            <div style={{
              background: colors.bg.tertiary,
              padding: '16px',
              borderRadius: '8px',
              marginTop: '16px'
            }}>
              <p style={{ margin: '0 0 8px 0', fontWeight: '500', color: colors.text.primary }}>
                Dica para um bom vídeo:
              </p>
              <ul style={{ margin: 0, paddingLeft: '20px', color: colors.text.secondary }}>
                <li>Duração de 1-2 minutos</li>
                <li>Apresente-se e fale sobre sua empresa</li>
                <li>Mencione seus principais serviços</li>
                <li>Seja natural e autêntico</li>
              </ul>
            </div>
          </div>
        );

      case 7: // Horários
        return (
          <div>
            <h3 style={{ marginBottom: '24px', color: colors.text.primary }}>
              Qual o melhor horário para agendar reuniões individuais com outros membros
            </h3>
            {Object.entries(formData.horarios).map(([dia, horario]) => (
              <div key={dia} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '16px',
                padding: '16px',
                background: colors.bg.secondary,
                borderRadius: '8px',
                border: `1px solid ${colors.border.primary}`
              }}>
                <div style={{ minWidth: '100px', fontWeight: '500', textTransform: 'capitalize', color: colors.text.primary }}>
                  {dia.replace('segunda', 'Segunda-feira')
                       .replace('terca', 'Terça-feira')
                       .replace('quarta', 'Quarta-feira')
                       .replace('quinta', 'Quinta-feira')
                       .replace('sexta', 'Sexta-feira')
                       .replace('sabado', 'Sábado')
                       .replace('domingo', 'Domingo')}
                </div>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    checked={horario.ativo}
                    onChange={(e) => {
                      const newHorarios = { ...formData.horarios };
                      newHorarios[dia as keyof typeof newHorarios].ativo = e.target.checked;
                      setFormData(prev => ({ ...prev, horarios: newHorarios }));
                    }}
                  />
                  Disponível
                </label>
                
                {horario.ativo && (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '14px', color: colors.text.primary }}>De:</span>
                      <input
                        type="time"
                        value={horario.inicio}
                        onChange={(e) => {
                          const newHorarios = { ...formData.horarios };
                          newHorarios[dia as keyof typeof newHorarios].inicio = e.target.value;
                          setFormData(prev => ({ ...prev, horarios: newHorarios }));
                        }}
                        style={{
                          padding: '6px',
                          border: `1px solid ${colors.border.primary}`,
                          borderRadius: '4px',
                          background: colors.bg.primary, color: colors.text.primary
                        }}
                      />
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '14px', color: colors.text.primary }}>Até:</span>
                      <input
                        type="time"
                        value={horario.fim}
                        onChange={(e) => {
                          const newHorarios = { ...formData.horarios };
                          newHorarios[dia as keyof typeof newHorarios].fim = e.target.value;
                          setFormData(prev => ({ ...prev, horarios: newHorarios }));
                        }}
                        style={{
                          padding: '6px',
                          border: `1px solid ${colors.border.primary}`,
                          borderRadius: '4px',
                          background: colors.bg.primary, color: colors.text.primary
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        );

      case 8: // Avatar
        return (
          <div>
            <h3 style={{ marginBottom: '24px', color: colors.text.primary }}>Foto do Perfil</h3>
            <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
              <div style={{
                width: '120px',
                height: '120px',
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '32px',
                fontWeight: 'bold'
              }}>
                MC
              </div>
              
              <div>
                <button style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '12px'
                }}>
                  <Upload size={16} />
                  Escolher Foto
                </button>
                
                <p style={{ 
                  margin: 0, 
                  fontSize: '13px', 
                  color: colors.text.secondary 
                }}>
                  Recomendado: 300x300px, formato JPG ou PNG, máximo 2MB
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <ProMembersSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <SimpleEnhancedHeader area="member" />
        
        <main style={{ 
          flex: 1, 
          padding: '24px',
          background: colors.bg.secondary,
          overflowY: 'auto'
        }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <User size={28} style={{ color: '#8b5cf6' }} />
            <div>
              <h1 style={{ 
                margin: 0, 
                fontSize: '28px', 
                fontWeight: '700',
                color: colors.text.primary 
              }}>
                Editar Meu Perfil
              </h1>
              <p style={{ margin: 0, fontSize: '16px', color: colors.text.secondary }}>
                Complete seu perfil para se conectar melhor com outros membros
              </p>
            </div>
            
            <button
              onClick={() => setShowPreview(!showPreview)}
              style={{
                marginLeft: 'auto',
                background: showPreview ? colors.bg.tertiary : 'linear-gradient(135deg, #10b981, #059669)',
                color: showPreview ? colors.text.primary : 'white',
                border: showPreview ? `1px solid ${colors.border.primary}` : 'none',
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
              {showPreview ? <EyeOff size={14} /> : <Eye size={14} />}
              {showPreview ? 'Editar' : 'Preview'}
            </button>
          </div>

          {/* Progress Steps */}
          <div style={{
            background: colors.bg.primary, color: colors.text.primary,
            borderRadius: '16px',
            border: `1px solid ${colors.border.primary}`,
            padding: '24px',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = step.id === currentStep;
                const isCompleted = step.id < currentStep;
                
                return (
                  <div key={step.id} style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    position: 'relative',
                    flex: 1
                  }}>
                    {index < steps.length - 1 && (
                      <div style={{
                        position: 'absolute',
                        top: '20px',
                        left: '50%',
                        width: '100%',
                        height: '2px',
                        background: isCompleted ? '#8b5cf6' : colors.border.primary,
                        zIndex: 1
                      }} />
                    )}
                    
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: isCompleted ? '#8b5cf6' : isActive ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)' : colors.bg.secondary,
                      border: !isCompleted && !isActive ? `2px solid ${colors.border.primary}` : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isCompleted || isActive ? 'white' : colors.text.tertiary,
                      marginBottom: '8px',
                      position: 'relative',
                      zIndex: 2
                    }}>
                      {isCompleted ? <Check size={20} /> : <Icon size={20} />}
                    </div>
                    
                    <span style={{
                      fontSize: '12px',
                      fontWeight: isActive ? '600' : '400',
                      color: isActive ? colors.text.primary : colors.text.secondary,
                      textAlign: 'center'
                    }}>
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Content */}
          <div style={{
            background: colors.bg.primary, color: colors.text.primary,
            borderRadius: '16px',
            border: `1px solid ${colors.border.primary}`,
            padding: '32px',
            marginBottom: '24px'
          }}>
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              style={{
                background: currentStep === 1 ? colors.bg.tertiary : colors.bg.secondary,
                color: currentStep === 1 ? colors.text.tertiary : colors.text.primary,
                border: `1px solid ${colors.border.primary}`,
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <ArrowLeft size={16} />
              Anterior
            </button>

            {currentStep < steps.length ? (
              <button
                onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Próximo
                <ArrowRight size={16} />
              </button>
            ) : (
              <button style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Save size={16} />
                Salvar Perfil
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
