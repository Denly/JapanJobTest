import { Router } from 'express';
import { UserController } from '@controllers/users.controller';
import { ReportController } from '@controllers/report.controller'
import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@/middlewares/validApiKey.middleware';

export class ReportRoute implements Routes {
  //public path = '/outages';
  public router = Router();
  public report = new ReportController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`/report/:siteId`, ValidationMiddleware, this.report.report);
  }
}
