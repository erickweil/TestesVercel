
export const testeDocs = {
    "/info": {
        get: {
            summary: "Retorna informações sobre o servidor",
            description: "Retorna informações sobre o servidor, incluindo a data e hora de início do servidor.",
            tags: ["Teste"],
            responses: {
                200: {
                    description: "Informações do servidor retornadas com sucesso",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    startTime: {
                                        type: "string",
                                        format: "date-time",
                                        description: "Data e hora de início do servidor"
                                    }
                                },
                                required: ["startTime"]
                            }
                        }
                    }
                }
            }
        }
    },
};