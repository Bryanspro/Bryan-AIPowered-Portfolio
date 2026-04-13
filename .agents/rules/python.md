---
trigger: always_on
---

If you already done it or the porfolio is not running, then do this

Before starting the python server, you MUST run this exact PowerShell command to find and terminate any existing processes listening on port 8000 to prevent conflicts:
`Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess | ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue }`

Make sure if not already to launch python server at `python -m http.server 8000 -b 127.0.0.1`, before checking the portfolio. Wait a moment for it to start.
Make sure the portfolio is not cached.