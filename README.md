# qb-question-platform
A question submission, writing, and editing platform for quizbowl tournaments

# Getting started - backend

You'll want to create a virtual environment for development purposes. Typically this is done using the `virtualenv`
command, which should be available on whatever system you're developing on via your package manager. Clone this repo
and initialize a virtual environment as follows: 

```commandline
git clone git@github.com:grapesmoker/qb-question-platform.git
cd qb-question-platform
virtualenv ./venv
source ./venv/bin/activate
pip install -r requirements.txt
```

This will create the virtual environment, initialize it, and install the Python requirements. Next, you will want to 
create the database models:

```commandline
cd qbplatform
./manage.py migrate
```

You should get a message that says that a bunch of migrations have been run. In general, if any new migrations are added
at any point, you will want to run the `migrate` command above to make sure that your local development database is up
to date with the migrations.

The first time you set up, you will also want to create a local superuser in the database:

```commandline
./manage.py createsuperuser
```

Follow the prompts to create a local superuser. These credentials will not be used in production, so feel free to use
anything you want. You only need to do this once. Now you should be able to launch the development server:

```commandline
./manage.py runserver
```

This will make the development server available on your localhost at http://127.0.0.1:8000. Navigate to this url to
verify that your setup is running correctly, and then visit the `/admin` endpoint to log into the admin interface with
the superuser credentials you created.

## django_extensions

The `django-extensions` package is part of the `requirements.txt`. It provides a number of very convenient utilities for
debugging Django, including an entrypoint to a Python REPL (IPython, also included) that automatically activates the
Django environment and imports your models. To use it, simply do

```commandline
./manage.py shell_plus
```
