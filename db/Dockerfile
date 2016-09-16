FROM postgres:9.5

ENV POSTGRES_USER hack
ENV POSTGRES_PASSWORD zurich

ADD setup.sql /docker-entrypoint-initdb.d
