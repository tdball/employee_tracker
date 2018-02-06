FROM nginx:1.13

COPY . /employee_tracker

RUN mv /employee_tracker/tracker.nginx /etc/nginx/nginx.conf

EXPOSE 3500

ENTRYPOINT nginx -g 'daemon off;'
