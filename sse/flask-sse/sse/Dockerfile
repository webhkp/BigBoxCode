FROM python:3-alpine

WORKDIR /app

COPY ./requirements.txt /app
RUN pip install -r requirements.txt

COPY . .

EXPOSE 80
ENV FLASK_APP=flask_sse.py
CMD ["flask", "run", "--host", "0.0.0.0", "--port", "80"]