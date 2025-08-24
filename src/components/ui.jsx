export function Input(props) {
  return <input {...props} className={(props.className || '') + " border rounded px-2 py-1"} />;
}
export function Button({ children, ...props }) {
  return <button {...props} className={(props.className || '') + " px-3 py-1 rounded shadow"}>{children}</button>;
}
export function Toast({ children }) {
  return <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded">{children}</div>;
}