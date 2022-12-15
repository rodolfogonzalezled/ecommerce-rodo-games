import passport from 'passport';
import local from 'passport-local';
import jwt from 'passport-jwt';
import { cartService, userService } from '../services/service.js';
import { cookieExtractor, createHash, isValidPassword } from "../utils/utils.js";
import config from './config.js';
import { JOI_VALIDATOR } from '../utils/joi-validator.js';

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const initializePassport = () => {
    passport.use('register', new LocalStrategy({ passReqToCallback: true, usernameField: 'email', session: false }, async (req, email, password, done) => {
        let { first_name, last_name, phone } = req.body;
        try {
            if (!req.file) return done(null, false, { message: "No se pudo cargar la imagen" })
            let user = await userService.getBy({ email });
            if (user) return done(null, false, { message: "El usuario ya existe" });
            let cart = await cartService.save({ Products: [] });
            const hashedPassword = await createHash(password);
            const newUser = {
                first_name,
                last_name,
                email,
                password: hashedPassword,
                cart: cart._id,
                avatar: req.file.location,
                phone
            };

            //validación de producto 
            const { error } = JOI_VALIDATOR.user.validate({ ...newUser, password });
            if (error) {
                return done(null, false, { message: error.details[0].message });
            }

            let result = await userService.save(newUser);
            return done(null, result);
        } catch (err) {
            return done(err);
        }
    }))

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            if (!email || !password) return done(null, false, { message: "Debe ingresar usuario y contraseña" })

            if (email === config.admin.EMAIL && password === config.admin.PASSWORD) {
                const admin = {
                    id: 1,
                    role: "admin",
                }
                return done(null, admin)
            }

            const user = await userService.getBy({ email });
            if (!user) return done(null, false, { message: "Usuario o Contraseña incorrecta" });
            if (!isValidPassword(user, password)) return done(null, false, { message: "Usuario o Contraseña incorrecta" });

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }))

    passport.use('jwt', new JWTStrategy({ jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]), secretOrKey: config.jwt.SECRET }, async (jwt_payload, done) => {
        try {
            if (jwt_payload.role === "admin") return done(null, jwt_payload)
            let user = await userService.getBy({ _id: jwt_payload.id })
            if (!user) return done(null, false, { messages: "Usuario no encontrado" })
            return done(null, user);
        } catch (err) {
            return done(err)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async (id, done) => {
        let result = await userService.getBy({ _id: id })
        return done(null, result);
    })
};

export default initializePassport;