# Lokalno pokretanje

## Setup

TODO

https://www.npmjs.com/package/postgres#environmental-variables

```sh
export PGDATABASE=
export PGUSERNAME=
export PGPASSWORD=
```

| Option          | Environment Variables |
|-----------------|-----------------------|
| host            | PGHOST                |
| port            | PGPORT                |
| database        | PGDATABASE            |
| username        | PGUSERNAME or PGUSER  |
| password        | PGPASSWORD            |
| idle_timeout    | PGIDLE_TIMEOUT        |
| connect_timeout | PGCONNECT_TIMEOUT     |

## Pokretanje

Naredba za pokretanje projekta:

```sh
npm run dev
```

Pokretanje je testirano na Linuxu (Ubuntu 20.04 WSL) u bash i fish ljuskama.
