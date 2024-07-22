
# Use a specific version of the Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm install
RUN npm install react-scripts -g --silent

# Add app source code
COPY . ./

# Expose port for the app
EXPOSE 3000

# Start app in development mode
CMD ["npm", "start"]
