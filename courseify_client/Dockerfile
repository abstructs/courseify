FROM node:9.11.1
MAINTAINER Andrew Wilson 

RUN mkdir /myapp
WORKDIR /myapp
COPY package.json /myapp/package.json
COPY package-lock.json /myapp/package-lock.json

RUN npm install

COPY . /myapp

EXPOSE 3001