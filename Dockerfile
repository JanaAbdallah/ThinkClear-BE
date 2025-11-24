# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the app
COPY . .

# Expose the port your app runs on
EXPOSE 8080

# Set environment variables (optional, can also use .env file)
ENV NODE_ENV=production

# Start the app
CMD ["node", "src/server.js"]
