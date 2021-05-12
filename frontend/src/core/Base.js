import Menu from "./menu";

const Base = ({
  title = "my title",
  description = "my description",
  className = "  p-4",
  children,
}) => (
  <div>
    <Menu />
    <div className="container font-serif">
      <div className="text-center">
        <h2 className="text-7xl">{title}</h2>
        <p className="font-mono">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
  </div>
);

export default Base;
