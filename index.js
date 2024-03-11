import express from 'express'
import { createHandler } from 'graphql-http/lib/use/http';
import {schema} from './src/Schema.js'
import { mongoConection } from './DataBase/MongoDb.js';

const app = express()
const port = 3000



mongoConection()



app.use("/graphql",createHandler({schema}))





app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))