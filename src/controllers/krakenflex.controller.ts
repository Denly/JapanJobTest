import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { KrakenService } from '@services/krakenflex.service';
import { SiteEvent } from '@/interfaces/event.interface';

export class KrakenController {
  public krakenService = Container.get(KrakenService);

  public outages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const events = await this.krakenService.getOutages();
      res.status(200).json({ data: events, message: 'outages' });
    } catch (error) {
      next(error);
    }
  };

  public siteInfo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const siteId = String(req.params.siteId);
      const siteInfoResult = await this.krakenService.getSiteInfo(siteId);
      res.status(200).json({ data: siteInfoResult, message: 'siteInfo' });
    } catch (error) {
      next(error);
    }
  };

  public siteOutages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const siteId = String(req.params.siteId);
      const siteOutages: SiteEvent[] = req.body;
      const siteOutagesResult = await this.krakenService.postSiteOutages(siteId, siteOutages);
      res.status(200).json({ data: siteOutagesResult, message: 'siteOutages' });
    } catch (error) {
      next(error);
    }
  };


}
