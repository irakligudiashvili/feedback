FROM python:3.13-slim

WORKDIR /app

COPY . /app

RUN apt-get update && apt-get install -y build-essential libpq-dev libselinux1-dev

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

EXPOSE 8001

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]
