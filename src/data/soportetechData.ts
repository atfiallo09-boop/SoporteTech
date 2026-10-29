export interface LocalNeedCard {
  id: string;
  searchIntent: string;
  localProblem: string;
  soportetechSolution: string;
  brandsOrTech: string;
  targetActionService: string;
}

export interface ServiceCapability {
  id: string;
  index: string;
  category: 'ciberseguridad' | 'redes' | 'equipos' | 'software';
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  metricLabel: string;
  metricValue: string;
  slaResponse: string;
  colSpan: 'col-span-1 lg:col-span-7' | 'col-span-1 lg:col-span-5';
}

export type CatalogCategory =
  | 'cómputo'
  | 'pos'
  | 'redes'
  | 'energía'
  | 'impresión'
  | 'videovigilancia';

export interface HardwareLine {
  id: string;
  code: string;
  category: CatalogCategory;
  categoryLabel: string;
  name: string;
  brands: string;
  specs: string;
  localApplication: string;
  availability: string;
}

export interface CaseStudy {
  id: string;
  clientSector: string;
  municipality: string;
  title: string;
  beforeChallenge: string;
  solutionImplemented: string;
  quantifiedOutcome: string;
  primaryMetric: string;
  primaryMetricContext: string;
  testimonialQuote: string;
  testimonialAuthor: string;
  testimonialRole: string;
  testimonialOrg: string;
}

export interface MunicipalityCoverage {
  name: string;
  distanceFromTapachula: string;
  onSiteSla: string;
  keySectors: string;
  postalCodes: string;
}

export const SOPORTETECH_INFO = {
  name: 'SoporteTech',
  tagline: 'Soluciones Tecnológicas · Tecnología que trabaja para ti.',
  logoUrl: '/assets/aistudio/WhatsApp_Image_2026-09-30_at_1.40.05_PM_a7a4f084.jpeg',
  legalRegion: 'Región del Soconusco · Tapachula, Chiapas',
  phoneRaw: '9627074426',
  phoneFormatted: '962 707 4426',
  phoneInternational: '+52 962 707 4426',
  whatsappBaseUrl: 'https://wa.me/529627074426',
  email: 'atfiallo09@gmail.com',
  schedule: 'Lun – Vie 08:00 a 19:00 hrs · Sáb 09:00 a 14:00 hrs',
  headquarters: 'Tapachula de Córdova y Ordóñez, Chiapas · Cobertura en todo el Soconusco',
  supplyAdvantage: 'Proveedor Autorizado Directo (+15,000 Productos · +200 Marcas Oficiales)',
};

