<script lang="ts">
  import { writable } from 'svelte/store';

  const nameStore = writable('');
  const emailStore = writable('');
  const messageStore = writable('');
  const submitted = writable(false);

  function handleSubmit() {
    // Here you would typically send the form data to a server
    console.log({ 
      name: $nameStore, 
      email: $emailStore, 
      message: $messageStore 
    });
    submitted.set(true);
  }
</script>

<svelte:head>
  <title>Contact - AI Health Advisor</title>
</svelte:head>

<div class="bg-white shadow-lg rounded-xl overflow-hidden">
  <div class="px-8 py-10">
    <h1 class="text-3xl font-bold text-health-blue-800 mb-8">Contact Us</h1>
    {#if $submitted}
      <div class="bg-health-green-50 border border-health-green-200 rounded-md p-6">
        <h2 class="text-xl font-semibold text-health-green-800 mb-2">Thank you for your message!</h2>
        <p class="text-health-green-700">We appreciate your feedback and will get back to you as soon as possible.</p>
      </div>
    {:else}
      <form on:submit|preventDefault={handleSubmit} class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input type="text" name="name" id="name" bind:value={$nameStore} required class="input" placeholder="Your full name">
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" name="email" id="email" bind:value={$emailStore} required class="input" placeholder="you@example.com">
        </div>
        <div>
          <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea name="message" id="message" bind:value={$messageStore} required class="input" rows="4" placeholder="How can we help you?"></textarea>
        </div>
        <div>
          <button type="submit" class="btn w-full">Send Message</button>
        </div>
      </form>
    {/if}
  </div>
</div>