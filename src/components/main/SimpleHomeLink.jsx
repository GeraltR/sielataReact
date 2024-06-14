import { Link } from "react-router-dom";

const HomeLink = () => {
  return (
    <section>
      <div className="grid justify-items-end h-1 text-slate-300">
        <Link to="/">Strona główna</Link>
      </div>
    </section>
  );
};

export default HomeLink;
