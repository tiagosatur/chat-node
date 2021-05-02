# Chat app :fire:

A node websocket sqlite chat app built in NLW5 with learning purposes.

It uses pure html-css-js (no frontend framewoks).

## Next steps :shoe:

- [ ] Refactor css
- [ ] Refactor js and naming
- [ ] Improve admin panel user experience: split screen into two columns with a list of users (highlited with red meaning that needs assistence) and other wiht the actual messages

## Run :running:

## First access

`yarn install`
`yarn typeorm migration:run`

## Subsequent access

`yarn dev`

You will be able to access this routes:

- Client [http://localhost:3333/pages/client](http://localhost:3333/pages/client)
- Admin [http://localhost:3333/pages/admin](http://localhost:3333/pages/admin)

Start chatting

## Migrations :alien:

Run the migrations is necessary to create the src/database/database.sqlite file

You can visualize the data saved into the database using Beekeper Studio

Create table CreateUsers - `yarn typeorm migration:create -n CreateUsers`

Run migration - `yarn typeorm migration:run`
