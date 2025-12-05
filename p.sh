#!/bin/bash

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

print_green() {
    echo -e "${GREEN}====================================="
    echo -e "$1"
    echo -e "=====================================${NC}"
}

print_red() {
    echo -e "${RED}====================================="
    echo -e "$1"
    echo -e "=====================================${NC}"
}

# Get the current timestamp in a readable format
TIMESTAMP=$(date "+%A, %d-%m-%Y, %I:%M%p")

# Start build process
print_green "Starting the build process..."

npm run build
if [ $? -ne 0 ]; then
    print_red "Build failed. Aborting push process."
    exit 1
fi

print_green "Build successful. Proceeding with commit and push process..."

# Stage all changes
git add .
git commit -m "Auto-commit on $TIMESTAMP" || print_red "No changes to commit."

# Push to origin
git push origin dev --force
if [ $? -ne 0 ]; then
    print_red "Push to origin failed with error level $?"
    exit 1
fi
print_green "Push to origin successful!"

# Push to production
git push Production dev --force
if [ $? -ne 0 ]; then
    print_red "Push to production failed with error level $?"
    exit 1
fi
print_green "Push to production successful!"

# Push to MainProd
# git push origin dev:main --force

if [ $? -ne 0 ]; then
    print_red "Push to MainProd failed with error level $?"
    exit 1
fi
print_green "Push to MainProd successful!"

print_green "Push process completed successfully!"