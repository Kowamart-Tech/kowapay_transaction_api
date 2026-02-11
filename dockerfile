# Use Node.js LTS as base image
FROM node:25-alpine

# Set working directory
WORKDIR /app

# Copy package.json & package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your code
COPY . .

# Expose the port your app runs on
EXPOSE 4300

# Start the app
CMD ["npm", "start"]  
