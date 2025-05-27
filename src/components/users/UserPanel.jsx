import { useEffect, useState } from "react";

const UserPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:8080/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errorText = await res.text(); // para poder ver el mensaje exacto
        console.error("Error al obtener usuarios:", res.status, errorText);
        return;
      }

      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error inesperado:", err);
    }
  };

  const toggleRole = async (userId, currentRole) => {
    const token = localStorage.getItem("token");
    const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";

    await fetch(`http://localhost:8080/users/${userId}/role?role=${newRole}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchUsers();
  };

  return (
    <div>
      <h2>Gestión de Usuarios</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.email} — {user.role}
            <button onClick={() => toggleRole(user.id, user.role)}>
              Cambiar a {user.role === "ADMIN" ? "USER" : "ADMIN"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPanel;