// Lo que realmente busca la gente y los negocios en Tapachula y el Soconusco
export const LOCAL_SEARCH_NEEDS: LocalNeedCard[] = [
  {
    id: 'need-voltaje-clima',
    searchIntent: '“Se dañó mi equipo por un apagón / Busco No-Break y mantenimiento en Tapachula”',
    localProblem:
      'Las tormentas eléctricas de la costa, los bajones de voltaje y la humedad aceleran el fallo de fuentes de poder, servidores y computadoras de mostrador.',
    soportetechSolution:
      'Pólizas de mantenimiento preventivo térmico (limpieza interna, pasta térmica de alto rendimiento) y protección eléctrica con No-Breaks / UPS Online y reguladores industriales.',
    brandsOrTech: 'APC · CyberPower · Koblenz · Smartbitt · Forza',
    targetActionService: '03. Proveedor Autorizado de Equipo de Cómputo, POS y Energía',
  },
  {
    id: 'need-red-antenas',
    searchIntent: '“El internet se cae en la oficina / Necesito llevar red a mi bodega o finca”',
    localProblem:
      'Redes Wi-Fi saturadas en hoteles, clínicas y escuelas, cables desordenados que provocan desconexiones y sucursales o bodegas sin cobertura estable.',
    soportetechSolution:
      'Peinado y certificación de racks Cat6A/Fibra, redes Wi-Fi 6 empresariales, balanceo de 2 proveedores de internet (Starlink + Fibra) y enlaces inalámbricos Punto a Punto.',
    brandsOrTech: 'Ubiquiti UniFi & airMAX · MikroTik · TP-Link Omada · Panduit · LinkedPro',
    targetActionService: '02. Mantenimiento de Redes, Enlaces y Videovigilancia',
  },
  {
    id: 'need-pos-contable',
    searchIntent: '“Busco equipo para Punto de Venta, impresora de tickets o servidor CONTPAQi”',
    localProblem:
      'Comercios, farmacias, ferreterías y despachos en Tapachula necesitan equipar sus cajas, agilizar el cobro con código de barras y evitar que su servidor contable se congele.',
    soportetechSolution:
      'Suministro e instalación completa de terminales Punto de Venta (POS), lectores 1D/2D, impresoras térmicas, cajones de dinero y servidores optimizados para sistemas contables.',
    brandsOrTech: 'EC Line · Zebra · Honeywell · Epson · Star Micronics · Dell · HP · Lenovo',
    targetActionService: '03. Proveedor Autorizado de Equipo de Cómputo, POS y Energía',
  },
  {
    id: 'need-software-medida',
    searchIntent: '“Necesito un sistema para controlar mi inventario, báscula o sucursales”',
    localProblem:
      'Los programas genéricos no se adaptan al acopio de café/mango, control de flotillas en Puerto Chiapas/Suchiate o inventarios multi-bodega, generando fugas y horas extra.',
    soportetechSolution:
      'Desarrollo de software a la medida en Tapachula: plataformas web, móviles y de escritorio adaptadas 100% a la operación real de tu negocio y conectadas a tu hardware.',
    brandsOrTech: 'Sistemas ERP/POS a Medida · Integración con Básculas · Nube o Servidor Local',
    targetActionService: '04. Desarrollo de Software Personalizado',
  },
];

