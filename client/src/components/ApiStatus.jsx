import { useEffect, useState } from "react";

/*
  🔌 ApiStatus

  Checks if the backend server is connected.
*/
function ApiStatus() {
  const [status, setStatus] = useState("Checking API...");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/health");
        const data = await response.json();

        setStatus(data.message);
        setIsConnected(true);
      } catch (error) {
        setStatus("server is not connected");
        setIsConnected(false);
      }
    };

    checkApiStatus();
  }, []);

  return (
    <div className={isConnected ? "api-status connected" : "api-status"}>
      <span>{isConnected ? "🟢" : "🔴"}</span>
      <p>{status}</p>
    </div>
  );
}

export default ApiStatus;