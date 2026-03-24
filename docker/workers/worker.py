import redis
import json
import time
import psycopg2

r = redis.Redis(host='redis', port=6379, decode_responses=True)

def get_conn():
    return psycopg2.connect(
        host="postgres",
        database="orders",
        user="postgres",
        password="password"
    )

def process(order):
    print(f"Processing order: {order}")
    time.sleep(2)

    conn = get_conn()
    cur = conn.cursor()

    cur.execute(
        "INSERT INTO orders (item, quantity, status) VALUES (%s, %s, %s)",
        (order["item"], order["quantity"], "completed")
    )

    conn.commit()
    cur.close()
    conn.close()

while True:
    data = r.brpop("order_queue", timeout=5)
    if data:
        order = json.loads(data[1])
        process(order)