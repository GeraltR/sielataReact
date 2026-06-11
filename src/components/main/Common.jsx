const PersonFields = [
  {
    id: 1,
    name: "imie",
    type: "text",
    placeholder: "Imię",
    required: false,
    value: "",
    error: "",
  },
  {
    id: 2,
    name: "nazwisko",
    type: "text",
    placeholder: "Nazwisko",
    value: "",
    error: "",
  },
  {
    id: 3,
    name: "email",
    type: "email",
    placeholder: "email",
    value: "",
    error: "",
  },
  {
    id: 6,
    name: "rokur",
    type: "text",
    placeholder: "Rok urodzenia",
    value: "",
    error: "",
  },
  {
    id: 7,
    name: "miasto",
    type: "text",
    placeholder: "Miasto",
    value: "",
    error: "",
  },
  {
    id: 8,
    name: "klub",
    type: "text",
    placeholder: "Klub",
    value: "",
    error: "",
  },
];

const UserFields = PersonFields.concat([
  {
    id: 4,
    name: "password",
    type: "password",
    placeholder: "Hasło",
    value: "",
    error: "",
  },
  {
    id: 5,
    name: "password_confirmation",
    type: "password",
    placeholder: "Potwierdź hasło",
    value: "",
    error: "",
  },
]);

const ModelFields = [
  {
    id: 1,
    name: "nazwa",
    type: "text",
    placeholder: "nazwa",
    value: "",
    error: "",
  },
  {
    id: 2,
    name: "producent",
    type: "text",
    placeholder: "producent",
    value: "",
    error: "",
  },
  {
    id: 3,
    name: "skala",
    type: "text",
    placeholder: "skala",
    value: "",
    error: "",
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

const RegulaminURL = "https://www.sielata.com.pl/regulamin2025.pdf";


const polishMonths = [
  "stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca",
  "lipca", "sierpnia", "września", "października", "listopada", "grudnia",
];

function formatFestivalTerm(festival_start, festival_end) {
  if (!festival_start || !festival_end) return "";
  const start = new Date(festival_start);
  const end = new Date(festival_end);
  return `${start.getDate()}-${end.getDate()} ${polishMonths[end.getMonth()]} ${end.getFullYear()}`;
}

function IsRegisterTermAvailable(festival) {
  if (!festival?.registration_start || !festival?.registration_end) return false;
  const now = new Date();
  return now >= new Date(festival.registration_start) && now <= new Date(festival.registration_end);
}

function IsEditTermAvailable(festival) {
  if (!festival?.registration_start || !festival?.edit_cutoff) return false;
  const now = new Date();
  return now >= new Date(festival.registration_start) && now <= new Date(festival.edit_cutoff);
}

function IsResultListAvailable(festival) {
  if (!festival?.results_at) return false;
  return new Date() >= new Date(festival.results_at);
}

function getTensColor(index, kind) {
  let i = 0;
  let k = 0;
  do {
    if (index - k < 10) i = k;
    else k = k + 10;
  } while (i != k);

  return kind === "bg"
    ? niceColor[index - i].background
    : niceColor[index - i].foreground;
}

const niceColor = [
  {
    foreground: "text-[#FFFFFF]",
    background: "bg-cyan-600",
  },
  {
    foreground: "text-[#FFFFFF]",
    background: "bg-yellow-600",
  },
  {
    foreground: "text-[#FFFFFF]",
    background: "bg-violet-600",
  },
  {
    foreground: "text-[#FFFFFF]",
    background: "bg-rose-700",
  },
  {
    foreground: "text-[#FFFFFF]",
    background: "bg-teal-800",
  },
  {
    foreground: "text-[#FFFFFF]",
    background: "bg-sky-700",
  },
  {
    foreground: "text-[#000000]",
    background: "bg-zinc-100",
  },
  {
    foreground: "text-[#000000]",
    background: "bg-red-300",
  },
  {
    foreground: "text-[#000000]",
    background: "bg-amber-400",
  },
  {
    foreground: "text-[#000000]",
    background: "bg-green-300",
  },
];

export {
  PersonFields,
  UserFields,
  generateUID,
  RegulaminURL,
  ModelFields,
  IsRegisterTermAvailable,
  IsEditTermAvailable,
  IsResultListAvailable,
  formatFestivalTerm,
  getTensColor,
};
