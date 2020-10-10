# Film Fanatic

Browse, rate and comment on your favorite films. Made with Express and React.

## Dev Setup

```
    npm i && npm i --prefix client
    npm run dev
```

## Run on in Production

```
    npm i && npm run deploy
```

## Run using PM2

After installing dependencies, you can setup the `NODE_ENV` and start the server by running

```
  NODE_ENV=production pm2 start server.js
```

You can also set more variables by creating a new config file and pointing to that. See [PM2 docs.](https://pm2.io/docs/runtime/best-practices/environment-variables/)
