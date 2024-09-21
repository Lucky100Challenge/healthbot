<script>
    import "../app.css";
    import Header from '../components/Header.svelte';
</script>

<div class="min-h-screen bg-gray-50 flex flex-col">
    <Header />
    <main class="flex-grow">
        <div class="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <slot />
        </div>
    </main>
    <footer class="bg-white border-t border-gray-200 py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p class="text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} AI Health Advisor. All rights reserved.
            </p>
        </div>
    </footer>
</div>