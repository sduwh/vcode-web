FROM nginx:stable

COPY ./dist /app

COPY nginx/default.conf /etc/nginx/nginx.conf