const mongoose = require("mongoose")

const db = ()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>console.log("Database Connected"))
}

module.exports = db;