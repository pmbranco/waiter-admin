FROM node:boron
LABEL maintainer="samuel.joset@epitech.eu"

# Create app directory
WORKDIR /usr/src/public
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json ./

RUN npm install
# RUN npm install --only=production

COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]
