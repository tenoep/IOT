// HomePageClients.tsx
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Banner from "../../components/Banner";
import Footer from "./Footer";

const HomePageClients = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Banner subtitle="Page d'accueil du client" redirectPath="/clients" />
      <div style={styles.container}>
        {/* Image de la salle de sport */}
        <div style={styles.gymImageContainer}>
          <img src="/photo.jpg" alt="Salle de sport" style={styles.gymImage} />
        </div>

        {/* Section de connexion à l'haltère */}
        <div style={styles.connectDumbbell}>
          <h3 style={styles.heading}>Se connecter à un haltère</h3>
          <div style={styles.connectForm}>
            <label htmlFor="dumbbell-number" style={styles.label}>
              Numéro de l'haltère
            </label>
            <input
              type="text"
              id="dumbbell-number"
              placeholder="Entrer le numéro"
              style={styles.input}
            />
            <button style={styles.button}>Se connecter</button>
          </div>
        </div>

        {/* Section d'affichage des séances */}
        <div style={styles.sessionsDisplay}>
          <h3 style={styles.heading}>Vos séances</h3>
          <p>Contenu des séances à afficher ici...</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column", // TypeScript reconnaît maintenant "column" comme valeur valide
    alignItems: "center",
    padding: "16px",
    fontFamily: "Arial, sans-serif",
    paddingBottom: "100px",
  },
  gymImageContainer: {
    width: "100%",
    maxWidth: "400px",
  },
  gymImage: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
  },
  connectDumbbell: {
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    padding: "20px",
    width: "100%",
    maxWidth: "400px",
    marginTop: "20px",
    textAlign: "center" as const,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    marginBottom: "10px",
    fontSize: "18px",
  },
  connectForm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  label: {
    fontSize: "14px",
    marginBottom: "5px",
  },
  input: {
    width: "80%",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    width: "80%",
    padding: "10px",
    backgroundColor: "#333",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  sessionsDisplay: {
    marginTop: "20px",
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#ffffff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
};

export default HomePageClients;
