import { Router } from 'express';
import { UserController } from '@controllers/users.controller';
import { KrakenController } from '@controllers/krakenflex.controller'
import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class KrakenRoute implements Routes {
  //public path = '/outages';
  public router = Router();
  public kraken = new KrakenController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`/outages`, this.kraken.outages);
    this.router.get(`/site-info/:siteId`, this.kraken.siteInfo);
    this.router.post(`/site-outages/:siteId`, /*ValidationMiddleware(CreateUserDto),*/ this.kraken.siteOutages);
  }
}
