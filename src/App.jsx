import React, { useState } from 'react';
import { 
  Search, Save, Map, ClipboardList, User, Droplets, 
  LogOut, ChevronRight, RefreshCw, MapPin, Phone, 
  FileText, Activity, Trash2, Key, Settings,
  UserPlus, CreditCard, Mail, Zap, ZapOff
} from 'lucide-react';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('ficha');
  const [activeTab, setActiveTab] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Estado para los datos de la ficha (Editable)
  const [formData, setFormData] = useState({
    predio: { direccion: "Jr. San Roque 450", urbanizacion: "Cercado Moyobamba", sector: "02", manzana: "MZ D", lote: "15", tipo: "Casa-Habitación" },
    usuario: { nombre: "Juan Pérez García", dni: "45667788", telefono: "942 556 778", correo: "jperez@email.com", condicion: "Propietario", habitantes: "4" },
    agua: { conexion: "Doméstica", diametro: '1/2"', material: "PVC", estadoCaja: "Bueno", ubicacion: "Vereda", presion: "15 PSI" },
    medidor: { marca: "Zenner", serie: "Z-8899221", lectura: "1450.5", estado: "Operativo", anio: "2021", diametroM: "15mm" },
    desague: { tipo: "Red Pública", diametroT: '4"', materialD: "PVC Sal", estadoCajaD: "Limpio", tipoTapa: "Concreto", cajaExistente: "Sí" }
  });

  const handleLogin = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      setIsDataLoaded(true);
    }
  };

  const updateField = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a1128] flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md text-center border border-white/10">
           <div className="w-20 h-20 bg-blue-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-blue-500/30">
             <Droplets className="text-white" size={40} />
           </div>
           <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">EPS MOYOBAMBA</h1>
           <p className="text-blue-500 font-bold text-[10px] uppercase tracking-[0.3em] mt-1 mb-8 text-center w-full">Catastro Técnico</p>
           
           <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 ml-1 uppercase">Usuario</label>
                <input type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="Ej: tecnico_01" required />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 ml-1 uppercase">Contraseña</label>
                <input type="password" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="••••••••" required />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/25 mt-4">
                Entrar al Sistema
              </button>
           </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a1128] text-white flex flex-col shrink-0">
        <div className="p-8 border-b border-white/5 flex flex-col items-center gap-4">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Droplets size={28} />
          </div>
          <div className="text-center">
            <span className="font-black text-sm tracking-tighter uppercase block">EPS Moyobamba</span>
            <span className="text-[9px] text-blue-400 font-bold uppercase tracking-widest">Panel de Control</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-3">
          <SidebarBtn icon={ClipboardList} label="Ficha de Campo" active={currentView === 'ficha'} onClick={() => setCurrentView('ficha')} />
          <SidebarBtn icon={Map} label="Visor GIS" active={currentView === 'gis'} onClick={() => setCurrentView('gis')} />
          <SidebarBtn icon={Settings} label="Configuración" active={currentView === 'config'} onClick={() => setCurrentView('config')} />
        </nav>

        <div className="p-6 border-t border-white/5">
          <button onClick={() => setIsAuthenticated(false)} className="w-full flex items-center justify-center gap-3 py-4 bg-white/5 rounded-2xl text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-white hover:bg-red-500/20 transition-all">
            <LogOut size={16} /> Cerrar Sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Ingrese N° de Suministro..."
                className="w-full pl-12 pr-4 py-3 bg-slate-100 border-transparent rounded-2xl text-xs font-bold outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button onClick={handleSearch} className="bg-[#0a1128] text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all">Buscar</button>
          </div>
          
          <button className="bg-[#00a86b] text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 transition-all">
            <Save size={16} /> Guardar Cambios
          </button>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-[#f1f5f9]">
          {currentView === 'ficha' && (
            <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {isDataLoaded ? (
                <>
                  {/* Resumen Card */}
                  <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200 flex items-center justify-between relative overflow-hidden group">
                    <div className="absolute top-0 right-0 px-6 py-2 bg-blue-600 text-white font-black text-[9px] rounded-bl-2xl tracking-widest">DATOS CARGADOS</div>
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center text-blue-600 border border-blue-100 group-hover:scale-105 transition-transform"><User size={32} /></div>
                      <div>
                        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter leading-none">{formData.usuario.nombre}</h2>
                        <div className="flex gap-6 mt-3">
                          <div className="flex items-center gap-2">
                            <Hash size={12} className="text-slate-400" />
                            <span className="text-[10px] font-black text-slate-400 uppercase">Suministro: <span className="text-blue-600">{searchQuery}</span></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Activity size={12} className="text-emerald-500" />
                            <span className="text-[10px] font-black text-slate-400 uppercase">Estado: <span className="text-emerald-600">Conectado</span></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                    {['Predio', 'Usuario', 'Agua', 'Medidor', 'Desagüe'].map((label, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => setActiveTab(idx + 1)}
                        className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${activeTab === idx + 1 ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20 border-blue-600' : 'bg-white text-slate-400 border-slate-200 hover:border-blue-300'}`}
                      >
                        {idx + 1}. {label}
                      </button>
                    ))}
                  </div>

                  {/* Form Container */}
                  <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-200 min-h-[500px]">
                    {activeTab === 1 && (
                      <FormSection title="Localización del Predio" icon={MapPin}>
                        <InputField label="Dirección Completa" value={formData.predio.direccion} onChange={(v) => updateField('predio', 'direccion', v)} />
                        <InputField label="Urbanización / Barrio" value={formData.predio.urbanizacion} onChange={(v) => updateField('predio', 'urbanizacion', v)} />
                        <div className="grid grid-cols-3 gap-6">
                          <InputField label="Sector" value={formData.predio.sector} onChange={(v) => updateField('predio', 'sector', v)} />
                          <InputField label="Manzana" value={formData.predio.manzana} onChange={(v) => updateField('predio', 'manzana', v)} />
                          <InputField label="Lote" value={formData.predio.lote} onChange={(v) => updateField('predio', 'lote', v)} />
                        </div>
                        <InputField label="Tipo de Inmueble" value={formData.predio.tipo} onChange={(v) => updateField('predio', 'tipo', v)} />
                      </FormSection>
                    )}

                    {activeTab === 2 && (
                      <FormSection title="Información del Usuario" icon={UserPlus}>
                        <InputField label="Nombre y Apellidos" value={formData.usuario.nombre} onChange={(v) => updateField('usuario', 'nombre', v)} />
                        <div className="grid grid-cols-2 gap-6">
                          <InputField label="DNI / RUC" value={formData.usuario.dni} onChange={(v) => updateField('usuario', 'dni', v)} />
                          <InputField label="Celular de Contacto" value={formData.usuario.telefono} onChange={(v) => updateField('usuario', 'telefono', v)} />
                        </div>
                        <InputField label="Correo Electrónico" value={formData.usuario.correo} onChange={(v) => updateField('usuario', 'correo', v)} />
                        <div className="grid grid-cols-2 gap-6">
                          <InputField label="Condición" value={formData.usuario.condicion} onChange={(v) => updateField('usuario', 'condicion', v)} />
                          <InputField label="N° Habitantes" value={formData.usuario.habitantes} onChange={(v) => updateField('usuario', 'habitantes', v)} />
                        </div>
                      </FormSection>
                    )}

                    {activeTab === 3 && (
                      <FormSection title="Detalles de Conexión Agua" icon={Droplets}>
                        <div className="grid grid-cols-2 gap-6">
                          <InputField label="Tipo de Conexión" value={formData.agua.conexion} onChange={(v) => updateField('agua', 'conexion', v)} />
                          <InputField label="Diámetro de Red" value={formData.agua.diametro} onChange={(v) => updateField('agua', 'diametro', v)} />
                        </div>
                        <InputField label="Material de Tubería" value={formData.agua.material} onChange={(v) => updateField('agua', 'material', v)} />
                        <div className="grid grid-cols-2 gap-6">
                          <InputField label="Estado de Caja" value={formData.agua.estadoCaja} onChange={(v) => updateField('agua', 'estadoCaja', v)} />
                          <InputField label="Ubicación" value={formData.agua.ubicacion} onChange={(v) => updateField('agua', 'ubicacion', v)} />
                        </div>
                      </FormSection>
                    )}

                    {activeTab === 4 && (
                      <FormSection title="Control de Medidor" icon={Activity}>
                        <div className="grid grid-cols-2 gap-6">
                          <InputField label="Marca del Equipo" value={formData.medidor.marca} onChange={(v) => updateField('medidor', 'marca', v)} />
                          <InputField label="Número de Serie" value={formData.medidor.serie} onChange={(v) => updateField('medidor', 'serie', v)} />
                        </div>
                        <InputField label="Lectura de Campo (m³)" value={formData.medidor.lectura} onChange={(v) => updateField('medidor', 'lectura', v)} />
                        <div className="grid grid-cols-3 gap-6">
                          <InputField label="Estado" value={formData.medidor.estado} onChange={(v) => updateField('medidor', 'estado', v)} />
                          <InputField label="Año" value={formData.medidor.anio} onChange={(v) => updateField('medidor', 'anio', v)} />
                          <InputField label="Diámetro" value={formData.medidor.diametroM} onChange={(v) => updateField('medidor', 'diametroM', v)} />
                        </div>
                      </FormSection>
                    )}

                    {activeTab === 5 && (
                      <FormSection title="Sistema de Alcantarillado" icon={ZapOff}>
                        <InputField label="Tipo de Servicio" value={formData.desague.tipo} onChange={(v) => updateField('desague', 'tipo', v)} />
                        <div className="grid grid-cols-2 gap-6">
                          <InputField label="Diámetro Tubería" value={formData.desague.diametroT} onChange={(v) => updateField('desague', 'diametroT', v)} />
                          <InputField label="Material" value={formData.desague.materialD} onChange={(v) => updateField('desague', 'materialD', v)} />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <InputField label="Estado Caja" value={formData.desague.estadoCajaD} onChange={(v) => updateField('desague', 'estadoCajaD', v)} />
                          <InputField label="Tipo Tapa" value={formData.desague.tipoTapa} onChange={(v) => updateField('desague', 'tipoTapa', v)} />
                        </div>
                      </FormSection>
                    )}
                  </div>
                </>
              ) : (
                <div className="h-[60vh] flex flex-col items-center justify-center text-slate-300 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                    <Search size={48} strokeWidth={1} />
                  </div>
                  <h3 className="text-slate-800 font-black uppercase tracking-widest text-sm">Búsqueda de Catastro</h3>
                  <p className="mt-2 font-bold text-[10px] uppercase tracking-[0.2em] text-slate-400">Ingrese un número de suministro arriba para comenzar</p>
                </div>
              )}
            </div>
          )}

          {currentView === 'gis' && <GISView />}
          {currentView === 'config' && <ConfigView />}
        </div>
      </main>
    </div>
  );
};

