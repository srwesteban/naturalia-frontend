export const getAllHosts = async () => {
  const res = await fetch("http://localhost:8080/users/hosts", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) throw new Error("Error al cargar hosts");
  return res.json();
};


export const getHosts = async () => {
  const resp = await fetch("http://localhost:8080/users/hosts");
  if (!resp.ok) throw new Error("No se pudieron cargar los hosts");
  return resp.json(); // [{id, firstname, lastname}]
};


