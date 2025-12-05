@echo off
powershell -command "Write-Host '=====================================' -ForegroundColor Cyan"
powershell -command "Write-Host 'Welcome back Mr Gbadamosi!!...' -ForegroundColor Yellow"
powershell -command "Write-Host '=====================================' -ForegroundColor Cyan"

powershell -command "Write-Host 'Starting build process...' -ForegroundColor Cyan"
powershell -command "Write-Host '=====================================' -ForegroundColor Cyan"

npm run build && (
    powershell -command "Write-Host '=====================================' -ForegroundColor Green"
    powershell -command "Write-Host 'Build process completed successfully!' -ForegroundColor Green"
    powershell -command "Write-Host '=====================================' -ForegroundColor Green"
) || (
    powershell -command "Write-Host '=====================================' -ForegroundColor Red"
    powershell -command "Write-Host 'Build process failed!' -ForegroundColor Red"
    powershell -command "Write-Host '=====================================' -ForegroundColor Red"
)