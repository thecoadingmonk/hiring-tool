export type Job = {
  id: string;
  jobTitle: string;
  companyName: string;
  industry: string;
  location?: string;
  minExperience?: number | string;
  maxExperience?: number | string;
  minSalary?: number | string;
  maxSalary?: number | string;
  totalEmployee?: number | string;
  remoteType?: string;
  applyType?: "external-apply" | "quick-apply";
};
