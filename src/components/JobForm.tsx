import { FC, useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import Modal from "./Modal";
import InputText from "./InputText";
import Button from "./Button";
import RadioGroup from "./RadioGroup";
import Spinner from "./Spinner";

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
    // eslint-disable-next-line
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  useEffect(() => {
    if (formDefaultValues) {
      const keys = Object.keys(formDefaultValues) as (keyof Job)[];
      keys.forEach((key: keyof Job) => {
        setValue(key, formDefaultValues[key]);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              error={errors.industry ? "Industry is required" : ""}
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
                {isLoading ? <Spinner className="text-white mr-2" /> : null}
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
