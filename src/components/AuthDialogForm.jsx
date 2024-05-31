const AuthDialogForm = ({ children }) => {
  return (
    <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white py-16 px-10 text-center sm:px-12 md:px-[60px] shadow-2xl">
              <img
                src="/logofestiwal_git.png"
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
