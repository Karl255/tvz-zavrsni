# Lokalno pokretanje

## PostgreSQL baza podataka

Potrebno je imati instaliranu PostgreSQL bazu podataka. Podatke za spajanje na nju je potrebno dodati u `.env.dev` datoteku u korijenu projekta. Te vrijednosti će se učitati kao environment varijable pri pokretanju aplikacije sa `npm run dev`. Slijedeća tablica prikazuje varijable koje možemo koristiti (uz dodatak POSTGRES_URL-a):

| Option          | Environment Variables |
|-----------------|-----------------------|
| host            | PGHOST                |
| port            | PGPORT                |
| database        | PGDATABASE            |
| username        | PGUSERNAME or PGUSER  |
| password        | PGPASSWORD            |
| idle_timeout    | PGIDLE_TIMEOUT        |
| connect_timeout | PGCONNECT_TIMEOUT     |
| url (dodatno)   | POSTGRES_URL          |

Također je potrebno imati env varijablu JWT_SECRET (64B enkodirano u base64).

Primjer:

```sh
# .env.dev
export PGDATABASE=tvz-zavrsni
export PGUSERNAME=postgres
export PGPASSWORD=postgres
export JWT_SECRET=4XOj3bFVrVrZrCVC4HkQyV++43VUP7rxMgOKJ2ku630xNy3nWqMGCVyQK+lKcQb/xyLVXClzrz7G8AmdaC5G1A==
```

Ova funkcionalnost dolazi od postgres biblioteke. [Dokumentaicja](https://www.npmjs.com/package/postgres#environmental-variables).

**Bazu je potrebno inicijalizirati sa SQL skriptom `src/scripts/initDb.sql` ili `src/scripts/fullExport.sql` (druga skripta takđer sadrži podatke).**



## NPM

Preporučeno je koristiti jednu od implementacija NVM-a (Node Version Manager). Korištena verzija NPM-a se nalazi u `.nvmrc` datoteci, a nju možemo učitati s `nvm use`. Instalirati dependency-je s `npm i`.

```sh
nvm use
npm i
```



## Pokretanje

Projekt pokrećemo s:

```sh
npm run dev
```

Ako želimo pokrenuti projekt bez učitavanja `.env.dev` datoteke:

```sh
npm run dev-no-env
```

Pokretanje je testirano na Linuxu (Ubuntu 20.04 WSL) u bash i fish ljuskama.
