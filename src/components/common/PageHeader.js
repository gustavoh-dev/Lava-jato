function PageHeader({ title, description, actionLabel }) {
  return (
    <div className="page-header">
      <div>
        <span className="section-tag">Modulo</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      {actionLabel ? <button className="primary-button">{actionLabel}</button> : null}
    </div>
  );
}

export default PageHeader;
