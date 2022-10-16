FROM node:18-alpine3.15 as builder


ENV TZ=America/Santiago

ENV NODE_ENV development

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app

#ENV PATH /app/node_modules/.bin:$PATH
RUN npm install -g serve

# Bundle app source
COPY ./package* /app/
RUN npm ci 
COPY . .

# Bundle production source
RUN npm run build

# nginx state for serving content
FROM nginx:1.23.1-alpine as prod

ENV NODE_ENV production
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
COPY --from=builder /app/build ./

# Containers run nginx with global directives and daemon off

