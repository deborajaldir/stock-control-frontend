function ConfirmModal({ open, onConfirm, onCancel, message }) {
  if (!open) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <p style={{ marginBottom: "20px" }}>{message}</p>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <button onClick={onCancel} style={cancelStyle}>
            Cancel
          </button>

          <button onClick={onConfirm} style={confirmStyle}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: "#fff",
  padding: "25px",
  borderRadius: "12px",
  width: "300px",
  boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
};

const cancelStyle = {
  padding: "8px 12px",
  border: "none",
  background: "#ccc",
  borderRadius: "6px",
  cursor: "pointer",
};

const confirmStyle = {
  padding: "8px 12px",
  border: "none",
  background: "#4CAF50",
  color: "#fff",
  borderRadius: "6px",
  cursor: "pointer",
};

export default ConfirmModal;