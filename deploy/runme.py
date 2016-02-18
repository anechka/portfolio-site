#! python
# -*- coding: utf-8 -*-
from sys import argv
from os import path

from jinja2 import Environment, FileSystemLoader

# Give a arguments from swift application
try:
    host_name = argv[1]
    username = argv[2]
    password = argv[3]

except:  # Manual running

    # For Python 3 fix
    try: ask_user = raw_input
    except NameError: ask_user = input

    def colored(text):
        CSI="\x1B["
        reset=CSI+"m"

        return CSI+"21;00m" + text + CSI + "0m"

    host_name = ask_user("Enter hostname " + colored("(DNS of host or Digitalocean ip)" +": \n"))
    username = ask_user("Enter username for sudo user " + colored("(or ENTER FOR root)" +": \n"))
    password = ask_user("Enter password for this user " + username + colored("(SSH)" +": \n"))


# Loading Jinja 2 templates
try:
    host_name = host_name.strip()
    username = username.strip()
    password = password.strip()

    if username == "": username = "root"

    print("Saving to ansible hosts file host {0} and {1} user".format(host_name, username))

    current_path = path.dirname(path.abspath(__file__))
    env = Environment(loader=FileSystemLoader(current_path + '/ansible_config'))

    template = env.get_template('_hosts.j2')
    output_from_parsed_template = template.render(server=host_name)

    # to save the results in /deploy/ansible_config/hosts
    with open(current_path + "/ansible_config/hosts", "wb") as fh:
        fh.write(output_from_parsed_template)

    template = env.get_template('host_vars/_webserver.j2')
    output_from_parsed_template = template.render(server_user=username, server_port=22)

    print output_from_parsed_template

    # to save the results in /deploy/ansible_config/host_vars
    with open(current_path + "/ansible_config/host_vars/{0}.yml".format(host_name), "wb") as fh:
        fh.write(output_from_parsed_template)

except:
    print("Error saving data to Jinja 2 templates (please checkout / reset repo to latest commit)")