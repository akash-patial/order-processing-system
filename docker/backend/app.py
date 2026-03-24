from flask import Flask, request, jsonify
import redis
import json
from metrics import REQUEST_COUNT, ORDER_COUNT, metrics_endpoint

app = Flask(__name__)

# Redis connection
r = redis.Redis(host='redis', port=6379, decode_responses=True)

# Create Order (POST)
@app.route("/order", methods=["POST"])
def create_order():
    REQUEST_COUNT.inc()

    data = request.json

    order = {
        "item": data["item"],
        "quantity": data["quantity"],
        "status": "queued"
    }

    # Store in Redis (list)
    r.lpush("orders", json.dumps(order))

    ORDER_COUNT.inc()

    return jsonify({"message": "Order placed"}), 201


# Get All Orders (GET)
@app.route("/orders", methods=["GET"])
def get_orders():
    orders = r.lrange("orders", 0, -1)
    orders = [json.loads(order) for order in orders]
    return jsonify(orders)


# Health Check
@app.route("/health")
def health():
    return {"status": "ok"}


# Metrics
app.add_url_rule("/metrics", "metrics", metrics_endpoint)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)