FROM node:18-alpine3.15 as builder

# Get ARGS
ARG API_SERVER
ENV API_SERVER $API_SERVER
# Setting Time Zone
ENV TZ=America/Santiago
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Bundle app source
WORKDIR /app
COPY ./package* /app/
RUN npm ci 
COPY . .

# Bundle production source
RUN npm run build

# Nginx state for serving content
FROM nginx:1.23.1-alpine as prod

# GET ARGS
ENV API_SERVER $API_SERVER
# Setting Time Zone
ENV TZ=America/Santiago
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Remove default nginx static assets
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

# Copy default configuration
COPY ./default.conf /etc/nginx/conf.d/

# Copy static assets from builder stage
COPY --from=builder /app/build ./

# Containers run nginx with global directives and daemon off
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
