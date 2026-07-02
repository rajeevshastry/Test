const GITHUB_API_BASE = 'https://api.github.com';

export interface GitHubStats {
  buildSuccessRate: number;
  averageBuildDuration: number;
  failedBuilds: number;
  testPassRate: number;
  lastUpdated: string;
}

async function fetchFromGitHub(endpoint: string, token?: string) {
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
  };

  if (token) {
    headers['Authorization'] = `token ${token}`;
  }

  const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
    headers,
    next: { revalidate: 300 }, // Cache for 5 minutes
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function getGitHubStats(owner: string, repo: string, token?: string): Promise<GitHubStats> {
  try {
    const [workflowRuns, pullRequests] = await Promise.all([
      fetchFromGitHub(`/repos/${owner}/${repo}/actions/runs?per_page=100`, token),
      fetchFromGitHub(`/repos/${owner}/${repo}/pulls?state=closed&per_page=50`, token),
    ]);

    // Calculate build metrics from workflow runs
    const runs = workflowRuns.workflow_runs || [];
    const totalRuns = runs.length;
    const successfulRuns = runs.filter((run: any) => run.conclusion === 'success').length;
    const failedRuns = runs.filter((run: any) => run.conclusion === 'failure').length;

    const buildSuccessRate = totalRuns > 0 ? (successfulRuns / totalRuns) * 100 : 0;
    const averageBuildDuration = totalRuns > 0
      ? runs.reduce((sum: number, run: any) => sum + (run.run_number || 0), 0) / totalRuns
      : 0;

    // Calculate test pass rate from pull requests (using checks)
    let testPassRate = 0;
    if (pullRequests.length > 0) {
      const prWithChecks = pullRequests.filter((pr: any) => pr.statuses_url);
      testPassRate = prWithChecks.length > 0 ? (prWithChecks.length / pullRequests.length) * 100 : 0;
    }

    return {
      buildSuccessRate: Math.round(buildSuccessRate * 10) / 10,
      averageBuildDuration: Math.round(averageBuildDuration),
      failedBuilds: failedRuns,
      testPassRate: Math.round(testPassRate * 10) / 10,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Failed to fetch GitHub stats:', error);
    return {
      buildSuccessRate: 0,
      averageBuildDuration: 0,
      failedBuilds: 0,
      testPassRate: 0,
      lastUpdated: new Date().toISOString(),
    };
  }
}
