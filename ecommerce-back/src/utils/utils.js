import bcrypt from "bcrypt";
import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import config from "../config/config.js";

export const createHash = async(password) => {
    const salts = await bcrypt.genSalt(10);
    return bcrypt.hash(password,salts);
}

export const isValidPassword = (user, password) => bcrypt.compare(password,user.password);

const s3 = new aws.S3({
    accessKeyId: config.aws.ACCESS_KEY,
    secretAccessKey: config.aws.SECRET_ACCESS_KEY
});

export const upload = multer({
    storage:multerS3({
        s3:s3,
        bucket:'uploads-rgonzalez-bucket',
        metadata:(req,file,cb)=>{
            cb(null,{fieldName:file.fieldname})
        },
        key:(req,file,cb)=>{
            cb(null,Date.now().toString()+file.originalname)
        }
    })
});