import { FC, useState } from "react";

import { useForm } from "react-hook-form";

import Modal from "./Modal";
import InputText from "./InputText";
import Button from "./Button";

import type { ModalProps } from "../types/Modal";

interface JobFormProps {
  show: boolean;
  onClose: ModalProps["onClose"];
}
const JobForm: FC<JobFormProps> = ({ show, onClose }: JobFormProps) => {
  const defaultValues = {
    jobTitle: "",
    companyName: "",
    industry: "",
    location: "",
    minExperience: "",
    maxExperience: "",
    minSalary: "",
    maxSalary: "",
    totalEmployee: "",
    remoteType: "",
  };
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    mode: "all",
    reValidateMode: "onBlur",
    defaultValues,
  });
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  const onSubmit = (values: any, stepCount: number) => {
    if (stepCount <= 2) {
      setCurrentStep((prev) => prev + 1);
    }
    setFormData((prev) => ({ ...prev, ...values }));
    console.log(formData);
  };

  return (
    <Modal show={show} className="w-[577px]" onClose={onClose}>
      {currentStep === 1 ? (
        <form onSubmit={handleSubmit((v) => onSubmit(v, 1))}>
          <div className="flex justify-between">
            <h3>Create a job</h3>
            <h4>step 1</h4>
          </div>

          <div className="mt-6">
            <InputText
              label="Job title"
              placeholder="ex. UX UI Designer"
              error={errors.jobTitle ? "Job title is required" : ""}
              required
              {...register("jobTitle", { required: true })}
            />
          </div>

          <div className="mt-6">
            <InputText
              label="Company name"
              placeholder="ex. Google"
              required
              {...register("companyName", { required: true })}
              error={errors.companyName ? "Company name is required" : ""}
            />
          </div>

          <div className="mt-6">
            <InputText
              label="Industry"
              placeholder="ex. Information Technology"
              required
              {...register("industry", { required: true })}
              error={errors.industry ? "Company name is required" : ""}
            />
          </div>

          <div className="grid grid-cols-2 gap-6 mt-6">
            <InputText
              label="Location"
              placeholder="ex. Chennai"
              {...register("location")}
            />

            <InputText
              label="Remote type"
              placeholder="ex. In-office"
              {...register("remoteType")}
            />
          </div>

          <div className="mt-24 flex justify-end">
            <Button variant="contained" type="submit">
              Next
            </Button>
          </div>
        </form>
      ) : currentStep === 2 ? (
        <form onSubmit={handleSubmit((v) => onSubmit(v, 2))}>
          <div className="flex justify-between">
            <h3>Create a job</h3>
            <h4>step 2</h4>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-6">
            <InputText
              label="Experience"
              placeholder="Minimum"
              {...register("minExperience")}
            />

            <InputText
              label=""
              placeholder="Maximum"
              {...register("maxExperience")}
            />
          </div>

          <div className="grid grid-cols-2 gap-6 mt-6">
            <InputText
              label="Salary"
              placeholder="Minimum"
              {...register("minSalary")}
            />

            <InputText
              label=""
              placeholder="Maximum"
              {...register("maxSalary")}
            />
          </div>

          <div className="mt-6">
            <InputText
              label="Total employee"
              placeholder="ex. 100"
              {...register("totalEmployee")}
            />
          </div>

          <div className="mt-24 flex justify-end">
            <Button variant="contained" type="submit">
              Next
            </Button>
          </div>
        </form>
      ) : null}
    </Modal>
  );
};

export default JobForm;
