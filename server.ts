import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

// Clave de propietario para proteger la bandeja de solicitudes cuando se comparte el link público
const OWNER_ADMIN_PINS = ['9627074426', 'soportetech'];

export interface LeadRecord {
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

function ensureLeadsFile(): LeadRecord[] {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(LEADS_FILE)) {
    const initialLeads: LeadRecord[] = [];
    fs.writeFileSync(LEADS_FILE, JSON.stringify(initialLeads, null, 2), 'utf-8');
    return initialLeads;
  }
  try {
    const raw = fs.readFileSync(LEADS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveLeads(leads: LeadRecord[]) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
}

function isOwnerAuthorized(req: express.Request): boolean {
  const pin = String(req.headers['x-admin-pin'] || '').trim().toLowerCase();
  return OWNER_ADMIN_PINS.includes(pin);
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // 1. Protected Owner Leads API: Only accessible with Owner PIN
  app.get('/api/leads', (req, res) => {
    if (!isOwnerAuthorized(req)) {
      res.status(401).json({ error: 'Clave de propietario requerida para ver prospectos.' });
      return;
    }
    const leads = ensureLeadsFile();
    res.json({ leads });
  });

  // Public Endpoint: Any client can submit a quote/diagnostic form
  app.post('/api/leads', (req, res) => {
    try {
      const {
        contactName,
        companyName,
        contactPhone,
        contactEmail,
        municipality,
        serviceInterest,
        selectedEquipment,
        projectNotes,
        preferredChannel,
      } = req.body;

      if (!contactName || !contactPhone) {
        res.status(400).json({ error: 'Nombre y teléfono son obligatorios.' });
        return;
      }

      const leads = ensureLeadsFile();
      const newLead: LeadRecord = {
        id: `ST-${Date.now().toString().slice(-6)}`,
        createdAt: new Date().toISOString(),
        contactName: String(contactName).trim(),
        companyName: String(companyName || 'Particular / PyME').trim(),
        contactPhone: String(contactPhone).trim(),
        contactEmail: String(contactEmail || '').trim(),
        municipality: String(municipality || 'Tapachula').trim(),
        serviceInterest: String(serviceInterest || 'Asesoría General').trim(),
        selectedEquipment: Array.isArray(selectedEquipment) ? selectedEquipment : [],
        projectNotes: String(projectNotes || '').trim(),
        preferredChannel: preferredChannel || 'whatsapp',
        status: 'Nuevo',
      };

      leads.unshift(newLead);
      saveLeads(leads);

      res.status(201).json({ lead: newLead });
    } catch (error) {
      console.error('Error guardando prospecto:', error);
      res.status(500).json({ error: 'No se pudo registrar la solicitud.' });
    }
  });

  app.patch('/api/leads/:id', (req, res) => {
    if (!isOwnerAuthorized(req)) {
      res.status(401).json({ error: 'No autorizado.' });
      return;
    }
    try {
      const { id } = req.params;
      const { status } = req.body;
      const leads = ensureLeadsFile();
      const updated = leads.map((lead) =>
        lead.id === id ? { ...lead, status: status || lead.status } : lead
      );
      saveLeads(updated);
      res.json({ leads: updated });
    } catch (error) {
      console.error('Error actualizando prospecto:', error);
      res.status(500).json({ error: 'Error al actualizar estatus.' });
    }
  });

  app.delete('/api/leads/:id', (req, res) => {
    if (!isOwnerAuthorized(req)) {
      res.status(401).json({ error: 'No autorizado.' });
      return;
    }
    try {
      const { id } = req.params;
      const leads = ensureLeadsFile();
      const filtered = leads.filter((lead) => lead.id !== id);
      saveLeads(filtered);
      res.json({ leads: filtered });
    } catch (error) {
      console.error('Error eliminando prospecto:', error);
      res.status(500).json({ error: 'Error al eliminar registro.' });
    }
  });

  // 2. Search Grounding API: Technical Catalog & Local Soconusco Tech Advisor
  app.post('/api/catalog-advisor', async (req, res) => {
    try {
      const { query } = req.body;
      if (!query || typeof query !== 'string') {
        res.status(400).json({ error: 'Por favor escribe una consulta válida.' });
        return;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Consulta del cliente en Tapachula / Soconusco, Chiapas: "${query}"`,
        config: {
          systemInstruction: `Eres el Asesor Técnico Especialista de SoporteTech Soluciones Tecnológicas ("Tecnología que trabaja para ti") en Tapachula y el Soconusco, Chiapas (Teléfono y WhatsApp: 962 707 4426).
SoporteTech es proveedor autorizado de equipo de cómputo y oficina con acceso directo a un catálogo mayorista de más de 15,000 productos y más de 200 marcas oficiales (HP, Dell, Lenovo, Asus, Acer, APC, CyberPower, Koblenz, Ubiquiti, MikroTik, TP-Link, Fortinet, Hikvision, EC Line, Zebra, Honeywell, Epson, Brother, Kingston, ADATA), con garantía directa de fabricante y facturación CFDI 4.0.
Además, SoporteTech ofrece:
1) Ciberseguridad, respaldos contra ransomware y blindaje de servidores contables (CONTPAQi, Aspel, ERP).
2) Mantenimiento preventivo/correctivo de redes, cableado estructurado, fibra óptica y enlaces inalámbricos punto a punto para fincas, bodegas y sucursales en la costa de Chiapas.
3) Desarrollo de software a la medida (sistemas de inventario, básculas agroindustriales, logística aduanal, punto de venta y facturación).

REGLAS ESTRICTAS:
- NUNCA menciones nombres de mayoristas externos; presenta todo el catálogo como capacidad directa de SoporteTech como Proveedor Autorizado.
- NUNCA menciones ni inventes precios en pesos o dólares. Explica que las cotizaciones se personalizan por proyecto o volumen sin costo al 962 707 4426.
- Considera las condiciones reales de Tapachula y el Soconusco: clima cálido-húmedo, tormentas eléctricas frecuentes (recomienda protección eléctrica UPS/reguladores), necesidad de enlaces estables y soporte presencial rápido.
- Responde en español claro, estructurado en viñetas concisas (máximo 160 palabras).`,
          tools: [{ googleSearch: {} }],
        },
      });

      const answerText =
        response.text ||
        'Consulta disponible directamente con nuestros ingenieros al 962 707 4426.';
      const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const sources = rawChunks
        .map((chunk: { web?: { uri?: string; title?: string } }) => ({
          uri: chunk.web?.uri || '',
          title: chunk.web?.title || 'Referencia técnica verificada',
        }))
        .filter((s: { uri: string }) => Boolean(s.uri))
        .slice(0, 4);

      res.json({
        answer: answerText,
        sources,
      });
    } catch (error: unknown) {
      console.error('Error en /api/catalog-advisor:', error);
      const errMessage =
        error instanceof Error
          ? error.message
          : 'Error al consultar especificaciones en tiempo real.';
      res.status(500).json({
        error: errMessage,
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
        watch: null,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SoporteTech server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
