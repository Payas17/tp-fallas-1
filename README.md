# tp-fallas-1
Trabajo Práctico de la materia 75.67. Sistemas automáticos de diagnostico y deteccion de fallas I, 1° C 2020, FIUBA

## Install dependencies
```
npm i
```

## Run tests
```
npm test
```

## API

### Run Api
The following command serves the api on http://localhost:3500
```
npm start
```

### Root
```
GET http://localhost:3500/
```
```yaml
method: GET
endpoint: /
Responses:
  - status_code: 200
    body: "TP fallas I"
```

### Engine
```
GET http://localhost:3500/engine
```
```yaml
method: GET
endpoint: /engine
Parameters:
  rpm:
    type: integer
  tflp:
    type: string
    enum: [LPT, LPL]
  mp:
    type: string
    enum: [MPR, MPD]
  ph:
    type: integer
  pea:
    type: integer
  vps:
    type: string
    enum: [VPN, VPA]

Responses:
  - status_code: 200
    body: "El pozo esta limpio"
  - status_code: 200
    body: "El pozo está sucio"
```