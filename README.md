# Chat app

## Run

`yarn dev`

## Routes

| Route       | Type | Input |
| ----------- | :--: | ----: |
| `/settings` | POST |     1 |

```json
1.
{
  "chat": true,
  "username": "Jonathan"
}
```

## Migrations

Create table CreateUsers - `yarn typeorm migration:create -n CreateUsers`
Run migration - `yarn typeorm migration:run`
