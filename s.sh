#!/bin/bash

# Draw starting build process message in cyan
echo -e "\033[36m=====================================\033[0m"
echo -e "\033[33mStarting build process...\033[0m"
echo -e "\033[36m=====================================\033[0m"

# Run the build process
npm run build
if [ $? -ne 0 ]; then
    echo -e "\033[31m=====================================\033[0m"
    echo -e "\033[31mBuild failed with error level $?\033[0m"
    echo -e "\033[31m=====================================\033[0m"
    exit $?
fi

echo -e "\033[32m=====================================\033[0m"
echo -e "\033[32mBuild succeeded, starting the application...\033[0m"
echo -e "\033[32m=====================================\033[0m"

# Start the application
npm start
if [ $? -ne 0 ]; then
    echo -e "\033[31m=====================================\033[0m"
    echo -e "\033[31mStart failed with error level $?\033[0m"
    echo -e "\033[31m=====================================\033[0m"
    exit $?
fi

echo -e "\033[32m=====================================\033[0m"
echo -e "\033[32mApplication started successfully!\033[0m"
echo -e "\033[32m=====================================\033[0m"