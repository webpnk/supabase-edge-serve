const response = {
    headers: {},
    withCors: function (origin: string, headers: string[]) {
        this.headers = {
            ...this.headers,
            ...{
                "Access-Control-Allow-Origin": origin,
                "Access-Control-Allow-Headers": headers.join(", "),
            },
        }

        return this
    },
    json: function <T extends Record<string, unknown>>(
        body: T,
        config: ResponseInit = {},
    ): Response {
        return Response.json(body, {
            ...config,
            headers: {
                ...this.headers,
            },
        });
    },
    error: function <TErr = unknown>(error: TErr, config: ResponseInit = { status: 500 }): Response {
        return this.json({ error }, { ...config })
    },
    empty: function (config: ResponseInit = {}): Response {
        return new Response("", {
            ...config,
            headers: {
                ...this.headers,
            },
        })
    },
};

type CustomResponse = typeof response

export { response, type CustomResponse };