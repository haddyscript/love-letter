// ─────────────────────────────────────────────────────────────
// Edit everything below to personalize the site.
// Text, dates, and photos all live here — no need to touch
// the components to update the content.
// ─────────────────────────────────────────────────────────────

export const hero = {
  eyebrow: "For my love,",
  title: "59 Months With You",
  titleSuffix: "❤️",
  subtitle: "Almost 5 years of us.",
  cta: "Open our story →",
};

// To change a photo, drop the image file in `src/assets/photos/`,
// import it below, and set it as the `photo` for that entry.
// The photos below were auto-matched to slots by filename/EXIF date —
// double check the order is actually correct and swap freely.
import campsite01 from "../assets/photos/campsite-01.jpeg";
import valentinesDay2022 from "../assets/photos/valentines-day-2022.jpeg";
import christmasParty2022 from "../assets/photos/christmas-party-2022.jpeg";
import graduationPictorial from "../assets/photos/graduation-pictorial.jpeg";
import uscGraduation from "../assets/photos/usc-graduation-together.jpeg";
import pnFinalParty from "../assets/photos/pn-final-party.jpeg";

export const timelineEvents = [
  {
    id: "month-1",
    label: "Month 1",
    date: "", // e.g. "October 2021"
    title: "The beginning of us.",
    text: "Add a memory from where it all started.",
    photo: campsite01,
  },
  {
    id: "year-1",
    label: "Year 1",
    date: "", // photo is from Valentine's Day 2022
    title: "One year in.",
    text: "Add a memory from your first year together.",
    photo: valentinesDay2022,
  },
  {
    id: "year-2",
    label: "Year 2",
    date: "", // photo is from a Christmas party, Dec 2022
    title: "Two years strong.",
    text: "Add a memory from year two.",
    photo: christmasParty2022,
  },
  {
    id: "year-3",
    label: "Year 3",
    date: "", // photo is from a graduation pictorial, Jan 2024
    title: "Three years together.",
    text: "Add a memory from year three.",
    photo: graduationPictorial,
  },
  {
    id: "year-4",
    label: "Year 4",
    date: "", // photo is from USC graduation, together
    title: "Four years and counting.",
    text: "Add a memory from year four.",
    photo: uscGraduation,
  },
  {
    id: "month-59",
    label: "Month 59",
    date: "",
    title: "And we're still here.",
    text: "Present day — still choosing each other, every day.",
    photo: pnFinalParty,
  },
];

export const loveMoment = {
  heading: "Tap the heart.",
  lines: [
    "I don't need 59 reasons to love you.",
    "I just need one reason...",
    "You're you. ❤️",
  ],
};

export const finalMessage = {
  countdown: ["59 months down...", "1 month until 5 years. ❤️"],
  heading: "Happy 59th Monthsary, Love.",
  body: "Thank you for growing with me, laughing with me, putting up with me 😂, and choosing me for almost 5 years.",
  closing: "I love you.",
  signature: "— Hadrian ❤️",
};
