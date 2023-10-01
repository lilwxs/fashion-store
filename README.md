# Next.js Telo Shop

To run locally, you need the database.

```
docker-compose up -d
```

- The -d, means **detached**

## Configure environment variables

Rename the file **.env.template** to **.env**

- MongoDB Local URL:

```
MONGO_URL=mongodb://localhost:27017/teslodb
```

- Rebuild node modules and build Next

```
yarn install
yarn dev
```

## Fill the database with testing information

Call to:

```
http://localhost:3000/api/seed
```
