/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Phone,
  ArrowRight,
  Check,
  Plus,
  Minus,
  Trash2,
  Copy,
  CheckCircle2,
  ChevronDown,
  MapPin,
  Search,
  Building2,
  Calculator,
  FileText,
  Download,
  ExternalLink,
  Lock,
  Mail,
  RefreshCw,
  X,
} from 'lucide-react';
import {
  SOPORTETECH_INFO,
  LOCAL_SEARCH_NEEDS,
  CORE_SERVICES,
  HARDWARE_CATALOG_LINES,
  REGIONAL_CASE_STUDIES,
  SOCONUSCO_COVERAGE,
  HardwareLine,
  CatalogCategory,
} from './data/soportetechData';
import {
  HeroInfrastructureVisual,
  ServiceCategorySchematic,
  CircuitDivider,
} from './components/ArchitecturalVisuals';

type CatalogFilter = 'todos' | CatalogCategory;

interface QuoteItem {
  line: HardwareLine;
  quantity: number;
}

interface LeadRecord {
  id: string;
  createdAt: string;
  contactName: string;
  companyName: string;
  contactPhone: string;
  contactEmail?: string;
  municipality: string;
  serviceInterest: string;
  selectedEquipment: string[];
  projectNotes: string;
  preferredChannel: 'whatsapp' | 'llamada' | 'correo';
  status: 'Nuevo' | 'Contactado' | 'Cotizado';
}

interface IndustryProfile {
  id: string;
  label: string;
  bottleneck: string;
  recommendedModules: string[];
  hoursSavedPerEmployeeMonth: number;
  typicalTimeline: string;
}

const INDUSTRY_PROFILES: IndustryProfile[] = [
  {
    id: 'agro',
    label: 'Agroindustria y Exportación (Café, Mango, Plátano)',
    bottleneck:
      'Registros de báscula en papel o Excel, merma en almacén y trazabilidad lenta de lotes de productores.',
    recommendedModules: [
      'Integración directa con báscula digital y tickets de recepción',
      'Control de inventario por lote, humedad y productor del Soconusco',
      'Liquidaciones automatizadas y reportes gerenciales en tiempo real',
    ],
    hoursSavedPerEmployeeMonth: 28,
    typicalTimeline: '6 a 8 semanas',
  },
  {
    id: 'logistica',
    label: 'Agencia Aduanal, Transporte y Frontera Sur',
    bottleneck:
      'Seguimiento disperso de unidades en Puerto Chiapas / Suchiate y control manual de gastos de viaje.',
    recommendedModules: [
      'Panel de estatus de embarques, pedimentos y patio de maniobras',
      'Control de combustible, mantenimientos preventivos y operadores',
      'Alertas automáticas a clientes por WhatsApp y correo electrónico',
    ],
    hoursSavedPerEmployeeMonth: 32,
    typicalTimeline: '6 a 10 semanas',
  },
  {
    id: 'comercio',
    label: 'Ferretería, Farmacia, Abarrotera y Comercio Multi-Sucursal',
    bottleneck:
      'Diferencias de inventario entre matriz en Tapachula y sucursales, cortes de caja lentos y facturación manual.',
    recommendedModules: [
      'Punto de venta (POS) sincronizado e inventario multi-bodega en línea',
      'Facturación CFDI 4.0 automatizada y control de crédito / cobranza',
      'Compras inteligentes con alertas de stock mínimo por temporada',
    ],
    hoursSavedPerEmployeeMonth: 24,
    typicalTimeline: '4 a 7 semanas',
  },
  {
    id: 'salud',
    label: 'Clínica Médica, Laboratorio, Colegio o Hotel',
    bottleneck:
      'Agendas saturadas por teléfono, extravío de historiales y control manual de ingresos y suministros.',
    recommendedModules: [
      'Expediente o control de recepción digital con acceso por roles',
      'Portal de descarga de resultados o estados de cuenta con código QR',
      'Control de insumos, caja y corte diario automatizado',
    ],
    hoursSavedPerEmployeeMonth: 22,
    typicalTimeline: '5 a 8 semanas',
  },
];

const FAQ_ITEMS = [
  {
    question: '¿Qué ventajas tengo al cotizar mi equipo de cómputo y oficina con SoporteTech?',
    answer:
      'Como proveedor autorizado con acceso directo a más de 15,000 productos y 200 marcas líderes, te ofrecemos precios preferenciales por proyecto o volumen, inventario actualizado diariamente, equipos 100% nuevos con garantía directa de fabricante, facturación fiscal CFDI 4.0 y entrega configurada en tus instalaciones en el Soconusco.',
  },
  {
    question: '¿En qué municipios del Soconusco brinda atención presencial SoporteTech?',
    answer:
      'Nuestra sede está en Tapachula, Chiapas. Realizamos levantamientos técnicos, mantenimiento de redes, entrega de equipos e implementación de software en Tapachula, Puerto Chiapas, Ciudad Hidalgo (Suchiate), Tuxtla Chico, Cacahoatán, Huixtla, Huehuetán, Mazatán y Escuintla.',
  },
  {
    question: '¿Qué marcas de cómputo, redes, energía y punto de venta manejan?',
    answer:
      'Suministramos más de 200 marcas oficiales: HP, Dell, Lenovo, Asus, Acer, Apple, APC, CyberPower, Koblenz, Ubiquiti, MikroTik, TP-Link, Fortinet, Hikvision, Dahua, EC Line, Zebra, Honeywell, Epson, Brother, Kingston, ADATA, Western Digital y muchas más.',
  },
  {
    question: '¿Pueden desarrollar un sistema de software adaptado exactamente a mi negocio?',
    answer:
      'Sí. Nuestro equipo de ingeniería de software en Tapachula diseña y programa sistemas web, móviles y de escritorio a la medida de tu operación (inventarios multi-bodega, básculas agroindustriales, punto de venta, logística aduanal o expedientes médicos), sin rentas forzosas por usuario.',
  },
];

