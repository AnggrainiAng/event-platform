import { getAllEventAction } from '@/actions/event/getAllEventAction';
import { getEventByIdAction } from '@/actions/event/getEventByIdAction';
import { getEventByUserIdAction } from '@/actions/event/getEventByUserId.action';
import { getThisEventDiscoveryAction } from '@/actions/event/getEventDiscoveryAction';
import { getThisEventsAction } from '@/actions/event/getThisEventAction';
import { NextFunction, Request, Response } from 'express';

export class EventController {
  async getAllEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const events = await getAllEventAction();

      return res.status(events?.status).send(events);
    } catch (error) {
      next(error);
    }
  }

  async getEventDiscovery(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number((req.query.page as string) || 1);
      const pageSize = Number((req.query.pageSize as string) || 6);
      const events = await getThisEventDiscoveryAction(page, pageSize);

      return res.status(events?.status).send(events);
    } catch (error) {
      next(error);
    }
  }

  async getEventInThisWeek(req: Request, res: Response, next: NextFunction) {
    try {
      const events = await getThisEventsAction();

      return res.status(events?.status).send(events);
    } catch (error) {
      next(error);
    }
  }

  async getEventId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      console.log(id, 'test id kontollll');

      const events = await getEventByIdAction(Number(id));

      return res.status(events?.status).send(events);
    } catch (error) {
      next(error);
    }
  }

  async getEventByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      const result = await getEventByUserIdAction(Number(userId));

      res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }
}
