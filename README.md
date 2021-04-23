# Chat app

## Run

`yarn dev`

## Routes

### `/settings`

```json
{
  "chat": true,
  "username": "Jonathan"
}
```

## Migrations

Create table CreateUsers - `yarn typeorm migration:create -n CreateUsers`
Run migration - `yarn typeorm migration:run`
