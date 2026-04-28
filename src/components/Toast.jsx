import { useEffect, useState } from "react";

function Toast({ alert }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (alert) {
      setVisible(true);

      // inicia animação de saída antes de sumir
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [alert]);

  if (!alert && !visible) return null;

  const background =
    alert?.type === "success"
      ? "#4CAF50"
      : alert?.type === "error"
      ? "#F44336"
      : "#FF9800";

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        backgroundColor: background,
        color: "#fff",
        padding: "12px 20px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        fontWeight: "500",
        zIndex: 999,
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) translateX(0)"
          : "translateY(-10px) translateX(50px)",
        transition: "all 0.3s ease",
      }}
    >
      {alert?.text}
    </div>
  );
}

export default Toast;