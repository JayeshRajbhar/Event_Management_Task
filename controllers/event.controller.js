import { Event } from '../models/event.model.js';
import { User } from '../models/user.model.js';
import { Registration } from '../models/registration.model.js';
import { Op } from 'sequelize';

export const createEvent = async (req, res) => {
  try {
    const { capacity } = req.body;
    if (capacity <= 0 || capacity > 1000)
      return res.status(400).json({ error: 'Capacity must be between 1 and 1000' });
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getEventDetails = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, {
      include: User,
    });
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const event = await Event.findByPk(req.params.id);
    const user = await User.findByPk(userId);
    if (!event || !user) return res.status(404).json({ error: 'Event or user not found' });
    if (new Date(event.dateTime) < new Date()) return res.status(400).json({ error: 'Cannot register for past events' });
    const regCount = await event.countUsers();
    if (regCount >= event.capacity) return res.status(400).json({ error: 'Event is full' });
    const exists = await event.hasUser(user);
    if (exists) return res.status(409).json({ error: 'User already registered' });
    await event.addUser(user);
    res.json({ message: 'Registration successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const cancelRegistration = async (req, res) => {
  try {
    const { userId } = req.body;
    const event = await Event.findByPk(req.params.id);
    const user = await User.findByPk(userId);
    if (!event || !user) return res.status(404).json({ error: 'Event or user not found' });
    const exists = await event.hasUser(user);
    if (!exists) return res.status(400).json({ error: 'User not registered' });
    await event.removeUser(user);
    res.json({ message: 'Registration cancelled' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const listUpcomingEvents = async (req, res) => {
  try {
    const now = new Date();
    const events = await Event.findAll({
      where: { dateTime: { [Op.gt]: now } },
      order: [
        ['dateTime', 'ASC'],
        ['location', 'ASC'],
      ],
    });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getEventStats = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    const regCount = await event.countUsers();
    const remaining = event.capacity - regCount;
    const percentage = ((regCount / event.capacity) * 100).toFixed(2);
    res.json({ total: regCount, remaining, percentage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
