FROM node

RUN npm install --global mocha
RUN npm install --global web-ext

WORKDIR /app