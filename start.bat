@echo off
echo Starting BADARO Shipping Integrated Portal...

echo.
echo Starting Backend Server (Port: 8800)...
start "BADARO-Backend" cmd /c "cd backend && npm run dev"

echo.
echo Starting Frontend Server (Port: 3800)...
start "BADARO-Frontend" cmd /c "cd frontend && npm run dev"

echo.
echo Waiting for servers to initialize...
timeout /t 5 /nobreak > nul

echo.
echo Opening BADARO Portal in browser...
start http://localhost:3800

echo.
echo BADARO is starting up!
echo Backend: http://localhost:8800
echo Frontend: http://localhost:3800
echo.
pause
