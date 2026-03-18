import unittest
from unittest.mock import patch, MagicMock
import sys

# Mock all dependencies to avoid ModuleNotFoundError
sys.modules['google'] = MagicMock()
sys.modules['google.generativeai'] = MagicMock()
sys.modules['fastapi'] = MagicMock()
sys.modules['fastapi.middleware.cors'] = MagicMock()
sys.modules['pydantic'] = MagicMock()
sys.modules['fastapi_mail'] = MagicMock()
sys.modules['psycopg2'] = MagicMock()
sys.modules['dotenv'] = MagicMock()

import main

class TestDBInit(unittest.TestCase):
    @patch('main.psycopg2')
    @patch('main.POSTGRES_URL', 'postgresql://fake_url')
    @patch('builtins.print')
    def test_init_db_postgres_exception(self, mock_print, mock_psycopg2):
        # Setup mock to raise an exception
        mock_psycopg2.connect.side_effect = Exception("Connection failed")

        # Call the function
        main.init_db()

        # Verify psycopg2.connect was called
        mock_psycopg2.connect.assert_called_with('postgresql://fake_url')

        # Verify the error message was printed
        mock_print.assert_any_call("Error initializing Postgres: Connection failed")

if __name__ == '__main__':
    unittest.main()
