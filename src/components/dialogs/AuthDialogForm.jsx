import logo from "../../assets/images/logofestiwal_git.png";

const AuthDialogForm = ({ children }) => {
  return (
    <section className="bg-[#FFF6ED] py-20 lg:py-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full h-full px-4">
            <div className="mx-auto max-w-lg overflow-hidden rounded-lg bg-white py-16 px-10 text-center sm:px-12 md:px-[60px] shadow-2xl">
              <img
                src={logo}
                alt="SieLata"
                className="inline max-w-40 mb-10 text-center md:mb-16"
              />
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthDialogForm;
