<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useAuth } from '../composables/useAuth';
import ThemeToggle from '../components/ThemeToggle.vue';
import { Layers, LogIn } from 'lucide-vue-next';

const { login, isLoading } = useAuth();

const form = reactive({
  email: 'admin@example.com',
  password: 'password123'
});

const error = ref('');

async function handleLogin() {
  error.value = '';
  try {
    await login(form);
    navigateTo('/dashboard');
  } catch (err: unknown) {
    const errorObj = err as { data?: { statusMessage?: string; message?: string }; statusMessage?: string };
    error.value = errorObj.data?.statusMessage || errorObj.statusMessage || 'Invalid credentials';
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center p-4 bg-background relative overflow-hidden">
    <div class="absolute top-6 right-6">
      <ThemeToggle />
    </div>

    <div class="w-full max-w-md space-y-6 z-10">
      <div class="text-center space-y-2">
        <div
          class="inline-flex h-12 w-12 rounded-2xl bg-gradient-to-tr from-primary to-emerald-400 items-center justify-center text-primary-foreground shadow-lg shadow-primary/25 mb-2"
        >
          <Layers class="h-6 w-6" />
        </div>
        <h1 class="text-2xl font-black tracking-tight text-foreground">
          Nuxt 3 Master Template
        </h1>
        <p class="text-xs text-muted-foreground">
          Enterprise Fullstack Nitro Auth Backend &amp; SSR
        </p>
      </div>

      <div class="rounded-xl border border-border bg-card p-6 shadow-xl space-y-4">
        <h2 class="text-lg font-bold text-foreground">Sign In</h2>
        <p class="text-xs text-muted-foreground">
          Enter credentials or connect from external clients (e.g. Vue 3).
        </p>

        <form class="space-y-4" @submit.prevent="handleLogin">
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-foreground/80">Email Address</label>
            <input
              v-model="form.email"
              type="email"
              required
              class="flex h-10 w-full rounded-lg border border-input bg-background/50 px-3.5 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-foreground/80">Password</label>
            <input
              v-model="form.password"
              type="password"
              required
              class="flex h-10 w-full rounded-lg border border-input bg-background/50 px-3.5 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div v-if="error" class="p-2.5 rounded-lg bg-destructive/10 text-destructive text-xs font-medium">
            {{ error }}
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full inline-flex items-center justify-center h-10 px-4 rounded-lg bg-primary text-primary-foreground font-semibold text-sm shadow-md hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            <LogIn class="h-4 w-4 mr-2" />
            {{ isLoading ? 'Authenticating...' : 'Sign In' }}
          </button>
        </form>

        <div class="pt-4 border-t border-border flex justify-center text-xs text-muted-foreground">
          Don't have an account?
          <NuxtLink to="/register" class="ml-1.5 font-semibold text-primary hover:underline">
            Create account
          </NuxtLink>
        </div>
      </div>

      <div class="text-center text-[11px] text-muted-foreground/80 space-y-1">
        <p>Demo accounts: <span class="font-mono font-bold text-foreground">admin@example.com</span> | <span class="font-mono font-bold text-foreground">user@example.com</span></p>
        <p>Password: <span class="font-mono">password123</span></p>
      </div>
    </div>
  </div>
</template>
