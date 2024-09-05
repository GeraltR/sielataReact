import ModelarLayout from "../../layouts/ModelarLayout";
import CheckboxLink from "../main/CheckboxLink";
import { RegulaminURL } from "../main/Common";
import ModalSpinner from "../main/ModalSpinner";
import ScrollToTopButton from "../main/ScrollToTopButton";
import SpinnerButton from "../main/SpinnerButton";
import FormUserinput from "./FormUserInput";

function UserRegister(props) {
  return (
    <>
      <ModalSpinner visibled={props.loading} />
      <ScrollToTopButton />
      <main className="relativ grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 col-span-1 px-3 md:grid-flow-col gap-4 md:gap-0">
        <div className="static m-3 p-3 rounded-md bg-white shadow-md shadow-gray-200 bg-opacity-30">
          <div>
            <form onSubmit={props.handleRegister}>
              {props.inputs.map((input) => (
                <FormUserinput
                  error={props.errors[input.name]}
                  key={input.id}
                  {...input}
                  value={props.values[input.name]}
                  onChange={props.onChange}
                  disabled={props.loading}
                  label={input.placeholder}
                />
              ))}
              <div className="inline-flex mb-4">
                <CheckboxLink
                  name="checkregulamin"
                  description="Akceptuję"
                  linkText="regulamin"
                  linkAddress={RegulaminURL}
                  errorText="Należy zaakceptować postanowienia regulaminu."
                  isError={props.isRegulaminError}
                  checked={props.isRegulaminChecked}
                  value={props.isRegulaminChecked}
                  onChange={props.handleRegulaminChecked}
                  disabled={props.loading}
                />
              </div>
              <div className="inline-flex mb-4">
                <CheckboxLink
                  name="checkopiekun"
                  description="Rejestruję się jako instruktor, opiekun"
                  errorText="Należy zaakceptować postanowienia regulaminu."
                  checked={props.values.isteacher}
                  value={props.values.isteacher}
                  onChange={props.handleIsTeacherChecked}
                  disabled={props.loading}
                />
              </div>

              <div className="mb-10">
                <SpinnerButton
                  disabled={props.loading}
                  text="Zapisz"
                  type="submit"
                  id="saveDataUserButton"
                />
              </div>
            </form>
          </div>
        </div>
        <ModelarLayout
          userdata={props.values}
          showLearner={props.showLearner}
          categories={props.categories}
          isadmin={props.values.admin}
        />
      </main>
    </>
  );
}

export default UserRegister;
