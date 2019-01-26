FROM scratch

COPY bin/caddy ./caddy
COPY ./Caddyfile ./Caddyfile
COPY certs/.caddy/ .caddy/

COPY dist/ /var/www/html

EXPOSE 80
EXPOSE 443
WORKDIR ./

CMD ["./caddy", "-agree=true", "-conf=Caddyfile"]