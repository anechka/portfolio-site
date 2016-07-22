FROM alpine:3.4
MAINTAINER Menangen <menangen@gmail.com>

RUN apk --no-cache add tar curl

#Install Caddy Server, and All Middleware
RUN curl "https://caddyserver.com/download/build?os=linux&arch=amd64" \
    | tar --no-same-owner -C /usr/bin/ -xz caddy

#Copy over a default Caddyfile
COPY ./Caddyfile /etc/Caddyfile
COPY dist/ /var/www/html

EXPOSE 80
WORKDIR /var/www/html

CMD ["/usr/bin/caddy"]