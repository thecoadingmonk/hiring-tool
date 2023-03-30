import { FC, useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import Modal from "./Modal";
import InputText from "./InputText";
import Button from "./Button";
import RadioGroup from "./RadioGroup";

import type { ModalProps } from "../types/Modal";
import type { RadioGroupProps } from "../types/RadioGroup";
import { Job } from "../types/Common";

interface JobFormProps {
  show: boolean;
  onClose?: ModalProps["onClose"];
  isLoading?: boolean;
  error?: boolean | string;
  onFormSubmit?: (param: Job) => void;
  formDefaultValues?: Job;
}
const JobForm: FC<JobFormProps> = ({
  show,
  onClose,
  isLoading,
  error,
  onFormSubmit,
  formDefaultValues,
}: JobFormProps) => {
  const defaultValues = {
    id: "",
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
    applyType: "" as Job["applyType"],
  } as Job;

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    setValue,
  } = useForm({
    mode: "all",
    reValidateMode: "onBlur",
    defaultValues,
  });
  const applyType: RadioGroupProps["items"] = [
    {
      value: "quick-apply",
      label: "Quick apply",
      ...register("applyType"),
    },
    {
      value: "external-apply",
      label: "External apply",
      ...register("applyType"),
    },
  ];
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  const clearForm = () => {
    reset();
    setCurrentStep(1);
  };

  const onSubmit = (values: any, stepCount: number) => {
    if (stepCount < 2) {
      setCurrentStep((prev) => prev + 1);
      setFormData((prev) => ({ ...prev, ...values }));
    } else {
      onFormSubmit?.({ ...formData, ...values });
    }
  };

  const numberValidator = (val: unknown): string | boolean => {
    if (val && typeof val === "string" && isNaN(Number(val))) {
      return "Please enter valid number";
    }

    return true;
  };

  const evaluate = (val1: unknown, val2: unknown, operator: string) => {
    if (val1 && val2 && !eval(val1 + operator + val2)) {
      switch (operator) {
        case "<=": {
          return `value should be lesser than max value`;
        }
        case ">=": {
          return `value should be greater than min value`;
        }
        default:
          return "Please enter valid number";
      }
    }

    return true;
  };

  useEffect(() => {
    if (!show) {
      clearForm();
    }
  }, [show]);

  useEffect(() => {
    if (formDefaultValues) {
      const keys = Object.keys(formDefaultValues) as (keyof Job)[];
      keys.forEach((key: keyof Job) => {
        setValue(key, formDefaultValues[key]);
      });
    }
  }, [formDefaultValues]);

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

          <div className="grid row-auto sm:grid-cols-2 gap-6 mt-6">
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

          <div className="grid row-auto sm:grid-cols-2 gap-6 mt-6">
            <InputText
              label="Experience"
              placeholder="Minimum"
              {...register("minExperience", {
                validate: {
                  numberValidator: (v) => numberValidator(v),
                  evaluate: (_, fv) =>
                    evaluate(fv.minExperience, fv.maxExperience, "<="),
                },
              })}
              error={errors?.minExperience?.message || ""}
            />

            <InputText
              label=""
              placeholder="Maximum"
              {...register("maxExperience", {
                validate: {
                  numberValidator: (v) => numberValidator(v),
                  evaluate: (_, fv) =>
                    evaluate(fv.maxExperience, fv.minExperience, ">="),
                },
              })}
              error={errors?.maxExperience?.message || ""}
            />
          </div>

          <div className="grid row-auto sm:grid-cols-2 gap-6 mt-6">
            <InputText
              label="Salary"
              placeholder="Minimum"
              {...register("minSalary", {
                validate: {
                  numberValidator: (v) => numberValidator(v),
                  evaluate: (_, fv) =>
                    evaluate(fv.minSalary, fv.maxSalary, "<="),
                },
              })}
              error={errors?.minSalary?.message || ""}
            />

            <InputText
              label=""
              placeholder="Maximum"
              {...register("maxSalary", {
                validate: {
                  numberValidator: (v) => numberValidator(v),
                  evaluate: (_, fv) =>
                    evaluate(fv.maxSalary, fv.minSalary, ">="),
                },
              })}
              error={errors?.maxSalary?.message || ""}
            />
          </div>

          <div className="mt-6">
            <InputText
              label="Total employee"
              placeholder="ex. 100"
              {...register("totalEmployee")}
            />
          </div>

          <div className="mt-6">
            <RadioGroup
              legend="Apply type"
              items={applyType}
              flow="horizontal"
            />
          </div>

          <div className="mt-24 flex items-center justify-end">
            {error ? (
              <p className="text-font-error text-sm mr-4">{error}</p>
            ) : null}
            <Button variant="contained" type="submit" disabled={isLoading}>
              <span className="flex items-center justify-center">
                {isLoading ? (
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                ) : null}
                Save
              </span>
            </Button>
          </div>
        </form>
      ) : null}
    </Modal>
  );
};

export default JobForm;
