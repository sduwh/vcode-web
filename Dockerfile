FROM nginx:stable-alpine

COPY ./dist /app

COPY nginx/default.conf /etc/nginx/nginx.conf