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

const RegulaminURL = "https://www.sielata.com.pl/regulamin2025.pdf";

const appParameters = {
  title: "Festiwal Modelarski Jaworzno",
  termDiscription: "13-14 września 2025",
  year: 2025,
  edition: "XVI",
  termDay: 13,
  termMonth: 9,
  association: "SieLata",
  city: "Jaworzno",
  endRegisterDateDay: 12,
  endRegisterDateMonth: 9,
  endRegisterHour: 20,
  resultDateDay: 14,
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

function IsResultListAvailable() {
  const currentDate = new Date();
  const dzisiaj = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getUTCDate(),
    currentDate.getHours(),
    currentDate.getMinutes()
  );
  const startResultDate = new Date(
    appParameters.year,
    appParameters.resultDateMonth - 1,
    appParameters.resultDateDay,
    appParameters.resultHour,
    0
  );
  return dzisiaj >= startResultDate;
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
  appParameters,
  IsRegisterTermAvailable,
  IsResultListAvailable,
  getTensColor,
};
