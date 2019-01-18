# kovi-api
Repositório para teste de API utilizando Serverless Framework e Lambda AWS


## Instalar

    npm install

## Executar API

    serverless offline start

## Testar API

### Parâmetros
    No Headers configurar as seguintes chaves(key) e valores(value):
    Content-Type       application/json
    Authorization      < string passada no e-mail >

    No body:
    {
        "lat1": "-23.5697121",
        "long1": "-46.5364942",
        "lat2": "-23.570473",
        "long2": "-46.5365351"
    }


    Acesso local:

    http://localhost:3000/calc

    Acesso via AWS:

    https://yarees6p6d.execute-api.us-east-1.amazonaws.com/dev/calc



## Resultado esperado


