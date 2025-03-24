const DownloadAppPage = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Download Our App</h2>
      <p>To access this platform, please download our mobile app:</p>
      <a
        href="https://play.google.com/store/apps/details?id=yourapp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://static.vecteezy.com/system/resources/previews/022/484/501/non_2x/google-play-store-icon-logo-symbol-free-png.png"
          alt="Google Play Store"
          style={{ width: 150, marginRight: 10 }}
        />
      </a>
      <a
        href="https://apps.apple.com/app/yourapp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/App_Store_%28iOS%29.svg/512px-App_Store_%28iOS%29.svg.png?20201023145313"
          alt="Apple App Store"
          style={{ width: 150 }}
        />
      </a>
    </div>
  );
};

export default DownloadAppPage;
