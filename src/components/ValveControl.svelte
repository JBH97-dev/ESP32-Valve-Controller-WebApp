<script>
  let { valve, systemActive, onToggle } = $props()
  
  function getZoneColor(zone) {
    switch (zone) {
      case 'Zone A': return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', accent: 'bg-blue-500' }
      case 'Zone B': return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', accent: 'bg-emerald-500' }
      case 'Zone C': return { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', accent: 'bg-purple-500' }
      default: return { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', accent: 'bg-gray-500' }
    }
  }
  
  let zoneColors = $derived(getZoneColor(valve.zone))
</script>

<div class="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 {valve.active ? 'ring-2 ring-emerald-400/50 bg-emerald-50/30' : ''} hover:transform hover:-translate-y-1">
  <!-- Active Indicator -->
  {#if valve.active}
    <div class="absolute top-4 right-4">
      <div class="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
      <div class="absolute inset-0 w-3 h-3 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
    </div>
  {/if}

  <!-- Header -->
  <div class="flex items-start justify-between mb-4">
    <div class="flex-1">
      <h3 class="text-lg font-bold text-gray-900 mb-2">{valve.name}</h3>
      <div class="flex items-center space-x-2">
        <span class="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full {zoneColors.bg} {zoneColors.text} {zoneColors.border} border">
          <div class="w-2 h-2 {zoneColors.accent} rounded-full mr-2"></div>
          {valve.zone}
        </span>
      </div>
    </div>
    
    <!-- Toggle Switch -->
    <button
      aria-label={`Toggle ${valve.name}`}
      onclick={onToggle}
      disabled={!systemActive}
      class="relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 {valve.active ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/25' : 'bg-gray-300 hover:bg-gray-400'}"
    >
      <span class="inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-200 {valve.active ? 'translate-x-7' : 'translate-x-1'}">
        {#if valve.active}
          <svg class="w-4 h-4 text-emerald-500 m-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
        {/if}
      </span>
    </button>
  </div>
  
  <!-- Stats Grid -->
  <div class="grid grid-cols-2 gap-4 mb-4">
    <div class="bg-white/60 rounded-xl p-3 border border-white/40">
      <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Duration</p>
      <p class="text-lg font-bold text-gray-900">{valve.duration}<span class="text-sm font-normal text-gray-500">min</span></p>
    </div>
    <div class="bg-white/60 rounded-xl p-3 border border-white/40">
      <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Flow Rate</p>
      <p class="text-lg font-bold text-gray-900">{valve.flow.toFixed(1)}<span class="text-sm font-normal text-gray-500">L/min</span></p>
    </div>
  </div>

  <!-- Status -->
  <div class="space-y-3">
    <div class="flex items-center justify-between text-sm">
      <span class="text-gray-600 font-medium">Status:</span>
      <span class="font-semibold {valve.active ? 'text-emerald-600' : 'text-gray-500'}">{valve.active ? 'Running' : 'Stopped'}</span>
    </div>
    <div class="flex items-center justify-between text-sm">
      <span class="text-gray-600 font-medium">Last Run:</span>
      <span class="font-semibold text-gray-700">{valve.lastRun}</span>
    </div>
  </div>
  
  <!-- Active Status Bar -->
  {#if valve.active}
    <div class="mt-4 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
      <div class="flex items-center space-x-3">
        <div class="flex-shrink-0">
          <svg class="w-5 h-5 text-emerald-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <div class="flex-1">
          <p class="text-sm font-semibold text-emerald-800">Active Irrigation</p>
          <div class="w-full bg-emerald-200 rounded-full h-2 mt-1">
            <div class="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full animate-pulse" style="width: 65%"></div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
