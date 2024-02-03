# Shorturl Web app

![First page](/images/page_1.png "First page")

![Second page](/images/page_2.png "Second page")

## Instalation

1. Clone this repository

```git
git clone https://github.com/juaandominguez/shorturl-astro
```

2. Rename the file `application.properties.example` to `application.properties` and complete the first 3 variables for your postgres database

3. Run the backend

```bash
cd backend
mvn spring-boot:run
```

4. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

*Now you will have the backend running in port **8080** and the frontend in port **4321***

You can now shorten your urls via *http://localhost:4321*
