export default {
    mongo: {
        USER: process.env.MONGO_USER,
        PWD: process.env.MONGO_PWD,
        DATABASE: process.env.MONGO_DATABASE,
    },
    app: {
        ADMIN_EMAIL: process.env.ADMIN_EMAIL,
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
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
    }
}