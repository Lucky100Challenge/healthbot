<script lang="ts">
  import { onMount } from 'svelte';
  import { GoogleGenerativeAI } from '@google/generative-ai';
  import { marked } from 'marked';

  let term = '';
  let definition = '';
  let isLoading = false;
  let error = '';

  let genAI: GoogleGenerativeAI;

  onMount(() => {
    genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
  });

  async function lookupTerm() {
    isLoading = true;
    error = '';
    definition = '';

    if (!term) {
      error = 'Please enter a medical term.';
      isLoading = false;
      return;
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Provide a concise definition for the medical term: ${term}. Use markdown formatting for any headings, lists, or emphasis.`;

      const response = await model.generateContent(prompt);
      const markdownText = response.response.text();
      definition = marked.parse(markdownText);
    } catch (err) {
      console.error('Error looking up term:', err);
      error = 'Sorry, there was an error looking up the term. Please try again later.';
    } finally {
      isLoading = false;
    }
  }
</script>

<svelte:head>
  <title>Medical Dictionary - AI Health Advisor</title>
</svelte:head>

<div class="bg-white shadow-lg rounded-xl overflow-hidden">
  <div class="px-8 py-10">
    <h2 class="text-3xl font-bold text-health-blue-800 mb-8">Medical Dictionary</h2>
    <form on:submit|preventDefault={lookupTerm} class="space-y-6">
      <div>
        <label for="term" class="block text-sm font-medium text-gray-700 mb-1">Medical Term</label>
        <input type="text" id="term" bind:value={term} class="input" placeholder="Enter a medical term">
      </div>
      <button type="submit" class="btn w-full" disabled={isLoading}>
        {isLoading ? 'Looking up...' : 'Define Term'}
      </button>
    </form>
    {#if error}
      <p class="mt-4 text-red-600">{error}</p>
    {/if}
    {#if definition}
      <div class="mt-8 p-6 bg-health-blue-50 rounded-xl prose prose-health-blue">
        <h3 class="text-xl font-semibold text-health-blue-800 mb-4">Definition:</h3>
        {@html definition}
      </div>
    {/if}
  </div>
</div>

<style>
  :global(.prose) {
    @apply text-gray-700 max-w-none;
  }
  :global(.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6) {
    @apply text-health-blue-800 font-semibold;
  }
  :global(.prose strong) {
    @apply text-health-blue-700;
  }
  :global(.prose ul, .prose ol) {
    @apply my-2;
  }
  :global(.prose li) {
    @apply mb-1;
  }
</style>