import { useForm } from "react-hook-form";

const statusOptions = ["Applied", "Interview", "Rejected", "Offer"];

export default function JobForm({
  defaultValues,
  isSubmitting,
  onSubmit,
  submitLabel,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      companyName: "",
      role: "",
      status: "Applied",
      salary: "",
      location: "",
      appliedDate: new Date().toISOString().split("T")[0],
      notes: "",
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-800">
            Company name
          </label>
          <input
            className="input-field"
            placeholder="Acme Inc."
            {...register("companyName", {
              required: "Company name is required",
            })}
          />
          {errors.companyName && (
            <p className="mt-2 text-xs text-rose-600">
              {errors.companyName.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-800">
            Role
          </label>
          <input
            className="input-field"
            placeholder="Frontend Developer"
            {...register("role", {
              required: "Role is required",
            })}
          />
          {errors.role && (
            <p className="mt-2 text-xs text-rose-600">{errors.role.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-800">
            Status
          </label>
          <select
            className="input-field"
            {...register("status", {
              required: "Status is required",
            })}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-800">
            Applied date
          </label>
          <input
            type="date"
            className="input-field"
            {...register("appliedDate", {
              required: "Application date is required",
            })}
          />
          {errors.appliedDate && (
            <p className="mt-2 text-xs text-rose-600">
              {errors.appliedDate.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-800">
            Salary
          </label>
          <input
            className="input-field"
            placeholder="e.g. 18 LPA / $120k"
            {...register("salary")}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-800">
            Location
          </label>
          <input
            className="input-field"
            placeholder="Bengaluru / Remote"
            {...register("location")}
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-800">
          Notes
        </label>
        <textarea
          rows={6}
          className="textarea-field"
          placeholder="Interview rounds, recruiter contact, follow-up reminders, referral notes..."
          {...register("notes")}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary min-w-[160px] justify-center"
      >
        {isSubmitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
