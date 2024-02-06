FROM node:18.15.0-slim

WORKDIR /code

COPY package.json package-lock.json ./
RUN npm install

