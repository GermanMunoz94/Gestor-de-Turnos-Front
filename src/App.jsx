import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import RequireAuth from './auth/RequireAuth';
import Navbar from './components/Navbar';


import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Pacientes from './pages/Pacientes.jsx';
import Medicos from './pages/Medicos.jsx';
import Turnos from './pages/Turnos.jsx';


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pacientes" element={<RequireAuth role="admin"><Pacientes /></RequireAuth>} />
          <Route path="/medicos" element={<RequireAuth role="admin"><Medicos /></RequireAuth>} />
          <Route path="/turnos" element={<RequireAuth><Turnos /></RequireAuth>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

