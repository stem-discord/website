# Branch is pretty stable. Just do npm install and everything should work pretty fine. Make sure you have vue cli installed

# node

uses `v15.5.0`. all other module dependencies only work with `v15`. if you project doesn't work just delete `node_modules` and abuse npm

# express

this project uses express as backend. if you want to run this server WITH the backend, `do npm run express`  
make sure to run `npm run build` so vue can build files to `./dist/`

# website

[stem.help](https://stem.help)

# database

now before u guys go flaming on me on git, i know that json db is bad but i need to make this thing until 29th or smth so please let me use a simple known method that i cant fk up

# configuring
```env
HTTP_PORT=80
HTTPS_PORT=443
DISCORD_CLIENT_SECRET=the discord application token
DISCORD_BOT_TOKEN=the discord BOT token```

# vue setup

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
