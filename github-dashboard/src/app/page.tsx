'use client';

import { useEffect, useState } from 'react';
import { DashboardGrid } from '@/components/DashboardGrid';
import { GitHubStats, getGitHubStats } from '@/lib/github-api';
import { getAllOwners, getRepositoriesByOwner } from '@/lib/repositories';

export default function Home() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [selectedOwner, setSelectedOwner] = useState('');
  const [selectedRepo, setSelectedRepo] = useState('');
  const [availableRepositories, setAvailableRepositories] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [owners, setOwners] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
    setOwners(getAllOwners());
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }
  }, [darkMode, mounted]);

  const handleOwnerChange = (newOwner: string) => {
    setSelectedOwner(newOwner);
    setSelectedRepo('');
    const repos = getRepositoriesByOwner(newOwner);
    setAvailableRepositories(repos);
  };

  const handleRepoChange = (newRepo: string) => {
    setSelectedRepo(newRepo);
  };

  const fetchStats = async () => {
    if (!selectedOwner || !selectedRepo) {
      alert('Please select both owner and repository');
      return;
    }
    setLoading(true);
    const data = await getGitHubStats(selectedOwner, selectedRepo);
    setStats(data);
    setOwner(selectedOwner);
    setRepo(selectedRepo);
    setLoading(false);
  };

  const bgClass = darkMode
    ? 'min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
    : 'min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50';

  const headerTextClass = darkMode ? 'text-white' : 'text-slate-900';
  const subtextClass = darkMode ? 'text-slate-400' : 'text-slate-600';
  const selectBgClass = darkMode ? 'bg-slate-800' : 'bg-white';
  const selectTextClass = darkMode ? 'text-white' : 'text-slate-900';
  const selectBorderClass = darkMode
    ? 'bg-slate-700 text-white border-slate-600'
    : 'bg-slate-100 text-slate-900 border-slate-300';
  const inputBgClass = darkMode ? 'bg-slate-800' : 'bg-white';
  const labelTextClass = darkMode ? 'text-white' : 'text-slate-900';

  return (
    <div className={bgClass}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header with Theme Toggle */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <h1 className={`text-4xl font-bold ${headerTextClass} mb-2`}>GitHub Dashboard</h1>
            <p className={subtextClass}>Monitor build success rates, test pass rates, and more</p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              darkMode
                ? 'bg-yellow-500 hover:bg-yellow-600 text-slate-900'
                : 'bg-slate-800 hover:bg-slate-700 text-white'
            }`}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>

        {/* Repository Selection */}
        <div className={`${inputBgClass} rounded-lg shadow-lg p-6 mb-12 ${darkMode ? 'border border-slate-700' : 'border border-slate-200'}`}>
          <h2 className={`text-xl font-semibold ${labelTextClass} mb-4`}>Select Repository</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Owner Dropdown */}
            <div className="flex-1">
              <label className={`block text-sm font-medium ${labelTextClass} mb-2`}>Repository Owner</label>
              <select
                value={selectedOwner}
                onChange={(e) => handleOwnerChange(e.target.value)}
                className={`w-full px-4 py-2 ${selectBorderClass} rounded-lg border focus:border-blue-500 focus:outline-none transition-colors`}
              >
                <option value="">Select an owner...</option>
                {owners.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>

            {/* Repository Dropdown */}
            <div className="flex-1">
              <label className={`block text-sm font-medium ${labelTextClass} mb-2`}>Repository</label>
              <select
                value={selectedRepo}
                onChange={(e) => handleRepoChange(e.target.value)}
                disabled={!selectedOwner}
                className={`w-full px-4 py-2 ${selectBorderClass} rounded-lg border focus:border-blue-500 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <option value="">
                  {selectedOwner ? 'Select a repository...' : 'Select an owner first...'}
                </option>
                {availableRepositories.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Load Button */}
            <div className="flex items-end">
              <button
                onClick={fetchStats}
                disabled={!selectedOwner || !selectedRepo}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
              >
                Load
              </button>
            </div>
          </div>
          <p className={`text-xs ${subtextClass} mt-3`}>Select an owner from the dropdown, then choose a repository</p>
        </div>

        {/* Dashboard */}
        {stats && !loading && (
          <>
            <div className="mb-6">
              <h2 className={`text-2xl font-bold ${headerTextClass} mb-4`}>
                {owner}/{repo}
              </h2>
              <p className={`text-sm ${subtextClass}`}>Last updated: {new Date(stats.lastUpdated).toLocaleString()}</p>
            </div>
            <DashboardGrid stats={stats} darkMode={darkMode} />
          </>
        )}

        {loading && stats && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        {!stats && !loading && (
          <div className="text-center py-12">
            <p className={subtextClass}>Select a repository to view its metrics</p>
          </div>
        )}
      </main>
    </div>
  );
}
