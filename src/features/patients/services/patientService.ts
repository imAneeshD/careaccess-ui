import { graphqlRequest } from '@/shared/lib/api';

export interface Patient {
  id: string;
  name: string;
  email?: string;
  status: 'Stable' | 'Critical' | 'Recovering';
  lastVisit: string;
  assignedDoctor?: string;
  assignedDoctorId?: string;
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
  },

  assignDoctor: async (patientId: string, doctorId: string) => {
    const mutation = `
      mutation($input: AssignDoctorCommandInput!) {
        assignDoctor(input: $input)
      }
    `;
    const result = await graphqlRequest(mutation, { 
      input: { patientId, doctorId } 
    });
    return result.data?.assignDoctor;
  }
};
