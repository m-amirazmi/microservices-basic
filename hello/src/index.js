const app = require('express')()
const cors = require('cors')

app.use(cors())

app.get('/', (req, res) => {
    return res.status(200).json({message:'Hello World'})
})

app.listen(5000, ()=>console.log('Server listening on port 5000'))