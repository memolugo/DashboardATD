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
  searchQuery,
  setSearchQuery
}) => {
  
  const sortedCategories = Object.keys(groupedData).sort();

  return (
    <aside className="w-[340px] bg-[#F2F1E8] rounded-[32px] flex flex-col h-full relative z-20 overflow-hidden shadow-sm text-gray-800">
      {/* Branding Header */}
      <div className="pt-10 px-8 pb-7 flex items-center gap-4">
        <img 
          src="https://rawcdn.githack.com/memolugo/DashboardATD/99fa30facd8b10adcd1bf684a1dbf5088248c303/Logomor.svg" 
          alt="Morelos" className="h-10 w-auto"
        />
        <img 
          src="https://rawcdn.githack.com/memolugo/DashboardATD/99fa30facd8b10adcd1bf684a1dbf5088248c303/Logoatd.svg" 
          alt="Agencia Digital" className="h-10 w-auto"
        />
      </div>

      {/* Vista de Detalle */}
      {viewState === 'detail' && selectedMarker ? (
        <div className="flex-1 overflow-y-auto px-8 custom-scrollbar pb-8 animate-in fade-in slide-in-from-right-4 duration-400">
          <button 
            onClick={() => setViewState('expanded')}
            className="w-10 h-10 bg-[#8c3154] text-white rounded-full flex items-center justify-center mb-6 shadow-md hover:scale-105 active:scale-95 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-6 border border-gray-100">
            <img 
              src={selectedMarker.image || 'https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=2070&auto=format&fit=crop'} 
              className="w-full h-40 object-cover" 
              alt={selectedMarker.dependencia_entidad_adscrita}
            />
          </div>

          <h2 className="font-bold text-[18px] text-[#2E3B2B] leading-snug mb-8">
            {formatSpanishTitle(selectedMarker.dependencia_entidad_adscrita)}
          </h2>
          
          <div className="space-y-7">
            <div className="flex flex-col gap-1">
              <span className="detail-label">Ubicación</span>
              <p className="detail-body">{selectedMarker.ubicacion_1}</p>
            </div>

            <div className="flex flex-col gap-1">
              <span className="detail-label">Horario de atención</span>
              <p className="detail-body">{selectedMarker.horario || 'Lunes a Viernes 08:00 - 16:00'}</p>
            </div>

            <div className="flex flex-col gap-1">
              <span className="detail-label">Teléfono oficial</span>
              <a href={`tel:${selectedMarker.numero}`} className="detail-body font-bold underline decoration-[#8c3154] hover:text-[#8c3154] transition-colors">
                {selectedMarker.numero || '777 362 1170'}
              </a>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <button className="bg-[#8c3154] text-white text-[12px] font-bold py-3.5 px-8 rounded-full hover:bg-[#6b2540] shadow-lg transition-all active:scale-95">
              Solicitar información
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
                placeholder="Buscar oficinas o trámites..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/80 border border-transparent focus:border-gray-300 rounded-2xl py-2.5 pl-10 pr-4 text-[12px] outline-none transition-all shadow-sm"
              />
              <svg className="w-4 h-4 absolute left-3.5 top-3 text-gray-400 group-focus-within:text-[#8c3154] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Categorías */}
          <div className="flex-1 overflow-y-auto px-6 py-2 space-y-1 custom-scrollbar">
            {sortedCategories.map((normKey) => {
              const group = groupedData[normKey];
              const isExpanded = selectedCategoryNorm === normKey;
              const isSalud = group.originalName.toLowerCase().includes('salud');
              const Icon = isSalud ? HealthIcon : GenericCategoryIcon;
              
              return (
                <div key={normKey} className="flex flex-col">
                  <button 
                    onClick={() => onCategoryToggle(normKey)}
                    className={`w-full flex items-center py-2.5 px-4 rounded-2xl transition-all duration-300 group gap-3 ${
                      isExpanded ? 'bg-white shadow-sm mb-1' : 'hover:bg-black/5'
                    }`}
                  >
                    <div className="flex-shrink-0 w-5 flex justify-center text-gray-400 group-hover:text-[#8c3154]">
                      <Icon />
                    </div>
                    <div className="flex-grow text-left">
                      <span className="sidebar-category-text">
                        {formatSpanishTitle(group.originalName)}
                      </span>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-2">
                      <span className="text-[9px] font-bold text-white bg-[#6D745E] rounded-md px-1.5 py-0.5 min-w-[24px] text-center">
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
                    <div className="pl-6 pr-2 py-1 space-y-0.5 animate-in slide-in-from-top-2 duration-300 border-l border-gray-200 ml-4 mb-2">
                      {group.items.map((marker) => {
                        const isSelected = selectedMarker?.id === marker.id;
                        return (
                          <button 
                            key={marker.id}
                            onClick={() => onMarkerSelect(marker)}
                            className={`w-full text-left py-2 px-4 rounded-xl transition-all duration-200 sidebar-item-text ${
                              isSelected 
                                ? 'bg-[#E0E5C1] sidebar-item-active' 
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
          <div className="p-6 pt-2 flex items-center gap-4 border-t border-black/5">
            <button className="p-2 text-gray-500 hover:text-[#8c3154] transition-colors rounded-lg hover:bg-white">
              <SettingsIcon />
            </button>
            <button className="p-2 text-gray-500 hover:text-[#8c3154] transition-colors rounded-lg hover:bg-white">
              <ProfileIcon />
            </button>
          </div>
        </>
      )}
    </aside>
  );
};

export default Sidebar;