#! python
# -*- coding: utf-8 -*-
from sys import argv
from os import path
from base64 import b64decode
from json import loads

from jinja2 import Environment, FileSystemLoader

# Loading Jinja 2 Template engine
current_path = path.dirname(path.abspath(__file__))
env = Environment(loader=FileSystemLoader(current_path + '/ansible_config'))


# Give a arguments from swift application
try:
    base64String = argv[1]
    print("Decoding Base64")

    json_data = b64decode(base64String)
    settings = loads(json_data)

    host_name = settings.get("host")
    username = settings.get("username")
    password = settings.get("password")
    host_port = settings.get("port")

    print(settings)

except:  # Manual running

    # For Python 3 fix
    try: ask_user = raw_input
    except NameError: ask_user = input

    def colored(text):
        CSI="\x1B["
        reset=CSI+"m"

        return CSI+"21;00m" + text + CSI + "0m"

    host_name = ask_user("Enter hostname " + colored("(DNS of host or Digitalocean ip)" +": \n"))
    host_port = ask_user("Enter SSH port " + colored("(or press ENTER FOR 22 default)" +": \n"))
    username = ask_user("Enter username for sudo user " + colored("(or press ENTER FOR root)" +": \n"))
    password = ask_user("Enter SSH password for sudo " + username + colored("(or press ENTER IF private key use)" +": \n"))


# Loading Jinja 2 templates
try:
    host_name = host_name.strip()
    username = username.strip()
    if type(password) is str:
        password = password.strip()
        if password == "": password = None

    if username == "": username = "root"

    if host_port is None or host_port == "":
        print("SSH port is 22 default")
        host_port = 22
    else:
        print("WARNING: ssh port is not standart")
        if type(host_port) is str: host_port = host_port.strip()

    if password is None:
        print("Use private key added by ssh-add ~/.ssh/private_rsa")
        is_sudo_uses = False
    else:
        is_sudo_uses = True

    # Deploy template
    template = env.get_template('_anyasite.j2')
    output_from_parsed_template = template.render(need_sudo=is_sudo_uses)
    with open(current_path + "/ansible_config/deploy.yml", "wb") as fh:
        fh.write(output_from_parsed_template)

    print("Saving to ansible hosts file: {0}.yml and {1} user".format(host_name, username))

    # Server inventory file template
    template = env.get_template('_hosts.j2')
    output_from_parsed_template = template.render(server=host_name)

    # Saving result in 'server' as an ansible inventory file
    with open(current_path + "/ansible_config/server", "wb") as fh:
        fh.write(output_from_parsed_template)

    # Template for Host configuration
    template = env.get_template('host_vars/_webserver.j2')
    output_from_parsed_template = template.render(server_user=username, server_port=host_port, password=password)

    # Saving result in /deploy/ansible_config/host_vars folder
    with open(current_path + "/ansible_config/host_vars/{0}.yml".format(host_name), "wb") as fh:
        fh.write(output_from_parsed_template)

except Exception, e:
    print(str(e))
    print("Error saving data to Jinja 2 templates (please checkout / reset repo to the latest commit)")