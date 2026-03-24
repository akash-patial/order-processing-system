from prometheus_client import Counter, generate_latest

REQUEST_COUNT = Counter("http_requests_total", "Total HTTP Requests")
ORDER_COUNT = Counter("orders_total", "Total Orders Placed")

def metrics_endpoint():
    return generate_latest()