import { Link } from "react-router-dom";
import useDarkMode from "../hooks/useDarkMode";

export default function Navbar() {
    const [darkMode, setDarkMode] = useDarkMode();

    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
            {/* Logo */}
            <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-black dark:text-white">GestorTurnos</span>
            </div>

            {/* Links */}
            <div className="hidden md:flex items-center space-x-6 text-gray-700 dark:text-gray-200 font-medium">
                <Link to="/" className="hover:text-black dark:hover:text-white">
                    Home
                </Link>
                <Link to="/pacientes" className="hover:text-black dark:hover:text-white">
                    Pacientes
                </Link>
                <Link to="/medicos" className="hover:text-black dark:hover:text-white">
                    Médicos
                </Link>
                <Link to="/turnos" className="hover:text-black dark:hover:text-white">
                    Turnos
                </Link>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
                {/* Toggle dark/light */}
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="rounded-full border px-3 py-1 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                    {darkMode ? "☀️ Light" : "🌙 Dark"}
                </button>

                {/* User/Login */}
                <Link
                    to="/login"
                    className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition"
                >
                    Login
                </Link>
            </div>
        </nav>
    );
}