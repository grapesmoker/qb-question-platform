# qb-question-platform
A question submission, writing, and editing platform for quizbowl tournaments

# Getting started

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
./manage.py migrate
```

You should get a message that says that a bunch of migrations have been run.
