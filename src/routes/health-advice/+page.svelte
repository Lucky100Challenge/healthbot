<script lang="ts">
  import { onMount } from 'svelte';
  import { GoogleGenerativeAI } from '@google/generative-ai';
  import { marked } from 'marked';

  let symptoms = '';
  let lifestyle = '';
  let advice = '';
  let isLoading = false;
  let error = '';

  let genAI: GoogleGenerativeAI;

  onMount(() => {
    genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
  });

  async function getHealthAdvice() {
    isLoading = true;
    error = '';
    advice = '';

    if (!symptoms && !lifestyle) {
      error = 'Please provide at least one input.';
      isLoading = false;
      return;
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `As an AI doctor, provide personalized health advice based on the following information:
      ${symptoms ? `Symptoms: ${symptoms}` : ''}
      ${lifestyle ? `Lifestyle: ${lifestyle}` : ''}
      
      Please provide a concise, informative, and actionable response. Include potential diagnoses, recommended next steps, and any lifestyle changes that might help. Remember to advise consultation with a real doctor for serious concerns. Use markdown formatting for headings, lists, and emphasis.`;

      const result = await model.generateContent(prompt);
      const markdownText = result.response.text();
      advice = marked.parse(markdownText);
    } catch (err) {
      console.error('Error generating health advice:', err);
      error = 'Sorry, there was an error generating health advice. Please try again later.';
    } finally {
      isLoading = false;
    }
  }
</script>

<svelte:head>
  <title>Health Advice - AI Health Advisor</title>
</svelte:head>

<div class="bg-white shadow-lg rounded-xl overflow-hidden">
  <div class="px-8 py-10">
    <h2 class="text-3xl font-bold text-health-blue-800 mb-8">Get Health Advice</h2>
    <form on:submit|preventDefault={getHealthAdvice} class="space-y-6">
      <div>
        <label for="symptoms" class="block text-sm font-medium text-gray-700 mb-1">Symptoms</label>
        <input type="text" name="symptoms" id="symptoms" bind:value={symptoms} class="input" placeholder="E.g., headache, fever, sore throat">
      </div>
      <div>
        <label for="lifestyle" class="block text-sm font-medium text-gray-700 mb-1">Lifestyle</label>
        <input type="text" name="lifestyle" id="lifestyle" bind:value={lifestyle} class="input" placeholder="E.g., sedentary job, smoker, high-stress environment">
      </div>
      <div>
        <button type="submit" class="btn w-full" disabled={isLoading}>
          {isLoading ? 'Generating Advice...' : 'Get Health Advice'}
        </button>
      </div>
    </form>
    {#if error}
      <div class="mt-6 p-4 bg-red-50 rounded-md text-red-600 text-sm">{error}</div>
    {/if}
    {#if advice}
      <div class="mt-8 p-6 bg-health-blue-50 rounded-xl prose prose-health-blue">
        <h3 class="text-xl font-semibold text-health-blue-800 mb-4">Health Advice:</h3>
        {@html advice}
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