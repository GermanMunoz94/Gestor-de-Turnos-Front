import { useState } from 'react';
import { useAuth } from '../auth/AuthProvider';


export default function Home() {
    const { user, logout } = useAuth();
    const [showMenu, setShowMenu] = useState(false);
    const [showContact, setShowContact] = useState(false);

    return (
        <div
            className="min-h-screen bg-cover bg-center relative"
            style={{ backgroundImage: "url('https://www.shutterstock.com/shutterstock/photos/2528884941/display_1500/stock-photo-stethoscope-and-medication-record-form-are-on-the-table-besides-the-working-doctor-workplace-in-2528884941.jpg')" }}
        >
            {/* Logo central */}
            <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-6xl font-bold drop-shadow-lg">Bienvenidos a GestorTurnos</p>
            </div>

           

            {/* Info abajo a la izquierda */}
            <div className="absolute bottom-0 left-0 m-6 text-white space-y-1">
                <p className="text-xl">lunes a viernes 10-23 | sábado 14-02</p>
                <p className="text-lg">678 Monte Caseros, Ciudad Mendoza</p>
                <p className="text-sm">
                    powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank" rel="noopener noreferrer" className="underline">w3.css</a>
                </p>
            </div>

            {/* Usuario logueado */}
            <div className="absolute top-0 right-0 m-6 text-right text-white">
                {user ? (
                    <>
                        <p className="font-bold">Logueado como {user.username} ({user.role})</p>
                        <button onClick={logout} className="mt-2 px-4 py-1 bg-white text-black rounded">Salir</button>
                    </>
                ) : (
                    <p className="italic">No logueado</p>
                )}
            </div>

           

           
        </div>
    );
}