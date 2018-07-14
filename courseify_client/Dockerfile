FROM node:9.11.1
MAINTAINER Andrew Wilson 

RUN mkdir /myapp
WORKDIR /myapp
COPY package.json /myapp/package.json
COPY package-lock.json /myapp/package-lock.json

RUN npm install

COPY . /myapp

# CMD["npm", "start"]

# ADD package.json $APP_HOME/

# ENV NODE_ENV=production \
#   PATH=$APP_HOME/node_modules/.bin:$PATH

# RUN npm install

# ADD . $APP_HOME

# Write the bundle.js static asset file
# RUN npm run build

# Boot the server
# CMD ["npm", "start"]