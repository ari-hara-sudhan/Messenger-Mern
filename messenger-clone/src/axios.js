import axios from "axios"


const instance =axios.create({
    baseURL:'https://cryptic-stream-73835.herokuapp.com'
})

export default instance;