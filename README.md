# KrakenFlex Back End Test

## 🚀 Quick Start

1. Create a file named ".env.development.local" with the following text as env var 

```
# PORT
PORT = 3000

# TOKEN
SECRET_KEY = secretKey
API_KEY = myApiKey
KRAKEN_API_KEY = EltgJ5G8m44IzwE6UN2Y4B4NjPW77Zk6FJK3lL23

# LOG
LOG_FORMAT = dev
LOG_DIR = ../logs

# CORS
ORIGIN = *
CREDENTIALS = true
```

2. `npm install` and `npm run dev` This will start with the env var that has our API_KEY and KRAKEN_API_KEY (Yes they should not be in the repo but this is test)

3. Go to `/src/http/report.http` and use REST Client in VS Code to interact with the API, that is POST {{ baseURL }}/report/norwich-pear-tree the API_KEY=myApiKey is already attached. (Or call the api by any tool you like) 


## 🗂 Code Structure 

The files with arrows bellow are the important ones 


```
│
├──📂 .vscode
│  ├── launch.json
│  └── settings.json
│
├──📂 src
│  ├──📂 config
│  │  └── index.ts                  <-- remember to config env var api keys if not in dev
│  │
│  ├──📂 controllers
|  |  ├── report.controller.ts      <-- report api (the main task in the test)
|  |  ├── krakenflex.controller.ts  <-- all krakenflex api 
│  │  ├── auth.controller.ts        // ignore auth
│  │  └── users.controller.ts       // ignore users
│  │
│  ├──📂 dtos
│  │  └── users.dto.ts
│  │
│  ├──📂 exceptions
│  │  └── httpException.ts
│  │
│  ├──📂 http
│  │  ├── auth.http
│  │  └── users.http
│  │
│  ├──📂 interfaces
│  │  ├── event.interface.ts       <-- define event type
│  │  ├── siteInfo.interface.ts    <-- define siteInfo type
│  │  ├── apiResponse.interface.ts <-- define apiResponse type
│  │  ├── auth.interface.ts
│  │  ├── routes.interface.ts
│  │  └── users.interface.ts
│  │
│  ├──📂 middlewares
│  │  ├── validApiKey.middleware.ts <-- validApiKey middleware
│  │  ├── auth.middleware.ts
│  │  ├── error.middleware.ts
│  │  └── validation.middleware.ts
│  │
│  ├──📂 models
│  │  └── users.model.ts
│  │
│  ├──📂 routes
│  │  ├── report.route.ts     <-- report route
│  │  ├── krakenflex.route.ts <-- krakenflex api route
│  │  ├── auth.route.ts
│  │  └── users.route.ts
│  │
│  ├──📂 services
│  │  ├── report.service.ts     <-- filter and report logic
│  │  ├── krakenflex.service.ts <-- service to call krakenflex api
│  │  ├── auth.service.ts
│  │  └── users.service.ts
│  │
│  ├──📂 test
│  │  └── report.test.ts       <- report test 
│  │
│  ├──📂 utils
│  │  ├── logger.ts
│  │  └── vaildateEnv.ts
│  │
│  ├── app.ts
│  └── server.ts
│
├── .dockerignore
├── .editorconfig
├── .env.development.local
├── .env.production.local
├── .env.test.local
├── .eslintignore
├── .eslintrc
├── .gitignore
├── .huskyrc
├── .lintstagedrc.json
├── .prettierrc
├── .swcrc
├── docker-compose.yml
├── Dockerfile.dev
├── Dockerfile.prod
├── ecosystem.config.js
├── jest.config.js
├── Makefile
├── nginx.conf
├── nodemon.json
├── package-lock.json
├── package.json
├── swagger.yaml
└── tsconfig.json
```

## ☎️ API

It has all the kraken api working in swagger

1. `GET /outages` which returns all outages in our system
2. `GET /site-info/{siteId}` which returns specific information about a site
3. `POST /site-outages/{siteId}` which expects outages for a specific site to be posted to it


And it's own API working in report.http

4. `POST /report/{siteId}` Given a siteId, report the relevant outages events to `POST /site-outages/{siteId}`

## 🧪 Test

run `npm test` to test or try it in `report.http` 

## 🥡 Models

```
Site:
siteId: readable name, e.g  "id: norwich-pear-tree"
```
> A siteId has multiple deviceId
```
Device:
id (deviceId): hex code of devices, e.g "id": "002b28fc-283c-47ec-9af2-ea287336dc1b", 
name (deviceName): readable name, e.g "name": "Battery 1"
```
> A deviceId has mulitple outages events with begin and end timestamp 
```
Event:
end: timestamp string
begin: timestamp string
id (deviceId)
```

## 🛎 Available Commands for the Server

- Run the Server in production mode : `npm run start`
- Run the Server in development mode : `npm run dev` with dev api keys
- Run all unit-tests : `npm test` 
- Check for linting errors : `npm run lint`
- Fix for linting : `npm run lint:fix`
