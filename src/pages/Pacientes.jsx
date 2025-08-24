import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthProvider';


export default function Pacientes() {
    const { api } = useAuth();
    const [pacientes, setPacientes] = useState([]);
    const [form, setForm] = useState({ nombre: '', apellido: '', dni: '', telefono: '', email: '' });


    const cargar = () => api.get('/pacientes').then(res => setPacientes(res.data));
    useEffect(() => { cargar(); }, []);


    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post('/pacientes', form);
        setForm({ nombre: '', apellido: '', dni: '', telefono: '', email: '' });
        cargar();
    };


    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-2">Pacientes</h2>


            <form onSubmit={handleSubmit} className="mb-4 flex gap-2 flex-wrap">
                {['nombre', 'apellido', 'dni', 'telefono', 'email'].map((field) => (
                    <input key={field} name={field} value={form[field]} onChange={handleChange}
                        placeholder={field} className="border p-1" />
                ))}
                <button type="submit" className="bg-blue-500 text-white px-3 py-1">Agregar</button>
            </form>


            <table className="table-auto border-collapse border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-2">Nombre</th>
                        <th className="border px-2">Apellido</th>
                        <th className="border px-2">DNI</th>
                        <th className="border px-2">Teléfono</th>
                        <th className="border px-2">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {pacientes.map(p => (
                        <tr key={p.id}>
                            <td className="border px-2">{p.nombre}</td>
                            <td className="border px-2">{p.apellido}</td>
                            <td className="border px-2">{p.dni}</td>
                            <td className="border px-2">{p.telefono}</td>
                            <td className="border px-2">{p.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}