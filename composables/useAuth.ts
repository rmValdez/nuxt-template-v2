import { ref, computed } from 'vue';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'member' | 'guest';
  avatar?: string;
}

export function useAuth() {
  const user = useState<User | null>('auth_user', () => null);
  const accessToken = useCookie<string | null>('access_token', { maxAge: 3600 });
  const refreshToken = useCookie<string | null>('refresh_token', { maxAge: 604800 });
  const isLoading = ref(false);

  const isAuthenticated = computed(() => !!user.value && !!accessToken.value);

  async function login(credentials: { email: string; password: string }) {
    isLoading.value = true;
    try {
      const response = await $fetch<{
        user: User;
        accessToken: string;
        refreshToken: string;
      }>('/api/auth/login', {
        method: 'POST',
        body: credentials
      });

      user.value = response.user;
      accessToken.value = response.accessToken;
      refreshToken.value = response.refreshToken;
      return response;
    } finally {
      isLoading.value = false;
    }
  }

  async function register(credentials: { name: string; email: string; password: string }) {
    isLoading.value = true;
    try {
      const response = await $fetch<{
        user: User;
        accessToken: string;
        refreshToken: string;
      }>('/api/auth/register', {
        method: 'POST',
        body: credentials
      });

      user.value = response.user;
      accessToken.value = response.accessToken;
      refreshToken.value = response.refreshToken;
      return response;
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchUser() {
    if (!accessToken.value) return null;
    try {
      const userData = await $fetch<User>('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${accessToken.value}`
        }
      });
      user.value = userData;
      return userData;
    } catch {
      logout();
      return null;
    }
  }

  function logout() {
    user.value = null;
    accessToken.value = null;
    refreshToken.value = null;
    navigateTo('/login');
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    fetchUser,
    logout
  };
}
