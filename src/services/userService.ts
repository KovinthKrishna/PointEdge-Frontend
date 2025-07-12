import axios from 'axios';

// Define user interface
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

// Fetch current logged-in user
export const fetchCurrentUser = async (): Promise<User> => {
  try {
    const response = await axios.get('http://localhost:8080/api/users/current');
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    // Return a default user for development purposes
    return {
      id: '1',
      name: 'Development User',
      email: 'dev@example.com',
      role: 'admin',
      avatar: ''
    };
  }
};

// Additional user-related service functions
export const updateUserProfile = async (userData: Partial<User>): Promise<User> => {
  try {
    const response = await axios.put('http://localhost:8080/api/users/profile', userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw new Error('Failed to update user profile');
  }
};