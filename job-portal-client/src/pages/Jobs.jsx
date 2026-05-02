const Jobs = ({ result }) => {
  return (
    <>
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">
            {result.length} Job{result.length !== 1 ? "s" : ""} Found
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Browse and apply to positions that match your skills
          </p>
        </div>
      </div>
      <section className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3 auto-rows-max">
        {result}
      </section>
    </>
  );
};

export default Jobs;