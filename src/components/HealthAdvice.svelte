<script lang="ts">
  import { onMount } from 'svelte';
  import { GoogleGenerativeAI } from '@google/generative-ai';

  let symptoms = '';
  let lifestyle = '';
  let healthGoals = '';
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

    if (!symptoms && !lifestyle && !healthGoals) {
      error = 'Please provide at least one input.';
      isLoading = false;
      return;
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `As an AI health advisor, provide personalized health advice based on the following information:
      ${symptoms ? `Symptoms: ${symptoms}` : ''}
      ${lifestyle ? `Lifestyle: ${lifestyle}` : ''}
      ${healthGoals ? `Health Goals: ${healthGoals}` : ''}
      
      Please provide a concise, informative, and actionable response.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      advice = response.text();
    } catch (err) {
      console.error('Error generating health advice:', err);
      error = 'Sorry, there was an error generating health advice. Please try again later.';
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="bg-white shadow-lg rounded-xl overflow-hidden">
  <div class="px-8 py-10">
    <h2 class="text-3xl font-bold text-health-blue-800 mb-8">Get Personalized Health Advice</h2>
    <form on:submit|preventDefault={getHealthAdvice} class="space-y-6">
      <div>
        <label for="symptoms" class="block text-sm font-medium text-gray-700 mb-1">Symptoms</label>
        <input type="text" name="symptoms" id="symptoms" bind:value={symptoms} class="input" placeholder="E.g., headache, fatigue, sore throat">
      </div>
      <div>
        <label for="lifestyle" class="block text-sm font-medium text-gray-700 mb-1">Lifestyle</label>
        <input type="text" name="lifestyle" id="lifestyle" bind:value={lifestyle} class="input" placeholder="E.g., sedentary job, regular exercise, balanced diet">
      </div>
      <div>
        <label for="healthGoals" class="block text-sm font-medium text-gray-700 mb-1">Health Goals</label>
        <input type="text" name="healthGoals" id="healthGoals" bind:value={healthGoals} class="input" placeholder="E.g., lose weight, improve sleep, reduce stress">
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
      <div class="mt-8 p-6 bg-health-blue-50 rounded-xl">
        <h3 class="text-xl font-semibold text-health-blue-800 mb-4">Health Advice:</h3>
        <p class="text-health-blue-700 whitespace-pre-wrap text-sm leading-relaxed">{advice}</p>
      </div>
    {/if}
  </div>
</div>