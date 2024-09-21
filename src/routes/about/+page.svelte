<script lang="ts">
  // No need for marked import now
</script>

<svelte:head>
  <title>About - AI Health Advisor</title>
</svelte:head>

<div class="bg-white shadow-lg rounded-xl overflow-hidden">
  <div class="px-8 py-10 prose prose-health-blue max-w-none">
    <h1>About AI Health Advisor</h1>

    <p>AI Health Advisor is a cutting-edge application that leverages artificial intelligence to provide personalized health advice. Our system uses advanced natural language processing and machine learning algorithms to analyze user inputs and generate tailored recommendations.</p>

    <h2>Our Mission</h2>

    <p>Our mission is to empower individuals with accessible, personalized health insights. We aim to bridge the gap between general health information and individual needs, providing a starting point for better health decisions.</p>

    <h2>How It Works</h2>

    <ol>
      <li><strong>Input Your Information</strong>: Share your symptoms, lifestyle, and health goals.</li>
      <li><strong>AI Analysis</strong>: Our advanced AI processes your input using the latest in machine learning technology.</li>
      <li><strong>Personalized Advice</strong>: Receive tailored health recommendations based on your unique profile.</li>
    </ol>

    <h2>Important Note</h2>

    <p>While our AI provides valuable insights, it is not a substitute for professional medical advice. Always consult with a qualified healthcare provider for serious health concerns.</p>

    <h2>Privacy and Security</h2>

    <p>We take your privacy seriously. All information provided is encrypted and used solely for generating your personalized health advice. We do not store or share your personal health information.</p>
  </div>
</div>
<style>
  :global(.prose) {
    @apply text-gray-700;
  }
  :global(.prose h1) {
    @apply text-3xl font-bold text-health-blue-800 mb-6;
  }
  :global(.prose h2) {
    @apply text-2xl font-semibold text-health-blue-700 mt-8 mb-4;
  }
  :global(.prose p) {
    @apply mb-4 leading-relaxed;
  }
  :global(.prose ol) {
    @apply list-decimal list-inside mb-4;
  }
  :global(.prose li) {
    @apply mb-2;
  }
  :global(.prose strong) {
    @apply text-health-blue-700;
  }
</style>
