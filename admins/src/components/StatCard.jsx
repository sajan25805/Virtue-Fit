const StatCard = ({ title, value, icon, change }) => {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-primary/70">{title}</p>
            <p className="text-2xl font-bold text-primary mt-1">{value}</p>
          </div>
          <div className="bg-neutral p-3 rounded-lg">{icon}</div>
        </div>
        <div className="mt-4 text-xs font-medium text-primary/60">{change}</div>
      </div>
    );
  };
  
  export default StatCard;
  