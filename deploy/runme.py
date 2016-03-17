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

# For Python 3 fix
try: ask_user = raw_input
except NameError: ask_user = input


def colored_grey_green(text):
        CSI="\x1B["
        reset=CSI+"0m"

        return CSI+"32;2m" + text + reset


def colored_green(text):
        CSI="\x1B["
        reset=CSI+"0m"

        return CSI+"32;1m" + text + reset


def colored_mag(text):
        CSI="\x1B["
        reset=CSI+"0m"

        return CSI+"35m" + text + reset

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
    nginx_external_apt = settings.get("nginx")
    need_run_ansible = settings.get("install")

    # print(settings)
    manual = False

except:  # Manual running

    host_name = ask_user("Enter hostname " + colored_grey_green("(DNS of host or Digitalocean ip)" + ": \n"))
    host_port = ask_user("Enter SSH port " + colored_grey_green("(or press ENTER FOR 22 default)" + ": \n"))
    username = ask_user("Enter username for sudo user " + colored_grey_green("(or press ENTER FOR root)" + ": \n"))
    password = ask_user("Enter SSH password for sudo " + username + colored_grey_green(" (or press ENTER IF private key use)" + ": \n"))
    need_remove_nginx_repo = ask_user("Use " + colored_grey_green("external") + " nginx apt repo? Y/n or ENTER :\n").strip()

    nginx_external_apt = True if need_remove_nginx_repo in ("Y", "") else False
    manual = True
    need_run_ansible = False
# Loading Jinja 2 templates
try:
    print("Loading Jinja 2 settings")

    host_name = host_name.strip()
    username = username.strip()
    if type(password) is str:
        password = password.strip()
        if password == "": password = None

    if username == "": username = "root"

    if host_port in (None, "", "22"):
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

    # Template for Apt + Nginx configuration
    template = env.get_template('roles/sitedeploy/tasks/_main.j2')
    output_from_parsed_template = template.render(nginx_external=nginx_external_apt)

    # Saving Nginx repo configuration result in main.yml
    with open(current_path + "/ansible_config/roles/sitedeploy/tasks/main.yml", "wb") as fh:
        fh.write(output_from_parsed_template)

    print("\n\n" + colored_green("Saving settings completed"))

    if manual:
        setup_answer = ask_user(colored_mag("Run ansible DEPLOY task? Y/n ") + "(Y for YES or press ENTER for NO INSTALL)" +": \n").strip()
        need_run_ansible = True if setup_answer == "Y" else False

    if need_run_ansible:
        print(colored_green("Run ansible now..."))

        import subprocess
        subprocess.call(
            [
                "ansible-playbook", "-i", "{0}/ansible_config/server".format(current_path),
                "{0}/ansible_config/deploy.yml".format(current_path)
            ]
        )

except Exception, e:
    print(str(e))
    print("Error saving data to Jinja 2 templates (please checkout / reset repo to the latest commit)")