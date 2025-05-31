import { useEffect, useState } from "react";
import "../../styles/components/admin/UserPanel.css";

const API_URL = 'http://localhost:8080';

const UserPanel = () => {
  const [users, setUsers] = useState([]);
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
    decodeToken();
  }, []);

  const decodeToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setLoggedUserId(payload.userId || payload.id);
    } catch (err) {
      console.error("Error al decodificar token:", err);
    }
  };

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error al obtener usuarios:", res.status, errorText);
        return;
      }

      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error inesperado:", err);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    const token = localStorage.getItem("token");

    try {
      setLoading(true);
      await fetch(`${API_URL}/users/${userId}/role?role=${newRole}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      console.error("Error al cambiar el rol:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="user-panel">
      <h2>Gestión de Usuarios</h2>
      <div className="user-list">
        {users
          .filter((u) => u.id !== loggedUserId)
          .map((user) => (
            <div className="user-card" key={user.id}>
              <div className="user-block">
                <div className="user-block-left">
                  <p className="user-name">{"Usuario: " + user.firstname} {user.lastname}</p>
                  <p className="user-email">{"Correo: "+user.email}</p>
                </div>
                <div className="user-block-left">
                  <label className="role-label">Permisos / Rol</label>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    disabled={loading}
                  >
                    <option value="USER">USER</option>
                    <option value="HOST">HOST</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default UserPanel;
