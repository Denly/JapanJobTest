import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { HttpException } from '@/exceptions/httpException';
import { Event, SiteEvent } from '@interfaces/event.interface';
import { User } from '@interfaces/users.interface';
import { SiteInfo } from '@interfaces/siteInfo.interface';
import { ApiResponse } from '@interfaces/apiResponse.interface';
import { UserModel } from '@models/users.model';
import axios from 'axios';
import { KRAKEN_API_KEY } from '@/config';


@Service()
/**
 * KrakenService to call krakenflex API 
 */
export class KrakenService {
  public async getOutages(): Promise<Event[]> {
    try {
      const response = await axios.get('https://api.krakenflex.systems/interview-tests-mock-api/v1/outages', {
        headers: {
          'x-api-key': KRAKEN_API_KEY,
        },
      });

      //console.log("getOutages called", response);
      return response.data;
    } catch (error) {
      console.error('Error fetching outages:', error);
      throw new Error('Failed to fetch outages');
    }
  }

  public async getSiteInfo(siteId: string): Promise<SiteInfo> {
    try {
      const response = await axios.get(`https://api.krakenflex.systems/interview-tests-mock-api/v1/site-info/${siteId}`, {
        headers: {
          'x-api-key': KRAKEN_API_KEY,
        },
      });

      //console.log("getSiteInfo called", siteId, response);
      return response.data;
    } catch (error) {
      console.error('Error fetching site info:', error);
      throw new Error('Failed to fetch site info');
    }
  }

  public async postSiteOutages(siteId: string, siteOutages: SiteEvent[]): Promise<ApiResponse> {
    try {
      const response = await axios.post(`https://api.krakenflex.systems/interview-tests-mock-api/v1/site-outages/${siteId}`, siteOutages, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': KRAKEN_API_KEY,
        },
      });

      //console.log("postSiteOutages called", siteId, siteOutages, response);
      return {
      status: response.status,
      data: response.data
    };
    } catch (error) {
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