// --- COMPONENTES AUXILIARES ---

const SidebarBtn = ({ icon: Icon, label, active, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
    <Icon size={20} />
    <span className="text-[10px] font-black uppercase tracking-[0.15em]">{label}</span>
  </button>
);

const FormSection = ({ title, icon: Icon, children }) => (
  <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
    <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
      <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
        <Icon size={24} />
      </div>
      <div>
        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">{title}</h3>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Complete todos los campos requeridos</p>
      </div>
    </div>
    <div className="grid gap-6">
      {children}
    </div>
  </div>
);

const InputField = ({ label, value, onChange }) => (
  <div className="space-y-2 group">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1 group-focus-within:text-blue-500 transition-colors">{label}</label>
    <input 
      type="text" 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all shadow-sm"
    />
  </div>
);

const GISView = () => (
  <div className="h-full flex flex-col space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Visor Geográfico de Moyobamba</h2>
      <div className="flex gap-2">
        <span className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase border border-emerald-100 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div> Servidor Activo
        </span>
      </div>
    </div>
    <div className="flex-1 bg-slate-200 rounded-[3rem] border-8 border-white shadow-2xl relative overflow-hidden flex items-center justify-center group">
       <div className="absolute inset-0 opacity-30" style={{backgroundImage: 'radial-gradient(#0a1128 0.8px, transparent 0.8px)', backgroundSize: '24px 24px'}}></div>
       <div className="text-center z-10 p-12 bg-white/80 backdrop-blur-md rounded-[2.5rem] shadow-xl border border-white max-w-sm">
          <div className="w-20 h-20 bg-blue-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg">
            <MapPin size={40} className="text-white animate-bounce" />
          </div>
          <h4 className="text-slate-800 font-black uppercase text-xs tracking-widest">Cargando Capas GIS</h4>
          <p className="mt-3 text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-loose">Sincronizando red de agua potable y alcantarillado con base de datos central...</p>
       </div>
       <div className="absolute bottom-10 right-10 flex flex-col gap-3">
          <button className="w-12 h-12 bg-[#0a1128] text-white rounded-2xl shadow-xl font-black text-xl hover:scale-110 transition-transform">+</button>
          <button className="w-12 h-12 bg-[#0a1128] text-white rounded-2xl shadow-xl font-black text-xl hover:scale-110 transition-transform">-</button>
       </div>
    </div>
  </div>
);

const ConfigView = () => (
  <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
    <div className="border-b border-slate-200 pb-6">
      <h2 className="text-lg font-black text-slate-800 uppercase tracking-tighter">Panel de Configuración</h2>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Gestión del sistema y seguridad</p>
    </div>
    
    <div className="grid gap-4">
      <ConfigItem icon={User} title="Perfil del Técnico" desc="Información personal y credenciales de campo." color="blue" />
      <ConfigItem icon={Key} title="Seguridad de Acceso" desc="Gestión de contraseñas y firma digital." color="amber" />
      <ConfigItem icon={RefreshCw} title="Base de Datos Local" desc="Última sincronización: Hace 5 minutos." color="emerald" />
      <ConfigItem icon={Activity} title="Auditoría de Cambios" desc="Registro histórico de todas las fichas modificadas." color="purple" />
      
      <div className="mt-12 p-8 bg-white rounded-[2.5rem] border border-red-100 flex items-center justify-between shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-red-500"></div>
        <div>
          <h4 className="text-[11px] font-black text-red-600 uppercase tracking-widest">Mantenimiento Crítico</h4>
          <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">Purgar memoria caché y registros temporales del dispositivo</p>
        </div>
        <button className="px-8 py-4 bg-red-50 text-red-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all border border-red-100 shadow-sm flex items-center gap-3">
          <Trash2 size={16} /> Limpiar Datos
        </button>
      </div>
    </div>
  </div>
);

const ConfigItem = ({ icon: Icon, title, desc, color }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    amber: 'bg-amber-50 text-amber-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    purple: 'bg-purple-50 text-purple-600'
  };
  
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-200 flex items-center gap-6 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5 transition-all cursor-pointer group">
      <div className={`w-14 h-14 ${colors[color] || 'bg-slate-50'} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
        <Icon size={24} />
      </div>
      <div className="flex-1">
        <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">{title}</h4>
        <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-wider">{desc}</p>
      </div>
      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all">
        <ChevronRight size={20} />
      </div>
    </div>
  );
};

export default App;