import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    const res = await fetch("http://127.0.0.1:5000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setResponse(data.response);
  };

  return (
    <div>
      <h1>Stock Chatbot</h1>
      <input
        type="text"
        placeholder="Ask about a stock (e.g., Price of AAPL)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <p>Response: {response}</p>
    </div>
  );
}

export default App;
