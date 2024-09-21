<script lang="ts">
  import { onMount } from 'svelte';
  import { GoogleGenerativeAI } from '@google/generative-ai';
  import { marked } from 'marked';

  let symptoms = '';
  let result = '';
  let isLoading = false;
  let error = '';

  let genAI: GoogleGenerativeAI;

  onMount(() => {
    genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
  });

  async function checkSymptoms() {
    isLoading = true;
    error = '';
    result = '';

    if (!symptoms) {
      error = 'Please enter your symptoms.';
      isLoading = false;
      return;
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `As an AI symptom checker, analyze the following symptoms and provide potential conditions and recommendations. Remember to advise consultation with a real doctor. Use markdown formatting for headings, lists, and emphasis. Symptoms: ${symptoms}`;

      const response = await model.generateContent(prompt);
      const markdownText = response.response.text();
      result = marked.parse(markdownText);
    } catch (err) {
      console.error('Error checking symptoms:', err);
      error = 'Sorry, there was an error checking your symptoms. Please try again later.';
    } finally {
      isLoading = false;
    }
  }
</script>

<svelte:head>
  <title>Symptom Checker - AI Health Advisor</title>
</svelte:head>

<div class="bg-gradient-to-br from-health-blue-50 to-white shadow-lg rounded-xl overflow-hidden">
  <div class="px-8 py-10">
    <h2 class="text-3xl font-bold text-health-blue-800 mb-8 flex items-center">
      <svg class="w-8 h-8 mr-3 text-health-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      Symptom Checker
    </h2>
    <p class="text-gray-600 mb-6">Describe your symptoms below and our AI will analyze them to provide potential conditions and recommendations.</p>
    <form on:submit|preventDefault={checkSymptoms} class="space-y-6">
      <div>
        <label for="symptoms" class="block text-sm font-medium text-gray-700 mb-1">Describe your symptoms</label>
        <textarea 
          id="symptoms" 
          bind:value={symptoms} 
          rows="4" 
          class="input w-full transition-shadow duration-200 ease-in-out focus:shadow-lg" 
          placeholder="E.g., I've been experiencing a persistent headache for the past three days, along with mild fever and fatigue."
        ></textarea>
      </div>
      <button type="submit" class="btn w-full flex justify-center items-center transition-all duration-200 ease-in-out transform hover:scale-105" disabled={isLoading}>
        {#if isLoading}
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Analyzing...
        {:else}
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
          </svg>
          Check Symptoms
        {/if}
      </button>
    </form>
    {#if error}
      <div class="mt-6 p-4 bg-red-50 rounded-md text-red-600 text-sm flex items-center">
        <svg class="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
        </svg>
        {error}
      </div>
    {/if}
    {#if result}
      <div class="mt-8 p-6 bg-white rounded-xl shadow-md prose prose-health-blue">
        <h3 class="text-xl font-semibold text-health-blue-800 mb-4 flex items-center">
          <svg class="w-6 h-6 mr-2 text-health-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          Analysis Result:
        </h3>
        {@html result}
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
  :global(.prose a) {
    @apply text-health-blue-600 hover:text-health-blue-800 transition-colors duration-200;
  }
</style>