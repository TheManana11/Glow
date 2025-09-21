# STEP 1: Use Node.js lightweight image
FROM node:18-alpine

# STEP 2: Set working directory inside container
WORKDIR app

# STEP 3: Copy package.json and package-lock.json first for caching
COPY package*.json ./

# STEP 4: Install dependencies
RUN npm install

# STEP 5: Copy all project files to container
COPY . .

# STEP 6: Expose NestJS default port
EXPOSE 3000

# STEP 7: Run the NestJS app
CMD ["npm", "run", "start:dev"]
