## Webpnk/Supabase

A `Deno.serve()` wrapper for Supabase edge runtime

Features:

- CORS auto-handled
- extra `response` param with pre-configured options, to use instead of vanilla `Response`

### Usage

```ts
import { serve } from "https://deno.land/x/webpnk-supabase@v0.1.0/mod.ts";

serve((req, response, info) => {
    return response.json({ success: true }, { status: 201 })
})
```

### With custom cors

```ts
import { serve } from "https://deno.land/x/webpnk-supabase@v0.1.0/mod.ts";

serve((req, response, info) => {
    return response.json({ success: true }, { status: 201 })
}, {
    cors: {
        origin: 'https://custom-origin.com',
    }
})
```