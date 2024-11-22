import Ticket from '../models/Ticket.js'; 

export const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();

    if (tickets.length === 0) {
      return res.status(404).json({ message: 'No se encontraron tickets.' });
    }

    res.status(200).json({
      message: 'Tickets obtenidos con éxito',
      tickets,
    });
  } catch (error) {
    console.error('Error obteniendo los tickets:', error);
    res.status(500).json({ message: 'Error al obtener los tickets', error });
  }
};  