import { Ticket } from "../models/Ticket.Mongoose.js";
import { NotFoundError } from "../models/errors/notFound.error.js";

export class ticketDao {
    async create(ticketData){
        const ticket = await Ticket.create(ticketData)
        return ticket.toObject()
    }
    async readOne(query){
        const ticket = await Ticket.findOne({ _id: query }).lean()
        if(!ticket){
            throw new NotFoundError('Ticket')
        }
        return ticket
    }
    async readMany(query){
        return await Ticket.find(query).lean()
    }
    async updateOne(query, newData){
        const updated = await Ticket.findOneAndUpdate({ _id: query }, newData, { new: true }).lean()
        if(!updated){
            throw new NotFoundError('Ticket')
        }
        return updated
    }
    async deleteOne(query){
        const deleted = await Ticket.findOneAndDelete({ _id: query }).lean()
        if(!deleted){
            throw new NotFoundError('Ticket')
        }
        return deleted
    }
}


