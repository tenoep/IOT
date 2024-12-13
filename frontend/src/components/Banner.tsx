import React, { useEffect, useState } from "react";
import Clock from "./Clock";
import { useNavigate } from "react-router-dom";

interface BannerProps {
  subtitle: string;
  redirectPath: string;
}

const Banner: React.FC<BannerProps> = ({ subtitle, redirectPath }) => {
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768); // Détecte les écrans de moins de 768px

  useEffect(() => {
    const login = sessionStorage.getItem("login");
    const id = sessionStorage.getItem("userId");
    setUserLogin(login);
    setUserId(id);
  }, []);

  useEffect(() => {
    // Écoute les changements de taille de la fenêtre pour basculer entre le mode mobile et desktop
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = () => {
    navigate(redirectPath);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setUserLogin(null);
    setUserId(null);
    navigate("/");
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isMobile ? "8px 16px" : "16px 24px",
        color: "black",
        height: isMobile ? "auto" : "14vh",
        backgroundColor: "#FFF9C4", // Couleur jaune clair
      }}
    >
      {isMobile ? (
        // Version mobile
        <>
          {/* Logo à gauche */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <img
              src="/logo_IOT.png"
              alt="Logo Impact"
              style={{
                height: "50px", // Taille pour mobile
                marginRight: "16px",
              }}
            />
          </div>

          {/* Bouton et infos utilisateur */}
          <div
            style={{
              display: "flex",
              flexDirection: "column", // Empile le bouton et les infos utilisateur
              alignItems: "flex-end", // Alignement à droite
            }}
          >
            <button
              onClick={handleLogout}
              style={{
                padding: "4px 8px",
                color: "black",
                backgroundColor: "#e2e8f0",
                border: "1px solid black",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.8rem",
                marginBottom: "4px", // Espacement entre le bouton et les infos
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f87171")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#e2e8f0")
              }
            >
              Se déconnecter
            </button>
            <span style={{ textAlign: "right", fontSize: "0.8rem" }}>
              {userLogin} : {userId}
            </span>
          </div>
        </>
      ) : (
        // Version ordinateur
        <>
          {/* Subtitle et Clock à gauche */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              fontSize: "1rem",
            }}
          >
            <div style={{ fontWeight: "bold", marginRight: "8px" }}>
              {subtitle}
            </div>
            <Clock />
          </div>

          {/* Logo parfaitement centré */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)", // Centre le logo horizontalement
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="/logo_IOT.png"
              alt="Logo Impact"
              style={{
                height: "70px", // Taille pour ordinateur
              }}
            />
          </div>

          {/* Bouton et infos utilisateur */}
          {userLogin && userId && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontSize: "1rem",
                marginLeft: "auto",
              }}
            >
              <button
                onClick={handleLogout}
                style={{
                  padding: "6px 12px",
                  color: "black",
                  backgroundColor: "#e2e8f0",
                  border: "1px solid black",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  marginBottom: "4px",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f87171")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#e2e8f0")
                }
              >
                Se déconnecter
              </button>
              <span style={{ textAlign: "center" }}>
                {userLogin} : {userId}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Banner;
