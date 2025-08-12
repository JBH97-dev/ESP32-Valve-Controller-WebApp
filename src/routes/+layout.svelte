<script lang="ts">
	import '../app.css';
	
	let { children } = $props();
	
	let isLoading = $state(true);
	let loadingProgress = $state(0);
	
	function updateLoadingProgress() {
		const interval = setInterval(() => {
			loadingProgress += Math.random() * 30;
			if (loadingProgress >= 100) {
				loadingProgress = 100;
				setTimeout(() => {
					isLoading = false;
				}, 500);
				clearInterval(interval);
			}
		}, 200);
	}
	
	if (typeof window !== 'undefined') {
		updateLoadingProgress();
	}
</script>

{#if isLoading}
	<!-- Loading Screen -->
	<div class="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center z-50">
		<div class="text-center">
			<!-- Logo -->
			<div class="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl mb-8 mx-auto animate-pulse">
				<svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
				</svg>
			</div>
			
			<!-- Title -->
			<h1 class="text-3xl font-bold text-gray-900 mb-2">Irrigation Control System</h1>
			
			<!-- Progress Bar -->
			<div class="w-80 mx-auto">
				<div class="flex items-center justify-between mb-2">
					<span class="text-sm font-medium text-gray-700">Loading Resources</span>
					<span class="text-sm font-medium text-gray-700">{Math.round(loadingProgress)}%</span>
				</div>
				<div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
					<div 
						class="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300 ease-out"
						style="width: {loadingProgress}%"
					></div>
				</div>
			</div>
			
			<!-- Loading Animation -->
			<div class="flex justify-center mt-8 space-x-2">
				<div class="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
				<div class="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
				<div class="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
			</div>
		</div>
	</div>
{:else}
	<!-- Main Application -->
	<main class="min-h-screen">
		{@render children()}
	</main>
{/if}
