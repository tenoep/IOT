import React, { useState, useEffect } from "react";

const Clock: React.FC = () => {
  const [dateTime, setDateTime] = useState({
    time: new Date().toUTCString(),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime({
        time: new Date().toUTCString(),
      });
    }, 1000);

    return () => clearInterval(interval); // Nettoyage de l'intervalle
  }, []);

  return (
    <div className="p-2 text-sm text-gray-900 rounded-md">
      {" "}
      {/* Réduction des marges et de la taille du texte */}
      <div>{dateTime.time}</div>
    </div>
  );
};

export default Clock;
