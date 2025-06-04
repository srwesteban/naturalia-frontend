import React, { useEffect, useState } from "react";
import { getPolicies } from "../services/policyService";
import "../styles/pages/PoliciesPage.css";

const PoliciesPage = () => {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPolicies();
        setPolicies(data);
      } catch (err) {
        console.error("❌ Error cargando políticas:", err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="policies-page">
      <h2 className="policies-title">Políticas de uso</h2>
      <div className="policies-grid">
        {policies.map((policy) => (
          <div key={policy.id} className="policy-card">
            <h3 className="policy-heading">{policy.title}</h3>
            <p className="policy-description">{policy.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PoliciesPage;
