<script lang="ts">
  import { page } from '$app/stores';
</script>

<header class="bg-white shadow-md">
  <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
    <div class="w-full py-6 flex items-center justify-between">
      <div class="flex items-center">
        <a href="/" class="text-2xl font-bold text-health-blue-600 hover:text-health-blue-700 transition-colors">
          <span class="sr-only">AI Health Advisor</span>
          <svg class="h-8 w-auto inline-block mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
          </svg>
          AI Health Advisor
        </a>
      </div>
      <div class="flex space-x-8">
        <a href="/" class="text-base font-medium text-gray-500 hover:text-health-blue-600 transition-colors" class:text-health-blue-600={$page.url.pathname === '/'}>Home</a>
        <a href="/health-advice" class="text-base font-medium text-gray-500 hover:text-health-blue-600 transition-colors" class:text-health-blue-600={$page.url.pathname === '/health-advice'}>Health Advice</a>
        <a href="/symptom-checker" class="text-base font-medium text-gray-500 hover:text-health-blue-600 transition-colors" class:text-health-blue-600={$page.url.pathname === '/symptom-checker'}>Symptom Checker</a>
        <a href="/medical-dictionary" class="text-base font-medium text-gray-500 hover:text-health-blue-600 transition-colors" class:text-health-blue-600={$page.url.pathname === '/medical-dictionary'}>Medical Dictionary</a>
        <a href="/about" class="text-base font-medium text-gray-500 hover:text-health-blue-600 transition-colors" class:text-health-blue-600={$page.url.pathname === '/about'}>About</a>
        <a href="/contact" class="text-base font-medium text-gray-500 hover:text-health-blue-600 transition-colors" class:text-health-blue-600={$page.url.pathname === '/contact'}>Contact</a>
      </div>
    </div>
  </nav>
</header>