import urlExist from 'url-exist'
import express from 'express'
import randomId from '../../self_modules/randomId.js'
import Record from '../../models/record.js'
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    return res.render('index')
    // return res.render('success', { shortUrl: 'http://localhost:3000' })
  } catch (error) {
    console.log(error)
  }
})

router.post('/records', async (req, res) => {
  const { url } = req.body
  const isValid = await urlExist(url)
  
  if (isValid === false) {
    return res.render('index', { hasError: true, message: '連線失敗，請確認是否為有效網址' })
  }
  
  let id = null
  for (let i = 0; i < 99999999; i++) {
    id = randomId()
    const record = await Record.findOne({ id }).lean()
    if (!record) {
      break
    }
  }
  
  const shortUrl = `${req.protocol}://${req.header('host')}/${id}`
  const entity = {
    id,
    source_url: url
  }
  try {
    Record.create(entity)
    return res.render('success', { shortUrl })
  } catch (error) {
    console.log(error)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const record = await Record.findOne({ id: req.params.id }).lean()
    if (record) {
      return res.redirect(record.source_url)
    } else {
      return res.sendStatus(404)
    }
  } catch (error) {
    console.log(error)
  }
})

export default router