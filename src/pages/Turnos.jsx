import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { Input, Button, Toast } from '../components/ui.jsx';


export default function Turnos() {
    const { api } = useAuth();
    const [turnos, setTurnos] = useState([]);
    const [form, setForm] = useState({ fecha: '', hora: '', medicoId: '', pacienteId: '' });
    const [filtro, setFiltro] = useState({ fecha: '', medicoId: '' });
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState('');


    const cargar = async () => {
        setLoading(true);
        try {
            if (filtro.fecha && filtro.medicoId) {
                const res = await api.get(`/turnos/medico/${filtro.medicoId}`, { params: { fecha: filtro.fecha } });
                setTurnos(res.data);
            } else {
                const res = await api.get('/turnos');
                setTurnos(res.data);
            }
        } finally { setLoading(false); }
    };


    useEffect(() => { cargar(); }, []);


    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleFiltro = (e) => setFiltro({ ...filtro, [e.target.name]: e.target.value });


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/turnos', { ...form, medicoId: Number(form.medicoId), pacienteId: Number(form.pacienteId) });
            setForm({ fecha: '', hora: '', medicoId: '', pacienteId: '' });
            setToast('Turno creado');
            cargar();
        } catch (err) {
            setToast(err?.response?.data?.error || 'Error al crear turno');
        } finally {
            setTimeout(() => setToast(''), 2500);
        }
    };


    const cancelar = async (id) => {
        await api.delete(`/turnos/${id}`);
        setToast('Turno cancelado');
        cargar();
        setTimeout(() => setToast(''), 2000);
    };


    return (
        <div className="p-4 space-y-4">
            <h2 className="text-xl font-bold">Turnos</h2>


            {/* Filtros */}
            <div className="flex gap-2 items-end flex-wrap">
                <div>
                    <label>Fecha</label>
                    <Input type="date" name="fecha" value={filtro.fecha} onChange={handleFiltro} />
                </div>
                <div>
                    <label>Médico ID</label>
                    <Input name="medicoId" value={filtro.medicoId} onChange={handleFiltro} placeholder="Ej: 1" />
                </div>
                <Button onClick={cargar} className="bg-blue-600 text-white">Ver agenda</Button>
                <Button onClick={() => { setFiltro({ fecha: '', medicoId: '' }); cargar(); }} className="bg-gray-300">Limpiar</Button>
            </div>


            {/* Form crear turno */}
                <form onSubmit={handleSubmit} className="flex gap-2 flex-wrap">
                    <Input type="date" name="fecha" value={form.fecha} onChange={handleChange} required />
                    <Input type="time" name="hora" value={form.hora} onChange={handleChange} required />
                    <Input name="medicoId" value={form.medicoId} onChange={handleChange} placeholder="Médico ID" required />
                    <Input name="pacienteId" value={form.pacienteId} onChange={handleChange} placeholder="Paciente ID" required />
                    <Button type="submit" className="bg-green-600 text-white">Crear turno</Button>
                </form>
    
                {/* Lista de turnos */}
                <div className="overflow-x-auto">
                    <table className="min-w-full border">
                        <thead>
                            <tr>
                                <th className="border px-2">Fecha</th>
                                <th className="border px-2">Hora</th>
                                <th className="border px-2">Médico ID</th>
                                <th className="border px-2">Paciente ID</th>
                                <th className="border px-2">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {turnos.map(t => (
                                <tr key={t.id}>
                                    <td className="border px-2">{t.fecha}</td>
                                    <td className="border px-2">{t.hora}</td>
                                    <td className="border px-2">{t.medicoId}</td>
                                    <td className="border px-2">{t.pacienteId}</td>
                                    <td className="border px-2">
                                        <Button onClick={() => cancelar(t.id)} className="bg-red-500 text-white">Cancelar</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
    
                        {toast && <Toast>{toast}</Toast>}
                    </div>
                );
            }