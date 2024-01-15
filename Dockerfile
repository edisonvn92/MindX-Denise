FROM nginx:1.14.1-alpine
COPY ./dist /var/www/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
