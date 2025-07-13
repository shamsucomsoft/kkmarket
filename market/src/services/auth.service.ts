import { apiClient, setAuthToken, removeAuthToken } from "./api";
import type {
  User,
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from "../types";

export class AuthService {
  // Register new user or vendor
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/auth/register", data);

    if (response.data?.access_token) {
      setAuthToken(response.data.access_token);
    }

    return response.data!;
  }

  // Login user
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      "/auth/login",
      credentials
    );

    if (response.data?.access_token) {
      setAuthToken(response.data.access_token);
    }

    return response.data!;
  }

  // Get current user profile
  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>("/users/me");
    return response.data!;
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
    const response = await apiClient.put<User>("/auth/me", data);
    return response.data!;
  }

  // Change password
  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    await apiClient.put("/auth/change-password", {
      currentPassword,
      newPassword,
    });
  }

  // Request password reset
  async requestPasswordReset(email: string): Promise<void> {
    await apiClient.post("/auth/forgot-password", { email });
  }

  // Reset password with token
  async resetPassword(token: string, newPassword: string): Promise<void> {
    await apiClient.post("/auth/reset-password", {
      token,
      newPassword,
    });
  }

  // Verify email
  async verifyEmail(token: string): Promise<void> {
    await apiClient.post("/auth/verify-email", { token });
  }

  // Resend verification email
  async resendVerificationEmail(): Promise<void> {
    await apiClient.post("/auth/resend-verification");
  }

  // Refresh access token
  async refreshToken(): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/auth/refresh");

    if (response.data?.token) {
      setAuthToken(response.data.token);
    }

    return response.data!;
  }
}

export const authService = new AuthService();
