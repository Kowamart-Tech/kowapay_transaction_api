@echo off
:: Draw starting build process message in cyan
powershell -command "Write-Host '=====================================' -ForegroundColor Cyan"
powershell -command "Write-Host 'Starting build process...' -ForegroundColor Yellow"
powershell -command "Write-Host '=====================================' -ForegroundColor Cyan"

:: Run the build process
call npm run build
if %errorlevel% neq 0 (
    powershell -command "Write-Host '=====================================' -ForegroundColor Red"
    powershell -command "Write-Host 'Build failed with error level %errorlevel%' -ForegroundColor Red"
    powershell -command "Write-Host '=====================================' -ForegroundColor Red"
    exit /b %errorlevel%
)

powershell -command "Write-Host '=====================================' -ForegroundColor Green"
powershell -command "Write-Host 'Build succeeded, starting the application...' -ForegroundColor Green"
powershell -command "Write-Host '=====================================' -ForegroundColor Green"

call npm start
if %errorlevel% neq 0 (
    powershell -command "Write-Host '=====================================' -ForegroundColor Red"
    powershell -command "Write-Host 'Start failed with error level %errorlevel%' -ForegroundColor Red"
    powershell -command "Write-Host '=====================================' -ForegroundColor Red"
    exit /b %errorlevel%
)

powershell -command "Write-Host '=====================================' -ForegroundColor Green"
powershell -command "Write-Host 'Application started successfully!' -ForegroundColor Green"
powershell -command "Write-Host '=====================================' -ForegroundColor Green"