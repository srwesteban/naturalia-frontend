import { useEffect, useState } from "react";
import {
  getAllUsers,
  changeUserRole,
  decodeToken,
} from "../../services/userService";
import "../../styles/components/admin/UserPanel.css";

const UserPanel = () => {
  const [users, setUsers] = useState([]);
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      setLoggedUserId(decodeToken());
      await loadUsers();
    };
    init();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("Error cargando usuarios:", err);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      setLoading(true);
      await changeUserRole(userId, newRole);
      await loadUsers();
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
                  <p className="user-name">
                    Usuario: {user.firstname} {user.lastname}
                  </p>
                  <p className="user-email">Correo: {user.email}</p>
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
