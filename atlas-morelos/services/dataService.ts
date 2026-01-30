
export interface SheetMarker {
  id: string;
  secretaria_organo: string;
  secretaria_organo_norm: string;
  dependencia_entidad_adscrita: string;
  dependencia_entidad_adscrita_norm: string;
  ubicacion_1: string;
  latitud: number;
  longitud: number;
  ubicacion_2?: string;
  latitud_1?: number;
  longitud_1?: number;
  horario?: string;
  numero?: string;
  category: string;
  image?: string;
}

export const normalizeText = (text: string): string => {
  if (!text) return '';
  return text
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
    .replace(/[^A-Z0-9 ]/g, "")      // Eliminar caracteres especiales
    .replace(/\s+/g, " ")           // Eliminar espacios dobles
    .trim();
};

export const parseCSV = (csvText: string): SheetMarker[] => {
  const cleanCSV = csvText.trim().replace(/^\uFEFF/, '');
  const lines = cleanCSV.split(/\r?\n/).filter(line => line.trim() !== '');
  if (lines.length === 0) return [];
  
  const parseLine = (line: string) => {
    const result = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') inQuotes = !inQuotes;
      else if (char === ',' && !inQuotes) {
        result.push(cur.trim());
        cur = '';
      } else {
        cur += char;
      }
    }
    result.push(cur.trim());
    return result;
  };

  const headers = parseLine(lines[0]).map(h => h.toLowerCase().trim());
  
  return lines.slice(1).map((line, idx) => {
    const values = parseLine(line);
    const rawData: any = {};
    headers.forEach((header, i) => {
      rawData[header] = values[i];
    });

    const secRaw = rawData['secretaria_organo'] || '';
    const depRaw = rawData['dependencia_entidad_adscrita'] || '';

    return {
      id: `marker-${idx}`,
      secretaria_organo: secRaw,
      secretaria_organo_norm: normalizeText(secRaw),
      dependencia_entidad_adscrita: depRaw,
      dependencia_entidad_adscrita_norm: normalizeText(depRaw),
      ubicacion_1: rawData['ubicacion_1'] || '',
      latitud: parseFloat(rawData['latitud']) || 0,
      longitud: parseFloat(rawData['longitud']) || 0,
      ubicacion_2: rawData['ubicacion_2'] || '',
      latitud_1: parseFloat(rawData['latitud_1']) || undefined,
      longitud_1: parseFloat(rawData['longitud_1']) || undefined,
      horario: rawData['horario'] || 'No disponible',
      numero: rawData['numero'] || 'Sin teléfono',
      category: secRaw.toLowerCase().includes('salud') ? 'Salud' : 
                secRaw.toLowerCase().includes('educacion') ? 'Educación' : 'Cultura',
      image: rawData['image'] || ''
    };
  }).filter(m => m.secretaria_organo !== '' && m.latitud !== 0);
};

export const fetchSheetData = async (sheetUrl: string) => {
  try {
    const cacheBuster = `&t=${Date.now()}`;
    const response = await fetch(`${sheetUrl}${cacheBuster}`, {
      cache: 'no-store',
      headers: {
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
    if (!response.ok) throw new Error('Error al conectar con la base de datos');
    const csvText = await response.text();
    return parseCSV(csvText);
  } catch (error) {
    console.error('DataService Error:', error);
    return null;
  }
};
