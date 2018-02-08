FROM python:3.6

COPY * /api/

WORKDIR /api

RUN pip install -r requirements.txt

EXPOSE 3100

ENTRYPOINT python /api/geo_scrape_api.py