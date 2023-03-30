export interface Job {
  id: string;
  jobTitle: string;
  companyName: string;
  industry: string;
  location: string;
  minExperience: number;
  maxExperience: number;
  minSalary: number;
  maxSalary: number;
  totalEmployee: number;
  remoteType: string;
  applyType: "external-apply" | "quick-apply";
}
