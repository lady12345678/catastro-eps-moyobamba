import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { 
  Search, Database, Map, Save, Layers, 
  Droplets, ClipboardCheck, Camera, 
  MapPin, UserPlus, CheckCircle2, FileText,
  Menu, X, ChevronRight, Activity, ZapOff,
  AlertTriangle, Eye, ShieldAlert, Zap, Phone, Mail, Hash
} from 'lucide-react'

/**
 * ARCHIVO: main.jsx
 * Versión: 1.2 - Formulario Completo (Todas las pestañas funcionales)
 */

const App = () => {
  const [activeTab, setActiveTab] = useState('1. DATOS PREDIO');
  const [isSearching, setIsSearching] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);

  const [formData, setFormData] = useState({
    // 1. Datos Predio
    titular: '',
    dni: '',
    telefono: '',
    correo: '',
    idSuministro: '',
    suministroLuz: '',
    codigoCatastral: '',
    direccion: '',
    distrito: 'MOYOBAMBA',
    sector: '01',
    manzana: '',
    lote: '',
    tipoConstruccion: 'CASA/MÓDULO',
    habitabilidad: 'Habitado permanentemente',
    numPersonas: '1',
    unidadesUso: '1',
    // 2. Agua
    categoriaTarifaria: 'DOMÉSTICO',
    situacionConexion: 'Suministro Formal',
    tipoServicio: 'AGUA Y DESAGÜE',
    estadoConexion: 'ACTIVA',
    materialConexion: 'PVC',
    diametroConexion: '1/2"',
    presionAgua: 'NORMAL',
    // 3. Medidor
    marcaMedidor: 'ZENNER',
    nroMedidor: '',
    estadoMedidor: 'BUENA',
    lectura: '',
    diametroMedidor: '15mm (1/2")',
    // 4. Desagüe
    estadoDesague: 'OPERATIVO',
    materialCajaDesague: 'CONCRETO',
    // Otros
    observaciones: '',
    esClandestino: false,
    reconexionArbitraria: false
  });

  const handleSearch = () => {
    if (!searchTerm) return;
    setIsSearching(true);
    setSidebarOpen(false);
    
    setTimeout(() => {
      setDataLoaded(true);
      setFormData(prev => ({
        ...prev, 
        titular: 'JUAN PÉREZ GARCÍA', 
        idSuministro: searchTerm,
        dni: '45667788',
        telefono: '942112233',
        correo: 'jperez@ejemplo.com',
        suministroLuz: '8823441',
        direccion: 'Jr. San Roque 450 - Moyobamba',
        codigoCatastral: '01-045-012',
        sector: '02',
        manzana: 'Mz. D',
        lote: 'Lt. 15',
        nroMedidor: 'Z24-998811',
        lectura: '1450'
      }));
      setIsSearching(false);
    }, 1000);
  };

  const handleSave = () => {
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  const InputSelect = ({ label, name, options, color = "blue" }) => (
    <div className="space-y-1.5 mb-5">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">{label}</label>
      <select 
        value={formData[name]}
        onChange={(e) => setFormData({...formData, [name]: e.target.value})}
        className={`w-full p-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold outline-none focus:border-${color}-500 focus:bg-white text-sm transition-all appearance-none cursor-pointer`}
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );

  const InputText = ({ label, name, type = "text", placeholder = "", icon: Icon }) => (
    <div className="space-y-1.5 mb-5">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />}
        <input 
          type={type}
          value={formData[name]}
          onChange={(e) => setFormData({...formData, [name]: e.target.value})}
          placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-12' : 'px-4'} p-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold outline-none focus:border-blue-500 focus:bg-white text-sm transition-all`}
        />
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#f1f5f9] font-sans text-slate-900 overflow-hidden w-full relative">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in { animation: slideIn 0.3s ease-out forwards; }
      `}</style>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#0f172a] shadow-2xl transition-transform duration-300 ease-in-out transform
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0 lg:flex lg:flex-col lg:shrink-0
      `}>
        <div className="p-8 border-b border-white/5 flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-600 rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-blue-600/30 mb-4">
            <Droplets className="text-white" size={32} />
          </div>
          <div className="text-center">
            <p className="text-white font-black text-lg uppercase tracking-tighter leading-none">EPS MOYOBAMBA</p>
            <p className="text-blue-400 font-bold text-[9px] uppercase tracking-[0.2em] mt-2">Catastro Técnico</p>
          </div>
        </div>
        
        <nav className="p-5 space-y-2 flex-1 overflow-y-auto no-scrollbar">
          <button className="w-full flex items-center gap-4 p-4 rounded-2xl bg-blue-600 text-white font-black shadow-lg shadow-blue-600/20 transition-all active:scale-95 text-xs uppercase tracking-widest">
            <ClipboardCheck size={20} /> Ficha de Campo
          </button>
          <button className="w-full flex items-center gap-4 p-4 rounded-2xl text-slate-400 hover:bg-white/5 font-bold transition-colors text-xs uppercase tracking-widest">
            <Map size={20} /> Visor GIS
          </button>
          <button className="w-full flex items-center gap-4 p-4 rounded-2xl text-slate-400 hover:bg-white/5 font-bold transition-colors text-xs uppercase tracking-widest">
            <Camera size={20} /> Galería de Fotos
          </button>
        </nav>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />}

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden w-full">
        <header className="h-24 bg-white border-b border-slate-200 flex flex-col lg:flex-row items-center justify-between px-6 lg:px-10 py-4 lg:py-0 gap-4 z-30 shadow-sm shrink-0">
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <button onClick={() => setSidebarOpen(true)} className="p-3 bg-slate-100 rounded-xl text-slate-600 lg:hidden active:bg-slate-200">
              <Menu size={24} />
            </button>
            <div className="relative flex-1 lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="N° de Suministro (Ej: 104523)..." 
                className="w-full pl-12 pr-4 py-4 bg-slate-100 border-2 border-transparent rounded-2xl font-bold outline-none focus:ring-4 ring-blue-500/10 focus:border-blue-500 focus:bg-white text-sm transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
          </div>
          
          <div className="flex gap-3 w-full lg:w-auto">
            <button onClick={handleSearch} disabled={isSearching} className="flex-1 lg:flex-none bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-slate-900/20 active:scale-95 transition-all flex items-center justify-center gap-2">
              {isSearching ? <Activity className="animate-spin" size={16} /> : <Search size={16} />} Buscar
            </button>
            <button onClick={handleSave} className="flex-1 lg:flex-none bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/20 active:scale-95 transition-all">
              <Save size={18} /> Guardar
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-10 no-scrollbar bg-[#f8fafc]">
          {dataLoaded ? (
            <div className="max-w-6xl mx-auto space-y-6 animate-in">
              
              {/* Tarjeta de Identificación */}
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-blue-600 text-white px-8 py-2 font-black text-[10px] rounded-bl-3xl uppercase tracking-widest">
                  FICHA TÉCNICA 2024
                </div>
                <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center shrink-0 shadow-inner">
                  <UserPlus size={48} />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-black text-slate-800 uppercase leading-none tracking-tighter">{formData.titular}</h1>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                    <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-2">
                       <Database size={14}/> Suministro: {formData.idSuministro}
                    </div>
                    <div className="bg-amber-100 text-amber-700 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-2">
                       <Zap size={14}/> Luz: {formData.suministroLuz || 'PENDIENTE'}
                    </div>
                    <div className="bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider">DNI: {formData.dni}</div>
                  </div>
                </div>
              </div>

              {/* Navegación por Pestañas */}
              <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
                {['1. DATOS PREDIO', '2. USUARIO', '3. AGUA', '4. MEDIDOR', '5. DESAGÜE'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-8 py-5 rounded-[1.5rem] font-black text-[11px] whitespace-nowrap transition-all uppercase tracking-widest border-2 ${activeTab === tab ? 'bg-blue-600 border-blue-600 text-white shadow-2xl shadow-blue-200 scale-105 z-10' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="bg-white p-8 lg:p-12 rounded-[3rem] shadow-sm border border-slate-200 min-h-[500px]">
                {/* 1. DATOS PREDIO */}
                {activeTab === '1. DATOS PREDIO' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-in">
                    <div>
                      <h3 className="text-xs font-black text-blue-600 mb-8 flex items-center gap-3 uppercase tracking-[0.2em]">
                        <div className="w-3 h-3 bg-blue-600 rounded-full shadow-lg shadow-blue-600/40" /> Ubicación
                      </h3>
                      <InputText label="Dirección / Jr. / Av. / Calle" name="direccion" />
                      <div className="grid grid-cols-2 gap-4">
                        <InputSelect label="Sector" name="sector" options={['01', '02', '03', '04', '05']} />
                        <InputText label="Manzana" name="manzana" placeholder="Mz. X" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <InputText label="Lote" name="lote" placeholder="Lt. Y" />
                        <InputText label="Cód. Catastral" name="codigoCatastral" placeholder="00-000-000" />
                      </div>
                      <InputText label="Suministro Luz" name="suministroLuz" icon={Zap} />
                    </div>
                    <div>
                      <h3 className="text-xs font-black text-blue-600 mb-8 flex items-center gap-3 uppercase tracking-[0.2em]">
                        <div className="w-3 h-3 bg-blue-600 rounded-full shadow-lg shadow-blue-600/40" /> Detalles del Inmueble
                      </h3>
                      <InputSelect label="Tipo de Construcción" name="tipoConstruccion" options={['CASA/MÓDULO', 'EDIFICIO', 'TERRENO VACÍO', 'LOTE EN CONSTRUCCIÓN', 'PILETA PÚBLICA']} />
                      <InputSelect label="Habitabilidad" name="habitabilidad" options={['Habitado permanentemente', 'Deshabitado', 'Viven de vez en cuando', 'Solo Vigilante']} />
                      <div className="grid grid-cols-2 gap-4">
                        <InputText label="N° Personas" name="numPersonas" type="number" />
                        <InputText label="Unidades Uso" name="unidadesUso" type="number" />
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. USUARIO */}
                {activeTab === '2. USUARIO' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-in">
                    <div>
                      <h3 className="text-xs font-black text-blue-600 mb-8 flex items-center gap-3 uppercase tracking-[0.2em]">
                        <div className="w-3 h-3 bg-blue-600 rounded-full shadow-lg shadow-blue-600/40" /> Información del Titular
                      </h3>
                      <InputText label="Nombre Completo" name="titular" icon={UserPlus} />
                      <InputText label="DNI / RUC" name="dni" icon={Hash} />
                    </div>
                    <div>
                      <h3 className="text-xs font-black text-blue-600 mb-8 flex items-center gap-3 uppercase tracking-[0.2em]">
                        <div className="w-3 h-3 bg-blue-600 rounded-full shadow-lg shadow-blue-600/40" /> Datos de Contacto
                      </h3>
                      <InputText label="Teléfono / Celular" name="telefono" icon={Phone} />
                      <InputText label="Correo Electrónico" name="correo" icon={Mail} />
                    </div>
                  </div>
                )}

                {/* 3. AGUA */}
                {activeTab === '3. AGUA' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-in">
                    <div>
                      <h3 className="text-xs font-black text-blue-600 mb-8 flex items-center gap-3 uppercase tracking-[0.2em]">
                        <div className="w-3 h-3 bg-blue-600 rounded-full shadow-lg shadow-blue-600/40" /> Conexión de Agua
                      </h3>
                      <InputSelect label="Estado de Conexión" name="estadoConexion" options={['ACTIVA', 'CORTADA', 'SUPRIMIDA', 'POR INSTALAR']} />
                      <InputSelect label="Categoría Tarifaria" name="categoriaTarifaria" options={['DOMÉSTICO', 'COMERCIAL', 'ESTATAL', 'SOCIAL', 'INDUSTRIAL']} />
                      <InputSelect label="Situación" name="situacionConexion" options={['Suministro Formal', 'Clandestino Directo', 'Reconexión Arbitraria']} />
                    </div>
                    <div>
                      <h3 className="text-xs font-black text-blue-600 mb-8 flex items-center gap-3 uppercase tracking-[0.2em]">
                        <div className="w-3 h-3 bg-blue-600 rounded-full shadow-lg shadow-blue-600/40" /> Características Técnicas
                      </h3>
                      <InputSelect label="Material de Tubería" name="materialConexion" options={['PVC', 'HD', 'FF', 'GALVANIZADO']} />
                      <InputSelect label="Diámetro" name="diametroConexion" options={['1/2"', '3/4"', '1"', '1 1/2"']} />
                      <InputSelect label="Presión de Agua" name="presionAgua" options={['NORMAL', 'BAJA', 'MUY ALTA', 'SIN PRESIÓN']} />
                    </div>
                  </div>
                )}

                {/* 4. MEDIDOR */}
                {activeTab === '4. MEDIDOR' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-in">
                    <div>
                      <h3 className="text-xs font-black text-blue-600 mb-8 flex items-center gap-3 uppercase tracking-[0.2em]">
                        <div className="w-3 h-3 bg-blue-600 rounded-full shadow-lg shadow-blue-600/40" /> Datos del Equipo
                      </h3>
                      <InputSelect label="Marca Medidor" name="marcaMedidor" options={['ZENNER', 'INCA', 'ELSTER', 'METER', 'OTROS']} />
                      <InputText label="Nro de Serie" name="nroMedidor" placeholder="Z24-0000" icon={Hash} />
                      <InputSelect label="Diámetro Medidor" name="diametroMedidor" options={['15mm (1/2")', '20mm (3/4")', '25mm (1")']} />
                    </div>
                    <div>
                      <h3 className="text-xs font-black text-blue-600 mb-8 flex items-center gap-3 uppercase tracking-[0.2em]">
                        <div className="w-3 h-3 bg-blue-600 rounded-full shadow-lg shadow-blue-600/40" /> Estado y Lectura
                      </h3>
                      <InputText label="Lectura Actual (m3)" name="lectura" type="number" icon={Activity} />
                      <InputSelect label="Estado Físico" name="estadoMedidor" options={['BUENA', 'LUNA SUCIA', 'ROTO', 'PARALIZADO', 'INVERTIDO']} />
                      <div className="mt-8 p-6 bg-blue-50 rounded-2xl border-2 border-blue-100 flex items-center justify-center gap-4 cursor-pointer hover:bg-blue-100 transition-colors">
                        <Camera className="text-blue-600" />
                        <span className="text-xs font-black text-blue-600 uppercase tracking-widest">Tomar Foto del Medidor</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. DESAGÜE */}
                {activeTab === '5. DESAGÜE' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-in">
                    <div>
                      <h3 className="text-xs font-black text-blue-600 mb-8 flex items-center gap-3 uppercase tracking-[0.2em]">
                        <div className="w-3 h-3 bg-blue-600 rounded-full shadow-lg shadow-blue-600/40" /> Red de Alcantarillado
                      </h3>
                      <InputSelect label="Estado del Desagüe" name="estadoDesague" options={['OPERATIVO', 'ATORADO', 'COLAPSADO', 'SIN SERVICIO']} />
                      <InputSelect label="Ubicación de Caja" name="materialCajaDesague" options={['VEREDA', 'CALLE', 'INTERIOR']} />
                    </div>
                    <div>
                      <h3 className="text-xs font-black text-blue-600 mb-8 flex items-center gap-3 uppercase tracking-[0.2em]">
                        <div className="w-3 h-3 bg-blue-600 rounded-full shadow-lg shadow-blue-600/40" /> Observaciones Adicionales
                      </h3>
                      <textarea 
                        className="w-full h-32 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold outline-none focus:border-blue-500 focus:bg-white text-sm transition-all"
                        placeholder="Escriba aquí cualquier anomalía encontrada en la red de desagüe..."
                        value={formData.observaciones}
                        onChange={(e) => setFormData({...formData, observaciones: e.target.value})}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-300 px-10">
              <div className="p-16 bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 mb-10 relative group">
                <ClipboardCheck size={120} className="text-slate-200 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter mb-4">Sistema de Catastro Móvil</h2>
              <p className="font-bold uppercase tracking-widest text-slate-400 text-center text-[10px] max-w-sm leading-relaxed">
                Ingrese el número de suministro de agua para cargar la ficha técnica.
              </p>
            </div>
          )}
        </div>
      </main>

      {showSavedToast && (
        <div className="fixed bottom-10 right-10 bg-slate-900 text-white px-10 py-6 rounded-[2.5rem] flex items-center gap-5 shadow-2xl z-[100] animate-in border-b-4 border-emerald-500">
           <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg">
              <CheckCircle2 size={28} />
           </div>
           <div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] leading-none mb-1">Ficha Sincronizada</p>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Información enviada con éxito</p>
           </div>
        </div>
      )}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)