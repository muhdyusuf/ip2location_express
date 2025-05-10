@echo off
SETLOCAL

echo Checking for node_modules folder...

IF NOT EXIST "node_modules" (
    echo node_modules not found. Installing dependencies...
    npm install --production

    IF %ERRORLEVEL% NEQ 0 (
        echo Failed to install dependencies. Exiting...
        exit /b %ERRORLEVEL%
    )

    echo Dependencies installed successfully.
) ELSE (
    echo node_modules already exists. Skipping npm install.
)

echo Starting server...
echo ctrl+C to stop the server
node src/server.js

pause
