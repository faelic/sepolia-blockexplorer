function StatCard({ title, value, note }) {
  return (
    <article className="stat-card">
      <p className="stat-card__title">{title}</p>
      <h3 className="stat-card__value">{value}</h3>
      {note ? <p className="stat-card__note">{note}</p> : null}
    </article>
  );
}

export default StatCard;
