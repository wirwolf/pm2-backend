module.exports = {
    driver     : "mongodb",
    url       : 'mongodb://'+process.env.MONGO_USERNAME+':'+process.env.MONGO_PASSWORD+'@'+ process.env.MONGO_HOST +':'+process.env.MONGO_PORT+'/'+process.env.MONGO_DB_NAME,
    //rs       : "5432",
};


