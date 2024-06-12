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
  {
    id: 8,
    name: "klub",
    type: "text",
    placeholder: "Klub",
  },
]);

const RegulaminURL = "https://www.sielata.com.pl/regulamin2023.pdf";

export { PersonFields, UserFields, RegulaminURL };