export const CORE_SERVICES: ServiceCapability[] = [
  {
    id: 'ciberseguridad',
    index: '01',
    category: 'ciberseguridad',
    title: '01. Ciberseguridad y Respaldo de Servidores Contables',
    subtitle: 'Protección contra ransomware, robo de información y pérdida de bases de datos',
    description:
      'Protegemos la información más valiosa de los negocios en Tapachula: servidores de facturación, sistemas CONTPAQi/ERP, expedientes aduanales y carteras de clientes frente a virus, secuestro de datos y fallos de disco.',
    deliverables: [
      'Configuración de Firewalls perimetrales (Fortinet / Sophos / MikroTik) y redes separadas para invitados',
      'Respaldos automáticos 3-2-1 en servidores NAS locales y nube cifrada contra ransomware',
      'Conexiones VPN seguras para enlazar tu matriz en Tapachula con sucursales en el Soconusco',
      'Antivirus corporativo centralizado (EDR) y control de accesos USB / filtrado de navegación web',
    ],
    metricLabel: 'Protección de bases de datos contables y operativas bajo póliza',
    metricValue: '99.94%',
    slaResponse: 'Atención de emergencias < 30 min',
    colSpan: 'col-span-1 lg:col-span-7',
  },
  {
    id: 'redes',
    index: '02',
    category: 'redes',
    title: '02. Mantenimiento de Redes, Enlaces y Videovigilancia',
    subtitle: 'Cableado estructurado, Wi-Fi empresarial, antenas punto a punto y CCTV IP',
    description:
      'Solucionamos de raíz las caídas de red y lentitud de internet en oficinas, clínicas, hoteles, colegios y bodegas agroindustriales en toda la costa de Chiapas.',
    deliverables: [
      'Cableado estructurado Cat6 / Cat6A, fibra óptica y saneamiento profesional de racks de comunicaciones',
      'Enlaces inalámbricos de largo alcance (Punto a Punto) para conectar fincas, plantas y bodegas',
      'Redes Wi-Fi 6 de alta cobertura y balanceo Dual-WAN (combina 2 proveedores para cero caídas)',
      'Sistemas de videovigilancia IP (CCTV Hikvision / Dahua) y controles de acceso biométricos',
    ],
    metricLabel: 'Estabilidad promedio en redes empresariales y enlaces regionales',
    metricValue: '99.8%',
    slaResponse: 'Visitas técnicas en sitio en Tapachula el mismo día',
    colSpan: 'col-span-1 lg:col-span-5',
  },
  {
    id: 'equipos',
    index: '03',
    category: 'equipos',
    title: '03. Proveedor Autorizado de Equipo de Cómputo, POS y Energía',
    subtitle: 'Acceso directo a más de 15,000 productos y 200 marcas líderes con garantía oficial',
    description:
      'Abastecemos a empresas, escuelas, clínicas, hoteles y comercios en el Soconusco con equipamiento 100% nuevo de fábrica, precios especiales por volumen o proyecto, facturación CFDI 4.0 y configuración incluida.',
    deliverables: [
      'Cómputo empresarial y comercial: Laptops, PCs de escritorio, All-in-One, servidores y estaciones de trabajo',
      'Soluciones Punto de Venta (POS): Impresoras de tickets, lectores de código de barras, cajones y terminales touch',
      'Protección eléctrica para el clima de la costa: No-Breaks, UPS Online doble conversión y reguladores',
      'Impresión láser y tinta continua de alto volumen, escáneres, proyectores, consumibles y refacciones (SSD, RAM)',
    ],
    metricLabel: 'Catálogo mayorista con inventario nacional y garantía directa',
    metricValue: '+15,000 SKU',
    slaResponse: 'Cotizaciones personalizadas por unidad o volumen sin costo',
    colSpan: 'col-span-1 lg:col-span-5',
  },
  {
    id: 'software',
    index: '04',
    category: 'software',
    title: '04. Desarrollo de Software Personalizado',
    subtitle: 'Sistemas creados en Tapachula a la medida exacta de tu flujo operativo',
    description:
      'Nuestro equipo de ingeniería de software desarrolla aplicaciones web, móviles y de escritorio que automatizan inventarios, básculas, ventas, logística y administración sin depender de hojas de cálculo.',
    deliverables: [
      'Sistemas ERP y Punto de Venta a medida: control de almacenes, compras, facturación CFDI 4.0 y cobranza',
      'Software para agroindustria del Soconusco: recepción en báscula, trazabilidad de lotes y liquidación a productores',
      'Plataformas para agencias aduanales, transportistas y control de flotillas en Puerto Chiapas y Suchiate',
      'Portales clínicos, agendamiento de citas, expedientes digitales e integración con WhatsApp y lectores QR',
    ],
    metricLabel: 'Reducción promedio en tiempos de captura y cierre administrativo',
    metricValue: '-62% Horas',
    slaResponse: 'Levantamiento de requerimientos presencial sin costo',
    colSpan: 'col-span-1 lg:col-span-7',
  },
];

