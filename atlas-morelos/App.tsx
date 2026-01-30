
import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import MapView from './components/MapView';
import FeedbackSection from './components/FeedbackSection';
import Footer from './components/Footer';
import { ViewState } from './types';
import { useDynamicData } from './hooks/useDynamicData';
import { SheetMarker, normalizeText } from './services/dataService';

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1riFNUkoF-SQj8EBTheuJ1CvJdB6SDVScpdiPz3A5RsU/export?format=csv';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>('menu');
  const [selectedCategoryNorm, setSelectedCategoryNorm] = useState<string | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<SheetMarker | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: markers, isLoading, refetch, lastUpdated } = useDynamicData(SHEET_URL);

  // Filtrado por búsqueda y agrupación
  const groupedData = useMemo(() => {
    if (!markers) return {};
    
    const searchNorm = normalizeText(searchQuery);
    
    return markers.reduce((acc: Record<string, { originalName: string, items: SheetMarker[] }>, marker) => {
      const matchSearch = !searchQuery || 
        marker.dependencia_entidad_adscrita_norm.includes(searchNorm) || 
        marker.secretaria_organo_norm.includes(searchNorm);

      if (matchSearch) {
        const key = marker.secretaria_organo_norm;
        if (!acc[key]) {
          acc[key] = { originalName: marker.secretaria_organo, items: [] };
        }
        acc[key].items.push(marker);
      }
      return acc;
    }, {});
  }, [markers, searchQuery]);

  const mapMarkers = useMemo(() => {
    if (!markers) return [];
    if (!selectedCategoryNorm) return markers;
    return markers.filter(m => m.secretaria_organo_norm === selectedCategoryNorm);
  }, [markers, selectedCategoryNorm]);

  const handleMarkerSelect = (marker: SheetMarker) => {
    setSelectedMarker(marker);
    setViewState('detail');
  };

  const handleCategoryToggle = (normName: string) => {
    if (selectedCategoryNorm === normName) {
      setSelectedCategoryNorm(null);
      setViewState('menu');
      setSelectedMarker(null);
    } else {
      setSelectedCategoryNorm(normName);
      setViewState('expanded');
      setSelectedMarker(null);
    }
  };

  return (
    <div className="bg-[#f0efeb] min-h-screen flex justify-center">
      <div className="w-full max-w-[1440px] flex flex-col bg-[#f7f6f4] shadow-2xl overflow-x-hidden">
        
        <div className="flex h-[800px] p-6 pb-0 gap-6">
          <div className="flex-shrink-0 h-full">
            <Sidebar 
              viewState={viewState} 
              setViewState={setViewState}
              selectedCategoryNorm={selectedCategoryNorm}
              onCategoryToggle={handleCategoryToggle}
              groupedData={groupedData}
              onMarkerSelect={handleMarkerSelect}
              selectedMarker={selectedMarker}
              onRefresh={refetch}
              isRefreshing={isLoading}
              lastUpdated={lastUpdated}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>

          <main className="flex-1 relative bg-white rounded-[40px] overflow-hidden shadow-md border border-[#e5e4e0]">
            <MapView 
              markers={mapMarkers} 
              selectedMarkerId={selectedMarker?.id || null}
              onMarkerClick={handleMarkerSelect}
              isLoading={isLoading} 
            />
          </main>
        </div>

        <div className="h-6 w-full bg-[#f7f6f4]" />

        <div className="flex flex-col">
          <FeedbackSection />
          <div className="border-pattern" />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
