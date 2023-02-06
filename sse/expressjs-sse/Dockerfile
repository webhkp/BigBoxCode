FROM node:16

# Create app directory
WORKDIR /usr/src/app

RUN npm install -g nodemon

COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]