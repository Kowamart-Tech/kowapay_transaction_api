@echo off

powershell -command "Write-Host '=====================================' -ForegroundColor Green"
powershell -command "Write-Host 'Starting the push process...' -ForegroundColor Green"
powershell -command "Write-Host '=====================================' -ForegroundColor Green"

git push

if %errorlevel% neq 0 (
    powershell -command "Write-Host '=====================================' -ForegroundColor Red"
    powershell -command "Write-Host 'Push to origin failed with error level %errorlevel%' -ForegroundColor Red"
    powershell -command "Write-Host '=====================================' -ForegroundColor Red"
    exit /b %errorlevel%
)
git push origin dev:main --force

powershell -command "Write-Host '=====================================' -ForegroundColor Green"
powershell -command "Write-Host 'Push process completed successfully!' -ForegroundColor Green"
powershell -command "Write-Host '=====================================' -ForegroundColor Green"