import { useForm } from "react-hook-form";

const statusOptions = ["Open", "Closed"];

export default function AdminJobForm({
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
      description: "",
      salary: "",
      location: "",
      status: "Open",
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
            placeholder="OpenAI"
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
            placeholder="Full Stack Developer"
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
            Salary
          </label>
          <input
            className="input-field"
            placeholder="$120k"
            {...register("salary")}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-800">
            Location
          </label>
          <input
            className="input-field"
            placeholder="Remote"
            {...register("location")}
          />
        </div>

        <div className="md:col-span-2">
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
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-800">
          Description
        </label>
        <textarea
          rows={8}
          className="textarea-field"
          placeholder="Write the role summary, responsibilities, requirements, and hiring notes."
          {...register("description", {
            required: "Description is required",
          })}
        />
        {errors.description && (
          <p className="mt-2 text-xs text-rose-600">
            {errors.description.message}
          </p>
        )}
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
