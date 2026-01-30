
import React from 'react';

const FeedbackSection: React.FC = () => {
  return (
    <section className="w-full bg-[#EBEADE] px-12 py-3.5 flex items-center justify-between border-t border-[#d6d3ce]">
      <div className="flex items-center gap-5">
        <span className="text-[14px] font-bold text-gray-700 uppercase tracking-tight">
          ¿Te ha resultado útil esta página?
        </span>
        <div className="flex gap-1.5">
          <button className="px-4 py-1.5 border border-gray-400 rounded-lg hover:bg-white transition-all text-[12px] font-bold text-gray-600 shadow-sm active:scale-95">
            SÍ
          </button>
          <button className="px-4 py-1.5 border border-gray-400 rounded-lg hover:bg-white transition-all text-[12px] font-bold text-gray-600 shadow-sm active:scale-95">
            NO
          </button>
        </div>
      </div>
      
      <button className="text-[11px] font-black text-gray-500 border-b border-gray-400 hover:text-[#8c3154] hover:border-[#8c3154] transition-all uppercase tracking-widest">
        Reportar un problema
      </button>
    </section>
  );
};

export default FeedbackSection;
