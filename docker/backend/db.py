import psycopg2

def get_conn():
    return psycopg2.connect(
        host="postgres",
        database="orders",
        user="postgres",
        password="password"
    )

def insert_order(order):
    conn = get_conn()
    cur = conn.cursor()

    cur.execute(
        "INSERT INTO orders (item, quantity, status) VALUES (%s, %s, %s)",
        (order["item"], order["quantity"], order["status"])
    )

    conn.commit()
    cur.close()
    conn.close()