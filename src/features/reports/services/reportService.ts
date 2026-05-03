import { graphqlRequest } from '@/shared/lib/api';

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
          name
          patientName
          isFinalized
        }
      }
    `;
    const result = await graphqlRequest(query);
    // Map isFinalized to status string for UI consistency
    return (result.data?.reports || []).map((r: any) => ({
      ...r,
      status: r.isFinalized ? 'Finalized' : 'Pending',
      date: new Date().toISOString() // Backend might not provide date in DTO yet
    }));
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
