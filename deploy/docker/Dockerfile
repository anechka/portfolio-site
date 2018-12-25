FROM alpine:3.8
MAINTAINER Menangen <menangen@gmail.com>

RUN apk --no-cache add tar curl

#Install Caddy Server, and All Middleware
RUN curl "https://caddyserver.com/download/linux/amd64?license=personal&telemetry=off" \
    | tar --no-same-owner -C /usr/bin/ -xz caddy

#Copy over a default Caddyfile
COPY ./Caddyfile /etc/caddy/Caddyfile
COPY certs/.caddy /root/.caddy
COPY dist/ /var/www/html

EXPOSE 80
EXPOSE 443
WORKDIR /var/www/html

CMD ["/usr/bin/caddy", "-conf=/etc/caddy/Caddyfile"]