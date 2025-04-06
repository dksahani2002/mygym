// src/styles/RegisterStyles.js

const registerStyles = {
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    padding: "8px",
    boxSizing: "border-box",
    overflow: "hidden",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: "16px",
    width: "100%",
    maxWidth: "380px",
    borderRadius: "12px",
    boxSizing: "border-box",
  },
  title: {
    textAlign: "center",
    marginBottom: "12px",
    fontSize: "20px", // smaller title
  },
  submitButton: {
    marginTop: "8px",
    fontSize: "14px",
    padding: "6px 12px"
  },
  input: {
    fontSize: "14px",
    padding: "6px 10px"
  },
  label: {
    fontSize: "14px"
  }
};

export default registerStyles;
