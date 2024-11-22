import TicketDAO from '../daos/ticketDAO.js';

export default class TicketRepository {
  constructor() {
    this.ticketDAO = new TicketDAO();
  }

  async createTicket(data) {
    return this.ticketDAO.create(data);
  }
}
