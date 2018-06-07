# ansible-configurator
Please install ansible by

`brew install ansible`
or by

Pip is not installed?

`sudo easy_install pip`

If you have pip installed (python 2.7.11 or above / python 3)

`sudo pip install ansible`

[Download from releases](https://github.com/anechka/portfolio-site/releases) and put **ansible-configurator** Mac OS X application in this folder.

And run it from here.

This Mac application saves settings by calling Python script and running Jinja2 templates compilation into inventory ansible file and tasks in YAML files.

After running program you will have 2 files:

**deploy.yml** `tasks`

**server** `inventory file`


and new file in deploy/ansible_config/host_vars with DNS name or IP of the web server .yml as example: **localhost.yml**. This is all what you need before running ansible.

#ALSO#
You can just run **runme.py** script:

`python runme.py`
and answer interactive questions

***prefer Python 2.7.>=11*** installed in system from python.org


##Developers:

***<mailto:punkoivan@yandex.ru>*** ansible roles

***<mailto:menangen@gmail.com>*** swift application, gulp