@echo off
echo ========================================
echo    Slideshow Website Docker Starter
echo ========================================
echo.

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker is not running!
    echo Please start Docker Desktop and try again.
    echo.
    pause
    exit /b 1
)

echo Docker is running. Building and starting the container...
echo.
echo This may take a few minutes on first run...
echo.

REM Build and start the container
docker-compose up --build

echo.
echo Container stopped. Press any key to exit...
pause >nul
