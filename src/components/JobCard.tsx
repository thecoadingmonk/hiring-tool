import type { FC } from "react";

import Button from "./Button";

interface JobCardProps {
  info: {
    jobTitle: string;
    companyName: string;
    industry: string;
    location: string;
    minExperience: number | string;
    maxExperience: number | string;
    minSalary: number | string;
    maxSalary: number | string;
    totalEmployee: number | string;
    remoteType: string;
    applyType: string;
  };
}

const JobCard: FC<JobCardProps> = ({ info }: JobCardProps) => {
  const {
    jobTitle,
    companyName,
    industry,
    location,
    remoteType,
    minExperience = 0,
    maxExperience = 0,
    minSalary = 0,
    maxSalary = 0,
    totalEmployee = 1,
    applyType,
  } = info;
  return (
    <div className="flex gap-2 bg-white border border-gray-30 rounded-[10px] py-4 px-6 max-w-[830px]">
      <div>
        <img src={require("../assets/netflix_logo.png")} />
      </div>
      <div>
        <header>
          <h4 className="font-normal text-2xl">{jobTitle}</h4>
          <h6 className="font-normal  text-base">
            {companyName} - {industry}
          </h6>
          <p className="text-gray-40 font-normal  text-base">
            {location} {remoteType}
          </p>
        </header>

        <div className=" grid mt-6 text-gray-50 text-base font-normal gap-2">
          <p>Part-Time (9.00 am - 5.00 pm IST)</p>
          <p>
            Experience ({minExperience} - {maxExperience} years)
          </p>
          <p>
            INR (₹) {minSalary} - {maxSalary} / Month
          </p>
          <p>{totalEmployee} employees</p>
        </div>

        <div className="flex empty:mt-0 mt-6 gap-6">
          {applyType === "external-apply" ? (
            <Button
              variant="outlined"
              onClick={() => alert("You have clicked External Apply")}
            >
              External Apply
            </Button>
          ) : applyType === "quick-apply" ? (
            <Button
              variant="contained"
              onClick={() => alert("You have clicked Apply Now")}
            >
              Apply Now
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
