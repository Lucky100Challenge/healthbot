<script lang="ts">
  import { onMount } from 'svelte';

  let tip = '';
  const tips = [
    "Stay hydrated: Drink at least 8 glasses of water a day.",
    "Exercise regularly: Aim for 30 minutes of moderate activity daily.",
    "Eat a balanced diet rich in fruits and vegetables.",
    "Get enough sleep: Aim for 7-9 hours per night.",
    "Practice stress-reduction techniques like meditation or deep breathing.",
    "Limit processed foods and sugary drinks.",
    "Don't skip breakfast: It's the most important meal of the day.",
    "Take breaks from sitting: Stand up and stretch every hour.",
    "Wash your hands frequently to prevent the spread of germs.",
    "Schedule regular check-ups with your doctor."
  ];

  onMount(() => {
    tip = tips[Math.floor(Math.random() * tips.length)];
  });
</script>

<div class="bg-health-blue-50 p-4 rounded-lg shadow">
  <h3 class="text-lg font-semibold text-health-blue-800 mb-2">Health Tip of the Day</h3>
  <p class="text-health-blue-700">{tip}</p>
</div>