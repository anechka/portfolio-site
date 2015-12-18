# another virtual host using mix of IP-, name-, and port-based configuration

server {
	listen 80;
	server_name menangen.ru;

	#root /home/menagen/python-site;
	root /usr/share/nginx/python-site;
	index index.html index.htm;

	location / {
		try_files $uri $uri/ =404;
	}
}