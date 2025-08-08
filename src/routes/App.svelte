<script>
  import ValveControl from './ValveControl.svelte';
  import SystemStatus from './SystemStatus.svelte';
  import SchedulePanel from './SchedulePanel.svelte';
  import QuickActions from './QuickActions.svelte';

  // System state using Svelte 5 runes
  let systemActive = $state(true);
  let waterPressure = $state(45.2);
  let flowRate = $state(12.5);
  let totalWaterUsed = $state(1247.8);
  let systemTemperature = $state(24.5);

  // Valve configurations
  let valves = $state([
    { id: 1, name: 'Front Garden', zone: 'Zone A', active: false, duration: 15, lastRun: '2 hours ago', flow: 0 },
    { id: 2, name: 'Back Lawn', zone: 'Zone A', active: true, duration: 20, lastRun: 'Running now', flow: 8.2 },
    { id: 3, name: 'Vegetable Garden', zone: 'Zone B', active: false, duration: 10, lastRun: '1 day ago', flow: 0 },
    { id: 4, name: 'Flower Beds', zone: 'Zone B', active: false, duration: 12, lastRun: '6 hours ago', flow: 0 },
    { id: 5, name: 'Greenhouse', zone: 'Zone C', active: false, duration: 8, lastRun: '3 hours ago', flow: 0 },
    { id: 6, name: 'Drip System', zone: 'Zone C', active: false, duration: 30, lastRun: '12 hours ago', flow: 0 }
  ]);

  // Derived state
  const activeValves = $derived(valves.filter(valve => valve.active).length);
  const systemStatus = $derived(systemActive ? 'Online' : 'Offline');
  const totalFlow = $derived(valves.reduce((sum, valve) => sum + valve.flow, 0));

  // Functions to handle valve operations
  function toggleValve(valveId) {
    const valve = valves.find(v => v.id === valveId);
    if (valve) {
      valve.active = !valve.active;
      valve.lastRun = valve.active ? 'Running now' : 'Just stopped';
      valve.flow = valve.active ? Math.random() * 10 + 2 : 0;
      
      // Simulate sending command to ESP32
      console.log(`Valve ${valveId} ${valve.active ? 'activated' : 'deactivated'}`);
    }
  }

  function emergencyStop() {
    valves.forEach(valve => {
      valve.active = false;
      valve.lastRun = 'Emergency stopped';
      valve.flow = 0;
    });
    console.log('Emergency stop activated');
  }

  function toggleSystem() {
    systemActive = !systemActive;
    if (!systemActive) {
      emergencyStop();
    }
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
  <header class="bg-white/80 backdrop-blur-lg shadow-xl border-b border-white/20 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="flex justify-between items-center py-6">
        <div class="flex items-center space-x-4">
          <div class="relative">
            <div class="w-14 h-14 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
              </svg>
            </div>
            {#if systemActive}
              <div class="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse border-2 border-white"></div>
            {/if}
          </div>
          <div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              AquaFlow Control
            </h1>
            <p class="text-sm text-gray-500 font-medium">Smart Irrigation Management System</p>
          </div>
        </div>
        
        <div class="flex items-center space-x-6">
          <div class="flex items-center space-x-3 px-4 py-2 bg-white/60 rounded-full border border-white/40">
            <div class="relative">
              <div class="w-3 h-3 rounded-full {systemActive ? 'bg-emerald-500' : 'bg-red-500'}"></div>
              {#if systemActive}
                <div class="absolute inset-0 w-3 h-3 rounded-full bg-emerald-500 animate-ping opacity-75"></div>
              {/if}
            </div>
            <span class="text-sm font-semibold text-gray-700">{systemStatus}</span>
          </div>
          
          <div class="flex items-center space-x-3">
            <button 
              onclick={toggleSystem}
              class="px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg {systemActive ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white' : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white'}"
            >
              {systemActive ? 'Stop System' : 'Start System'}
            </button>
            
            <button 
              onclick={emergencyStop}
              class="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={!systemActive}
            >
              Emergency Stop
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>

  <div class="max-w-7xl mx-auto px-6 lg:px-8 py-8 space-y-8">
    <section class="space-y-6">
      <div class="flex items-center space-x-3">
        <div class="w-1 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
        <h2 class="text-2xl font-bold text-gray-900">System Overview</h2>
      </div>
      <SystemStatus 
        {systemActive}
        {waterPressure}
        {flowRate}
        {totalWaterUsed}
        {activeValves}
        {systemTemperature}
        {totalFlow}
      />
    </section>

    <div class="grid grid-cols-1 xl:grid-cols-4 gap-8">
      <section class="xl:col-span-3 space-y-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
            <h2 class="text-2xl font-bold text-gray-900">Valve Controls</h2>
          </div>
          <div class="text-sm text-gray-500 bg-white/60 px-3 py-1 rounded-full">
            {activeValves} of {valves.length} active
          </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {#each valves as valve (valve.id)}
            <ValveControl 
              {valve}
              {systemActive}
              onToggle={() => toggleValve(valve.id)}
            />
          {/each}
        </div>
      </section>

      <section class="xl:col-span-1 space-y-8">
        <div class="space-y-6">
          <div class="flex items-center space-x-3">
            <div class="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
            <h2 class="text-xl font-bold text-gray-900">Quick Actions</h2>
          </div>
          <QuickActions {systemActive} />
        </div>

        <div class="space-y-6">
          <div class="flex items-center space-x-3">
            <div class="w-1 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
            <h2 class="text-xl font-bold text-gray-900">Schedules</h2>
          </div>
          <SchedulePanel {systemActive} />
        </div>
      </section>
    </div>
  </div>
</div>
