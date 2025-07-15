import { sequelize } from '../config/db.js';
import { User } from './user.model.js';
import { Event } from './event.model.js';

export const Registration = sequelize.define('Registration', {}, { timestamps: true });

User.belongsToMany(Event, {
  through: Registration,
  as: 'events',
});

Event.belongsToMany(User, {
  through: Registration,
  as: 'registrations',
});
