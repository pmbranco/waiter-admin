import axios from 'axios'
import { API_URL } from 'constants/common'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = values => {
  const events_names = []
  axios.get(`${API_URL}/event`).then(res => {
    res.data.data.events.map(event => events_names.push(event.name.toUpperCase()))
  })
  return sleep(500).then(() => {
    if (events_names.includes(values.eventName.toUpperCase())) {
      // eslint-disable-next-line
      throw { eventName: values.eventName + ' already exists' }
    }
  })
}

export default asyncValidate
