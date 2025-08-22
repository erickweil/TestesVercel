const testePaths = {
    "/teste/aleatorio": {
        "get": {
            "summary": "Exibe um número aleatório",
            "tags": ["Teste"],
            "responses": {
                "200": {
                    "description": "Gera um número entre 0 e 100"
                }
            }
        }
    },
    "/teste/mensagem": {
        "get": {
            "summary": "Apenas para testar",
            "tags": ["Teste"],
            "parameters": [
                {
                    "in": "query",
                    "name": "teste",
                    "required": false,
                    "schema": {
                        "type": "string",
                        "example": "Teste de mensagem"
                    },
                    "description": "Envie uma mensagem para testar"
                }
            ],
            "responses": {
                "200": {
                    "description": "Retorna a query que foi enviada no GET request",
                }
            }
        }
    },
    "/teste/dormir": {
        "get": {
            "summary": "Dorme um número X de milissegundos",
            "tags": ["Teste"],
            "parameters": [
                {
                    "in": "query",
                    "name": "ms",
                    "required": true,
                    "schema": {
                        "type": "integer",
                        "example": 1000
                    },
                    "description": "Número de milissegundos que a API deve \"dormir\" antes de responder"
                }
            ],
            "responses": {
                "200": {
                    "description": "Retorna a mensagem de quantos milissegundos dormiu"
                }
            }
        }
    },
    "/teste/info": {
        "get": {
            "summary": "Exibe informações do servidor",
            "tags": ["Teste"],
            "responses": {
                "200": {
                    "description": "Retorna informações do servidor, como conexão com o banco de dados, headers e variáveis de ambiente"
                }
            }
        }
    }
};

export default testePaths;