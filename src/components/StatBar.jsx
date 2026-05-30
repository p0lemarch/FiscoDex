function StatBar({ label, value, animated = true, delay = 0 }) {
  const getColorClass = (val) => {
    if (val < 40) return 'stat-bar__fill--low';
    if (val < 70) return 'stat-bar__fill--medium';
    if (val < 85) return 'stat-bar__fill--high';
    return 'stat-bar__fill--extreme';
  };

  return (
    <div className="stat-bar">
      <span className="stat-bar__label">{label}</span>
      <div className="stat-bar__track">
        <div
          className={`stat-bar__fill ${animated ? '' : ''} ${getColorClass(value)}`}
          style={{
            '--stat-value': `${value}%`,
            '--stat-index': delay / 100,
          }}
        />
      </div>
      <span className="stat-bar__value">{value}</span>
    </div>
  );
}

export default StatBar;
