module.exports = {
    mongoURI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@supran-cluster0-zzni5.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`,
    jwtSecret:"jwt-myworld-secret-key"
}