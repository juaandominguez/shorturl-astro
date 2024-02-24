# Shorturl Web app

![First page](/images/page_1.png "First page")

![Second page](/images/page_2.png "Second page")

## Instalation

Clone this repository

```git
git clone https://github.com/juaandominguez/shorturl-astro
```

### Using Docker

1. Rename `env.example` to `env` and set the password for your postgres database

2. Run the docker images

```bash
docker compose up
```

### Manually

1. Rename the file `backend/env.example` to `backend/env` and fill the database variables

2. Run the backend

```bash
cd backend
mvn spring-boot:run
```

3. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

\*Now you will have the backend running in port **8080** and the frontend in port **4321\***

You can now shorten your urls via _http://localhost:4321_
