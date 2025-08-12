<script>
  let { systemActive, onExecute } = $props()
  
  const quickActions = [
    { name: 'Morning Routine', duration: '15 min', icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z', gradient: 'from-yellow-400 to-orange-500' },
    { name: 'Quick Test', duration: '2 min', icon: 'M13 10V3L4 14h7v7l9-11h-7z', gradient: 'from-blue-400 to-blue-600' },
    { name: 'Deep Watering', duration: '45 min', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z', gradient: 'from-emerald-400 to-teal-600' },
    { name: 'Night Cycle', duration: '30 min', icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z', gradient: 'from-purple-400 to-indigo-600' }
  ]
</script>

<div>
  <h3 class="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
  <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-lg">
    <div class="space-y-4">
      {#each quickActions as action}
        <button 
          aria-label={action.name}
          onclick={() => onExecute(action.name)}
          class="w-full group relative overflow-hidden bg-gradient-to-r {action.gradient} p-4 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          disabled={!systemActive}
        >
          <div class="flex items-center justify-between relative z-10">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="{action.icon}"></path>
                </svg>
              </div>
              <div>
                <p class="font-bold">{action.name}</p>
                <p class="text-sm opacity-90">{action.duration}</p>
              </div>
            </div>
            
            <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
          <div class="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </button>
      {/each}
    </div>
  </div>
</div>
