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

const RegulaminURL = "https://www.sielata.com.pl/regulamin2023.pdf";

export { PersonFields, UserFields, generateUID, RegulaminURL, ModelFields };
