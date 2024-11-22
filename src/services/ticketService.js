import TicketRepository from '../repositories/ticketRepository.js';

export default class TicketService {
  constructor() {
    this.ticketRepository = new TicketRepository();
  }

  async generateTicket(data) {
    const ticket = {
      ...data,
      code: `TICKET-${Date.now()}`,
    };
    return this.ticketRepository.createTicket(ticket);
  }
}
