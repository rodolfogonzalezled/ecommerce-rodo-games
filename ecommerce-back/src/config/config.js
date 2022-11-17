export default {
    mongo: {
        USER: process.env.MONGO_USER,
        PWD: process.env.MONGO_PWD,
        DATABASE: process.env.MONGO_DATABASE,
    },
    aws: {
        ACCESS_KEY: process.env.AWS_ACCESS_KEY,
        SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY
    }, 
    nodemailer: {
        EMAIL: process.env.NODEMAILER_EMAIL,
        PASSWORD: process.env.NODEMAILER_PASSWORD
    }
}