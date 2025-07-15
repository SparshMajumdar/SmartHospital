// lib/auth.ts

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor';
}

class AuthManager {
  private static instance: AuthManager;

  private constructor() {
    // private to enforce singleton
  }

  static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }
    return AuthManager.instance;
  }

  setSession(token: string, user: AuthUser): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Error setting session:', error);
    }
  }

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem('token');
    } catch {
      return null;
    }
  }

  getCurrentUser(): AuthUser | null {
    if (typeof window === 'undefined') return null;
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) as AuthUser : null;
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken() && !!this.getCurrentUser();
  }

  logout(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }
}

export default AuthManager;
