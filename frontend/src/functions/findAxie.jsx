
import db from '../assets/database/database.json'

export default function findAxie (id) {
    console.log(id);
    let axie = db.find(axie => axie.id == id)
    return axie
}