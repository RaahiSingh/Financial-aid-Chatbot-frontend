from flask import Flask, request, jsonify
from flask_cors import CORS
import yfinance as yf

app = Flask(__name__)
CORS(app)  # Allow React to communicate with Flask

@app.route("/", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message", "").lower()

    # Check if the user is asking for stock data
    if "stock" in message or "price of" in message:
        symbol = message.split()[-1].upper()  # Extract stock symbol (last word)
        return get_stock_price(symbol)
    
    return jsonify({"response": f"Flask received: {message}"})

def get_stock_price(symbol):
    try:
        stock = yf.Ticker(symbol)
        price = stock.history(period="1d")["Close"].iloc[-1]
        name = stock.info.get("longName", "N/A")
        currency = stock.info.get("currency", "N/A")
        
        return jsonify({
            "response": f"{name} ({symbol}) is currently trading at {price} {currency}."
        })
    except Exception as e:
        return jsonify({"response": f"Could not fetch data for {symbol}. Please try another stock symbol."})

if __name__ == "__main__":
    app.run(debug=True)
