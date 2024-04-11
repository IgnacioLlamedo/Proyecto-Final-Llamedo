import nodemailer from 'nodemailer'
import config from '../config.js'

class mailService{
    constructor() {
        this.transport = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            auth: {
                user: config.mailUser,
                pass: config.mailPass
            }
        })
    }
    async send(receiver, subject, body, attach = []){
        const mailOptions = {
            from: config.mailUser,
            to: receiver,
            subject: subject,
            html: body
        }
        if(attach.length > 0){
            mailOptions.attachments = attach
        }
        await this.transport.sendMail(mailOptions)
    }
    async purhcaseMail(ticket){
        const body = `
        <h1>Purchase Ticket</h1>
        <ul>
            <li>Purchaser: ${ticket.purchaser}</li>
            <li>Total amount: ${ticket.amount}</li>
            <li>Date: ${ticket.purchase_datetime}</li>
            <li>Ticket code: ${ticket.code}</li>
        </ul>
        `
        await this.send(ticket.purchaser, 'Purchase notification', body)
    }
    async productDeletedMail(product){
        const body = `
        <h1>One of Your Products Has Been Deleted</h1>
        <ul>
            <p>Product "${product.title}"</p>
            <img src="cid:product">
            <li>Id : ${product._id}</li>
            <li>Description : ${product.description}</li>
            <li>Code : ${product.code}</li>
            <li>Price : ${product.price}</li>
            <li>Status : ${product.status}</li>
            <li>Stock : ${product.stock}</li>
            <li>Category : ${product.category}</li>
        </ul>
        `
        const attach = [
            {
                filename: product.thumbnail,
                path: product.thumbnail,
                cid: 'product',
            }
        ]
        await this.send(product.owner, 'Product Deleted Notification', body, attach)
    }
}

export const service = new mailService()