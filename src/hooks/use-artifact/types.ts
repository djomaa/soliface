
export interface IArtifact {
  name: string;
  hash: string;
  isDefault?: true;
}

export type IArtifactInfo = Pick<IArtifact, 'name' | 'hash' | 'isDefault'>;
