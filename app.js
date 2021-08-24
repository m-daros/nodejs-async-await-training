const express = require ( "express" )
const routes = require ( "./routes/routes" )

const app = express ()

app.use ( routes )

app.listen ( 3000, () => console.log ( "App started and listening on port 3000" ) )