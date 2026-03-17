import unittest
from unittest.mock import patch, MagicMock
import sqlite3
import os
import sys
from io import StringIO

# Mock dotenv to prevent ImportError since it's not installed in this restricted env
sys.modules['dotenv'] = MagicMock()

# Since there is no 'tests' directory at the root and this is a new file
# the path resolution requires appending the parent directory
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import view_messages

class TestViewMessages(unittest.TestCase):
    @patch('sys.stdout', new_callable=StringIO)
    @patch('view_messages.sqlite3.connect')
    @patch('view_messages.os.path.exists')
    def test_view_sqlite_operational_error(self, mock_exists, mock_connect, mock_stdout):
        # Setup mock to simulate local database existing
        mock_exists.return_value = True

        # Setup mock to simulate OperationalError when connecting/querying
        mock_connect.side_effect = sqlite3.OperationalError("no such table: messages")

        # Call the function
        result = view_messages.view_sqlite()

        # Assert the result is False
        self.assertFalse(result)

        # Assert the correct error message was printed
        self.assertIn("  Table 'messages' not found in local DB.\n", mock_stdout.getvalue())

if __name__ == '__main__':
    unittest.main()
