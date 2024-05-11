import {type CustomResponse, response} from "./response.ts";

type CustomHandler = (request: Request, response: CustomResponse, info: Deno.ServeHandlerInfo) => Response | Promise<Response>

type CustomHandlerOptions = {
    cors: {
        origin: string
        headers: string[]
    }
}

const serve = (handler: CustomHandler, options: CustomHandlerOptions = {
    cors: {
        origin: '*',
        headers: ["authorization", "x-client-info", "apikey", "content-type"]
    }
}) => {
    const preparedResponse = response.withCors(options.cors.origin, options.cors.headers)

    const withMiddleware: Deno.ServeHandler = (request, info) => {
        if (request.method === 'OPTIONS') {
            return preparedResponse.empty()
        }

        return handler(request, response, info)
    }

    return Deno.serve(withMiddleware)
}

export { serve, type CustomHandler, type CustomResponse }