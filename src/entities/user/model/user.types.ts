export type Job = "개발자" | "PO" | "디자이너";

export interface User {
  id: string;
  name: string;
  address?: string;
  memo?: string;
  joinedAt: string;
  job?: Job;
  agreedToEmail?: boolean;
}
