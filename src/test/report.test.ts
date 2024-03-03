import 'reflect-metadata';
import { ReportService } from '@/services/report.service';
import { Container } from 'typedi';

jest.mock('@/services/krakenflex.service', () => {
  const mockKrakenService = {
    getOutages: jest.fn().mockResolvedValue([
      {
        "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
        "begin": "2021-07-26T17:09:31.036Z",
        "end": "2021-08-29T00:37:42.253Z"
      },
      {
        "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
        "begin": "2022-05-23T12:21:27.377Z",
        "end": "2022-11-13T02:16:38.905Z"
      },
      {
        "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
        "begin": "2022-12-04T09:59:33.628Z",
        "end": "2022-12-12T22:35:13.815Z"
      },
      {
        "id": "04ccad00-eb8d-4045-8994-b569cb4b64c1",
        "begin": "2022-07-12T16:31:47.254Z",
        "end": "2022-10-13T04:05:10.044Z"
      },
      {
        "id": "086b0d53-b311-4441-aaf3-935646f03d4d",
        "begin": "2022-07-12T16:31:47.254Z",
        "end": "2022-10-13T04:05:10.044Z"
      },
      {
        "id": "27820d4a-1bc4-4fc1-a5f0-bcb3627e94a1",
        "begin": "2021-07-12T16:31:47.254Z",
        "end": "2022-10-13T04:05:10.044Z"
      }
    ]),
    getSiteInfo: jest.fn().mockResolvedValue({
      "id": "kingfisher",
      "name": "KingFisher",
      "devices": [
        {
          "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
          "name": "Battery 1"
        },
        {
          "id": "086b0d53-b311-4441-aaf3-935646f03d4d",
          "name": "Battery 2"
        }
      ]
    }),
    postSiteOutages: jest.fn().mockResolvedValue({
      status: 200,
      data: {
        message: 'Success',
      }
    }),
  };
  return {
    KrakenService: jest.fn().mockImplementation(() => mockKrakenService),
  };
});


describe('TEST ReportService', () => {
  let reportService: ReportService;
  
  beforeEach(() => {
    // Register the mock service in the container
    const { KrakenService } = require('@/services/krakenflex.service');
    Container.set(KrakenService, new KrakenService());
    reportService = new ReportService();
  });

  describe('report with siteId', () => {
    it('should report relevant siteEvents', () => {
      
      const res = reportService.postReport("kingfisher", "2022-01-01T00:00:00.000Z")
      
      expect(res).resolves.toEqual({
        status: 200,
        data: {
          message: 'Success', postedSiteOutages: [
            {
              "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
              "name": "Battery 1",
              "begin": "2022-05-23T12:21:27.377Z",
              "end": "2022-11-13T02:16:38.905Z"
            },
            {
              "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
              "name": "Battery 1",
              "begin": "2022-12-04T09:59:33.628Z",
              "end": "2022-12-12T22:35:13.815Z"
            },
            {
              "id": "086b0d53-b311-4441-aaf3-935646f03d4d",
              "name": "Battery 2",
              "begin": "2022-07-12T16:31:47.254Z",
              "end": "2022-10-13T04:05:10.044Z"
            }
          ]
        }
      });
    });
  });
});


