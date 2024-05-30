import { Link } from "react-router-dom";

const HomeLink = () => {
  return (
    <section>
      <div className="absolute bottom-2 right-2 text-slate-300">
        <Link to="/">Strona główna</Link>
      </div>
    </section>
  );
};

export default HomeLink;
