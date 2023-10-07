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
HOST_NAME=http://localhost:3000/

MONGO_URL=mongodb+srv://hoangthaininh:eGn5pjhjqAxlbkbP@fashionstore.u6yxipf.mongodb.net/fashiondb?retryWrites=true&w=majority
JWT_SECRET_SEED=
NEXTAUTH_SECRET=

# Variables public
NEXT_PUBLIC_TAX_RATE=0.20

# Providers:
GITHUB_ID=15fb3ec109f5bebceeac
GITHUB_SECRET=8c0fe9f6b7f7d7cab01cd6c34d5d12b2509440a6

GOOGLE_CLIENT_ID=549521749676-1r3etsvkdqgmgp3ihb1rei4tvi1qvc4f.apps.googleusercontent.com
GOOGLE_SECRET=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

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
# fashion-store
# fashion-store
