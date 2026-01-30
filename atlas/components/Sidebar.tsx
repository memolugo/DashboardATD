import React from 'react';
import { GenericCategoryIcon, SettingsIcon, ProfileIcon, HealthIcon } from './Icons';
import { ViewState } from '../types';
import { SheetMarker } from '../services/dataService';

interface SidebarProps {
  viewState: ViewState;
  setViewState: (s: ViewState) => void;
  selectedCategoryNorm: string | null;
  onCategoryToggle: (norm: string) => void;
  groupedData: Record<string, { originalName: string, items: SheetMarker[] }>;
  onMarkerSelect: (marker: SheetMarker) => void;
  selectedMarker: SheetMarker | null;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  lastUpdated?: Date | null;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

/**
 * Formatea el texto siguiendo reglas de capitalización en español para títulos.
 * Mantiene preposiciones y artículos comunes en minúsculas.
 */
const formatSpanishTitle = (text: string) => {
  if (!text) return '';
  const lowercaseWords = ['de', 'del', 'y', 'la', 'las', 'el', 'los', 'en', 'para', 'con', 'a', 'o', 'u', 'e', 'al'];
  const words = text.trim().toLowerCase().split(/\s+/);
  
  return words.map((word, index) => {
    if (index > 0 && lowercaseWords.includes(word)) {
      return word;
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
};

const Sidebar: React.FC<SidebarProps> = ({ 
  viewState, 
  setViewState, 
  selectedCategoryNorm, 
  onCategoryToggle,
  groupedData,
  onMarkerSelect,
  selectedMarker,
  onRefresh,
  isRefreshing,
  lastUpdated,
  searchQuery,
  setSearchQuery
}) => {
  
  const sortedCategories = Object.keys(groupedData).sort();

  return (
    <aside className="w-[340px] bg-[#F2F1E8] rounded-[32px] flex flex-col h-full relative z-20 overflow-hidden border-none shadow-none text-gray-800">
      {/* Branding Header - Logotipos Grandes */}
      <div className="pt-10 px-8 pb-7 flex items-center gap-4">
        <img 
          src="https://rawcdn.githack.com/memolugo/DashboardATD/99fa30facd8b10adcd1bf684a1dbf5088248c303/Logomor.svg" 
          alt="Morelos" className="h-11 w-auto opacity-95"
        />
        <img 
          src="https://rawcdn.githack.com/memolugo/DashboardATD/99fa30facd8b10adcd1bf684a1dbf5088248c303/Logoatd.svg" 
          alt="Agencia Digital" className="h-11 w-auto opacity-95"
        />
      </div>

      {/* Vista de Detalle (Submenú) */}
      {viewState === 'detail' && selectedMarker ? (
        <div className="flex-1 overflow-y-auto px-8 custom-scrollbar pb-8 animate-in fade-in slide-in-from-right-4 duration-300">
          {/* Botón Volver Circular */}
          <button 
            onClick={() => setViewState('expanded')}
            className="w-10 h-10 bg-[#8c3154] text-white rounded-full flex items-center justify-center mb-6 shadow-md hover:scale-105 active:scale-95 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Imagen de Cabecera - Corporativa / Institucional */}
          <img 
            src={selectedMarker.image || 'https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=2070&auto=format&fit=crop'} 
            className="w-full h-44 object-cover rounded-[12px] shadow-sm mb-6" 
            alt={selectedMarker.dependencia_entidad_adscrita}
          />

          {/* Título de la Dependencia (Tamaño ajustado según imagen Figma) */}
          <div className="flex justify-between items-start gap-4 mb-8">
            <h2 className="font-bold text-[19px] text-[#2E3B2B] leading-tight flex-1">
              {formatSpanishTitle(selectedMarker.dependencia_entidad_adscrita)}
            </h2>
            {/* Se eliminó el distintivo de categoría por solicitud */}
          </div>
          
          {/* Información Detallada con tipografía de 300 (Light) */}
          <div className="space-y-8">
            {/* Ubicación */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-[#2E3B2B]">
                <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><circle cx="12" cy="11" r="3" /></svg>
                <span className="detail-label">Ubicación</span>
              </div>
              <p className="detail-body pl-7">
                {selectedMarker.ubicacion_1}
              </p>
            </div>

            {/* Horario */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-[#2E3B2B]">
                <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="detail-label">Horario</span>
              </div>
              <p className="detail-body pl-7">
                {selectedMarker.horario || 'Abierto 24 hrs'}
              </p>
            </div>

            {/* Teléfono */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-[#2E3B2B]">
                <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span className="detail-label">Teléfono</span>
              </div>
              <a href={`tel:${selectedMarker.numero}`} className="detail-body font-bold underline pl-7 hover:text-[#8c3154] transition-colors">
                {selectedMarker.numero || '777 362 1170'}
              </a>
            </div>
          </div>

          {/* Botón de Acción Principal */}
          <div className="mt-12 flex justify-center">
            <button className="bg-[#8c3154] text-white text-[13px] font-bold py-3 px-10 rounded-full hover:bg-[#6b2540] shadow-lg transition-all active:scale-95">
              Contactar institución
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Buscador */}
          <div className="px-8 mb-5">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Buscar oficinas o servicios..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/70 border border-transparent focus:border-gray-300 rounded-[16px] py-2.5 pl-9 pr-4 text-[11px] outline-none transition-all shadow-sm"
              />
              <svg className="w-3.5 h-3.5 absolute left-3.5 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Lista de Categorías y Submenús con Fuente Pequeña */}
          <div className="flex-1 overflow-y-auto px-6 py-2 space-y-1.5 custom-scrollbar">
            {sortedCategories.map((normKey) => {
              const group = groupedData[normKey];
              const isExpanded = selectedCategoryNorm === normKey;
              const isSalud = group.originalName.toLowerCase().includes('salud');
              const Icon = isSalud ? HealthIcon : GenericCategoryIcon;
              
              return (
                <div key={normKey} className="flex flex-col">
                  <button 
                    onClick={() => onCategoryToggle(normKey)}
                    className={`w-full flex items-center py-2.5 px-4 rounded-[18px] transition-all duration-300 group gap-3 ${
                      isExpanded ? 'bg-white shadow-sm mb-2' : 'hover:bg-black/5'
                    }`}
                  >
                    <div className="flex-shrink-0 w-6 flex justify-start items-center">
                      <div className={`${isExpanded ? 'text-[#333]' : 'text-gray-400'} scale-[0.75]`}>
                        <Icon />
                      </div>
                    </div>
                    <div className="flex-grow text-left">
                      <span className="sidebar-category-text leading-tight">
                        {formatSpanishTitle(group.originalName)}
                      </span>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-2">
                      <span className="text-[9px] font-bold text-white bg-[#6D745E] rounded-[6px] px-2 py-0.5 min-w-[28px] text-center">
                        {group.items.length}
                      </span>
                      <svg 
                        className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-0' : '-rotate-90 opacity-40'}`} 
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="pl-6 pr-2 py-0.5 space-y-0.5 animate-in slide-in-from-top-2 duration-300 border-l-[1.5px] border-gray-300/60 ml-4">
                      {group.items.map((marker) => {
                        const isSelected = selectedMarker?.id === marker.id;
                        return (
                          <button 
                            key={marker.id}
                            onClick={() => onMarkerSelect(marker)}
                            className={`w-full text-left py-1.5 px-5 rounded-[12px] transition-all duration-200 sidebar-item-text ${
                              isSelected 
                                ? 'bg-[#E0E5C1] sidebar-item-active shadow-sm' 
                                : 'hover:bg-black/5'
                            }`}
                          >
                            {formatSpanishTitle(marker.dependencia_entidad_adscrita)}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Navegación Inferior */}
          <div className="p-6 flex flex-col gap-4">
            <button className="flex items-center gap-2 text-gray-500 hover:text-[#8c3154] transition-colors w-fit scale-[0.8] origin-left">
              <SettingsIcon />
            </button>
            <button className="flex items-center gap-2 text-gray-500 hover:text-[#8c3154] transition-colors w-fit scale-[0.8] origin-left">
              <ProfileIcon />
            </button>
          </div>
        </>
      )}
    </aside>
  );
};

export default Sidebar;