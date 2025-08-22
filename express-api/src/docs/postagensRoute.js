const postagemPaths = {
    "/postagens": {
        get: {
            tags: ["Postagem"],
            summary: "Listagem de postagens",
            description: "Retorna a lista de postagens paginadas e ordenadas pela data de criação",
            parameters: [
                {
                    name: "pagina",
                    in: "query",
                    description: "Número da página para a listagem",
                    required: false,
                    schema: {
                        type: "integer",
                        example: 1
                    }
                }
            ],
            responses: {
                200: {
                    description: "Listagem de postagens obtida com sucesso",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    data: {
                                        type: "object",
                                        properties: {
                                            docs: {
                                                type: "array",
                                                items: {
                                                    $ref: "#/components/schemas/PostagemGET"
                                                }
                                            },
                                            totalDocs: {
                                                type: "integer",
                                                example: 100
                                            },
                                            limit: {
                                                type: "integer",
                                                example: 10
                                            },
                                            page: {
                                                type: "integer",
                                                example: 1
                                            },
                                            totalPages: {
                                                type: "integer",
                                                example: 10
                                            },
                                            hasNextPage: {
                                                type: "boolean",
                                                example: true
                                            },
                                            hasPrevPage: {
                                                type: "boolean",
                                                example: false
                                            }
                                        }
                                    },
                                    error: {
                                        type: "boolean",
                                        example: false
                                    },
                                    code: {
                                        type: "integer",
                                        example: 200
                                    },
                                    message: {
                                        type: "string",
                                        example: "OK"
                                    },
                                    errors: {
                                        type: "array",
                                        example: []
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        post: {
            tags: ["Postagem"],
            summary: "Criar uma nova postagem",
            description: "Permite a criação de uma nova postagem com título e descrição",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                titulo: {
                                    type: "string",
                                    example: "Novo Título de Postagem"
                                },
                                descricao: {
                                    type: "string",
                                    example: "Descrição detalhada da postagem"
                                }
                            },
                            required: ["titulo", "descricao"]
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: "Postagem criada com sucesso",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    data: {
                                        $ref: "#/components/schemas/PostagemGET"
                                    },
                                    error: {
                                        type: "boolean",
                                        example: false
                                    },
                                    code: {
                                        type: "integer",
                                        example: 201
                                    },
                                    message: {
                                        type: "string",
                                        example: "OK"
                                    },
                                    errors: {
                                        type: "array",
                                        example: []
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

export default postagemPaths;
