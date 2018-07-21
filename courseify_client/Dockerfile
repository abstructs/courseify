FROM node:9.11.1
MAINTAINER Andrew Wilson 

RUN mkdir /frontend
WORKDIR /frontend
COPY package.json /frontend/package.json
COPY package-lock.json /frontend/package-lock.json

RUN npm install

COPY . /frontend

# RUN npm run build

EXPOSE 3001
