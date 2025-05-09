import type { Job } from "./user.types";

export const jobOptions: { label: string; value: Job }[] = [
  { label: "개발자", value: "개발자" },
  { label: "PO", value: "PO" },
  { label: "디자이너", value: "디자이너" },
] as const;

export const agreedToEmailOptions: { label: string; value: boolean }[] = [
  { label: "동의", value: true },
  { label: "비동의", value: false },
];
