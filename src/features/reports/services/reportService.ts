import api, { graphqlRequest } from '@/shared/lib/api';

export interface Report {
  id: string;
  name: string;
  patientName: string;
  date: string;
  type: string;
  status: string;
}

export const reportService = {
  getReports: async (): Promise<Report[]> => {
    const query = `
      query {
        reports {
          id
          patientId
          status
        }
      }
    `;
    const result = await graphqlRequest(query);
    return result.data?.reports || [];
  },
  
  uploadReport: async (data: any) => {
    const mutation = `
      mutation($input: UploadReportCommandInput!) {
        uploadReport(input: $input)
      }
    `;
    const result = await graphqlRequest(mutation, { input: data });
    return result.data?.uploadReport;
  },
  
  finalizeReport: async (id: string) => {
    const mutation = `
      mutation($id: UUID!) {
        finalizeReport(id: $id)
      }
    `;
    const result = await graphqlRequest(mutation, { id });
    return result.data?.finalizeReport;
  }
};
