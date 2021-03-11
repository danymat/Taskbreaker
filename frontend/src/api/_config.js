import axios from 'axios'
import store from './../store'

function getUserToken() {
    return store.state.token;
}

/**
Create a client configured the right way to send http json-formatted request
the base url correspond to the url of the backend server
*/
const client = axios.create({
    baseURL: '/api/',
    // baseURL: 'http://localhost:3000/api/',
    json: true
});

/**
  Method to use to forge a http request, useful for clean implementation, see example below:
  @tutorial
  getPosts () {
    return this.execute('get', '/posts')
  }
  @param {String} method 'GET', 'POST'
  @param {String} resource the endpoint to use
  @param {Object} [options]
  @param {Object} [options.data] the data to send
*/
export async function execute(method, resource, options) {
    if (options == undefined) { options = '' }

    // inject the Access Token for each request
    let accessToken = getUserToken()
    return client({
      method,
      url: resource,
      data: options.data,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(req => { return req.data })
      .catch(error => { throw error.response })
}


