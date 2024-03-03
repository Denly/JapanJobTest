import { Container, Service } from 'typedi';
import { Event, SiteEvent } from '@interfaces/event.interface';
import { SiteInfo } from '@interfaces/siteInfo.interface';
import { ApiResponse } from '@interfaces/apiResponse.interface';
import { KrakenService } from './krakenflex.service';

@Service()
/**
 * ReportService our own reporting logic
 * Given a siteId, fetch siteInfo and outages from krakenService 
 * and report the relevant outage events to krakenService.postSiteOutages
 */
export class ReportService {
  public krakenService = Container.get(KrakenService);

  public async postReport(siteId: string, beginBeforeTime: string = "2022-01-01T00:00:00.000Z"): Promise<ApiResponse> {
    try {
      
      const events: Event[] = await this.krakenService.getOutages();
      const siteInfo: SiteInfo = await this.krakenService.getSiteInfo(siteId);
      const siteOutages: SiteEvent[] = [];
      

      if (siteInfo.devices) {
        for (const device of siteInfo.devices) {
          const filteredEvents = events.filter(e => e.id === device.id);
          for (const filteredEvent of filteredEvents) {

            const siteOutage = {
              id: device.id,
              name: device.name,
              begin: filteredEvent.begin,
              end: filteredEvent.end
            }
            siteOutages.push(siteOutage);
          }
        }
      }

      const beginBeforeTimeDate = new Date(beginBeforeTime)
      const siteOutagesResult = siteOutages.filter(event => {
        const beginDate = new Date(event.begin);
        return beginDate >= beginBeforeTimeDate;
      });

      const response = await this.krakenService.postSiteOutages(siteId, siteOutagesResult);
      response.data.postedSiteOutages = siteOutagesResult
      //console.log("postReport response", response)

      return response;

    } catch (error) {
      console.error('Error in postReport:', error);
      if (error.response) {
        // Forward the Axios provided response for errors or 400, 404 HTTP responses
        throw { status: error.response.status, data: error.response.data };
      } else {
        // For non-HTTP errors (e.g., network issues), throw a generic server error
        throw { status: 500, data: { message: 'Internal server error' } };
      }
    }
  }

}
