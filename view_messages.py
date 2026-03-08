import sqlite3
import os
from datetime import datetime

DB_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'portfolio.db')

def view_messages():
    if not os.path.exists(DB_FILE):
        print("Database does not exist yet. No messages received!")
        return

    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    
    try:
        cursor.execute("SELECT id, name, email, message, created_at FROM messages ORDER BY created_at DESC")
        rows = cursor.fetchall()
        
        if not rows:
            print("No messages found in the inbox.")
            return

        print(f"=== PORTFOLIO INBOX ({len(rows)} messages) ===\n")
        for row in rows:
            msg_id, name, email, content, timestamp = row
            print(f"[{timestamp}] Message #{msg_id}")
            print(f"From: {name} <{email}>")
            print(f"Message: {content}")
            print("-" * 50)
            
    except sqlite3.OperationalError:
        print("Table 'messages' not found. It will be created on the first submission.")
    finally:
        conn.close()

if __name__ == "__main__":
    view_messages()
