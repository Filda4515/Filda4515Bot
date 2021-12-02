const mongoose = require("mongoose");

module.exports = async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=>{
        console.log("Connected to the database!")
    }).catch((err)=>{
        console.log(err)
    })
    return mongoose
}