// Catálogo amplio (+15,000 SKU · +200 Marcas Oficiales · Sin precios públicos)
export const HARDWARE_CATALOG_LINES: HardwareLine[] = [
  {
    id: 'st-laptops-corp',
    code: 'CAT-COMP-01',
    category: 'cómputo',
    categoryLabel: 'Cómputo y Servidores',
    name: 'Laptops Empresariales, Educativas y de Alto Rendimiento',
    brands: 'HP · Dell · Lenovo · Asus · Acer · MSI',
    specs: 'Procesadores Intel Core i3/i5/i7/Ultra y AMD Ryzen · Chasis reforzado · SSD NVMe · Windows 11 Pro / Home',
    localApplication: 'Ideales para gerencia, contadores, supervisores en campo, escuelas y trabajo móvil en el Soconusco.',
    availability: 'Entrega con configuración inicial y migración de archivos',
  },
  {
    id: 'st-desktops-servers',
    code: 'CAT-COMP-02',
    category: 'cómputo',
    categoryLabel: 'Cómputo y Servidores',
    name: 'Estaciones de Trabajo (PCs), All-in-One, Servidores y Componentes',
    brands: 'Dell OptiPlex/PowerEdge · HP ProDesk/ProLiant · Lenovo ThinkCentre · Intel · Kingston · ADATA · WD',
    specs: 'Equipos para uso continuo 24/7, servidores para CONTPAQi / bases de datos, memorias RAM y discos SSD para actualización.',
    localApplication: 'Oficinas administrativas, despachos contables, recepciones, clínicas y servidores centrales.',
    availability: 'Armado a medida o equipo de marca con garantía oficial',
  },
  {
    id: 'st-pos-terminal',
    code: 'CAT-POS-01',
    category: 'pos',
    categoryLabel: 'Punto de Venta (POS)',
    name: 'Kits Completos de Punto de Venta: Impresoras, Lectores y Cajones',
    brands: 'EC Line · Zebra · Honeywell · Epson · Star Micronics · Qian · Ghia',
    specs: 'Impresoras térmicas de tickets (USB/Ethernet/Bluetooth), lectores de código 1D/2D inalámbricos, cajones de dinero uso rudo y monitores Touch.',
    localApplication: 'Abarroteras, ferreterías, farmacias, restaurantes, boutiques y refaccionarias en Tapachula.',
    availability: 'Disponibilidad inmediata de equipos y rollos térmicos',
  },
  {
    id: 'st-pos-handheld',
    code: 'CAT-POS-02',
    category: 'pos',
    categoryLabel: 'Punto de Venta (POS)',
    name: 'Impresoras de Etiquetas, Básculas Digitales y Colectores de Datos (Handheld)',
    brands: 'Zebra · Honeywell · Bixolon · EC Line · Unitech',
    specs: 'Impresión de etiquetas de código de barras (transferencia térmica), terminales portátiles Android para inventario en bodega.',
    localApplication: 'Bodegas mayoristas, agroindustria, centros de distribución y logística en Puerto Chiapas y frontera.',
    availability: 'Integración directa con tu software de inventario',
  },
  {
    id: 'st-ups-energia',
    code: 'CAT-ENE-01',
    category: 'energía',
    categoryLabel: 'Energía y Protección',
    name: 'No-Breaks Interactivos, UPS Online Doble Conversión y Reguladores',
    brands: 'APC by Schneider Electric · CyberPower · Koblenz · Smartbitt · Complet · Forza',
    specs: 'Desde No-Breaks de 600VA para PC de escritorio hasta UPS Online de 3KVA–10KVA para servidores y equipo médico, más bancos de baterías.',
    localApplication: 'Indispensable en Tapachula contra apagones, variaciones de voltaje y tormentas eléctricas de temporada.',
    availability: 'Cálculo de carga eléctrica sin costo para tu negocio',
  },
  {
    id: 'st-redes-enlaces',
    code: 'CAT-RED-01',
    category: 'redes',
    categoryLabel: 'Redes y Conectividad',
    name: 'Switches Administrables, Wi-Fi 6 Empresarial, Routers y Antenas Punto a Punto',
    brands: 'Ubiquiti (UniFi / airMAX) · MikroTik · TP-Link Omada · Cisco · Aruba · Fortinet · Mercusys',
    specs: 'Access Points de alta densidad, antenas para enlaces inalámbricos de hasta 25+ km, switches PoE+ y gabinetes/bobinas Cat6 y Fibra.',
    localApplication: 'Hoteles, escuelas, hospitales y enlaces de internet hacia fincas o bodegas fuera de la mancha urbana.',
    availability: 'Incluye opción de instalación y configuración en sitio',
  },
  {
    id: 'st-impresion-oficina',
    code: 'CAT-IMP-01',
    category: 'impresión',
    categoryLabel: 'Impresión y Oficina',
    name: 'Multifuncionales de Tinta Continua, Láser de Alto Volumen y Escáneres',
    brands: 'Epson EcoTank / WorkForce · Brother · HP LaserJet · Canon · BenQ (Proyectores)',
    specs: 'Impresión dúplex de bajo costo por página, escáneres documentales de alta velocidad, proyectores para salas de juntas y consumibles 100% originales.',
    localApplication: 'Agencias aduanales, notarías, colegios, oficinas de gobierno y corporativos.',
    availability: 'Abastecimiento continuo de tintas, tóners y tambores',
  },
  {
    id: 'st-cctv-seguridad',
    code: 'CAT-SEG-01',
    category: 'videovigilancia',
    categoryLabel: 'Videovigilancia y Control',
    name: 'Cámaras de Seguridad IP / ColorVu, Grabadores NVR/DVR y Control Biométrico',
    brands: 'Hikvision · HiLook · Dahua · Epcom · ZKTeco · Ezviz',
    specs: 'Cámaras para exterior resistentes a lluvia intensa (IP67), visión nocturna a color, relojes checadores de huella/rostro y controles de acceso.',
    localApplication: 'Monitoreo en celular en tiempo real para comercios, patios de maniobra, bodegas y oficinas.',
    availability: 'Venta de equipo o proyecto llave en mano instalado',
  },
];

