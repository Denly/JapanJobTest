import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { ReportService } from '@/services/report.service';
export class ReportController {
  public reportService = Container.get(ReportService);

  public report = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const siteId = String(req.params.siteId);
      const reportResult = await this.reportService.postReport(siteId);
      res.status(200).json({ data: reportResult, message: 'report' });
    } catch (error) {
      next(error);
    }
  };


}
