function PageIntro({ title, description, actions, children, headingLevel = 1 }) {
  const Heading = `h${headingLevel}`;

  return (
    <header className="page-intro">
      <div className="page-intro__copy">
        <Heading>{title}</Heading>
        {description ? <p>{description}</p> : null}
        {children}
      </div>
      {actions ? <div className="page-intro__actions">{actions}</div> : null}
    </header>
  );
}

export default PageIntro;
