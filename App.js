import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  // Your Flask API ngrok URL
  const FLASK_API_URL = "https://83a4-34-72-97-150.ngrok-free.app";

  const sendMessage = async () => {
    try {
      const res = await fetch(`${FLASK_API_URL}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      setResponse("Error connecting to the server.");
      console.error("Fetch error:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Stock Chatbot</h1>
      <input
        type="text"
        placeholder="Ask about a stock (e.g., Price of AAPL)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ padding: "10px", width: "300px", marginRight: "10px" }}
      />
      <button onClick={sendMessage} style={{ padding: "10px 20px", cursor: "pointer" }}>
        Send
      </button>
      <p style={{ marginTop: "20px", fontSize: "18px" }}>Response: {response}</p>
    </div>
  );
}

export default App;
