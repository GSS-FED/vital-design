import type { Avatar } from '@/components/avatar/Avatar';
import type { ComponentProps } from 'react';

export interface Candidate {
  id: string;
  name: string;
  experience: string;
  owner: string | null;
  leader: string;
  leaderColor: ComponentProps<typeof Avatar>['color'];
  skills: string[];
  updated: string;
  jobTitle: string;
}

export type CandidateTreeRow =
  | {
      id: string;
      kind: 'group';
      title: string;
      subRows: CandidateTreeRow[];
    }
  | (Candidate & { kind: 'candidate' });

export const candidates: Candidate[] = [
  {
    id: '1',
    name: '黃○鋪',
    experience: '3年',
    owner: null,
    leader: '林○方',
    leaderColor: 'tiffany',
    skills: ['.Net', 'C#'],
    updated: '2025/09/22 12:01',
    jobTitle: '.Net 工程師',
  },
  {
    id: '2',
    name: '陳○樣',
    experience: '4年',
    owner: null,
    leader: '林○方',
    leaderColor: 'tiffany',
    skills: ['.Net'],
    updated: '2025/09/18 17:29',
    jobTitle: '.Net 工程師',
  },
  {
    id: '3',
    name: '張○安',
    experience: '5年',
    owner: '康',
    leader: '方○廚',
    leaderColor: 'blue',
    skills: ['.Net'],
    updated: '2025/09/18 17:28',
    jobTitle: '.Net 工程師',
  },
  {
    id: '4',
    name: '張○昂',
    experience: '2年',
    owner: null,
    leader: '陳○思',
    leaderColor: 'default',
    skills: ['Microsoft Office'],
    updated: '2025/09/10 14:56',
    jobTitle: 'HR 導入顧問',
  },
  {
    id: '5',
    name: '林○樣',
    experience: '4年',
    owner: null,
    leader: '陳○思',
    leaderColor: 'default',
    skills: ['Microsoft Office'],
    updated: '2025/09/10 14:56',
    jobTitle: 'HR 導入顧問',
  },
];

export function buildCandidateTree(
  rows: Candidate[],
  extraEmptyGroups: string[] = [],
): CandidateTreeRow[] {
  const groups = new Map<string, Candidate[]>();
  for (const row of rows) {
    const bucket = groups.get(row.jobTitle) ?? [];
    bucket.push(row);
    groups.set(row.jobTitle, bucket);
  }

  const populated: CandidateTreeRow[] = Array.from(
    groups,
    ([title, leaves]) => ({
      id: `group-${title}`,
      kind: 'group',
      title,
      subRows: leaves.map((leaf) => ({
        ...leaf,
        kind: 'candidate' as const,
      })),
    }),
  );

  const empty: CandidateTreeRow[] = extraEmptyGroups.map((title) => ({
    id: `group-${title}`,
    kind: 'group',
    title,
    subRows: [],
  }));

  return [...populated, ...empty];
}
