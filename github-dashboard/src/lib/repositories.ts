export interface RepositoryMapping {
  owner: string;
  repositories: string[];
}

export const ownerRepositoryMap: RepositoryMapping[] = [
  {
    owner: 'facebook',
    repositories: ['react', 'docusaurus', 'hermes', 'relay', 'flux'],
  },
  {
    owner: 'microsoft',
    repositories: ['vscode', 'typescript', 'terminal', 'wsl', 'vscode-python'],
  },
  {
    owner: 'google',
    repositories: ['chromium', 'angular', 'protobuf', 'android', 'googletest'],
  },
  {
    owner: 'nodejs',
    repositories: ['node', 'nodejs.org', 'Release', 'Help', 'nan'],
  },
  {
    owner: 'kubernetes',
    repositories: ['kubernetes', 'enhancements', 'kops', 'kubectl', 'minikube'],
  },
  {
    owner: 'docker',
    repositories: ['cli', 'moby', 'compose', 'engine', 'swarmkit'],
  },
  {
    owner: 'golang',
    repositories: ['go', 'text', 'time', 'sys', 'crypto'],
  },
  {
    owner: 'rust-lang',
    repositories: ['rust', 'cargo', 'libc', 'regex', 'rustlings'],
  },
  {
    owner: 'python',
    repositories: ['cpython', 'devguide', 'peps', 'typeshed', 'cpython-test-cases'],
  },
  {
    owner: 'angular',
    repositories: ['angular', 'angular-cli', 'angular.io', 'angular-ja', 'material'],
  },
  {
    owner: 'vuejs',
    repositories: ['vue', 'core', 'vue-router', 'pinia', 'vite'],
  },
  {
    owner: 'torvalds',
    repositories: ['linux', 'Documentation'],
  },
  {
    owner: 'tensorflow',
    repositories: ['tensorflow', 'models', 'hub', 'tfjs', 'datasets'],
  },
  {
    owner: 'apache',
    repositories: ['kafka', 'cassandra', 'flink', 'spark', 'hadoop'],
  },
  {
    owner: 'elastic',
    repositories: ['elasticsearch', 'kibana', 'beats', 'logstash', 'eui'],
  },
  {
    owner: 'mongodb',
    repositories: ['mongo', 'mongo-go-driver', 'mongo-java-driver', 'compass', 'docs'],
  },
  {
    owner: 'redis',
    repositories: ['redis', 'redis-cli', 'redis-modules-hub', 'redis-doc'],
  },
  {
    owner: 'nginx',
    repositories: ['nginx', 'nginx-modules'],
  },
  {
    owner: 'git',
    repositories: ['git', 'git-scm.com', 'git-for-windows'],
  },
  {
    owner: 'linux-foundation',
    repositories: ['linux', 'linux-stable', 'linux-next'],
  },
];

export function getRepositoriesByOwner(owner: string): string[] {
  const mapping = ownerRepositoryMap.find(
    (m) => m.owner.toLowerCase() === owner.toLowerCase()
  );
  return mapping ? mapping.repositories : [];
}

export function getAllOwners(): string[] {
  return ownerRepositoryMap.map((m) => m.owner);
}
