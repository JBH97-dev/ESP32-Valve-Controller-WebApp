<script>
  let { systemActive, waterPressure, totalFlow, activeValves, totalWaterUsed, systemTemperature } = $props()
</script>

<div class="mb-8">
  <div class="flex items-center justify-between mb-6">
    <h2 class="text-2xl font-bold text-gray-900">System Overview</h2>
    <div class="flex items-center space-x-2">
      <div class="w-3 h-3 {systemActive ? 'bg-green-500' : 'bg-red-500'} rounded-full {systemActive ? 'animate-pulse' : ''}"></div>
      <span class="text-sm font-semibold {systemActive ? 'text-green-600' : 'text-red-600'}">{systemActive ? 'System Online' : 'System Offline'}</span>
    </div>
  </div>
  
  <!-- System Stats Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <!-- Water Pressure -->
    <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 group hover:transform hover:-translate-y-1">
      <div class="flex items-center justify-between mb-4">
        <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <div class="text-right">
          <p class="text-2xl font-bold text-gray-900">{waterPressure}</p>
          <p class="text-xs text-gray-500 font-medium uppercase tracking-wide">PSI</p>
        </div>
      </div>
      <p class="text-sm font-semibold text-gray-600 mb-3">Water Pressure</p>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div class="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500" style="width: {Math.min((waterPressure / 60) * 100, 100)}%"></div>
      </div>
    </div>

    <!-- Total Flow Rate -->
    <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 group hover:transform hover:-translate-y-1">
      <div class="flex items-center justify-between mb-4">
        <div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
          </svg>
        </div>
        <div class="text-right">
          <p class="text-2xl font-bold text-gray-900">{totalFlow ? totalFlow.toFixed(1) : '0.0'}</p>
          <p class="text-xs text-gray-500 font-medium uppercase tracking-wide">L/min</p>
        </div>
      </div>
      <p class="text-sm font-semibold text-gray-600 mb-3">Total Flow Rate</p>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div class="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-500" style="width: {Math.min(((totalFlow || 0) / 50) * 100, 100)}%"></div>
      </div>
    </div>

    <!-- Active Valves -->
    <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 group hover:transform hover:-translate-y-1">
      <div class="flex items-center justify-between mb-4">
        <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
        </div>
        <div class="text-right">
          <p class="text-2xl font-bold text-gray-900">{activeValves || 0}/6</p>
          <p class="text-xs text-gray-500 font-medium uppercase tracking-wide">Valves</p>
        </div>
      </div>
      <p class="text-sm font-semibold text-gray-600 mb-3">Active Valves</p>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500" style="width: {((activeValves || 0) / 6) * 100}%"></div>
      </div>
    </div>

    <!-- Water Usage -->
    <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 group hover:transform hover:-translate-y-1">
      <div class="flex items-center justify-between mb-4">
        <div class="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
          </svg>
        </div>
        <div class="text-right">
          <p class="text-2xl font-bold text-gray-900">{totalWaterUsed}</p>
          <p class="text-xs text-gray-500 font-medium uppercase tracking-wide">Liters</p>
        </div>
      </div>
      <p class="text-sm font-semibold text-gray-600 mb-3">Water Used Today</p>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div class="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500" style="width: {Math.min((totalWaterUsed / 2000) * 100, 100)}%"></div>
      </div>
    </div>
  </div>
</div>
