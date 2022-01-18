export default function () {
    const isLocalhost =
      window.location.host.indexOf("127.0.0.1") != -1 ||
      window.location.host.indexOf("localhost") != -1;
  
    const localApiUrl = "http://localhost:9090";
    const prodApiUrl = `http://52.204.160.63:9090`;
  
    window.apiUrl = isLocalhost ? localApiUrl : prodApiUrl;
  }