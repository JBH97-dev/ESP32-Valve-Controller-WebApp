<script>
  let { schedules, onToggle } = $props()
</script>

<div>
  <h3 class="text-lg font-bold text-gray-900 mb-4">Scheduled Tasks</h3>
  <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-lg">
    <div class="space-y-4">
      {#each schedules as schedule (schedule.id)}
        <div class="group bg-white/60 rounded-xl p-4 border border-white/40 hover:shadow-md transition-all duration-200">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 class="font-bold text-gray-900">{schedule.name}</h3>
                <p class="text-sm text-gray-600">{schedule.time}</p>
              </div>
            </div>
            
            <button
              aria-label={`Toggle ${schedule.name}`}
              onclick={() => onToggle(schedule.id)}
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 {schedule.active ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' : 'bg-gray-300'}"
            >
              <span class="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-200 {schedule.active ? 'translate-x-6' : 'translate-x-1'}"></span>
            </button>
          </div>
          
          <div class="space-y-2 text-sm">
            <div class="flex items-center space-x-2">
              <span class="text-gray-500">Zones:</span>
              <div class="flex space-x-1">
                {#each schedule.zones as zone}
                  <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">{zone}</span>
                {/each}
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-500">Next run:</span>
              <span class="font-medium {schedule.active ? 'text-emerald-600' : 'text-gray-500'}">{schedule.nextRun}</span>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- System Information -->
  <div class="mt-8">
    <h3 class="text-lg font-bold text-gray-900 mb-4">System Information</h3>
    <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-lg">
      <div class="space-y-3">
        <div class="flex items-center justify-between py-2 border-b border-gray-100">
          <div class="flex items-center space-x-3">
            <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span class="text-sm font-medium text-gray-600">ESP32 Status</span>
          </div>
          <span class="text-sm font-bold text-emerald-600">Connected</span>
        </div>
        
        <div class="flex items-center justify-between py-2 border-b border-gray-100">
          <div class="flex items-center space-x-3">
            <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span class="text-sm font-medium text-gray-600">WiFi Signal</span>
          </div>
          <span class="text-sm font-bold text-gray-700">-45 dBm</span>
        </div>
        
        <div class="flex items-center justify-between py-2 border-b border-gray-100">
          <div class="flex items-center space-x-3">
            <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span class="text-sm font-medium text-gray-600">Uptime</span>
          </div>
          <span class="text-sm font-bold text-gray-700">2d 14h 32m</span>
        </div>
        
        <div class="flex items-center justify-between py-2">
          <div class="flex items-center space-x-3">
            <div class="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <span class="text-sm font-medium text-gray-600">Last Update</span>
          </div>
          <span class="text-sm font-bold text-gray-700">2 seconds ago</span>
        </div>
      </div>
    </div>
  </div>
</div>
