import { EventController } from '@/controllers/event.controller';
import { Router } from 'express';

export class EventRouter {
  private router: Router;
  private eventController: EventController;

  constructor() {
    this.eventController = new EventController();
    this.router = Router();
    this.intializeRoutes();
  }

  private intializeRoutes(): void {
    this.router.get('/events', this.eventController.getAllEvent);
    this.router.get('/event/:id', this.eventController.getEventId);
    this.router.get('/filter/:userId', this.eventController.getEventByUserId);
    this.router.get(
      '/events-thisweekend',
      this.eventController.getEventInThisWeek,
    );
    this.router.get(
      '/events-discovery',
      this.eventController.getEventDiscovery,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
