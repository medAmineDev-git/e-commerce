# Use the official Node.js image.
# Use the 'alpine' version of the image for a smaller footprint.
FROM node:16-alpine

# Create and set the working directory inside the container.
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the container.
COPY package*.json ./

# Install project dependencies.
RUN npm install --production

# Install the Nest CLI globally.
RUN npm install -g @nestjs/cli

# Install nodemon globally for development
RUN npm install --save-dev ts-node nodemon

# Copy the rest of the application code to the container.
COPY . .

# Build the NestJS application.
RUN npm run build

# Expose the port that your NestJS app runs on.
EXPOSE 3000

# Start the NestJS application.
CMD ["npm", "run", "start:dev"]
