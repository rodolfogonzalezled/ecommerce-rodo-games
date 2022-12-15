import bcrypt from "bcrypt";
import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import config from "./config/config.js";
import passport from 'passport';
import {fileURLToPath} from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createHash = async (password) => {
    const salts = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salts);
}

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

const s3 = new aws.S3({
    accessKeyId: config.aws.ACCESS_KEY,
    secretAccessKey: config.aws.SECRET_ACCESS_KEY
});

export const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'uploads-rgonzalez-bucket',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname })
        },
        key: (req, file, cb) => {
            cb(null, Date.now().toString() + file.originalname)
        }
    })
});

export const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (err, user, info) {
            if (err) return next(err);
            if (!user) {
                return res.status(401).send({ error: info.message ? info.message : info.toString() });
            }
            req.user = user;
            next();
        })(req, res, next);
    }
}

export const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies[config.jwt.COOKIE];
    }
    return token;
}

export default __dirname;