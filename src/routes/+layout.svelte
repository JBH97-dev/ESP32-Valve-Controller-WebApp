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
			<div class="mb-8 mx-auto">
				<img src="static/ValveSync_Logo_only.png" alt="ValveSync Logo" class="w-48 h-auto mx-auto" />
			</div>
			
			<!-- Title -->
			<h1 class="text-3xl font-bold text-gray-900 mb-2">ValveSync - Irrigation Control System</h1>
			
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
