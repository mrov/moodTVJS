var baseUrl = 'http://localhost:3000'
import axios from 'axios'

export default {
  async loadChannels (context) {
    let res = await axios({
      method: 'GET'
      , url: baseUrl + '/getAllChannels'
    }).catch(err => { return (err.response) })
    context.commit('setChannels', res.data)
    console.log(res.data)
    return res
  },
  async loadChannelsbyMood (context, mood) {
    let res = await axios({
      method: 'GET'
      , url: baseUrl + '/sortByMood?mood=' + mood
    }).catch(err => { return (err.response) })
    context.commit('setChannels', res.data)
    console.log(res.data)
    return res
  },
  async loadChannelbyName (context, name) {
    let res = await axios({
      method: 'GET'
      , url: baseUrl + '/getbyName?name=' + name
    }).catch(err => { return (err.response) })
    context.commit('setChannel', res.data)
    console.log(res.data)
    return res
  }
}
