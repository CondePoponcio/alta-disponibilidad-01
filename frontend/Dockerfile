FROM node:16-alpine3.15 as app


ENV TZ=America/Santiago

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

#Create app directory
# Bundle app source
RUN npm install react-scripts@3.4.1 -g 
RUN npm install -g serve
COPY ./package*json /app/
RUN npm ci 
COPY . .
RUN npm run build

# nginx state for serving content
FROM nginx:1.23.1-alpine as prod

ENV TZ=America/Santiago
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

#Install dependencies
RUN apk update
RUN apk add net-tools
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=app /app/build ./

# Containers run nginx with global directives and daemon off
