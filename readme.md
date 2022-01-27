## About
A boilerplate for crud REST api with hapi, sequelize, joi, and postgresql.

## Installation
First, make a database with certain tables.

```
CREATE TABLE public.books (
    id bigint NOT NULL,
    title character varying(255) NOT NULL,
    year integer NOT NULL,
    author_id bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);

CREATE TABLE public.authors (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_author_id_foreign FOREIGN KEY (author_id) REFERENCES public.authors(id) ON DELETE CASCADE;
```

Set an .env
```
ENV=dev

APP_NAME=hapi-rest
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_HOST=127.0.0.1
APP_URL=http://localhost
APP_PORT=3000

DB_CONNECTION=postgres
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=db_hapi_rest
DB_USERNAME=
DB_PASSWORD=

UPLOAD_FOLDER = 'static/uploads/'

JWT_SECRET_KEY=secret-
```

Install packages
```
npm install
```

Then run with the command
```
npm start
```

Open this link on your browser or use Postman instead.
```
http:://127.0.0.1:{yourPort}/books
```