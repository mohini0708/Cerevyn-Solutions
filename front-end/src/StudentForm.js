import { useState } from "react";

export default function StudentForm({ onSave, selected }) {
  const [name, setName] = useState(selected?.name || "");
  const [place, setPlace] = useState(selected?.place || "");
  const [phone, setPhone] = useState(selected?.phone || "");

  const submit = () => {
    if (!name || !place || !phone) {
      alert("Fill all fields");
      return;
    }

    onSave({ name, place, phone });
    setName(""); setPlace(""); setPhone("");
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <input placeholder="Name" value={name}
        onChange={e => setName(e.target.value)} />
      <input placeholder="Place" value={place}
        onChange={e => setPlace(e.target.value)} />
      <input placeholder="Phone" value={phone}
        onChange={e => setPhone(e.target.value)} />
      <button onClick={submit}>
        {selected ? "Update" : "Add"}
      </button>
    </div>
  );
}
