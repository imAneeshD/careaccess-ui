import { graphqlRequest } from '@/shared/lib/api';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

export interface Role {
  id: string;
  name: string;
}

export const userService = {
  getUsers: async (): Promise<User[]> => {
    const query = `
      query {
        users {
          id
          name
          email
          role
        }
      }
    `;
    const result = await graphqlRequest(query);
    return result.data?.users || [];
  },

  getRoles: async (): Promise<Role[]> => {
    const query = `
      query {
        roles {
          id
          name
        }
      }
    `;
    const result = await graphqlRequest(query);
    return result.data?.roles || [];
  },
  
  createUser: async (data: any) => {
    const mutation = `
      mutation($input: CreateUserCommandInput!) {
        createUser(input: $input)
      }
    `;
    const result = await graphqlRequest(mutation, { input: data });
    return result.data?.createUser;
  },
  
  assignRole: async (userId: string, roleId: string) => {
    const mutation = `
      mutation($input: AssignRoleCommandInput!) {
        assignRole(input: $input)
      }
    `;
    const result = await graphqlRequest(mutation, { 
      input: { userId, roleId } 
    });
    return result.data?.assignRole;
  }
};
