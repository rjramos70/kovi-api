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


### URLs

    Acesso local:

    http://localhost:3000/calc

    Acesso via AWS:

    https://yarees6p6d.execute-api.us-east-1.amazonaws.com/dev/calc



## Resultado esperado

Teste local:

![screenshot](https://github.com/rjramos70/kovi-api/blob/master/images/Screen%20Shot%202019-01-18%20at%2021.21.20.png)


Teste na AWS:

<p align="left">
  <img src="https://github.com/rjramos70/kovi-api/blob/master/images/Screen%20Shot%202019-01-18%20at%2021.18.22.png" title="Print de tela do teste feito via Postman a URL na AWS">
</p>
