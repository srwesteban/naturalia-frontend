import React from "react";
import "../../styles/components/features/FeatureList.css";

const FeatureList = ({ features }) => {
  if (!features || features.length === 0) return null;

  return (
    <div className="feature-list">
      <h3>Servicios incluidos</h3>
      <div className="feature-grid">
        {features.map((feature) => (
          <div className="feature-card" key={feature.id}>
            <i className={`fa ${feature.icon} feature-icon`} />
            <span className="feature-name">{feature.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureList;