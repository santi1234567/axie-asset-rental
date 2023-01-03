import axios from "axios"

let call = async () => {
    try {
        // let price = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`)
        // let response = price.data.ethereum.usd
        // return response
        return 1200

    } catch (error) {
        console.error(error)
    }
}


export default call