interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthResponse {
  user: User | null;
  error: string | null;
}

const USERS_KEY = 'app_users';
const CURRENT_USER_KEY = 'current_user';

export const signUpWithEmail = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
    
    if (users[email]) {
      return { user: null, error: 'User already exists' };
    }
    
    const user: User = {
      id: Date.now().toString(),
      email,
      name: email.split('@')[0]
    };
    
    users[email] = { ...user, password };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    
    return { user, error: null };
  } catch (error) {
    return { user: null, error: 'Sign up failed' };
  }
};

export const signInWithEmail = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
    const userData = users[email];
    
    if (!userData || userData.password !== password) {
      return { user: null, error: 'Invalid email or password' };
    }
    
    const user: User = {
      id: userData.id,
      email: userData.email,
      name: userData.name
    };
    
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return { user, error: null };
  } catch (error) {
    return { user: null, error: 'Sign in failed' };
  }
};

export const signOut = async (): Promise<{ error: string | null }> => {
  try {
    localStorage.removeItem(CURRENT_USER_KEY);
    return { error: null };
  } catch (error) {
    return { error: 'Sign out failed' };
  }
};

export const getCurrentUser = (): User | null => {
  try {
    const userData = localStorage.getItem(CURRENT_USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    return null;
  }
};