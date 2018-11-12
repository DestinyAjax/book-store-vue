import Vue from 'vue'
import axios from 'axios'

const BaseURL = 'http://localhost:5000/api/'
// const client = axios.create({
//     baseURL: 'http://localhost:5000/api/',
//     json: true
// })

export default {
    // async execute(method, resource, data) {
    //     // inject the accessToken for each request
    //     // let accessToken = await Vue.prototype.$auth.getAccessToken()
    //     return client({
    //         method,
    //         url: resource,
    //         data,
    //         //   headers: {
    //         //     Authorization: `Bearer ${accessToken}`
    //         //   }
    //     }).then(req => {
    //         return req.data
    //     })
    // },
    async getAllBooks() {
        axios.get(BaseURL + 'book').then(result => {
            return result.data.data
        }).catch(err => {
            return err
        })
    },
    async getBook(id) {
        axios.get(BaseURL + `book/${id}`).then(result => {
            return result.data.data
        })
    },
    async createBook(data) {
        return axios.post(BaseURL, 'book', data)
    },
    async updateBook(id, data) {
        return axios.patch(BaseURL, `book/${id}`, data)
    },
    async deleteBook(id) {
        axios.delete(BaseURL + `book/${id}`).then(result => {
            return result.data.data
        })
    }
}