export const REGIONAL_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-agro-soconusco',
    clientSector: 'Agroindustria y Exportación de Café / Mango',
    municipality: 'Tapachula – Ruta Nueva Alemania',
    title: 'Enlace Inalámbrico, Protección Eléctrica y Software de Recepción en Báscula',
    beforeChallenge:
      'Los pesajes de productores se anotaban a mano y en hojas de Excel aisladas; además, las descargas eléctricas dañaban los equipos de cómputo y dejaban incomunicada la bodega.',
    solutionImplemented:
      'Instalación de enlace Ubiquiti Punto a Punto, respaldo eléctrico UPS Online APC y desarrollo de software a medida conectado directamente a la báscula digital e inventario.',
    quantifiedOutcome: '-68% Tiempo de cierre diario de lotes y 0 pérdidas de registros en cosecha',
    primaryMetric: '-68% Tiempo Operativo',
    primaryMetricContext: 'De 3.5 horas a 45 minutos en conciliación diaria de entradas y almacén',
    testimonialQuote:
      'Antes tardábamos toda la noche cuadrando entradas de productores con almacén. SoporteTech protegió nuestros equipos, conectó la planta y creó nuestro sistema de acopio a la medida.',
    testimonialAuthor: 'Ing. Roberto M. Villalobos',
    testimonialRole: 'Director de Operaciones',
    testimonialOrg: 'Beneficiadora y Exportadora del Soconusco',
  },
  {
    id: 'case-aduanal-puerto',
    clientSector: 'Logística, Agencia Aduanal y Transporte',
    municipality: 'Tapachula · Puerto Chiapas · Cd. Hidalgo (Suchiate)',
    title: 'Blindaje de Servidor Contable, Red Dual-WAN y Renovación de Cómputo Empresarial',
    beforeChallenge:
      'Cuando fallaba el proveedor de internet o había apagones en zona fronteriza, se detenía la captura de pedimentos y facturación, poniendo en riesgo los tiempos de despacho.',
    solutionImplemented:
      'Configuración de Firewall con balanceo automático de 2 proveedores de internet, VPN segura entre oficinas, respaldo automático de bases de datos y renovación de estaciones de trabajo.',
    quantifiedOutcome: '99.95% Continuidad operativa en transmisión de operaciones durante todo el año',
    primaryMetric: '99.95% Disponibilidad',
    primaryMetricContext: 'Cero paros por caída de red o pérdida de información en matriz y sucursal',
    testimonialQuote:
      'En logística aduanal una hora sin sistema detiene unidades en frontera. Con la red redundante y los equipos autorizados que nos suministró SoporteTech trabajamos sin interrupciones.',
    testimonialAuthor: 'Lic. Elena Domínguez Castellanos',
    testimonialRole: 'Gerente Administrativa',
    testimonialOrg: 'Consorcio Logístico Frontera Sur',
  },
  {
    id: 'case-comercio-tapachula',
    clientSector: 'Comercio Mayorista y Punto de Venta Multi-Sucursal',
    municipality: 'Tapachula Zona Centro y San Juan',
    title: 'Equipamiento de Cajas Punto de Venta (POS) y Sistema Centralizado de Inventarios',
    beforeChallenge:
      'Filas lentas en mostrador, lectores de código que fallaban constantemente y diferencias de inventario entre la bodega principal y las sucursales de venta al público.',
    solutionImplemented:
      'Abastecimiento de terminales POS, impresoras térmicas EC Line/Epson y lectores Zebra con garantía oficial, junto con plataforma web de inventario y facturación en tiempo real.',
    quantifiedOutcome: '+140% Velocidad de cobro en mostrador y control exacto de existencias',
    primaryMetric: '+140% Agilidad en Caja',
    primaryMetricContext: 'Eliminación de faltantes de almacén y corte de caja en menos de 10 minutos',
    testimonialQuote:
      'Nos equiparon todas las cajas de cobro con garantía oficial y adaptaron el sistema exactamente a cómo manejamos mayoreo y menudeo en Tapachula. El soporte es inmediato.',
    testimonialAuthor: 'C.P. Marco Antonio Orduña',
    testimonialRole: 'Director General',
    testimonialOrg: 'Distribuidora Comercial de la Costa',
  },
];

