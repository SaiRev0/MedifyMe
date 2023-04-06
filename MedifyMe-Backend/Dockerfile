# Stage 1: Install dependencies
FROM node:18-alpine AS dependencies

# Set the working directory to /
WORKDIR /

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Stage 2: Create the production image
FROM node:18-alpine

# Set the working directory to /
WORKDIR /

# Copy only the necessary files from the previous stage
COPY --from=dependencies /package*.json ./
COPY --from=dependencies /node_modules/ ./node_modules/
COPY . .

# Expose port 6969
EXPOSE 6969

# Set environment variables
ENV DB_URL=link
ENV PORT=6969

# Start the application
CMD [ "npm", "start" ]
