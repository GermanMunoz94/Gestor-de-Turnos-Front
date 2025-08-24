import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useAuth } from "../auth/AuthProvider";

export default function Medicos() {
  const { api, user } = useAuth();
  const [medicos, setMedicos] = useState([]);
  const [turnos, setTurnos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMedico, setSelectedMedico] = useState(null);
  const [mensaje, setMensaje] = useState("");

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);

  // Cargar médicos
  useEffect(() => {
    api.get("/medicos").then((res) => setMedicos(res.data));
  }, []);

  // Cargar turnos
  useEffect(() => {
    if (selectedMedico) {
      api
        .get(
          `/turnos?medicoId=${selectedMedico}&fecha=${selectedDate
            .toISOString()
            .split("T")[0]}`
        )
        .then((res) => setTurnos(res.data));
    }
  }, [selectedMedico, selectedDate]);

  // Abrir modal antes de reservar
  const confirmarReserva = (turno) => {
    setTurnoSeleccionado(turno);
    setModalOpen(true);
  };

  // Reservar turno
  const reservarTurno = async () => {
    if (!turnoSeleccionado) return;
    try {
      await api.post(`/turnos/${turnoSeleccionado.id}/reservar`, {
        pacienteId: user?.id || 1,
      });
      setMensaje("✅ Turno reservado con éxito");
      setModalOpen(false);
      setTurnoSeleccionado(null);

      // Recargar turnos
      api
        .get(
          `/turnos?medicoId=${selectedMedico}&fecha=${selectedDate
            .toISOString()
            .split("T")[0]}`
        )
        .then((res) => setTurnos(res.data));
    } catch (err) {
      setMensaje("❌ Error al reservar turno");
      setModalOpen(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="relative flex flex-col m-6 space-y-8 bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 w-full max-w-4xl">
        {/* Título */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Turnos por Médico
        </h2>

        {/* Selector de médico */}
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Seleccionar médico:
          </label>
          <select
            value={selectedMedico || ""}
            onChange={(e) => setSelectedMedico(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="">-- Seleccione --</option>
            {medicos.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nombre} {m.apellido}
              </option>
            ))}
          </select>
        </div>

        {/* Calendario */}
        <Calendar
          value={selectedDate}
          onChange={setSelectedDate}
          className="rounded-lg border border-gray-200 dark:border-gray-700 p-2 shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />

        {/* Lista de turnos */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Turnos disponibles el {selectedDate.toLocaleDateString()}
          </h3>

          {mensaje && (
            <p className="mb-3 text-sm text-center text-green-600 dark:text-green-400">
              {mensaje}
            </p>
          )}

          {turnos.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">
              No hay turnos disponibles
            </p>
          ) : (
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {turnos.map((t) => (
                <li
                  key={t.id}
                  className={`p-3 rounded-lg border ${t.estado === "reservado"
                      ? "bg-red-100 dark:bg-red-800 border-red-400 cursor-not-allowed opacity-70"
                      : "bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    } text-center`}
                  onClick={() => t.estado !== "reservado" && confirmarReserva(t)}
                >
                  <div className="font-bold">{t.hora}</div>
                  <div className="text-sm capitalize">{t.estado}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && turnoSeleccionado && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 dark:bg-black/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Confirmar reserva
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              ¿Desea reservar el turno con el médico{" "}
              <strong>{selectedMedico}</strong> el{" "}
              <strong>{selectedDate.toLocaleDateString()}</strong> a las{" "}
              <strong>{turnoSeleccionado.hora}</strong>?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Cancelar
              </button>
              <button
                onClick={reservarTurno}
                className="px-4 py-2 rounded bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}