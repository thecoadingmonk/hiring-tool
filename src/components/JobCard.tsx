import type { FC } from "react";

import Button from "./Button";
import Spinner from "./Spinner";

import { Job } from "../types/Common";

import edit from "../icons/edit.svg";
import trash from "../icons/trash.svg";

interface JobCardProps {
  info: Job;
  onDelete: (id: string) => void;
  onEdit: (job: Job) => void;
  isDeleting?: boolean;
}

const JobCard: FC<JobCardProps> = ({
  info,
  onDelete,
  onEdit,
  isDeleting = false,
}: JobCardProps) => {
  const {
    id,
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
    <div className="flex gap-2 bg-white border border-gray-30 rounded-[10px] py-4 px-6 max-w-[830px] max-h-[324px]">
      <div>
        <img src={require("../assets/netflix_logo.png")} />
      </div>
      <div className="block max-w-[830px] overflow-hidden w-full">
        <header className="whitespace-nowrap max-w-[700px] text-ellipsis overflow-hidden">
          <h4 className="font-normal text-2xl whitespace-nowrap max-w-[700px] text-ellipsis overflow-hidden">
            {jobTitle}
          </h4>
          <h6 className="font-normal text-base whitespace-nowrap max-w-[700px] text-ellipsis overflow-hidden">
            {companyName} - {industry}
          </h6>
          <p className="text-gray-40 font-normal text-base whitespace-nowrap max-w-[700px] text-ellipsis overflow-hidden empty:mt-6">
            {/* This condition is to make empty selector work if not present */}
            {location ? location : ""}
            {remoteType ? ` ${remoteType}` : ""}
          </p>
        </header>

        <div className="grid mt-6 text-gray-50 text-base font-normal gap-2">
          <p>Part-Time (9.00 am - 5.00 pm IST)</p>
          <p>
            Experience ({minExperience || 0} - {maxExperience || 0} years)
          </p>
          <p>
            INR (₹) {minSalary || 0} - {maxSalary || 0} / Month
          </p>
          <p>{totalEmployee || 1} employee(s)</p>
        </div>

        <div className="flex justify-between empty:mt-0 mt-6 gap-6">
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

          <div className="flex gap-1 only:ml-auto">
            <Button
              variant="outlined"
              onClick={() => onDelete(id)}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Spinner />
              ) : (
                <img src={trash} alt="" className="w-6 h-6" />
              )}
            </Button>
            <Button variant="outlined" onClick={() => onEdit(info)}>
              <img src={edit} alt="" className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
