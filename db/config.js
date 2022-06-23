const mongoose = require("mongoose");

const dbConnection = async() => {


    try {
        await 
        mongoose
            .connect(process.env.BD_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            
        })
        .then(() => console.log('mongoDB connected...'))
        
    } catch (error) {
        console.log(error);
        throw new err('DB connection failed');
    }
}

module.exports = {
    dbConnection
}

