// src/mocks/handlers.js
import { rest } from 'msw'
// note: this is mock server
export const handlers = [
    // here, we can create multiple HTTP request

    rest.get('http://localhost:3004/users',
        //   note: ctx = context
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                // return fake data in array
                ctx.json([
                    // { id: 1, title: 'buy oranges' },
                    // { id: 2, title: 'go home and work' }
                    {id: 1, username: 'sanjiv', password: 'sanjiv123'},
                    {id: 1, username: 'samir', password: 'samir123'},

                ])
            )
        }),
        

]