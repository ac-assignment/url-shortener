import urlExist from 'url-exist'
import express from 'express'
import { v1 as uuidV1 } from 'uuid'
import randomId from '../../self_modules/randomId.js'
import Record from '../../models/record.js'
const router = express.Router()
const errorUsers = []

router.get('/', async (req, res) => {
  const { userId } = req.cookies
  if (errorUsers.includes(userId)) {
    errorUsers.splice(errorUsers.indexOf(userId), 1)
    return res.render('index', { hasError: true })
  } else {
    return res.render('index')
  }
})

router.post('/records', async (req, res) => {
  const url = req.body.url.trim()
  const isValid = await urlExist(url)
  if (isValid === false) {
    const errorId = uuidV1()
    errorUsers.push(errorId)
    return res.cookie('userId', errorId).redirect('/')
  }
  
  let id = null
  let record = null
  do {
    id = randomId()
    record = await Record.findOne({ id }).lean()
  } while (record)
  
  const shortUrl = `${req.protocol}://${req.header('host')}/${id}`
  const entity = {
    id,
    source_url: url
  }
  try {
    await Record.create(entity)
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