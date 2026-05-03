import api, { graphqlRequest } from '@/shared/lib/api';

export interface Patient {
  id: string;
  name: string;
  email?: string;
  dateOfBirth?: string;
  gender?: string;
  status: 'Stable' | 'Critical' | 'Recovering';
  lastVisit: string;
  assignedDoctor?: string;
}

export const patientService = {
  getPatients: async (): Promise<Patient[]> => {
    const query = `
      query {
        patients {
          id
          name
          status
          lastVisit
        }
      }
    `;
    const result = await graphqlRequest(query);
    return result.data?.patients || [];
  },
  
  createPatient: async (data: any) => {
    const mutation = `
      mutation($input: CreatePatientCommandInput!) {
        createPatient(input: $input)
      }
    `;
    const result = await graphqlRequest(mutation, { input: data });
    return result.data?.createPatient;
  }
};
