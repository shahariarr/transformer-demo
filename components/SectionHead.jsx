export default function SectionHead({ label, title, desc }) {
  return (
    <header className="sec-head fade-in-up" data-reveal="">
      {label ? <p className="label">{label}</p> : null}
      <h2>{title}</h2>
      {desc ? <p className="sec-head__desc">{desc}</p> : null}
    </header>
  );
}
