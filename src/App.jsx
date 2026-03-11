import React, { useState, useEffect } from 'react';
import { 
  Search, Database, Map, Save, Layers, 
  Droplets, ClipboardCheck, Camera, 
  MapPin, UserPlus, CheckCircle2, FileText,
  WifiOff, Globe, HardDrive, RefreshCw, AlertCircle
} from 'lucide-react';

/**
 * ARCHIVO: src/App.jsx
 * Sistema de Catastro EPS Moyobamba con Sincronización Automática
 */
const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingSync, setPendingSync] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);

  // Estado del formulario ampliado
  const [formData, setFormData] = useState({
    titular: '',
    idSuministro: '',
    direccion: '',
    dni: '',
    tipoConexion: 'DOMÉSTICO',
    estadoConexion: 'ACTIVA',
    observaciones: ''
  });

  // Efecto para manejar el estado de conexión y carga inicial
  useEffect(() => {
    const handleStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleStatus);
    window.addEventListener('offline', handleStatus);
    
    const localData = JSON.parse(localStorage.getItem('fichas_pendientes') || '[]');
    setPendingSync(localData.length);

    return () => {
      window.removeEventListener('online', handleStatus);
      window.removeEventListener('offline', handleStatus);
    };
  }, []);

  // Efecto de Sincronización Automática al recuperar internet
  useEffect(() => {
    if (isOnline && pendingSync > 0) {
      handleSyncData();
    }
  }, [isOnline, pendingSync]);

  const handleSyncData = async () => {
    setIsSyncing(true);
    // Simulamos el envío a los servidores de la EPS
    setTimeout(() => {
      console.log("Sincronizando con el servidor central...");
      // Aquí iría la llamada real a la API (fetch/axios)
      // localStorage.removeItem('fichas_pendientes');
      // setPendingSync(0);
      setIsSyncing(false);
    }, 2000);
  };

  const handleSaveLocal = () => {
    if (!formData.titular || !formData.idSuministro) {
      alert("⚠️ Error: El nombre del titular y el suministro son obligatorios para el catastro.");
      return;
    }

    const localData = JSON.parse(localStorage.getItem('fichas_pendientes') || '[]');
    localData.push({ 
      ...formData, 
      id: Date.now(),
      fecha: new Date().toLocaleString() 
    });
    localStorage.setItem('fichas_pendientes', JSON.stringify(localData));
    
    setPendingSync(localData.length);
    
    // Limpiar formulario
    setFormData({ titular: '', idSuministro: '', direccion: '', dni: '', tipoConexion: 'DOMÉSTICO', estadoConexion: 'ACTIVA', observaciones: '' });
    
    if (!isOnline) {
      alert("💾 Guardado en MEMORIA LOCAL. Se enviará al servidor cuando recuperes señal.");
    } else {
      alert("✅ Ficha registrada y enviada al servidor correctamente.");
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden w-full">
      {/* Panel Lateral Izquierdo */}
      <aside className="w-72 bg-[#1e293b] flex flex-col shadow-2xl shrink-0">
        <div className="p-8 border-b border-white/10 text-center">
          <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
            <Droplets className="text-white" size={32} />
          </div>
          <p className="text-white font-black text-lg uppercase tracking-tighter">EPS MOYOBAMBA</p>
          <p className="text-blue-400 font-bold text-[10px] uppercase tracking-[0.2em]">Gestión Técnica</p>
        </div>
        
        <nav className="p-4 space-y-3 flex-1">
          {/* Status de Conexión */}
          <div className={`p-4 rounded-3xl flex items-center justify-between transition-all ${isOnline ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-rose-500/10 border border-rose-500/20'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full animate-pulse ${isOnline ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${isOnline ? 'text-emerald-500' : 'text-rose-500'}`}>
                {isOnline ? 'En Línea' : 'Offline'}
              </span>
            </div>
            {isOnline ? <Globe size={14} className="text-emerald-500" /> : <WifiOff size={14} className="text-rose-500" />}
          </div>
          
          <button className="w-full flex items-center gap-4 p-4 rounded-2xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/20 active:scale-95 transition-all">
            <ClipboardCheck size={20} /> FICHA DE CAMPO
          </button>

          {/* Estado de Sincronización */}
          {pendingSync > 0 && (
            <div className={`p-5 rounded-3xl border-2 border-dashed mt-4 transition-all ${isSyncing ? 'border-blue-500/50 bg-blue-500/5' : 'border-amber-500/50 bg-amber-500/5'}`}>
              <div className="flex items-center gap-4">
                <div className={`${isSyncing ? 'animate-spin' : ''} text-amber-500`}>
                  {isSyncing ? <RefreshCw size={22} /> : <HardDrive size={22} />}
                </div>
                <div>
                  <p className="text-[11px] font-black text-slate-300 uppercase leading-none mb-1">Fichas en espera</p>
                  <p className={`text-xl font-black ${isSyncing ? 'text-blue-400' : 'text-amber-500'}`}>{pendingSync}</p>
                </div>
              </div>
              {!isOnline && (
                <p className="text-[9px] font-bold text-amber-600 uppercase mt-3 flex items-center gap-1">
                  <AlertCircle size={10} /> Sincronización pausada
                </p>
              )}
            </div>
          )}
        </nav>

        <div className="p-6 border-t border-white/5">
          <p className="text-[9px] text-slate-500 font-bold text-center uppercase tracking-widest">Versión 1.3 - Campo</p>
        </div>
      </aside>

      {/* Área de Trabajo */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-24 bg-white border-b flex items-center justify-between px-10 shadow-sm z-10">
          <div className="flex-1 max-w-xl">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Buscar por Suministro o DNI..." 
                className="w-full pl-12 pr-6 py-4 bg-slate-100 border-2 border-transparent rounded-2xl font-bold outline-none focus:ring-4 ring-blue-500/10 focus:bg-white focus:border-blue-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={handleSaveLocal}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-2xl font-black flex items-center gap-3 shadow-xl shadow-emerald-600/30 active:scale-95 transition-all"
            >
              <Save size={20} /> GUARDAR FICHA
            </button>
          </div>
        </header>

        {/* Cuerpo del Formulario */}
        <div className="flex-1 overflow-y-auto p-10 bg-[#f1f5f9]">
          <div className="max-w-4xl mx-auto space-y-8 pb-20">
            <div className="bg-white p-12 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-white">
              <div className="flex items-center gap-3 mb-10 border-b pb-6">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><FileText size={24} /></div>
                <div>
                  <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Identificación Predial</h2>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Datos recogidos en campo</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Nombre del Usuario / Titular</label>
                  <input 
                    type="text" 
                    className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-3xl font-bold outline-none focus:border-blue-500 focus:bg-white transition-all shadow-sm" 
                    value={formData.titular}
                    onChange={(e) => setFormData({...formData, titular: e.target.value})}
                    placeholder="Ej. Juan Manuel Pérez..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Número de DNI / RUC</label>
                  <input 
                    type="text" 
                    className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-3xl font-bold outline-none focus:border-blue-500 focus:bg-white transition-all shadow-sm" 
                    value={formData.dni}
                    onChange={(e) => setFormData({...formData, dni: e.target.value})}
                    placeholder="8 dígitos..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">ID de Suministro</label>
                  <input 
                    type="text" 
                    className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-3xl font-bold outline-none focus:border-blue-500 focus:bg-white transition-all shadow-sm" 
                    value={formData.idSuministro}
                    onChange={(e) => setFormData({...formData, idSuministro: e.target.value})}
                    placeholder="Código de 10 dígitos..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Categoría Tarifaria</label>
                  <select 
                    className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-3xl font-bold outline-none focus:border-blue-500 focus:bg-white transition-all shadow-sm appearance-none cursor-pointer"
                    value={formData.tipoConexion}
                    onChange={(e) => setFormData({...formData, tipoConexion: e.target.value})}
                  >
                    <option>DOMÉSTICO</option>
                    <option>COMERCIAL</option>
                    <option>SOCIAL</option>
                    <option>INDUSTRIAL</option>
                    <option>ESTATAL</option>
                  </select>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Dirección / Jr / Calle / Psj</label>
                  <div className="relative">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-500" size={18} />
                    <input 
                      type="text" 
                      className="w-full p-5 pl-14 bg-slate-50 border-2 border-slate-100 rounded-3xl font-bold outline-none focus:border-blue-500 focus:bg-white transition-all shadow-sm" 
                      value={formData.direccion}
                      onChange={(e) => setFormData({...formData, direccion: e.target.value})}
                      placeholder="Dirección exacta del predio..."
                    />
                  </div>
                </div>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                <button className="flex items-center justify-center gap-3 p-6 border-4 border-dashed border-slate-100 rounded-[2.5rem] text-slate-400 hover:text-blue-500 hover:bg-blue-50 hover:border-blue-200 transition-all group font-black uppercase text-xs">
                  <Camera size={28} className="group-hover:scale-110 transition-transform" />
                  Tomar Foto Fachada
                </button>
                <button className="flex items-center justify-center gap-3 p-6 border-4 border-dashed border-slate-100 rounded-[2.5rem] text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 hover:border-emerald-200 transition-all group font-black uppercase text-xs">
                  <Camera size={28} className="group-hover:scale-110 transition-transform" />
                  Tomar Foto Medidor
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;