import { ticketDao } from "../daos/index.js";

class ticketService{
    async searchTicket(email){
        const tickets = await ticketDao.readMany()
        let n = (tickets.length - 1)
        let bool = true
        let search
        while(n >= 0 && bool){
            if(tickets[n].purchaser === email){
                search = tickets[n]
                bool = false
            }
            n --
        }
        if(search){
            return search
        }
        else{
            throw new Error('Ticket Not Found')
        }
    }
}

export const service = new ticketService()

