import mongoose from 'mongoose'

const RecordSchema = new mongoose.Schema({
  id: {
    type: String,
    require: true
  },
  source_url: {
    type: String,
    require: true
  },
})

export default mongoose.model('Record', RecordSchema)