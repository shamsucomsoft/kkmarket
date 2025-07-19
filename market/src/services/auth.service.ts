import { apiClient, setAuthToken, removeAuthToken } from "./api";
import {
  type User,
  type LoginCredentials,
  type RegisterData,
  type AuthResponse,
  type ApiResponse,
} from "../types";

export class AuthService {
  // Register new user or vendor
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>(
        "/auth/register",
        data
      );

      if (response.data?.access_token) {
        setAuthToken(response.data.access_token);
      }

      if (!response.data) {
        throw new Error("Failed to register user");
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Login user
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>(
        "/auth/login",
        credentials
      );

      if (!response.data) {
        throw new Error("Failed to login user");
      }

      if (response.data?.access_token) {
        setAuthToken(response.data.access_token);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get current user profile
  async getCurrentUser(): Promise<User> {
    try {
      const response = await apiClient.get<ApiResponse<User>>("/users/me");

      if (!response.data) {
        throw new Error("Failed to get current user");
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      await apiClient.post("/auth/logout");
    } finally {
      removeAuthToken();
    }
  }

  // Update user profile
  async updateProfile(data: Partial<User>): Promise<User> {
    try {
      const response = await apiClient.put<ApiResponse<User>>("/auth/me", data);

      if (!response.data) {
        throw new Error("Failed to update user profile");
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Change password
  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    try {
      await apiClient.put("/auth/change-password", {
        currentPassword,
        newPassword,
      });
    } catch (error) {
      throw error;
    }
  }

  // Request password reset
  async requestPasswordReset(email: string): Promise<void> {
    try {
      await apiClient.post("/auth/forgot-password", { email });
    } catch (error) {
      throw error;
    }
  }

  // Reset password with token
  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      await apiClient.post("/auth/reset-password", {
        token,
        newPassword,
      });
    } catch (error) {
      throw error;
    }
  }

  // Verify email
  async verifyEmail(token: string): Promise<void> {
    try {
      await apiClient.post("/auth/verify-email", { token });
    } catch (error) {
      throw error;
    }
  }

  // Resend verification email
  async resendVerificationEmail(): Promise<void> {
    try {
      await apiClient.post("/auth/resend-verification");
    } catch (error) {
      throw error;
    }
  }

  // Refresh access token
  async refreshToken(): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>(
        "/auth/refresh"
      );

      if (!response.data) {
        throw new Error("Failed to refresh token");
      }

      if (response.data?.access_token) {
        setAuthToken(response.data.access_token);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const authService = new AuthService();
