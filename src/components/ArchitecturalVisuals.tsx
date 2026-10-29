import React from 'react';
import { Shield, Server, Cpu, Code2, Lock, Wifi, HardDrive, Layers } from 'lucide-react';
import { SOPORTETECH_INFO } from '../data/soportetechData';

export function CircuitDivider({ variant = 'blue' }: { variant?: 'blue' | 'amber' }) {
  const strokeColor = variant === 'amber' ? '#FF7A00' : '#00A3E0';
  return (
    <div className="flex items-center gap-3 my-2" aria-hidden="true">
      <svg className="w-16 h-4 shrink-0" viewBox="0 0 64 16" fill="none">
        <circle cx="5" cy="8" r="3" stroke={strokeColor} strokeWidth="2" />
        <path d="M8 8H42L50 3H64" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function HeroInfrastructureVisual() {
  return (
    <div className="relative w-full h-full bg-[#04163D] rounded-2xl overflow-hidden border border-[#123373] flex flex-col justify-between p-4 sm:p-6 lg:p-8 text-white select-none shadow-xl">
      {/* Subtle Circuit Board SVG Backdrop matching the Phoenix Logo */}
      <svg
        className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="st-trace-blue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0047FF" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#00A3E0" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0047FF" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="st-trace-amber" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF7A00" stopOpacity="0.1" />
            <stop offset="60%" stopColor="#FFB800" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#E62419" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <path
          d="M 0 110 H 120 L 160 150 H 310"
          stroke="url(#st-trace-blue)"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="315" cy="150" r="4" stroke="#00A3E0" strokeWidth="2" fill="#04163D" />

        <path
          d="M 800 90 H 640 L 600 130 H 480"
          stroke="url(#st-trace-amber)"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="475" cy="130" r="4" stroke="#FFB800" strokeWidth="2" fill="#04163D" />

        <path
          d="M 0 470 H 140 L 180 430 H 290"
          stroke="url(#st-trace-amber)"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="295" cy="430" r="4" stroke="#FF7A00" strokeWidth="2" fill="#04163D" />

        <path
          d="M 800 500 H 630 L 590 460 H 460"
          stroke="url(#st-trace-blue)"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="455" cy="460" r="4" stroke="#00A3E0" strokeWidth="2" fill="#04163D" />
      </svg>

      {/* Top Brand Showcase Header with Uploaded Official Logo */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 bg-white rounded-xl p-4 sm:p-5 border border-sky-200/30 shadow-md">
        <img
          src={SOPORTETECH_INFO.logoUrl}
          alt="Logo Oficial SoporteTech Soluciones Tecnológicas"
          referrerPolicy="no-referrer"
          className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 object-contain shrink-0 mx-auto sm:mx-0"
        />
        <div className="text-center sm:text-left min-w-0">
          <div className="text-[11px] sm:text-xs font-bold tracking-wider text-[#0077B6]">
            SOLUCIONES TECNOLÓGICAS
          </div>
          <div className="font-display text-xl sm:text-2xl font-bold text-[#031538] mt-0.5">
            SOPORTE<span className="text-[#0047FF]">TECH</span>
          </div>
          <p className="text-xs font-medium text-slate-600 mt-1">
            “Tecnología que trabaja para ti.” · Sede Tapachula, Chiapas
          </p>
          <div className="mt-2.5 flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1 text-[11px] font-mono-tabular text-[#031538]">
            <span>Ciberseguridad</span>
            <span className="text-[#FF7A00]">·</span>
            <span>Redes</span>
            <span className="text-[#FF7A00]">·</span>
            <span>Equipos</span>
            <span className="text-[#FF7A00]">·</span>
            <span>Software</span>
          </div>
        </div>
      </div>

      {/* Central 4-Pillar Matrix with Electric Blue & Phoenix Amber Accents */}
      <div className="relative z-10 my-4 sm:my-5 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
        {/* Layer 1 */}
        <div className="bg-[#020E29]/95 border border-[#163C85] hover:border-[#00A3E0] transition-colors rounded-xl p-3.5 sm:p-4 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="font-mono-tabular text-[11px] font-semibold text-[#00A3E0]">
                DIVISIÓN 01
              </span>
              <h3 className="text-sm font-bold text-white mt-0.5">
                Ciberseguridad y Servidores
              </h3>
            </div>
            <Shield className="w-5 h-5 text-[#00A3E0] shrink-0" />
          </div>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Blindaje de bases de datos (CONTPAQi / ERP), respaldos contra ransomware y Firewalls Dual-WAN.
          </p>
          <div className="mt-3 pt-2.5 border-t border-[#102C63] flex items-center justify-between gap-2 text-[11px] font-mono-tabular">
            <span className="text-slate-400">Respaldo 3-2-1</span>
            <span className="text-[#FFB800] font-semibold">99.94% Blindaje</span>
          </div>
        </div>

        {/* Layer 2 */}
        <div className="bg-[#020E29]/95 border border-[#163C85] hover:border-[#00A3E0] transition-colors rounded-xl p-3.5 sm:p-4 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="font-mono-tabular text-[11px] font-semibold text-[#00A3E0]">
                DIVISIÓN 02
              </span>
              <h3 className="text-sm font-bold text-white mt-0.5">
                Redes, Antenas y CCTV IP
              </h3>
            </div>
            <Server className="w-5 h-5 text-[#00A3E0] shrink-0" />
          </div>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Cableado Cat6A/Fibra, Wi-Fi 6 empresarial y enlaces inalámbricos hacia fincas y bodegas.
          </p>
          <div className="mt-3 pt-2.5 border-t border-[#102C63] flex items-center justify-between gap-2 text-[11px] font-mono-tabular">
            <span className="text-slate-400">Ubiquiti · MikroTik</span>
            <span className="text-[#FFB800] font-semibold">99.8% Estabilidad</span>
          </div>
        </div>

        {/* Layer 3 */}
        <div className="bg-[#020E29]/95 border border-[#163C85] hover:border-[#FF7A00] transition-colors rounded-xl p-3.5 sm:p-4 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="font-mono-tabular text-[11px] font-semibold text-[#FFB800]">
                DIVISIÓN 03
              </span>
              <h3 className="text-sm font-bold text-white mt-0.5">
                Proveedor Autorizado (+15,000 SKU)
              </h3>
            </div>
            <Cpu className="w-5 h-5 text-[#FF7A00] shrink-0" />
          </div>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            +200 marcas oficiales: Laptops, PCs, Punto de Venta (POS), No-Breaks UPS contra apagones e impresión.
          </p>
          <div className="mt-3 pt-2.5 border-t border-[#102C63] flex items-center justify-between gap-2 text-[11px] font-mono-tabular">
            <span className="text-slate-400">Garantía de Fábrica</span>
            <span className="text-[#00A3E0] font-semibold">Factura CFDI 4.0</span>
          </div>
        </div>

        {/* Layer 4 */}
        <div className="bg-[#020E29]/95 border border-[#163C85] hover:border-[#FF7A00] transition-colors rounded-xl p-3.5 sm:p-4 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="font-mono-tabular text-[11px] font-semibold text-[#FFB800]">
                DIVISIÓN 04
              </span>
              <h3 className="text-sm font-bold text-white mt-0.5">
                Software a la Medida
              </h3>
            </div>
            <Code2 className="w-5 h-5 text-[#FF7A00] shrink-0" />
          </div>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Sistemas de inventarios, básculas agroindustriales, punto de venta multi-sucursal y logística.
          </p>
          <div className="mt-3 pt-2.5 border-t border-[#102C63] flex items-center justify-between gap-2 text-[11px] font-mono-tabular">
            <span className="text-slate-400">Web · Móvil · Local</span>
            <span className="text-[#00A3E0] font-semibold">-62% Tiempos</span>
          </div>
        </div>
      </div>

      {/* Bottom Regional Footprint Bar */}
      <div className="relative z-10 pt-3.5 border-t border-[#163C85] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs text-slate-300">
        <span>Cobertura: Tapachula · Puerto Chiapas · Suchiate · Huixtla · Cacahoatán</span>
        <span className="font-mono-tabular text-[#FFB800] font-bold">Tel: 962 707 4426</span>
      </div>
    </div>
  );
}

export function ServiceCategorySchematic({
  category,
}: {
  category: 'ciberseguridad' | 'redes' | 'equipos' | 'software';
}) {
  if (category === 'ciberseguridad') {
    return (
      <div className="w-full min-h-[11rem] h-auto bg-[#031538] rounded-xl border border-[#14377A] p-4 sm:p-5 flex flex-col justify-between text-white relative overflow-hidden">
        <div className="flex items-center justify-between gap-2 text-xs text-[#00A3E0] font-mono-tabular font-semibold">
          <span>BLINDAJE DE SERVIDORES Y DATOS CONTABLES</span>
          <Lock className="w-4 h-4 text-[#FFB800] shrink-0" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-3">
          <div className="bg-[#020E29] border border-[#163C85] rounded-lg p-2.5">
            <div className="text-[11px] font-mono-tabular text-[#00A3E0]">01. Perímetro</div>
            <div className="text-xs font-medium text-white mt-0.5">Firewall & VPN</div>
          </div>
          <div className="bg-[#020E29] border border-[#163C85] rounded-lg p-2.5">
            <div className="text-[11px] font-mono-tabular text-[#00A3E0]">02. Endpoints</div>
            <div className="text-xs font-medium text-white mt-0.5">Antiransomware EDR</div>
          </div>
          <div className="bg-[#020E29] border border-[#163C85] rounded-lg p-2.5">
            <div className="text-[11px] font-mono-tabular text-[#FFB800]">03. Respaldo</div>
            <div className="text-xs font-medium text-white mt-0.5">Copia Automática NAS/Nube</div>
          </div>
        </div>
        <div className="text-xs text-slate-300 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#14377A]">
          <span>Protección de bases de datos CONTPAQi, ERP y XML</span>
          <span className="font-mono-tabular text-[#FFB800] font-semibold">Continuidad Total</span>
        </div>
      </div>
    );
  }

  if (category === 'redes') {
    return (
      <div className="w-full min-h-[11rem] h-auto bg-[#031538] rounded-xl border border-[#14377A] p-4 sm:p-5 flex flex-col justify-between text-white relative overflow-hidden">
        <div className="flex items-center justify-between gap-2 text-xs text-[#00A3E0] font-mono-tabular font-semibold">
          <span>REDES ESTABLES, ENLACES Y VIDEOVIGILANCIA</span>
          <Wifi className="w-4 h-4 text-[#FFB800] shrink-0" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-3">
          <div className="bg-[#020E29] border border-[#163C85] rounded-lg p-2.5">
            <div className="text-[11px] font-mono-tabular text-[#00A3E0]">Cableado y Racks</div>
            <div className="text-xs font-medium text-white mt-0.5">Cat6A · Fibra · Peinado</div>
          </div>
          <div className="bg-[#020E29] border border-[#163C85] rounded-lg p-2.5">
            <div className="text-[11px] font-mono-tabular text-[#FFB800]">Inalámbrico y CCTV</div>
            <div className="text-xs font-medium text-white mt-0.5">Antenas PtP · Wi-Fi 6 · IP</div>
          </div>
        </div>
        <div className="text-xs text-slate-300 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#14377A]">
          <span>Balanceo de 2 proveedores de internet · Enlaces a fincas</span>
          <span className="font-mono-tabular text-[#FFB800] font-semibold">99.8% Uptime</span>
        </div>
      </div>
    );
  }

  if (category === 'equipos') {
    return (
      <div className="w-full min-h-[11rem] h-auto bg-[#031538] rounded-xl border border-[#14377A] p-4 sm:p-5 flex flex-col justify-between text-white relative overflow-hidden">
        <div className="flex items-center justify-between gap-2 text-xs text-[#FFB800] font-mono-tabular font-semibold">
          <span>PROVEEDOR MAYORISTA Y EQUIPAMIENTO AUTORIZADO</span>
          <HardDrive className="w-4 h-4 text-[#00A3E0] shrink-0" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-3">
          <div className="bg-[#020E29] border border-[#163C85] rounded-lg p-2.5">
            <div className="text-[11px] font-mono-tabular text-[#FFB800]">Cómputo y POS</div>
            <div className="text-xs font-medium text-white mt-0.5">Laptops · PCs · Punto Venta</div>
          </div>
          <div className="bg-[#020E29] border border-[#163C85] rounded-lg p-2.5">
            <div className="text-[11px] font-mono-tabular text-[#00A3E0]">Energía e Impresión</div>
            <div className="text-xs font-medium text-white mt-0.5">No-Breaks UPS · Multifuncionales</div>
          </div>
        </div>
        <div className="text-xs text-slate-300 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#14377A]">
          <span>+15,000 productos · Garantía oficial · Factura CFDI 4.0</span>
          <span className="font-mono-tabular text-[#00A3E0] font-semibold">Precios por Volumen</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[11rem] h-auto bg-[#031538] rounded-xl border border-[#14377A] p-4 sm:p-5 flex flex-col justify-between text-white relative overflow-hidden">
      <div className="flex items-center justify-between gap-2 text-xs text-[#FFB800] font-mono-tabular font-semibold">
        <span>INGENIERÍA DE SOFTWARE EN TAPACHULA</span>
        <Layers className="w-4 h-4 text-[#00A3E0] shrink-0" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-3">
        <div className="bg-[#020E29] border border-[#163C85] rounded-lg p-2.5">
          <div className="text-[11px] font-mono-tabular text-[#00A3E0]">Módulo 01</div>
          <div className="text-xs font-medium text-white mt-0.5">Inventarios y POS</div>
        </div>
        <div className="bg-[#020E29] border border-[#163C85] rounded-lg p-2.5">
          <div className="text-[11px] font-mono-tabular text-[#FFB800]">Módulo 02</div>
          <div className="text-xs font-medium text-white mt-0.5">Básculas y Acopio</div>
        </div>
        <div className="bg-[#020E29] border border-[#163C85] rounded-lg p-2.5">
          <div className="text-[11px] font-mono-tabular text-[#00A3E0]">Módulo 03</div>
          <div className="text-xs font-medium text-white mt-0.5">Control Multi-Sucursal</div>
        </div>
      </div>
      <div className="text-xs text-slate-300 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#14377A]">
        <span>Adaptado 100% a tu giro · Nube o Servidor Local</span>
        <span className="font-mono-tabular text-[#00A3E0] font-semibold">-62% Carga Manual</span>
      </div>
    </div>
  );
}
