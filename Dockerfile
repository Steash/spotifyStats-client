# Use the official Node.js image as the base
FROM node:16.16.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Build the Vue.js app
RUN npm run build

# Expose the default port of the Vue.js app
EXPOSE 8080

# Specify the command to start the Vue.js app
CMD [ "npm", "run", "serve" ]
