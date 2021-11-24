import urlExist from 'url-exist'
import express from 'express'
import randomId from '../../self_modules/randomId.js'
import Record from '../../models/record.js'
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    return res.render('index')
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

router.post('/records', async (req, res) => {
  const { url } = req.body
  const isValid = await urlExist(url)
  
  if (isValid === false) {
    return res.render('index', { hasError: true })
  }
  
  let id = null
  for (let i = 0; i < 99999999; i++) {
    id = randomId()
    const record = await Record.findOne({ id }).lean()
    if (!record) {
      break
    }
  }
  
  const entity = {
    id,
    source_url: url
  }
  try {
    Record.create(entity)
    return res.render('index')
  } catch (error) {
    console.log(error)
  }
})

export default router