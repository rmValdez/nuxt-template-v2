<script setup lang="ts">
import { useAuth } from '../composables/useAuth';

const { isAuthenticated } = useAuth();

if (isAuthenticated.value) {
  navigateTo('/dashboard');
} else {
  navigateTo('/login');
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <span class="text-sm text-muted-foreground animate-pulse">Redirecting...</span>
  </div>
</template>
