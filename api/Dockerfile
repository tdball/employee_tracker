FROM python:3.6

COPY * /api/

WORKDIR /api

RUN pip install -r requirements.txt && \
    useradd -M uwsgi

EXPOSE 3100

ENTRYPOINT uwsgi -i uwsgi.ini