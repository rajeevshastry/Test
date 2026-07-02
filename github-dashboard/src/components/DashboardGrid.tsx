import { GitHubStats } from '@/lib/github-api';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: string;
  bgColor: string;
  darkMode: boolean;
}

export function StatCard({ title, value, unit, icon, bgColor, darkMode }: StatCardProps) {
  const textClass = darkMode ? 'text-white' : 'text-slate-900';
  
  return (
    <div className={`${bgColor} rounded-lg shadow-md p-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${darkMode ? 'opacity-90' : 'opacity-80'}`}>{title}</p>
          <p className="text-3xl font-bold mt-2">
            {value}
            {unit && <span className="text-lg ml-2">{unit}</span>}
          </p>
        </div>
        <div className={`text-4xl ${darkMode ? 'opacity-20' : 'opacity-30'}`}>{icon}</div>
      </div>
    </div>
  );
}

interface DashboardGridProps {
  stats: GitHubStats;
  darkMode?: boolean;
}

export function DashboardGrid({ stats, darkMode = true }: DashboardGridProps) {
  const getCardColor = (baseColor: string) => {
    if (darkMode) {
      return baseColor;
    }
    const lightModeColors: Record<string, string> = {
      'bg-gradient-to-br from-green-500 to-green-600': 'bg-gradient-to-br from-green-400 to-green-500',
      'bg-gradient-to-br from-blue-500 to-blue-600': 'bg-gradient-to-br from-blue-400 to-blue-500',
      'bg-gradient-to-br from-red-500 to-red-600': 'bg-gradient-to-br from-red-400 to-red-500',
      'bg-gradient-to-br from-purple-500 to-purple-600': 'bg-gradient-to-br from-purple-400 to-purple-500',
    };
    return lightModeColors[baseColor] || baseColor;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Build Success Rate"
        value={stats.buildSuccessRate}
        unit="%"
        icon="✓"
        bgColor={getCardColor('bg-gradient-to-br from-green-500 to-green-600')}
        darkMode={darkMode}
      />
      <StatCard
        title="Average Build Duration"
        value={stats.averageBuildDuration}
        unit="min"
        icon="⏱"
        bgColor={getCardColor('bg-gradient-to-br from-blue-500 to-blue-600')}
        darkMode={darkMode}
      />
      <StatCard
        title="Failed Builds"
        value={stats.failedBuilds}
        icon="✗"
        bgColor={getCardColor('bg-gradient-to-br from-red-500 to-red-600')}
        darkMode={darkMode}
      />
      <StatCard
        title="Test Pass Rate"
        value={stats.testPassRate}
        unit="%"
        icon="🧪"
        bgColor={getCardColor('bg-gradient-to-br from-purple-500 to-purple-600')}
        darkMode={darkMode}
      />
    </div>
  );
}
