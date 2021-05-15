import Menu from "./menu";

const Base = ({
  title = "my title",
  description = "my description",
  children,
}) => (
  <div className="bg-custom-shade1 min-h-screen w-full">
    <Menu />
    <div className="container p-4">
      <div className="header p-4">
        <h2 className="font-custom1 text-7xl text-center p-2 text-custom-shade4">{title}</h2>
        {description && <p className="font-custom2 text-lg text-center p-2 text-custom-shade3">{description}</p>}
      </div>
      <div className="body p-4">{children}</div>
      <div className="footer p-4"></div>
    </div>
  </div>
);

export default Base;