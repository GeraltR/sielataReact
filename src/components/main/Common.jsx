const PersonFields = [
  {
    id: 1,
    name: "imie",
    type: "text",
    placeholder: "Imię",
    required: false,
  },
  {
    id: 2,
    name: "nazwisko",
    type: "text",
    placeholder: "Nazwisko",
  },
  {
    id: 3,
    name: "email",
    type: "email",
    placeholder: "email",
  },
  {
    id: 6,
    name: "rokur",
    type: "text",
    placeholder: "Rok urodzenia",
  },
  {
    id: 7,
    name: "miasto",
    type: "text",
    placeholder: "Miasto",
  },
  {
    id: 8,
    name: "klub",
    type: "text",
    placeholder: "Klub",
  },
];

const UserFields = PersonFields.concat([
  {
    id: 4,
    name: "password",
    type: "password",
    placeholder: "Hasło",
  },
  {
    id: 5,
    name: "password_confirmation",
    type: "password",
    placeholder: "Potwierdź hasło",
  },
]);

const ModelFields = [
  {
    id: 1,
    name: "nazwa",
    type: "text",
    placeholder: "nazwa",
  },
  {
    id: 2,
    name: "producent",
    type: "text",
    placeholder: "producent",
  },
  {
    id: 3,
    name: "skala",
    type: "text",
    placeholder: "skala",
  },
];

function generateUID(length) {
  return window
    .btoa(
      String.fromCharCode(
        ...window.crypto.getRandomValues(new Uint8Array(length * 2))
      )
    )
    .replace(/[+/]/g, "")
    .substring(0, length);
}

const RegulaminURL = "https://www.sielata.com.pl/regulamin2024.pdf";

const appParameters = {
  title: "Festiwal Modelarski Jaworzno",
  termDiscription: "7-8 września 2024",
  year: 2024,
  edition: "XV",
  termDay: 7,
  termMonth: 9,
  association: "SieLata",
  city: "Jaworzno",
  endRegisterDateDay: 6,
  endRegisterDateMonth: 9,
  endRegisterHour: 20,
  resultDateDay: 8,
  resultDateMonth: 9,
  resultHour: 13,
  emptyCartonClass: 1,
  emptyPlasticClass: 26,
  privilige: 0,
};

function IsRegisterTermAvailable() {
  const currentDate = new Date();
  const dzisiaj = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getUTCDate(),
    currentDate.getHours(),
    currentDate.getMinutes()
  );
  const endRegisterDate = new Date(
    appParameters.year,
    appParameters.endRegisterDateMonth - 1,
    appParameters.endRegisterDateDay,
    appParameters.endRegisterHour,
    0
  );
  return dzisiaj <= endRegisterDate;
}

export {
  PersonFields,
  UserFields,
  generateUID,
  RegulaminURL,
  ModelFields,
  appParameters,
  IsRegisterTermAvailable,
};
