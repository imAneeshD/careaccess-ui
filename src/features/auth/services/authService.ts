import api, { graphqlRequest } from '@/shared/lib/api';
import { jwtDecode } from 'jwt-decode';
import { Role, Permission } from '@/shared/auth/AuthContext';

export const authService = {
  login: async (email: string, password: string) => {
    const mutation = `
      mutation($input: LoginRequestInput!) {
        login(input: $input) {
          success
          token
          name
          role
        }
      }
    `;
    
    const result = await graphqlRequest(mutation, { input: { email, password } });
    
    if (!result.data?.login?.success) {
      throw new Error('Login failed');
    }

    const { token, name, role } = result.data.login;
    
    // Decode token to get user ID and email
    const decoded: any = jwtDecode(token);
    const userId = decoded.sub || 'unknown';
    const userEmail = decoded.email || email;
    
    // Map backend role to our Role type
    // Backend roles: "Super Admin", "Admin", "Doctor", etc.
    const userRole = role as Role;
    
    // Define permissions based on role
    const permissions: Permission[] = ['VIEW_PATIENT', 'VIEW_REPORT'];
    
    if (userRole === 'Admin' || userRole === 'Super Admin') {
      permissions.push('MANAGE_USERS', 'EDIT_PATIENT');
    } else if (userRole === 'Doctor') {
      permissions.push('EDIT_PATIENT');
    }
    
    return {
      token,
      user: {
        id: userId,
        name,
        email: userEmail,
        role: userRole,
        permissions
      }
    };
  }
};
