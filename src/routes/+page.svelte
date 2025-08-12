<script>
  import ValveControl from '../components/ValveControl.svelte'
  import SystemStatus from '../components/SystemStatus.svelte'
  import QuickActions from '../components/QuickActions.svelte'
  import SchedulePanel from '../components/SchedulePanel.svelte'
  
  // API Configuration
  const ESP32_BASE_URL = 'http://192.168.1.100' // Replace with your ESP32 IP
  
  // State management with API integration
  let systemActive = $state(true)
  let waterPressure = $state(45)
  let systemTemperature = $state(28)
  let totalWaterUsed = $state(1247)
  
  let valves = $state([
    { id: 1, name: 'Garden Sprinklers', zone: 'Zone A', active: false, duration: 15, flow: 8.2, lastRun: '2 hours ago' },
    { id: 2, name: 'Lawn System', zone: 'Zone A', active: true, duration: 20, flow: 12.5, lastRun: '30 min ago' },
    { id: 3, name: 'Vegetable Garden', zone: 'Zone B', active: false, duration: 25, flow: 6.8, lastRun: '1 hour ago' },
    { id: 4, name: 'Flower Beds', zone: 'Zone B', active: true, duration: 10, flow: 4.3, lastRun: '45 min ago' },
    { id: 5, name: 'Tree Irrigation', zone: 'Zone C', active: false, duration: 30, flow: 15.7, lastRun: '3 hours ago' },
    { id: 6, name: 'Greenhouse', zone: 'Zone C', active: false, duration: 12, flow: 9.1, lastRun: '1.5 hours ago' }
  ])
  
  let schedules = $state([
    { id: 1, name: 'Morning Routine', time: '06:00', zones: ['Zone A', 'Zone B'], active: true, nextRun: 'Tomorrow at 6:00 AM' },
    { id: 2, name: 'Evening Watering', time: '18:30', zones: ['Zone C'], active: true, nextRun: 'Today at 6:30 PM' },
    { id: 3, name: 'Deep Watering', time: '22:00', zones: ['Zone A', 'Zone B', 'Zone C'], active: false, nextRun: 'Disabled' }
  ])

  // Computed values
  let activeValves = $derived(valves.filter(v => v.active).length)
  let totalFlow = $derived(valves.reduce((sum, valve) => sum + (valve.active ? valve.flow : 0), 0))

  // API Functions
  async function apiRequest(endpoint, method = 'GET', data = null) {
    try {
      const options = {
        method,
        headers: { 'Content-Type': 'application/json' }
      }
      if (data) options.body = JSON.stringify(data)
      
      const response = await fetch(`${ESP32_BASE_URL}${endpoint}`, options)
      return await response.json()
    } catch (error) {
      console.error('API Error:', error)
      return null
    }
  }

  async function toggleValve(valveId) {
    const valve = valves.find(v => v.id === valveId)
    if (!valve || !systemActive) return
    
    const result = await apiRequest(`/valve/${valveId}/toggle`, 'POST')
    if (result) {
      valve.active = !valve.active
      valve.lastRun = valve.active ? 'Just now' : valve.lastRun
      await fetchSystemStatus()
    }
  }

  async function executeQuickAction(actionName) {
    if (!systemActive) return
    
    const result = await apiRequest('/quick-action', 'POST', { action: actionName })
    if (result) {
      await fetchSystemStatus()
      await fetchValveStatus()
    }
  }

  async function toggleSchedule(scheduleId) {
    const schedule = schedules.find(s => s.id === scheduleId)
    if (!schedule) return
    
    const result = await apiRequest(`/schedule/${scheduleId}/toggle`, 'POST')
    if (result) {
      schedule.active = !schedule.active
      schedule.nextRun = schedule.active ? 'Next run calculated...' : 'Disabled'
    }
  }

  async function emergencyStop() {
    const result = await apiRequest('/emergency-stop', 'POST')
    if (result) {
      valves.forEach(valve => valve.active = false)
      await fetchSystemStatus()
    }
  }

  async function fetchSystemStatus() {
    const result = await apiRequest('/status')
    if (result) {
      systemActive = result.systemActive
      waterPressure = result.waterPressure
      systemTemperature = result.temperature
      totalWaterUsed = result.totalWaterUsed
    }
  }

  async function fetchValveStatus() {
    const result = await apiRequest('/valves')
    if (result) {
      result.forEach(apiValve => {
        const valve = valves.find(v => v.id === apiValve.id)
        if (valve) {
          valve.active = apiValve.active
          valve.flow = apiValve.flow
          valve.lastRun = apiValve.lastRun
        }
      })
    }
  }

  // Auto-refresh data every 5 seconds
  setInterval(() => {
    fetchSystemStatus()
    fetchValveStatus()
  }, 5000)

  // Initial data fetch
  fetchSystemStatus()
  fetchValveStatus()
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
  <!-- Header -->
  <header class="bg-white/80 backdrop-blur-sm border-b border-white/40 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center space-x-4">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
            </svg>
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-900">Irrigation Control System</h1>
          </div>
        </div>
        
        <div class="flex items-center space-x-4">
          <button 
            aria-label="Emergency Stop"
            onclick={emergencyStop}
            class="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Emergency Stop
          </button>
        </div>
      </div>
    </div>
  </header>

  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- System Status Overview -->
    <SystemStatus 
      {systemActive} 
      {waterPressure} 
      {totalFlow} 
      {activeValves} 
      {totalWaterUsed} 
      {systemTemperature} 
    />

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 xl:grid-cols-4 gap-8">
      <!-- Valve Controls -->
      <div class="xl:col-span-3">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Valve Controls</h2>
          <div class="text-sm text-gray-600">
            <span class="font-semibold">{activeValves}</span> of <span class="font-semibold">6</span> valves active
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each valves as valve (valve.id)}
            <ValveControl {valve} {systemActive} onToggle={() => toggleValve(valve.id)} />
          {/each}
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-8">
        <QuickActions {systemActive} onExecute={executeQuickAction} />
        <SchedulePanel {schedules} onToggle={toggleSchedule} />
      </div>
    </div>
  </main>
</div>
