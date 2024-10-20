export default {
    app: {
        PORT: process.env.PORT || 9090,
    },
    mongo: {
        USER: process.env.MONGO_USER,
        PWD: process.env.MONGO_PWD,
        DATABASE: process.env.MONGO_DATABASE,
    },
    admin: {
        EMAIL: process.env.ADMIN_EMAIL,
        PASSWORD: process.env.ADMIN_PASSWORD,
    },
    aws: {
        ACCESS_KEY: process.env.AWS_ACCESS_KEY,
        SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    },
    jwt: {
        COOKIE: process.env.JWT_COOKIE,
        SECRET: process.env.JWT_SECRET,
    }, 
    nodemailer: {
        EMAIL: process.env.NODEMAILER_EMAIL,
        PASSWORD: process.env.NODEMAILER_PASSWORD,
    },
    cors:{
        URL: process.env.CORS_URL,
    }
    
}