export const SOCONUSCO_COVERAGE: MunicipalityCoverage[] = [
  {
    name: 'Tapachula de Córdova y Ordóñez',
    distanceFromTapachula: 'Sede Central (0 km)',
    onSiteSla: 'Atención en sitio < 2 horas',
    keySectors: 'Comercios, Despachos Contables, Clínicas, Hoteles, Colegios y Corporativos',
    postalCodes: 'C.P. 30700 – 30830',
  },
  {
    name: 'Puerto Chiapas y Corredor Industrial',
    distanceFromTapachula: '28 km al Suroeste',
    onSiteSla: 'Atención en sitio el mismo día',
    keySectors: 'Agroindustria, Plantas Procesadoras, Recintos Portuarios y Bodegas',
    postalCodes: 'C.P. 30833',
  },
  {
    name: 'Ciudad Hidalgo (Suchiate) y Tuxtla Chico',
    distanceFromTapachula: '20 – 38 km al Sur/Este',
    onSiteSla: 'Atención programada y urgencias < 4 horas',
    keySectors: 'Agencias Aduanales, Patios de Maniobra, Comercio Mayorista y Transporte',
    postalCodes: 'C.P. 30840 – 30870',
  },
  {
    name: 'Huixtla, Huehuetán y Mazatán',
    distanceFromTapachula: '25 – 42 km al Noroeste',
    onSiteSla: 'Cobertura regional continua + Soporte remoto inmediato',
    keySectors: 'Ferreterías, Farmacias, Distribuidoras, Agrocomercios y Cajas Solidarias',
    postalCodes: 'C.P. 30640 – 30680',
  },
  {
    name: 'Cacahoatán y Unión Juárez',
    distanceFromTapachula: '18 – 32 km al Norte',
    onSiteSla: 'Cobertura regional + Enlaces inalámbricos para fincas',
    keySectors: 'Beneficios de Café, Cooperativas, Agroexportadores y Hotelería Ecológica',
    postalCodes: 'C.P. 30880 – 30890',
  },
];