export default function App() {
  // Interactive state for Authorized Hardware Catalog Filter & Quote List (No Prices)
  const [catalogFilter, setCatalogFilter] = useState<CatalogFilter>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [customModelInput, setCustomModelInput] = useState('');
  const [quoteList, setQuoteList] = useState<QuoteItem[]>([
    { line: HARDWARE_CATALOG_LINES[0], quantity: 2 },
  ]);

  // Interactive state for Real-Time Google Search Technical Advisor
  const [advisorQuery, setAdvisorQuery] = useState('');
  const [advisorLoading, setAdvisorLoading] = useState(false);
  const [advisorAnswer, setAdvisorAnswer] = useState<string | null>(null);
  const [advisorSources, setAdvisorSources] = useState<{ uri: string; title: string }[]>([]);
  const [advisorError, setAdvisorError] = useState<string | null>(null);

  // Interactive state for Custom Software Efficiency Calculator
  const [selectedIndustryId, setSelectedIndustryId] = useState<string>('agro');
  const [staffCount, setStaffCount] = useState<number>(8);

  // Interactive state for FAQ Accordion
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Interactive state for Contact / Quote Form & Server Lead Storage
  const [contactName, setContactName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [municipality, setMunicipality] = useState('Tapachula');
  const [selectedServiceInterest, setSelectedServiceInterest] = useState<string>(
    '03. Proveedor Autorizado de Equipo de Cómputo, POS y Energía'
  );
  const [preferredChannel, setPreferredChannel] = useState<'whatsapp' | 'llamada' | 'correo'>(
    'whatsapp'
  );
  const [projectNotes, setProjectNotes] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [submittingLead, setSubmittingLead] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<LeadRecord | null>(null);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Private Owner PIN-Protected Lead Inbox Modal state (Hidden from public visitors)
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPinInput, setAdminPinInput] = useState('');
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [adminAuthError, setAdminAuthError] = useState<string | null>(null);
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);

  const fetchProtectedLeads = async (pinToUse?: string) => {
    const activePin = (pinToUse ?? adminPinInput).trim();
    if (!activePin) return;

    setLoadingLeads(true);
    setAdminAuthError(null);
    try {
      const res = await fetch('/api/leads', {
        headers: { 'x-admin-pin': activePin },
      });
      if (!res.ok) {
        setAdminAuthenticated(false);
        setAdminAuthError('Clave incorrecta. Acceso exclusivo para administración de SoporteTech.');
        return;
      }
      const data = await res.json();
      setLeads(data.leads || []);
      setAdminAuthenticated(true);
    } catch {
      setAdminAuthError('Error al conectar con el servidor.');
    } finally {
      setLoadingLeads(false);
    }
  };

  const filteredCatalog = useMemo(() => {
    return HARDWARE_CATALOG_LINES.filter((item) => {
      const matchesCategory =
        catalogFilter === 'todos' || item.category === catalogFilter;
      const matchesQuery =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brands.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.specs.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.localApplication.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [catalogFilter, searchQuery]);

  const selectedIndustry = useMemo(() => {
    return (
      INDUSTRY_PROFILES.find((ind) => ind.id === selectedIndustryId) ||
      INDUSTRY_PROFILES[0]
    );
  }, [selectedIndustryId]);

  const estimatedMonthlyHoursSaved =
    staffCount * selectedIndustry.hoursSavedPerEmployeeMonth;

  const handleAddToQuote = (item: HardwareLine) => {
    setQuoteList((prev) => {
      const existing = prev.find((entry) => entry.line.id === item.id);
      if (existing) {
        return prev.map((entry) =>
          entry.line.id === item.id
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry
        );
      }
      return [...prev, { line: item, quantity: 1 }];
    });
  };

  const handleAddCustomModelToQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customModelInput.trim();
    if (!trimmed) return;
    const customItem: HardwareLine = {
      id: `custom-${Date.now()}`,
      code: 'PEDIDO-ESPECIAL',
      category: 'cómputo',
      categoryLabel: 'Solicitud Específica de Catálogo',
      name: trimmed,
      brands: 'Catálogo Autorizado SoporteTech',
      specs: 'Especificación personalizada solicitada por el cliente',
      localApplication: 'Cotización empresarial a medida en el Soconusco',
      availability: 'Verificación de inventario nacional',
    };
    handleAddToQuote(customItem);
    setCustomModelInput('');
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setQuoteList((prev) =>
      prev
        .map((entry) =>
          entry.line.id === id
            ? { ...entry, quantity: Math.max(0, entry.quantity + delta) }
            : entry
        )
        .filter((entry) => entry.quantity > 0)
    );
  };

  const handleSelectServiceForQuote = (serviceTitle: string) => {
    setSelectedServiceInterest(serviceTitle);
    const contactEl = document.getElementById('contacto');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopyPhone = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(SOPORTETECH_INFO.phoneRaw);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2500);
    }
  };

  // Query Gemini 3.8 Flash with Google Search Grounding
  const handleRunCatalogAdvisor = async (customPrompt?: string) => {
    const q = (customPrompt ?? advisorQuery).trim();
    if (!q) return;
    if (customPrompt) setAdvisorQuery(customPrompt);

    setAdvisorLoading(true);
    setAdvisorError(null);
    try {
      const response = await fetch('/api/catalog-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'No se pudo consultar en este momento.');
      }
      setAdvisorAnswer(data.answer);
      setAdvisorSources(data.sources || []);
    } catch (err: unknown) {
      setAdvisorError(
        err instanceof Error
          ? err.message
          : 'Error al conectar con el buscador técnico.'
      );
    } finally {
      setAdvisorLoading(false);
    }
  };

  const buildWhatsAppHref = (leadOverride?: LeadRecord) => {
    const name = leadOverride?.contactName || contactName || 'Cliente Empresarial';
    const company = leadOverride?.companyName || companyName || 'Negocio en el Soconusco';
    const city = leadOverride?.municipality || municipality;
    const service = leadOverride?.serviceInterest || selectedServiceInterest;
    const equipList =
      leadOverride?.selectedEquipment ||
      quoteList.map((c) => `${c.quantity}x ${c.line.name}`);
    const notes = leadOverride?.projectNotes || projectNotes;
    const folio = leadOverride?.id ? ` [Folio: ${leadOverride.id}]` : '';

    const equipSummary =
      equipList.length > 0
        ? `\n• Equipos a cotizar: ${equipList.join(' | ')}`
        : '';
    const notesSummary = notes ? `\n• Detalles: ${notes}` : '';

    const message = `Hola SoporteTech Tapachula${folio}, solicito cotización / diagnóstico técnico:\n• Nombre: ${name}\n• Empresa: ${company}\n• Municipio: ${city}\n• Teléfono: ${
      leadOverride?.contactPhone || contactPhone || 'Por confirmar'
    }\n• Solución de interés: ${service}${equipSummary}${notesSummary}`;

    return `${SOPORTETECH_INFO.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
  };

  const buildMailtoHref = (leadOverride?: LeadRecord) => {
    const name = leadOverride?.contactName || contactName || 'Cliente';
    const company = leadOverride?.companyName || companyName || 'Empresa';
    const subject = `Solicitud de Cotización SoporteTech - ${company} (${municipality})`;
    const equipList =
      leadOverride?.selectedEquipment ||
      quoteList.map((c) => `${c.quantity}x ${c.line.name}`);
    const body = `Folio: ${leadOverride?.id || 'Web'}\nNombre: ${name}\nEmpresa: ${company}\nTeléfono: ${
      leadOverride?.contactPhone || contactPhone
    }\nCorreo: ${leadOverride?.contactEmail || contactEmail}\nMunicipio: ${
      leadOverride?.municipality || municipality
    }\nServicio: ${
      leadOverride?.serviceInterest || selectedServiceInterest
    }\nEquipos solicitados: ${equipList.join(', ') || 'Ninguno especificado'}\nNotas: ${
      leadOverride?.projectNotes || projectNotes
    }`;
    return `mailto:${SOPORTETECH_INFO.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const cleanDigits = contactPhone.replace(/\D/g, '');
    if (contactName.trim().length < 3) {
      setFormError('Por favor ingresa tu nombre completo para dirigir la cotización.');
      return;
    }
    if (cleanDigits.length < 10) {
      setFormError('Por favor ingresa un número de teléfono o WhatsApp válido de 10 dígitos.');
      return;
    }

    setSubmittingLead(true);
    try {
      const selectedEquipment = quoteList.map(
        (c) => `${c.quantity}x ${c.line.name}`
      );
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contactName,
          companyName,
          contactPhone,
          contactEmail,
          municipality,
          serviceInterest: selectedServiceInterest,
          selectedEquipment,
          projectNotes,
          preferredChannel,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Error al registrar solicitud.');
      }

      setSubmittedLead(data.lead);
      if (adminAuthenticated) {
        fetchProtectedLeads();
      }
    } catch (err: unknown) {
      setFormError(
        err instanceof Error
          ? err.message
          : 'No se pudo guardar la solicitud. Intenta de nuevo.'
      );
    } finally {
      setSubmittingLead(false);
    }
  };

  const handleUpdateLeadStatus = async (
    id: string,
    status: 'Nuevo' | 'Contactado' | 'Cotizado'
  ) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': adminPinInput.trim(),
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
      }
    } catch {
      // ignore
    }
  };

  const handleDeleteLead = async (id: string) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-pin': adminPinInput.trim() },
      });
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
      }
    } catch {
      // ignore
    }
  };

  const handleExportLeadsCsv = () => {
    if (leads.length === 0) return;
    const headers = [
      'Folio',
      'Fecha',
      'Nombre',
      'Empresa',
      'Telefono',
      'Correo',
      'Municipio',
      'Servicio',
      'Equipos',
      'Notas',
      'Estatus',
    ];
    const rows = leads.map((l) => [
      l.id,
      new Date(l.createdAt).toLocaleString('es-MX'),
      `"${l.contactName.replace(/"/g, '""')}"`,
      `"${l.companyName.replace(/"/g, '""')}"`,
      l.contactPhone,
      l.contactEmail || '',
      l.municipality,
      `"${l.serviceInterest.replace(/"/g, '""')}"`,
      `"${(l.selectedEquipment || []).join(' | ').replace(/"/g, '""')}"`,
      `"${(l.projectNotes || '').replace(/"/g, '""')}"`,
      l.status,
    ]);
    const csvContent =
      '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `prospectos_soportetech_tapachula.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col bg-st-light-circuit text-[#031538]">
      {/* Top Bar Contract: Strictly 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-40 bg-[#031538]/95 backdrop-blur border-b border-[#14377A] text-white">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-8 px-6 py-3.5">
          {/* Zone 1: Single text element wordmark styled with brand colors */}
          <a
            href="#inicio"
            className="font-display text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#00A3E0]"
          >
            SOPORTE<span className="text-[#00A3E0]">TECH</span>
          </a>

          {/* Zone 2: 5 concise single-line text navigation links */}
          <nav
            aria-label="Navegación principal"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300"
          >
            <a
              href="#demanda-local"
              className="hover:text-[#FFB800] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Soluciones Locales
            </a>
            <a
              href="#servicios"
              className="hover:text-[#FFB800] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Servicios
            </a>
            <a
              href="#equipos"
              className="hover:text-[#FFB800] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Catálogo de Equipos
            </a>
            <a
              href="#software"
              className="hover:text-[#FFB800] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Software
            </a>
            <a
              href="#contacto"
              className="hover:text-[#FFB800] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Contacto
            </a>
          </nav>

          {/* Zone 3: 1 primary action in Phoenix Amber/Orange */}
          <div className="flex items-center shrink-0">
            <a
              href="#contacto"
              className="px-4 py-2.5 text-xs font-bold text-[#031538] bg-[#FFB800] hover:bg-[#FF7A00] hover:text-white rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              Solicitar Cotización
            </a>
          </div>
        </div>
      </header>

      <main id="inicio" className="flex-1">
        {/* 1. HERO SECTION: Deep Navy Circuit Architecture inspired by the Phoenix Logo */}
        <section className="bg-st-navy-circuit text-white border-b border-[#14377A] pt-10 pb-14 lg:pt-16 lg:pb-20">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  {/* Unboxed regional metadata kicker (Zero-Pill Discipline) */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#00A3E0] mb-3 tracking-wide">
                    <span>SOLUCIONES TECNOLÓGICAS</span>
                    <span aria-hidden="true" className="text-[#FF7A00]">
                      ·
                    </span>
                    <span>Tapachula y Región del Soconusco</span>
                    <span aria-hidden="true" className="text-[#FF7A00]">
                      ·
                    </span>
                    <span className="font-mono-tabular text-[#FFB800]">
                      Tel. 962 707 4426
                    </span>
                  </div>

                  <h1
                    className="font-display font-bold text-white tracking-tight leading-[1.12]"
                    style={{
                      fontSize: 'clamp(2.25rem, 3.8vw, 3.5rem)',
                      textWrap: 'balance',
                    }}
                  >
                    Tecnología que trabaja para ti: Ciberseguridad, Redes, Equipos y Software
                  </h1>

                  <CircuitDivider variant="amber" />

                  <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed max-w-[65ch]">
                    En <strong>SoporteTech</strong> resolvemos los retos tecnológicos de empresas,
                    comercios, clínicas y agroindustrias en <strong>Tapachula y la costa de Chiapas</strong>:
                    protegemos tus servidores contra apagones y ransomware, certificamos tus redes y
                    enlaces inalámbricos, abastecemos un catálogo directo de{' '}
                    <strong>más de 15,000 productos</strong> y desarrollamos software a tu medida.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[#14377A]">
                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href="#contacto"
                      className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-[#031538] bg-[#FFB800] hover:bg-[#FF7A00] hover:text-white rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-lg"
                    >
                      <span>Solicitar Diagnóstico o Cotización</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>

                    <a
                      href={`tel:${SOPORTETECH_INFO.phoneRaw}`}
                      className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-white bg-[#0A265E] border border-[#1E4799] rounded-lg hover:bg-[#10347D] transition-colors whitespace-nowrap shrink-0 font-mono-tabular"
                    >
                      <Phone className="w-4 h-4 text-[#00A3E0]" />
                      <span>Llamar al 962 707 4426</span>
                    </a>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-300">
                    <span>Proveedor Autorizado (+200 Marcas)</span>
                    <span aria-hidden="true" className="text-[#FF7A00]">
                      ·
                    </span>
                    <span>Facturación CFDI 4.0</span>
                    <span aria-hidden="true" className="text-[#FF7A00]">
                      ·
                    </span>
                    <span>Atención Presencial en Tapachula y Soconusco</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 flex">
                <HeroInfrastructureVisual />
              </div>
            </div>

            {/* Full-Width 4-Column Quantitative KPI Strip */}
            <div className="mt-12 pt-10 border-t border-[#14377A] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#051B47] border border-[#173D8A] rounded-xl p-5">
                <div className="font-mono-tabular text-2xl sm:text-3xl font-bold text-[#FFB800]">
                  +15,000 SKU
                </div>
                <div className="text-sm font-semibold text-white mt-1">
                  Catálogo Directo Autorizado
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Más de 200 marcas oficiales en cómputo, punto de venta (POS), redes, No-Breaks e impresión.
                </p>
              </div>

              <div className="bg-[#051B47] border border-[#173D8A] rounded-xl p-5">
                <div className="font-mono-tabular text-2xl sm:text-3xl font-bold text-[#00A3E0]">
                  &lt; 2 Horas
                </div>
                <div className="text-sm font-semibold text-white mt-1">
                  Respuesta en Tapachula
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Atención presencial rápida y soporte remoto inmediato cuando tu operación urge.
                </p>
              </div>

              <div className="bg-[#051B47] border border-[#173D8A] rounded-xl p-5">
                <div className="font-mono-tabular text-2xl sm:text-3xl font-bold text-[#FFB800]">
                  99.94%
                </div>
                <div className="text-sm font-semibold text-white mt-1">
                  Blindaje de Datos y Redes
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Protección de servidores contables CONTPAQi, respaldos y enlaces multi-sucursal.
                </p>
              </div>

              <div className="bg-[#051B47] border border-[#173D8A] rounded-xl p-5">
                <div className="font-mono-tabular text-2xl sm:text-3xl font-bold text-[#00A3E0]">
                  -62% Tiempos
                </div>
                <div className="text-sm font-semibold text-white mt-1">
                  Software Hecho a la Medida
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Sistemas propios adaptados a comercios, agroindustria y logística de la región.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. LO QUE BUSCA LA GENTE EN TAPACHULA Y EL SOCONUSCO (#demanda-local) */}
        <section
          id="demanda-local"
          className="py-16 lg:py-20 bg-st-light-circuit border-b border-slate-200"
        >
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0047FF]">
                <span>DIAGNÓSTICO REAL DE NUESTRA REGIÓN</span>
                <span aria-hidden="true" className="text-[#FF7A00]">
                  ·
                </span>
                <span>Tapachula · Puerto Chiapas · Suchiate · Huixtla · Cacahoatán</span>
              </div>
              <h2
                className="font-display text-2xl sm:text-4xl font-bold text-[#031538] mt-2 tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                ¿Qué necesitan resolver hoy los negocios y familias en nuestra localidad?
              </h2>
              <CircuitDivider variant="blue" />
              <p className="mt-2 text-base text-slate-600 leading-relaxed">
                Diseñamos nuestros servicios alrededor de los problemas cotidianos que enfrentan
                las empresas del Soconusco: desde el clima cálido-húmedo y las variaciones de
                voltaje hasta la necesidad de controlar inventarios y conectar sucursales.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {LOCAL_SEARCH_NEEDS.map((need, idx) => (
                <article
                  key={need.id}
                  className="bg-white border border-slate-200/90 hover:border-[#0047FF] transition-colors rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono-tabular text-[#FF7A00] font-bold">
                        SOLUCIÓN REGIONAL 0{idx + 1}
                      </span>
                      <span className="text-xs font-mono-tabular text-[#0047FF] font-semibold">
                        Tapachula · Soconusco
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#031538] mt-2">
                      {need.searchIntent}
                    </h3>

                    <div className="mt-4 space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      <p>
                        <strong className="text-[#031538]">El reto en la zona:</strong>{' '}
                        {need.localProblem}
                      </p>
                      <p>
                        <strong className="text-[#0047FF]">Cómo lo resuelve SoporteTech:</strong>{' '}
                        {need.soportetechSolution}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="text-xs text-slate-500 font-mono-tabular">
                      {need.brandsOrTech}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleSelectServiceForQuote(need.targetActionService)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0047FF] hover:text-[#FF7A00] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <span>Resolver esto en mi negocio</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 3. CORE CAPABILITIES / ASYMMETRIC BENTO GRID (#servicios) */}
        <section id="servicios" className="py-16 lg:py-24 bg-white border-b border-slate-200">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0047FF]">
                <span>INGENIERÍA Y SOLUCIONES TECNOLÓGICAS</span>
                <span aria-hidden="true" className="text-[#FF7A00]">
                  ·
                </span>
                <span>4 Divisiones Especializadas en Tapachula</span>
              </div>
              <h2
                className="font-display text-2xl sm:text-4xl font-bold text-[#031538] mt-2 tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Todo el respaldo tecnológico que tu empresa necesita con un solo aliado local
              </h2>
              <CircuitDivider variant="amber" />
              <p className="mt-2 text-base text-slate-600 leading-relaxed">
                Integramos ciberseguridad, mantenimiento de redes, abastecimiento directo de
                más de 15,000 equipos nuevos con garantía oficial y desarrollo de software propio.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
              {CORE_SERVICES.map((service) => (
                <article
                  key={service.id}
                  className={`${service.colSpan} bg-[#F4F7FB] border border-slate-200 hover:border-[#0047FF] transition-colors rounded-2xl p-6 sm:p-8 flex flex-col justify-between`}
                >
                  <div>
                    <ServiceCategorySchematic category={service.category} />

                    <h3 className="font-display text-xl sm:text-2xl font-bold text-[#031538] mt-6">
                      {service.title}
                    </h3>
                    <p className="text-sm font-semibold text-[#0047FF] mt-1">
                      {service.subtitle}
                    </p>
                    <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="mt-5 space-y-2.5 border-t border-slate-200/80 pt-4">
                      {service.deliverables.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-sm text-slate-700"
                        >
                          <Check className="w-4 h-4 text-[#FF7A00] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-5 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono-tabular text-lg font-bold text-[#031538]">
                          {service.metricValue}
                        </span>
                        <span className="text-xs text-slate-500">
                          · {service.slaResponse}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {service.metricLabel}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSelectServiceForQuote(service.title)}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-[#031538] hover:bg-[#0047FF] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>Solicitar Cotización</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 4. CATÁLOGO MAYORISTA DE EQUIPOS Y BUSCADOR CON GOOGLE SEARCH (#equipos) */}
        <section id="equipos" className="py-16 lg:py-24 bg-st-light-circuit border-b border-slate-200">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#0047FF]">
                  <span>PROVEEDOR AUTORIZADO DE CÓMPUTO Y OFICINA</span>
                  <span aria-hidden="true" className="text-[#FF7A00]">
                    ·
                  </span>
                  <span>+15,000 Productos · +200 Marcas Oficiales</span>
                </div>
                <h2
                  className="font-display text-2xl sm:text-4xl font-bold text-[#031538] mt-2 tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Amplio Catálogo en Cómputo, Punto de Venta, Redes, Energía e Impresión
                </h2>
                <CircuitDivider variant="blue" />
                <p className="mt-2 text-base text-slate-600 leading-relaxed">
                  Surtimos desde una laptop o impresora de tickets hasta el equipamiento integral de
                  oficinas, colegios, clínicas y bodegas en el Soconusco.{' '}
                  <strong>Cotizamos de forma personalizada por proyecto o volumen</strong> con
                  precios preferenciales de canal autorizado, garantía directa de fábrica y
                  facturación CFDI 4.0.
                </p>
              </div>

              {/* Interactive Category Filter Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#031538] rounded-xl self-start">
                {(
                  [
                    { id: 'todos', label: 'Todas las Líneas' },
                    { id: 'cómputo', label: 'Cómputo y Servidores' },
                    { id: 'pos', label: 'Punto de Venta (POS)' },
                    { id: 'energía', label: 'Energía y No-Breaks' },
                    { id: 'redes', label: 'Redes y Antenas' },
                    { id: 'impresión', label: 'Impresión' },
                    { id: 'videovigilancia', label: 'Videovigilancia' },
                  ] as { id: CatalogFilter; label: string }[]
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setCatalogFilter(tab.id)}
                    className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      catalogFilter === tab.id
                        ? 'bg-[#FFB800] text-[#031538] font-bold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Real-Time Google Search Grounded Technical Advisor */}
            <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <div className="text-xs font-bold text-[#0047FF]">
                    Asesor Técnico Inteligente en Tiempo Real (Conectado con Google Search)
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-[#031538] mt-0.5">
                    ¿Buscas un modelo específico o quieres saber qué equipo conviene para tu negocio en Tapachula?
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() =>
                      handleRunCatalogAdvisor(
                        '¿Qué equipo Punto de Venta (impresora térmica, lector y cajón) recomiendas para una ferretería o farmacia en Tapachula?'
                      )
                    }
                    className="px-3 py-1.5 bg-slate-100 hover:bg-[#031538] hover:text-white text-slate-700 font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Ej. Kit Punto de Venta
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleRunCatalogAdvisor(
                        '¿Qué No-Break o UPS APC / CyberPower necesito para proteger un servidor contable y 4 computadoras contra apagones en Tapachula?'
                      )
                    }
                    className="px-3 py-1.5 bg-slate-100 hover:bg-[#031538] hover:text-white text-slate-700 font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Ej. No-Break para Servidor
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleRunCatalogAdvisor(
                        '¿Qué antenas Ubiquiti airMAX o MikroTik sirven para enviar internet a una finca o bodega a 12 km en el Soconusco?'
                      )
                    }
                    className="px-3 py-1.5 bg-slate-100 hover:bg-[#031538] hover:text-white text-slate-700 font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Ej. Enlace a Finca / Bodega
                  </button>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleRunCatalogAdvisor();
                }}
                className="mt-4 flex flex-col sm:flex-row gap-3"
              >
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={advisorQuery}
                    onChange={(e) => setAdvisorQuery(e.target.value)}
                    placeholder="Pregunta por cualquier marca, número de parte, laptop, impresora Epson/Brother, UPS o red..."
                    aria-label="Consultar especificaciones de equipos y soluciones"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#0047FF] focus:bg-white"
                  />
                </div>
                <button
                  type="submit"
                  disabled={advisorLoading}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#0047FF] hover:bg-[#031538] disabled:opacity-60 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {advisorLoading
                    ? 'Consultando especificaciones...'
                    : 'Consultar Especificaciones'}
                </button>
              </form>

              {advisorError && (
                <div className="mt-4 p-3.5 text-xs text-red-800 bg-red-50 border border-red-200 rounded-lg">
                  {advisorError}
                </div>
              )}

              {advisorAnswer && (
                <div className="mt-4 bg-[#F4F7FB] border border-slate-200 rounded-xl p-5">
                  <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-200">
                    <span className="text-xs font-bold text-[#031538]">
                      Recomendación Técnica de SoporteTech (Cotización personalizada a medida)
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const customItem: HardwareLine = {
                          id: `advisor-${Date.now()}`,
                          code: 'CONSULTA-ESP',
                          category: 'cómputo',
                          categoryLabel: 'Consulta Técnica Especializada',
                          name: advisorQuery || 'Equipo consultado en buscador técnico',
                          brands: 'Catálogo Autorizado SoporteTech',
                          specs: 'Solicitado desde el asesor técnico con Google Search',
                          localApplication: 'Tapachula / Soconusco',
                          availability: 'Cotización personalizada',
                        };
                        handleAddToQuote(customItem);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#0047FF] hover:text-[#FF7A00] cursor-pointer whitespace-nowrap"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Agregar esta consulta a mi solicitud</span>
                    </button>
                  </div>
                  <div className="mt-3 text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                    {advisorAnswer}
                  </div>
                  {advisorSources.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-200/80 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="font-medium text-slate-700">
                        Fuentes técnicas verificadas:
                      </span>
                      {advisorSources.map((src, i) => (
                        <a
                          key={i}
                          href={src.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#0047FF] hover:underline"
                        >
                          <span>{src.title}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Catalog Grid + Quote Request Builder Sidebar (ZERO PRICES) */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 8 Columns: Product Lines */}
              <div className="lg:col-span-8 space-y-5">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filtrar líneas por marca (HP, Dell, Lenovo, APC, Ubiquiti, EC Line, Zebra, Hikvision)..."
                    aria-label="Filtrar catálogo de líneas de equipamiento"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#0047FF] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {filteredCatalog.map((item) => {
                    const inList = quoteList.find((c) => c.line.id === item.id);
                    return (
                      <div
                        key={item.id}
                        className="bg-white border border-slate-200 hover:border-[#0047FF] transition-colors rounded-2xl p-5 flex flex-col justify-between shadow-xs"
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs text-slate-500 font-mono-tabular">
                            <span className="text-[#FF7A00] font-semibold">{item.code}</span>
                            <span>{item.categoryLabel}</span>
                          </div>

                          <h3 className="font-display text-base font-bold text-[#031538] mt-2">
                            {item.name}
                          </h3>
                          <p className="text-xs font-semibold text-[#0047FF] mt-1">
                            Marcas: {item.brands}
                          </p>

                          <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                            {item.specs}
                          </p>

                          <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                            <div>
                              <strong className="text-[#031538]">Uso en la región:</strong>{' '}
                              {item.localApplication}
                            </div>
                            <div>
                              <strong className="text-[#031538]">Beneficio SoporteTech:</strong>{' '}
                              {item.availability}
                            </div>
                          </div>
                        </div>

                        <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                          <span className="text-xs text-slate-500">
                            Garantía Oficial · CFDI 4.0
                          </span>

                          <button
                            type="button"
                            onClick={() => handleAddToQuote(item)}
                            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                              inList
                                ? 'bg-[#FF7A00] text-white hover:bg-[#e06900]'
                                : 'bg-[#031538] text-white hover:bg-[#0047FF]'
                            }`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>
                              {inList
                                ? `En solicitud (${inList.quantity})`
                                : 'Incluir en Cotización'}
                            </span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right 4 Columns: Quote Request List (NO PRICES) */}
              <aside className="lg:col-span-4 bg-st-navy-circuit text-white rounded-2xl p-6 border border-[#14377A] shadow-lg">
                <div className="flex items-center justify-between border-b border-[#163C85] pb-4">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">
                      Tu Lista de Cotización
                    </h3>
                    <p className="text-xs text-[#00A3E0] mt-0.5">
                      Precios preferenciales por proyecto o volumen
                    </p>
                  </div>
                  <FileText className="w-5 h-5 text-[#FFB800] shrink-0" />
                </div>

                {/* Add specific model or SKU manually */}
                <form onSubmit={handleAddCustomModelToQuote} className="mt-4">
                  <label
                    htmlFor="custom-model-input"
                    className="block text-xs text-slate-300 mb-1.5"
                  >
                    ¿Buscas un modelo o pieza específica? Agrégalo aquí:
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="custom-model-input"
                      type="text"
                      value={customModelInput}
                      onChange={(e) => setCustomModelInput(e.target.value)}
                      placeholder="Ej. 5 Impresoras Epson L3250..."
                      className="flex-1 px-3 py-2 text-xs bg-[#020E29] border border-[#1E4799] rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-[#FFB800]"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 text-xs font-bold bg-[#0047FF] hover:bg-[#00A3E0] text-white rounded-lg cursor-pointer whitespace-nowrap"
                    >
                      Agregar
                    </button>
                  </div>
                </form>

                {quoteList.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-sm text-slate-300">
                      Tu lista de equipos a cotizar está vacía.
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Selecciona cualquier línea del catálogo o escribe el modelo que necesitas.
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 space-y-3">
                    {quoteList.map((entry) => (
                      <div
                        key={entry.line.id}
                        className="bg-[#020E29]/90 border border-[#163C85] rounded-xl p-3.5 flex flex-col gap-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-xs font-semibold text-white leading-snug">
                            {entry.line.name}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleUpdateQuantity(entry.line.id, -entry.quantity)
                            }
                            aria-label={`Quitar ${entry.line.name}`}
                            className="text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[11px] text-slate-400">
                            Cantidad requerida:
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleUpdateQuantity(entry.line.id, -1)}
                              aria-label="Disminuir cantidad"
                              className="w-6 h-6 rounded bg-[#0A265E] hover:bg-[#14377A] flex items-center justify-center text-white cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono-tabular text-xs font-bold w-8 text-center text-[#FFB800]">
                              {entry.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleUpdateQuantity(entry.line.id, 1)}
                              aria-label="Aumentar cantidad"
                              className="w-6 h-6 rounded bg-[#0A265E] hover:bg-[#14377A] flex items-center justify-center text-white cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="pt-4 border-t border-[#163C85] space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-slate-300">
                        <span>Total de equipos en solicitud</span>
                        <span className="font-mono-tabular font-bold text-[#FFB800]">
                          {quoteList.reduce((acc, c) => acc + c.quantity, 0)} unidades
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        * Te enviaremos tu cotización formal con precios preferenciales vigentes,
                        tiempo de entrega en Tapachula y garantía oficial.
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-6 space-y-2.5">
                  <a
                    href="#contacto"
                    onClick={() =>
                      setSelectedServiceInterest(
                        '03. Proveedor Autorizado de Equipo de Cómputo, POS y Energía'
                      )
                    }
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold text-[#031538] bg-[#FFB800] hover:bg-[#FF7A00] hover:text-white rounded-lg transition-colors whitespace-nowrap"
                  >
                    <span>Solicitar Cotización Formal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={buildWhatsAppHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#0A265E] border border-[#1E4799] hover:bg-[#10347D] rounded-lg transition-colors whitespace-nowrap font-mono-tabular"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#00A3E0]" />
                    <span>Cotizar por WhatsApp 962 707 4426</span>
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* 5. CUSTOM SOFTWARE DEVELOPMENT & EFFICIENCY SIMULATOR (#software) */}
        <section id="software" className="py-16 lg:py-24 bg-white border-b border-slate-200">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0047FF]">
                  <span>INGENIERÍA DE SOFTWARE EN TAPACHULA</span>
                  <span aria-hidden="true" className="text-[#FF7A00]">
                    ·
                  </span>
                  <span>Sistemas Web, Móviles y de Escritorio</span>
                </div>
                <h2
                  className="font-display text-2xl sm:text-4xl font-bold text-[#031538] mt-2 tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Desarrollo de Software Personalizado para la Eficiencia de tu Negocio
                </h2>
                <CircuitDivider variant="amber" />
                <p className="mt-3 text-base text-slate-600 leading-relaxed">
                  Contamos con un equipo propio de desarrollo de software en el Soconusco para
                  automatizar inventarios, puntos de venta multi-sucursal, recepción de cosechas en
                  báscula y logística aduanal.
                </p>

                <div className="mt-6 space-y-4 border-t border-slate-200 pt-6">
                  <div>
                    <h3 className="font-display text-base font-bold text-[#031538]">
                      01. Adaptado Exactamente a tu Operación
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                      Olvídate de adaptarte a programas rígidos. Programamos las reglas de negocio,
                      formatos de tickets, reportes y permisos que tu empresa realmente utiliza.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-display text-base font-bold text-[#031538]">
                      02. Conectado con tu Equipamiento y Periféricos
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                      Integramos tu software con lectores de código de barras, impresoras térmicas,
                      básculas digitales, relojes checadores biométricos y facturación CFDI 4.0.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-display text-base font-bold text-[#031538]">
                      03. Atención y Capacitación Presencial en Tapachula
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                      Acompañamos a tu personal en sitio durante la puesta en marcha, con soporte
                      directo en tu mismo horario y región.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 bg-[#F4F7FB] border border-slate-200 rounded-2xl p-6 sm:p-8">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div>
                    <span className="text-xs font-bold text-[#0047FF]">
                      Calculadora de Eficiencia Operativa
                    </span>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-[#031538] mt-0.5">
                      Simula el impacto de un sistema a la medida en tu empresa
                    </h3>
                  </div>
                  <Calculator className="w-5 h-5 text-[#FF7A00] shrink-0" />
                </div>

                <div className="mt-5">
                  <label className="block text-xs font-bold text-[#031538] mb-2">
                    1. Selecciona el giro principal de tu negocio en la región:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {INDUSTRY_PROFILES.map((ind) => (
                      <button
                        key={ind.id}
                        type="button"
                        onClick={() => setSelectedIndustryId(ind.id)}
                        className={`text-left p-3.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                          selectedIndustryId === ind.id
                            ? 'bg-[#031538] text-white border-[#031538]'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-[#0047FF]'
                        }`}
                      >
                        {ind.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs font-bold text-[#031538] mb-2">
                    <label htmlFor="staff-slider">
                      2. Colaboradores que capturan ventas, inventario o administración:
                    </label>
                    <span className="font-mono-tabular text-sm font-bold text-[#0047FF]">
                      {staffCount} personas
                    </span>
                  </div>
                  <input
                    id="staff-slider"
                    type="range"
                    min={2}
                    max={50}
                    value={staffCount}
                    onChange={(e) => setStaffCount(Number(e.target.value))}
                    className="w-full accent-[#0047FF] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 font-mono-tabular mt-1">
                    <span>2 personas</span>
                    <span>25 personas</span>
                    <span>50+ personas</span>
                  </div>
                </div>

                <div className="mt-6 bg-white border border-slate-200 rounded-xl p-5">
                  <div className="text-xs text-slate-500">
                    Problema operativo que resolvemos en este giro:
                  </div>
                  <p className="text-sm font-medium text-[#031538] mt-1">
                    {selectedIndustry.bottleneck}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="text-xs font-bold text-[#031538] mb-2">
                      Módulos que diseñamos para ti:
                    </div>
                    <ul className="space-y-1.5">
                      {selectedIndustry.recommendedModules.map((mod, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-[#FF7A00] shrink-0 mt-0.5" />
                          <span>{mod}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs text-slate-500 block">
                        Tiempo administrativo ahorrado al mes
                      </span>
                      <span className="font-mono-tabular text-2xl font-bold text-[#031538]">
                        ~{estimatedMonthlyHoursSaved} horas / mes
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">
                        Primera entrega funcional estimada
                      </span>
                      <span className="font-mono-tabular text-base font-bold text-[#0047FF]">
                        {selectedIndustry.typicalTimeline}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-slate-500">
                    Levantamiento de requerimientos sin costo en Tapachula.
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleSelectServiceForQuote(
                        `04. Desarrollo de Software Personalizado (${selectedIndustry.label})`
                      )
                    }
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#0047FF] hover:bg-[#031538] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Solicitar Propuesta de Software</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. PROOF OF IMPACT / REGIONAL CASE STUDIES (#casos) */}
        <section id="casos" className="py-16 lg:py-24 bg-st-navy-circuit text-white border-b border-[#14377A]">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-bold text-[#00A3E0]">
                <span>RESULTADOS REALES EN EL SOCONUSCO</span>
                <span aria-hidden="true" className="text-[#FF7A00]">
                  ·
                </span>
                <span>Evidencia Documentada</span>
              </div>
              <h2
                className="font-display text-2xl sm:text-4xl font-bold text-white mt-2 tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Empresas de Tapachula, Puerto Chiapas y Frontera Sur que operan con SoporteTech
              </h2>
              <CircuitDivider variant="amber" />
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {REGIONAL_CASE_STUDIES.map((study) => (
                <article
                  key={study.id}
                  className="bg-[#051B47] border border-[#173D8A] rounded-2xl p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-300">
                      <span className="font-bold text-[#00A3E0]">{study.clientSector}</span>
                      <span aria-hidden="true" className="text-[#FF7A00]">
                        ·
                      </span>
                      <span>{study.municipality}</span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-white mt-3 leading-snug">
                      {study.title}
                    </h3>

                    <div className="mt-4 bg-[#020E29] border border-[#163C85] rounded-xl p-4">
                      <div className="font-mono-tabular text-xl font-bold text-[#FFB800]">
                        {study.primaryMetric}
                      </div>
                      <p className="text-xs text-slate-300 mt-1">
                        {study.primaryMetricContext}
                      </p>
                    </div>

                    <div className="mt-4 space-y-2.5 text-xs text-slate-300 leading-relaxed">
                      <p>
                        <strong className="text-white">Situación previa:</strong>{' '}
                        {study.beforeChallenge}
                      </p>
                      <p>
                        <strong className="text-[#00A3E0]">Solución SoporteTech:</strong>{' '}
                        {study.solutionImplemented}
                      </p>
                    </div>
                  </div>

                  <blockquote className="mt-6 pt-4 border-t border-[#173D8A]">
                    <p className="text-xs italic text-slate-200 leading-relaxed">
                      "{study.testimonialQuote}"
                    </p>
                    <footer className="mt-3 text-xs">
                      <div className="font-bold text-white">
                        {study.testimonialAuthor}
                      </div>
                      <div className="text-slate-400">
                        {study.testimonialRole} · {study.testimonialOrg}
                      </div>
                    </footer>
                  </blockquote>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 7. REGIONAL COVERAGE & FAQ (#cobertura) */}
        <section id="cobertura" className="py-16 lg:py-24 bg-white border-b border-slate-200">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0047FF]">
                  <MapPin className="w-3.5 h-3.5 text-[#FF7A00]" />
                  <span>COBERTURA REGIONAL EN LA COSTA DE CHIAPAS</span>
                </div>
                <h2
                  className="font-display text-2xl sm:text-3xl font-bold text-[#031538] mt-2 tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Atención Presencial en Tapachula y Municipios del Soconusco
                </h2>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Brindamos servicio en sitio para instalación de redes, entrega de equipamiento de
                  cómputo y punto de venta, pólizas de mantenimiento y levantamiento de software.
                </p>

                <div className="mt-6 bg-[#F4F7FB] border border-slate-200 rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 bg-[#031538] text-[11px] font-bold text-white">
                          <th className="py-3.5 px-4">Municipio / Zona</th>
                          <th className="py-3.5 px-4">Distancia</th>
                          <th className="py-3.5 px-4">Tiempo de Respuesta</th>
                          <th className="py-3.5 px-4">C.P.</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 text-xs bg-white">
                        {SOCONUSCO_COVERAGE.map((zone) => (
                          <tr key={zone.name} className="hover:bg-slate-50">
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-[#031538]">{zone.name}</div>
                              <div className="text-[11px] text-slate-500 mt-0.5">
                                {zone.keySectors}
                              </div>
                            </td>
                            <td className="py-3.5 px-4 font-mono-tabular text-slate-600 whitespace-nowrap">
                              {zone.distanceFromTapachula}
                            </td>
                            <td className="py-3.5 px-4 font-semibold text-[#0047FF]">
                              {zone.onSiteSla}
                            </td>
                            <td className="py-3.5 px-4 font-mono-tabular text-slate-500 whitespace-nowrap">
                              {zone.postalCodes}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="text-xs font-bold text-[#0047FF]">
                  PREGUNTAS FRECUENTES
                </div>
                <h2 className="font-display text-2xl font-bold text-[#031538] mt-2 tracking-tight">
                  Dudas sobre garantías, cobertura y servicios en Tapachula
                </h2>

                <div className="mt-6 space-y-3">
                  {FAQ_ITEMS.map((faq, index) => {
                    const isOpen = openFaqIndex === index;
                    return (
                      <div
                        key={index}
                        className="bg-[#F4F7FB] border border-slate-200 rounded-xl overflow-hidden"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                          aria-expanded={isOpen}
                          className="w-full flex items-center justify-between gap-4 p-4 text-left text-sm font-bold text-[#031538] hover:bg-slate-100/70 transition-colors cursor-pointer"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-[#0047FF] shrink-0 transition-transform duration-150 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 pt-2 text-xs text-slate-600 leading-relaxed border-t border-slate-200/70 bg-white">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. PUBLIC CLIENT CONTACT & QUOTE REQUEST SECTION (#contacto) */}
        <section id="contacto" className="py-16 lg:py-24 bg-st-light-circuit">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left 5 Columns: Official Brand Card + Direct Contact Information */}
              <div className="lg:col-span-5">
                <div className="text-xs font-bold text-[#0047FF]">
                  CONTACTO DIRECTO · TAPACHULA, CHIAPAS
                </div>
                <h2
                  className="font-display text-2xl sm:text-4xl font-bold text-[#031538] mt-2 tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Solicita tu Cotización o Diagnóstico Técnico Empresarial
                </h2>
                <CircuitDivider variant="amber" />
                <p className="mt-2 text-base text-slate-600 leading-relaxed">
                  Déjanos tus datos y el requerimiento de tu negocio. Nuestro equipo de ingeniería
                  en Tapachula te atenderá el mismo día.
                </p>

                {/* Brand Identity Card with Uploaded Logo */}
                <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 shadow-xs">
                  <img
                    src={SOPORTETECH_INFO.logoUrl}
                    alt="SoporteTech Soluciones Tecnológicas"
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 object-contain shrink-0"
                  />
                  <div>
                    <div className="font-display text-base font-bold text-[#031538]">
                      SOPORTE<span className="text-[#0047FF]">TECH</span>
                    </div>
                    <div className="text-xs font-semibold text-[#00A3E0]">
                      SOLUCIONES TECNOLÓGICAS
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Tecnología que trabaja para ti.
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-5 border-t border-slate-200 pt-6">
                  <div className="flex items-start gap-3.5">
                    <Phone className="w-5 h-5 text-[#FF7A00] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-medium text-slate-500">
                        Teléfono y WhatsApp Directo
                      </div>
                      <div className="flex items-center gap-3 mt-0.5">
                        <a
                          href={`tel:${SOPORTETECH_INFO.phoneRaw}`}
                          className="font-mono-tabular text-xl font-bold text-[#031538] hover:text-[#0047FF] transition-colors"
                        >
                          962 707 4426
                        </a>
                        <button
                          type="button"
                          onClick={handleCopyPhone}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-md cursor-pointer"
                        >
                          {copiedPhone ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Copiado</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copiar</span>
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {SOPORTETECH_INFO.schedule}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-[#0047FF] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-medium text-slate-500">
                        Ubicación y Cobertura Regional
                      </div>
                      <div className="text-sm font-bold text-[#031538]">
                        Tapachula de Córdova y Ordóñez, Chiapas
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Atención presencial en Tapachula, Puerto Chiapas, Ciudad Hidalgo, Tuxtla
                        Chico, Cacahoatán y Huixtla.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Building2 className="w-5 h-5 text-[#FF7A00] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-medium text-slate-500">
                        Garantía y Facturación
                      </div>
                      <div className="text-sm font-bold text-[#031538]">
                        Proveedor Autorizado (+15,000 Productos · +200 Marcas)
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Equipos nuevos de fábrica, precios por volumen y facturación fiscal CFDI
                        4.0.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 7 Columns: Validated Lead Capture Form */}
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
                {submittedLead ? (
                  <div className="py-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div className="text-xs font-mono-tabular font-bold text-[#0047FF]">
                      FOLIO DE ATENCIÓN: {submittedLead.id}
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#031538] mt-1">
                      ¡Gracias, {submittedLead.contactName}! Hemos recibido tu solicitud.
                    </h3>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                      Tu requerimiento ha quedado registrado para atención prioritaria por nuestros
                      especialistas en Tapachula. Si deseas respuesta inmediata en este momento,
                      envíanos tu folio con un clic a nuestro WhatsApp:
                    </p>

                    <div className="mt-5 bg-[#F4F7FB] border border-slate-200 rounded-xl p-4 text-xs space-y-1.5">
                      <div>
                        <strong className="text-[#031538]">Empresa / Giro:</strong>{' '}
                        {submittedLead.companyName} ({submittedLead.municipality})
                      </div>
                      <div>
                        <strong className="text-[#031538]">Teléfono de contacto:</strong>{' '}
                        <span className="font-mono-tabular">{submittedLead.contactPhone}</span>
                      </div>
                      <div>
                        <strong className="text-[#031538]">Servicio principal:</strong>{' '}
                        {submittedLead.serviceInterest}
                      </div>
                      {submittedLead.selectedEquipment.length > 0 && (
                        <div>
                          <strong className="text-[#031538]">Equipos solicitados:</strong>{' '}
                          {submittedLead.selectedEquipment.join(' · ')}
                        </div>
                      )}
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <a
                        href={buildWhatsAppHref(submittedLead)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold text-[#031538] bg-[#FFB800] hover:bg-[#FF7A00] hover:text-white rounded-lg transition-colors whitespace-nowrap"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Confirmar por WhatsApp al 962 707 4426</span>
                      </a>

                      <a
                        href={buildMailtoHref(submittedLead)}
                        className="inline-flex items-center gap-2 px-4 py-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
                      >
                        <Mail className="w-4 h-4 text-[#0047FF]" />
                        <span>Enviar copia por Correo</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => setSubmittedLead(null)}
                        className="px-4 py-3 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                      >
                        Enviar otra solicitud
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} noValidate className="space-y-5">
                    <div className="border-b border-slate-200 pb-4">
                      <h3 className="font-display text-lg font-bold text-[#031538]">
                        Formulario de Cotización y Diagnóstico Empresarial
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Completa tus datos para recibir tu propuesta personalizada en Tapachula y
                        el Soconusco.
                      </p>
                    </div>

                    {formError && (
                      <div
                        role="alert"
                        className="p-3.5 text-xs font-medium text-red-800 bg-red-50 border border-red-200 rounded-lg"
                      >
                        {formError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-bold text-[#031538] mb-1.5"
                        >
                          Nombre completo *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="Ej. Ing. Carlos Morales"
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#0047FF] focus:bg-white"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="company-name"
                          className="block text-xs font-bold text-[#031538] mb-1.5"
                        >
                          Empresa, Negocio o Institución
                        </label>
                        <input
                          id="company-name"
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="Ej. Ferretería / Comercializadora / Clínica"
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#0047FF] focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="block text-xs font-bold text-[#031538] mb-1.5"
                        >
                          Teléfono / WhatsApp (10 dígitos) *
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          required
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          placeholder="Ej. 962 123 4567"
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#0047FF] focus:bg-white font-mono-tabular"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-bold text-[#031538] mb-1.5"
                        >
                          Correo electrónico (opcional)
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="correo@empresa.com"
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#0047FF] focus:bg-white"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-municipality"
                          className="block text-xs font-bold text-[#031538] mb-1.5"
                        >
                          Municipio en el Soconusco
                        </label>
                        <select
                          id="contact-municipality"
                          value={municipality}
                          onChange={(e) => setMunicipality(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#0047FF] focus:bg-white"
                        >
                          <option value="Tapachula">Tapachula</option>
                          <option value="Puerto Chiapas">Puerto Chiapas</option>
                          <option value="Ciudad Hidalgo (Suchiate)">
                            Ciudad Hidalgo (Suchiate)
                          </option>
                          <option value="Tuxtla Chico">Tuxtla Chico</option>
                          <option value="Cacahoatán">Cacahoatán</option>
                          <option value="Huixtla">Huixtla</option>
                          <option value="Huehuetán / Mazatán">Huehuetán / Mazatán</option>
                          <option value="Escuintla / Acacoyagua">Escuintla / Acacoyagua</option>
                          <option value="Otro municipio de Chiapas">
                            Otro municipio de Chiapas
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="service-interest"
                          className="block text-xs font-bold text-[#031538] mb-1.5"
                        >
                          Área o servicio que necesitas cotizar
                        </label>
                        <select
                          id="service-interest"
                          value={selectedServiceInterest}
                          onChange={(e) => setSelectedServiceInterest(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#0047FF] focus:bg-white"
                        >
                          <option value="03. Proveedor Autorizado de Equipo de Cómputo, POS y Energía">
                            Cotización de Equipos (Cómputo, Punto de Venta POS, UPS, Impresión)
                          </option>
                          <option value="02. Mantenimiento de Redes, Enlaces y Videovigilancia">
                            Mantenimiento de Redes, Enlaces Inalámbricos o CCTV
                          </option>
                          <option value="01. Ciberseguridad y Respaldo de Servidores Contables">
                            Ciberseguridad, Firewalls y Respaldo de Servidores (CONTPAQi/ERP)
                          </option>
                          <option value="04. Desarrollo de Software Personalizado">
                            Desarrollo de Software a la Medida (Inventarios, Báscula, POS)
                          </option>
                          <option value="Póliza Mensual de Mantenimiento Preventivo y Correctivo">
                            Póliza Mensual de Soporte Técnico y Mantenimiento de Equipos
                          </option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="preferred-channel"
                          className="block text-xs font-bold text-[#031538] mb-1.5"
                        >
                          ¿Cómo prefieres que te contactemos?
                        </label>
                        <select
                          id="preferred-channel"
                          value={preferredChannel}
                          onChange={(e) =>
                            setPreferredChannel(
                              e.target.value as 'whatsapp' | 'llamada' | 'correo'
                            )
                          }
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#0047FF] focus:bg-white"
                        >
                          <option value="whatsapp">Por WhatsApp</option>
                          <option value="llamada">Por Llamada Telefónica</option>
                          <option value="correo">Por Correo Electrónico</option>
                        </select>
                      </div>
                    </div>

                    {quoteList.length > 0 && (
                      <div className="bg-[#F4F7FB] border border-slate-200 rounded-xl p-3.5 text-xs">
                        <span className="font-bold text-[#031538]">
                          Líneas de equipamiento incluidas en tu solicitud:
                        </span>
                        <div className="text-slate-600 mt-1">
                          {quoteList
                            .map((c) => `${c.quantity}x ${c.line.name}`)
                            .join(' · ')}
                        </div>
                      </div>
                    )}

                    <div>
                      <label
                        htmlFor="project-notes"
                        className="block text-xs font-bold text-[#031538] mb-1.5"
                      >
                        Describe qué equipos buscas o qué problema deseas resolver
                      </label>
                      <textarea
                        id="project-notes"
                        rows={3}
                        value={projectNotes}
                        onChange={(e) => setProjectNotes(e.target.value)}
                        placeholder="Ej. Necesito cotizar 4 computadoras para mostrador, 2 No-Breaks APC y revisar la red Wi-Fi de mi negocio en Tapachula..."
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#0047FF] focus:bg-white"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <button
                        type="submit"
                        disabled={submittingLead}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-[#031538] bg-[#FFB800] hover:bg-[#FF7A00] hover:text-white disabled:opacity-60 rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-sm"
                      >
                        <span>
                          {submittingLead
                            ? 'Enviando solicitud...'
                            : 'Enviar Solicitud de Cotización'}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <a
                        href={buildWhatsAppHref()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold text-[#031538] bg-slate-100 border border-slate-300 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap font-mono-tabular"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#0047FF]" />
                        <span>Directo a WhatsApp: 962 707 4426</span>
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* PRIVATE OWNER MODAL (Protected by PIN so public visitors CANNOT see leads) */}
      {showAdminModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="admin-modal-title"
          className="fixed inset-0 z-50 bg-[#031538]/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="bg-white border border-slate-200 rounded-2xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <Lock className="w-5 h-5 text-[#0047FF]" />
                <h2 id="admin-modal-title" className="font-display text-lg font-bold text-[#031538]">
                  Acceso Privado · Administración SoporteTech
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowAdminModal(false)}
                aria-label="Cerrar ventana de administración"
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!adminAuthenticated ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  fetchProtectedLeads();
                }}
                className="mt-6 max-w-md mx-auto py-4"
              >
                <p className="text-xs text-slate-600 leading-relaxed">
                  Esta bandeja está protegida con clave para que tus visitantes públicos no puedan
                  ver tus prospectos cuando compartas el enlace de tu página.
                </p>
                <div className="mt-4">
                  <label
                    htmlFor="admin-pin"
                    className="block text-xs font-bold text-[#031538] mb-1.5"
                  >
                    Ingresa tu Clave de Propietario:
                  </label>
                  <input
                    id="admin-pin"
                    type="password"
                    value={adminPinInput}
                    onChange={(e) => setAdminPinInput(e.target.value)}
                    placeholder="Ingresa tu clave..."
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#0047FF]"
                  />
                </div>
                {adminAuthError && (
                  <p className="mt-2 text-xs font-medium text-red-700">{adminAuthError}</p>
                )}
                <div className="mt-5 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAdminModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={loadingLeads}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-[#031538] hover:bg-[#0047FF] rounded-lg cursor-pointer"
                  >
                    {loadingLeads ? 'Verificando...' : 'Desbloquear Bandeja'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-5">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <span className="text-xs font-mono-tabular font-bold text-[#0047FF]">
                      SOLICITUDES REGISTRADAS ({leads.length})
                    </span>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Responde con 1 clic por WhatsApp o descarga tus prospectos en Excel (CSV).
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => fetchProtectedLeads()}
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
                    >
                      <RefreshCw
                        className={`w-3.5 h-3.5 ${loadingLeads ? 'animate-spin' : ''}`}
                      />
                      <span>Actualizar</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleExportLeadsCsv}
                      disabled={leads.length === 0}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#031538] hover:bg-[#0047FF] disabled:opacity-50 rounded-lg cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Descargar Excel (CSV)</span>
                    </button>
                  </div>
                </div>

                {leads.length === 0 ? (
                  <div className="py-10 text-center text-sm text-slate-500">
                    Aún no hay solicitudes registradas en la bandeja.
                  </div>
                ) : (
                  <div className="mt-4 overflow-x-auto max-h-[420px]">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600">
                          <th className="py-3 px-3">Folio / Fecha</th>
                          <th className="py-3 px-3">Cliente / Empresa</th>
                          <th className="py-3 px-3">Teléfono / Municipio</th>
                          <th className="py-3 px-3">Servicio y Equipos</th>
                          <th className="py-3 px-3">Estatus</th>
                          <th className="py-3 px-3">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 text-xs">
                        {leads.map((lead) => {
                          const cleanClientPhone = lead.contactPhone.replace(/\D/g, '');
                          const replyWhatsAppUrl = `https://wa.me/52${cleanClientPhone}?text=${encodeURIComponent(
                            `Hola ${lead.contactName}, te saluda el equipo de SoporteTech Tapachula respecto a tu solicitud (${lead.id}) de ${lead.serviceInterest}.`
                          )}`;
                          return (
                            <tr key={lead.id} className="hover:bg-slate-50">
                              <td className="py-3 px-3 font-mono-tabular whitespace-nowrap">
                                <div className="font-bold text-[#031538]">{lead.id}</div>
                                <div className="text-[11px] text-slate-500">
                                  {new Date(lead.createdAt).toLocaleString('es-MX', {
                                    dateStyle: 'short',
                                    timeStyle: 'short',
                                  })}
                                </div>
                              </td>
                              <td className="py-3 px-3">
                                <div className="font-bold text-[#031538]">
                                  {lead.contactName}
                                </div>
                                <div className="text-slate-500">{lead.companyName}</div>
                              </td>
                              <td className="py-3 px-3 whitespace-nowrap">
                                <a
                                  href={`tel:${cleanClientPhone}`}
                                  className="font-mono-tabular font-bold text-[#0047FF] hover:underline"
                                >
                                  {lead.contactPhone}
                                </a>
                                <div className="text-[11px] text-slate-500">
                                  {lead.municipality} · {lead.preferredChannel}
                                </div>
                              </td>
                              <td className="py-3 px-3 max-w-xs">
                                <div className="font-medium text-[#031538]">
                                  {lead.serviceInterest}
                                </div>
                                {lead.selectedEquipment.length > 0 && (
                                  <div className="text-[11px] text-slate-600 mt-0.5">
                                    Equipos: {lead.selectedEquipment.join(', ')}
                                  </div>
                                )}
                                {lead.projectNotes && (
                                  <div className="text-[11px] text-slate-500 italic mt-0.5">
                                    "{lead.projectNotes}"
                                  </div>
                                )}
                              </td>
                              <td className="py-3 px-3">
                                <select
                                  value={lead.status}
                                  onChange={(e) =>
                                    handleUpdateLeadStatus(
                                      lead.id,
                                      e.target.value as 'Nuevo' | 'Contactado' | 'Cotizado'
                                    )
                                  }
                                  aria-label={`Estatus de ${lead.contactName}`}
                                  className="px-2 py-1 text-xs font-semibold rounded border border-slate-300 bg-white text-[#031538]"
                                >
                                  <option value="Nuevo">Nuevo</option>
                                  <option value="Contactado">Contactado</option>
                                  <option value="Cotizado">Cotizado</option>
                                </select>
                              </td>
                              <td className="py-3 px-3 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                  <a
                                    href={replyWhatsAppUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-2.5 py-1.5 text-xs font-bold text-white bg-[#0047FF] hover:bg-[#031538] rounded"
                                  >
                                    WhatsApp
                                  </a>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteLead(lead.id)}
                                    aria-label={`Eliminar prospecto ${lead.id}`}
                                    className="p-1.5 text-slate-400 hover:text-red-600 cursor-pointer"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 9. QUIET FOOTER */}
      <footer className="bg-[#031538] text-slate-400 border-t border-[#14377A] py-12">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-[#14377A]">
            <div className="md:col-span-5">
              <div className="font-display text-lg font-bold text-white">
                SOPORTE<span className="text-[#00A3E0]">TECH</span>
              </div>
              <div className="text-xs font-semibold text-[#FFB800] mt-0.5">
                Soluciones Tecnológicas · Tecnología que trabaja para ti.
              </div>
              <p className="text-xs text-slate-300 mt-2.5 max-w-sm leading-relaxed">
                Especialistas en ciberseguridad, mantenimiento de redes, proveedor autorizado de
                equipo de cómputo y oficina (+15,000 productos y +200 marcas oficiales) y
                desarrollo de software a la medida en Tapachula y el Soconusco.
              </p>
              <div className="mt-4 text-xs text-slate-200 font-mono-tabular">
                Tapachula, Chiapas, México · C.P. 30700 · Tel: 962 707 4426
              </div>
            </div>

            <div className="md:col-span-4">
              <div className="text-xs font-bold text-white">Divisiones y Servicios</div>
              <ul className="mt-3 space-y-2 text-xs">
                <li>
                  <a href="#demanda-local" className="hover:text-[#FFB800] transition-colors">
                    Soluciones para Empresas de Tapachula
                  </a>
                </li>
                <li>
                  <a href="#servicios" className="hover:text-[#FFB800] transition-colors">
                    Ciberseguridad y Respaldo de Servidores Contables
                  </a>
                </li>
                <li>
                  <a href="#servicios" className="hover:text-[#FFB800] transition-colors">
                    Mantenimiento de Redes, Antenas y Videovigilancia
                  </a>
                </li>
                <li>
                  <a href="#equipos" className="hover:text-[#FFB800] transition-colors">
                    Catálogo Autorizado de Cómputo, POS y Energía
                  </a>
                </li>
                <li>
                  <a href="#software" className="hover:text-[#FFB800] transition-colors">
                    Desarrollo de Software Empresarial a la Medida
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <div className="text-xs font-bold text-white">Cobertura Soconusco</div>
              <p className="mt-3 text-xs leading-relaxed text-slate-300">
                Tapachula · Puerto Chiapas · Ciudad Hidalgo (Suchiate) · Tuxtla Chico · Cacahoatán
                · Unión Juárez · Huixtla · Huehuetán · Mazatán · Escuintla.
              </p>
              <div className="mt-4">
                <a
                  href={`tel:${SOPORTETECH_INFO.phoneRaw}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFB800] hover:text-white font-mono-tabular"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Atención: 962 707 4426</span>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              © {new Date().getFullYear()} SoporteTech Soluciones Tecnológicas. Todos los derechos
              reservados.
            </div>
            <div className="flex items-center gap-4">
              <span>Tapachula, Chiapas</span>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => setShowAdminModal(true)}
                className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <Lock className="w-3 h-3" />
                <span>Acceso Propietario</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
