import nodemailer from 'nodemailer';
import config from '../config/config.js';

export default class mailingService{
    constructor(){
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            auth: {
                user: config.nodemailer.EMAIL,
                pass: config.nodemailer.PASSWORD
            }
        });
    }

    sendMail = async({from, to, subject, html, attachments=[]}) => {
        let result = await this.transporter.sendMail({
            from,
            to,
            subject,
            html,
            attachments
        })
        return result;
    }
};