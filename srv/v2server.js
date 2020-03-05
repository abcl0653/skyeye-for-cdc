const odatav2proxy = require("@sap/cds-odata-v2-adapter-proxy")
const express = require("express")
const cds = require("@sap/cds")

const { PORT=4004 } = process.env
const app = express()

app.use('/webapp', express.static("app/webapp"))

cds.connect("db");
cds.serve("all").in(app)
app.use(odatav2proxy({ port: PORT }))

app.listen (PORT, ()=> console.info(`server listening on http:\/\/localhost:${PORT}`))