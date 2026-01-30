
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2E3B2B] text-white pt-12 pb-16 px-12">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-10">
        {/* Institutional Logo */}
        <div className="mb-4">
          <img 
            src="https://rawcdn.githack.com/memolugo/DashboardATD/f1d745b827c183a065d1322487b9ba6875fbe271/morelosblanco.svg" 
            alt="Morelos Gobierno del Estado" 
            className="h-16 w-auto img-sharp"
          />
        </div>

        {/* Section 1: Servicio de atención ciudadana */}
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-bold tracking-tight">Servicio de atención ciudadana</h3>
          <div className="h-[1px] w-full bg-white/20" />
          <div className="text-[12px] flex flex-col gap-3 opacity-90">
            <p>Horario: lunes a viernes de 9:00 AM a 2:00 PM</p>
            <p className="underline cursor-pointer hover:opacity-80 transition-opacity">(777) 329 2200</p>
            <p className="underline cursor-pointer hover:opacity-80 transition-opacity">atencionciudadana@morelos.gob.mx</p>
            <p className="underline cursor-pointer hover:opacity-80 transition-opacity">Buscador de oficinas</p>
          </div>
        </div>

        {/* Section 2: Ubicación */}
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-bold tracking-tight">Ubicación</h3>
          <div className="h-[1px] w-full bg-white/20" />
          <div className="text-[12px] flex flex-col gap-1 opacity-90 leading-relaxed">
            <p>Palacio de Gobierno 2do. Piso</p>
            <p>Plaza de Armas S/N, Colonia Centro, Cuernavaca, Morelos.</p>
            <p>C.P. 62000</p>
          </div>
        </div>

        {/* Section 3: Nuestras redes */}
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-bold tracking-tight">Nuestras redes</h3>
          <div className="h-[1px] w-full bg-white/20" />
          <div className="flex gap-6 pt-2">
            <a href="https://www.facebook.com/GobiernoEstadodeMorelos/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
            </a>
            <a href="https://www.instagram.com/gobiernomorelos" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://x.com/margarita_gs" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://www.youtube.com/@MargaritaGonzalezSaravia" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z"/></svg>
            </a>
          </div>
        </div>

        {/* Section 4: Enlaces de interés */}
        <div className="flex flex-col gap-4 mt-4">
          <h3 className="text-base font-bold tracking-tight">Enlaces de interes</h3>
          <div className="h-[1px] w-full bg-white/20" />
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-[11px] opacity-90 pt-2">
            <a href="https://www.morelos.gob.mx/convocatorias-secretarias/nuevo-codigo-de-etica" target="_blank" rel="noopener noreferrer" className="hover:underline transition-all">Código de Ética</a>
            <a href="https://www.morelos.gob.mx/tramites-y-servicios" target="_blank" rel="noopener noreferrer" className="hover:underline transition-all">Portal de trámites y atención ciudadana</a>
            <a href="https://www.morelos.gob.mx/aviso-de-privacidad" target="_blank" rel="noopener noreferrer" className="hover:underline transition-all">Aviso de privacidad</a>
            <a href="https://www.morelos.gob.mx/noticias" target="_blank" rel="noopener noreferrer" className="hover:underline transition-all">Prensa</a>
            <a href="https://www.morelos.gob.mx/inicio/secretaria-de-desarrollo-economico-y-del-trabajo" target="_blank" rel="noopener noreferrer" className="hover:underline transition-all">Economía</a>
            <a href="https://www.morelos.gob.mx/inicio/secretaria-de-bienestar" target="_blank" rel="noopener noreferrer" className="hover:underline transition-all">Bienestar</a>
            <a href="https://www.morelos.gob.mx/" target="_blank" rel="noopener noreferrer" className="hover:underline transition-all">Gobierno</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
