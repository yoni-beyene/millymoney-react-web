const LoadingComponent = () => {
  return (
    <div style={styles.container}>
      <div style={styles.loader}></div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    width: "100%",
    height: "10vh",
  },
  loader: {
    width: "60px",
    height: "60px",
    border: "6px solid #f3f3f3",
    borderTop: "6px solid #7648e0",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

export default LoadingComponent;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);
