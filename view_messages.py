import sqlite3
import os
import sys
from datetime import datetime

# Load .env for Postgres URL
from dotenv import load_dotenv
env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env')
load_dotenv(env_path)

try:
    import psycopg2
except ImportError:
    psycopg2 = None

DB_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'portfolio.db')
POSTGRES_URL = os.getenv("POSTGRES_URL") or os.getenv("DATABASE_URL")


def print_messages(rows, source_label):
    """Pretty-print a list of message rows."""
    if not rows:
        print(f"  No messages found.\n")
        return
    print(f"  {len(rows)} message(s)\n")
    for row in rows:
        msg_id, name, email, content, timestamp = row
        print(f"  [{timestamp}] Message #{msg_id}")
        print(f"  From: {name} <{email}>")
        print(f"  Message: {content}")
        print(f"  {'-' * 46}")


def view_postgres():
    """View messages from the production Postgres database."""
    if not POSTGRES_URL:
        print("  Postgres URL not configured (no DATABASE_URL or POSTGRES_URL in .env)")
        print("  Skipping Postgres check.\n")
        return False
    if not psycopg2:
        print("  psycopg2 not installed. Run: pip install psycopg2-binary")
        print("  Skipping Postgres check.\n")
        return False

    try:
        conn = psycopg2.connect(POSTGRES_URL)
        cursor = conn.cursor()
        cursor.execute("SELECT id, name, email, message, created_at FROM messages ORDER BY created_at DESC")
        rows = cursor.fetchall()
        print_messages(rows, "Postgres")
        conn.close()
        return True
    except Exception as e:
        print(f"  Error connecting to Postgres: {e}\n")
        return False


def view_sqlite():
    """View messages from the local SQLite database."""
    if not os.path.exists(DB_FILE):
        print("  Local database (portfolio.db) does not exist yet.\n")
        return False

    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute("SELECT id, name, email, message, created_at FROM messages ORDER BY created_at DESC")
        rows = cursor.fetchall()
        print_messages(rows, "SQLite")
        conn.close()
        return True
    except sqlite3.OperationalError:
        print("  Table 'messages' not found in local DB.\n")
        return False


def view_messages():
    print("=" * 50)
    print("  PORTFOLIO INBOX VIEWER")
    print("=" * 50)

    # Check which mode to show
    show_postgres = "--local" not in sys.argv
    show_sqlite = "--prod" not in sys.argv

    if show_postgres:
        print(f"\n{'=' * 50}")
        print("  PRODUCTION DATABASE (Neon Postgres)")
        print(f"{'=' * 50}")
        view_postgres()

    if show_sqlite:
        print(f"{'=' * 50}")
        print("  LOCAL DATABASE (SQLite)")
        print(f"{'=' * 50}")
        view_sqlite()

    print("=" * 50)
    print("  Usage:")
    print("    python view_messages.py          Show all")
    print("    python view_messages.py --prod    Postgres only")
    print("    python view_messages.py --local   SQLite only")
    print("=" * 50)


if __name__ == "__main__":
    view_messages()
