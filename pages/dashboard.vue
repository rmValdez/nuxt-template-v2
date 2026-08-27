<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuth } from '../composables/useAuth';
import ThemeToggle from '../components/ThemeToggle.vue';
import { Layers, LogOut, ShieldCheck, Users, Activity, DollarSign } from 'lucide-vue-next';

const { user, isAuthenticated, logout } = useAuth();

onMounted(() => {
  if (!isAuthenticated.value) {
    navigateTo('/login');
  }
});

const { data: stats } = await useFetch('/api/dashboard/stats');
const { data: activity } = await useFetch('/api/dashboard/activity');
</script>

<template>
  <div class="min-h-screen bg-background text-foreground flex flex-col">
    <!-- Header -->
    <header class="border-b border-border bg-card/60 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      <div class="flex items-center gap-3">
        <div class="h-9 w-9 rounded-xl bg-gradient-to-tr from-primary to-emerald-400 flex items-center justify-center text-primary-foreground">
          <Layers class="h-5 w-5" />
        </div>
        <div>
          <h1 class="font-extrabold text-sm tracking-tight leading-none">NUXT 3 MASTER</h1>
          <span class="text-[10px] font-semibold text-primary uppercase tracking-widest">Nitro Auth Server</span>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <ThemeToggle />

        <div v-if="user" class="flex items-center gap-3 pl-4 border-l border-border">
          <div class="text-right">
            <p class="text-xs font-bold leading-none">{{ user.name }}</p>
            <span class="text-[10px] text-muted-foreground uppercase font-mono">{{ user.role }}</span>
          </div>
          <button
            type="button"
            title="Sign out"
            class="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            @click="logout"
          >
            <LogOut class="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-black tracking-tight">Nitro Server &amp; Auth Hub</h2>
          <p class="text-xs text-muted-foreground mt-0.5">
            Active JWT Auth session running with CORS enabled on port 3000
          </p>
        </div>
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          <span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          API Online
        </span>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="rounded-xl border border-border bg-card p-5 space-y-2">
          <div class="flex items-center justify-between text-muted-foreground">
            <span class="text-xs font-semibold uppercase">Total Users</span>
            <Users class="h-4 w-4 text-primary" />
          </div>
          <div class="text-2xl font-extrabold">{{ stats?.totalUsers?.toLocaleString() || '---' }}</div>
        </div>

        <div class="rounded-xl border border-border bg-card p-5 space-y-2">
          <div class="flex items-center justify-between text-muted-foreground">
            <span class="text-xs font-semibold uppercase">Active Sessions</span>
            <Activity class="h-4 w-4 text-primary" />
          </div>
          <div class="text-2xl font-extrabold">{{ stats?.activeSessions?.toLocaleString() || '---' }}</div>
        </div>

        <div class="rounded-xl border border-border bg-card p-5 space-y-2">
          <div class="flex items-center justify-between text-muted-foreground">
            <span class="text-xs font-semibold uppercase">ARR Revenue</span>
            <DollarSign class="h-4 w-4 text-primary" />
          </div>
          <div class="text-2xl font-extrabold">${{ stats?.totalRevenue?.toLocaleString() || '---' }}</div>
        </div>

        <div class="rounded-xl border border-border bg-card p-5 space-y-2">
          <div class="flex items-center justify-between text-muted-foreground">
            <span class="text-xs font-semibold uppercase">Health SLA</span>
            <ShieldCheck class="h-4 w-4 text-primary" />
          </div>
          <div class="text-2xl font-extrabold">{{ stats?.apiHealth || '99.9' }}%</div>
        </div>
      </div>

      <!-- Activity Feed & API Reference -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="rounded-xl border border-border bg-card p-6 space-y-4">
          <h3 class="text-base font-bold">API Connectivity</h3>
          <p class="text-xs text-muted-foreground">
            This Nuxt backend serves authentication and resources for both its internal SSR views and external client SPAs (such as Vue 3):
          </p>

          <div class="space-y-2 font-mono text-xs">
            <div class="p-2.5 rounded bg-muted/50 flex items-center justify-between">
              <span class="text-emerald-500 font-bold">POST</span>
              <span>/api/auth/login</span>
              <span class="text-muted-foreground text-[10px]">JWT + Refresh</span>
            </div>
            <div class="p-2.5 rounded bg-muted/50 flex items-center justify-between">
              <span class="text-emerald-500 font-bold">POST</span>
              <span>/api/auth/register</span>
              <span class="text-muted-foreground text-[10px]">Bcrypt Salt</span>
            </div>
            <div class="p-2.5 rounded bg-muted/50 flex items-center justify-between">
              <span class="text-blue-500 font-bold">GET</span>
              <span>/api/auth/me</span>
              <span class="text-muted-foreground text-[10px]">Bearer Token</span>
            </div>
            <div class="p-2.5 rounded bg-muted/50 flex items-center justify-between">
              <span class="text-emerald-500 font-bold">POST</span>
              <span>/api/auth/refresh</span>
              <span class="text-muted-foreground text-[10px]">Token Rotation</span>
            </div>
          </div>
        </div>

        <div class="rounded-xl border border-border bg-card p-6 space-y-4">
          <h3 class="text-base font-bold">Recent Nitro Events</h3>
          <div class="space-y-3">
            <div
              v-for="item in activity"
              :key="item.id"
              class="p-3 rounded-lg bg-accent/40 flex items-start gap-3"
            >
              <div class="h-7 w-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                <Activity class="h-3.5 w-3.5" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                  <h4 class="text-xs font-bold">{{ item.title }}</h4>
                  <span class="text-[10px] text-muted-foreground">{{ item.timestamp }}</span>
                </div>
                <p class="text-[11px] text-muted-foreground mt-0.5">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
