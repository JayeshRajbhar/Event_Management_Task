import express from 'express';
import {
  createEvent,
  getEventDetails,
  registerUser,
  cancelRegistration,
  listUpcomingEvents,
  getEventStats,
} from '../controllers/event.controller.js';

const router = express.Router();

router.post('/', createEvent);
router.get('/:id', getEventDetails);
router.post('/:id/register', registerUser);
router.delete('/:id/register', cancelRegistration);
router.get('/upcoming/list', listUpcomingEvents);
router.get('/:id/stats', getEventStats);

export default router;