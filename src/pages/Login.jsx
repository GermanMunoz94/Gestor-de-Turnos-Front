import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import useDarkMode from "../hooks/useDarkMode";

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useDarkMode();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
    } catch {
      setError("Credenciales inválidas");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="relative flex flex-col m-6 space-y-8 bg-white dark:bg-gray-800 shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        
        {/* Lado izquierdo */}
        <div className="flex flex-col justify-center p-8 md:p-14 w-full md:w-96">
          <div className="flex justify-end mb-4">
            
          </div>

          <span className="mb-3 text-4xl font-bold text-gray-900 dark:text-white">
            Bienvenidos
          </span> 
          <span className="font-light text-gray-400 dark:text-gray-300 mb-8">
            Welcome back! Please enter your details
          </span>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="py-4">
              <span className="mb-2 text-md text-gray-700 dark:text-gray-300 block">Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md placeholder:font-light placeholder:text-gray-500 dark:bg-gray-700 dark:text-gray-100"
              />
            </div>

            <div className="py-4">
              <span className="mb-2 text-md text-gray-700 dark:text-gray-300 block">Contraseña</span>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md placeholder:font-light placeholder:text-gray-500 dark:bg-gray-700 dark:text-gray-100"
              />
            </div>

            <div className="flex justify-between w-full py-4 text-sm">
              <label className="flex items-center text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                  className="mr-2"
                />
                Recordarme
              </label>
              <span className="font-bold text-gray-900 dark:text-white cursor-pointer">
                Olvide mi contraseña
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black border border-transparent hover:border-gray-300 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              Ingresar
            </button>

            <button
              type="button"
              className="w-full border border-gray-300 dark:border-gray-600 text-md p-2 rounded-lg mb-6 hover:bg-black hover:text-white dark:hover:bg-gray-700"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="google"
                className="w-6 h-6 inline mr-2"
              />
              Ingresar con Google
            </button>
          </form>

          <div className="text-center text-gray-400 dark:text-gray-300">
            No tienes cuenta?
            <span className="font-bold text-black dark:text-white ml-1 cursor-pointer">
              Registrate gratis
            </span>
          </div>
        </div>

        {/* Lado derecho */}
        <div className="relative">
          <img
            src="https://picsum.photos/400/600"
            alt="login visual"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
          <div className="absolute hidden bottom-10 right-6 p-6 bg-white/30 dark:bg-gray-900/50 backdrop-blur-sm rounded drop-shadow-lg md:block">
            <span className="text-white text-xl">
              “We’ve been using this app to kickstart every new project and can’t imagine working without it.”
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}