import express from 'express'
import cookieParser from 'cookie-parser'
import hbs from './config/handlebars.js'
import router from './routers/index.js'
import './config/mongoose.js'

const app = express()

const PORT = process.env.PORT || 3000
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(router)

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})