const app = require('express')()
const bodyParser = require('body-parser')

const routesRetail = require('./routes/retails')

// MIDDLEWARES
app.use(bodyParser.json())

// ROUTES
app.use('/api', routesRetail)
// app.use('/api', routesAdmin)
// app.use('/api', routesStaff)

app.listen(5001, () => console.log('Server connected to port 5001'))