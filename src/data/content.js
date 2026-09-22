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
    label: "",
    date: "", // e.g. "October 2021"
    title: "The beginning of us.",
    text: "This is where it all started — just the two of us, figuring things out.",
    photo: campsite01,
  },
  {
    id: "year-1",
    label: "A Memory",
    date: "", // photo is from Valentine's Day 2022
    title: "Our first Valentine's Day.",
    text: "The first of many Valentine's spent right where I wanted to be — with you.",
    photo: valentinesDay2022,
  },
  {
    id: "year-2",
    label: "A Memory",
    date: "", // photo is from a Christmas party, Dec 2022
    title: "Christmas, together.",
    text: "Another holiday, another memory made with you by my side.",
    photo: christmasParty2022,
  },
  {
    id: "year-3",
    label: "A Memory",
    date: "", // photo is from a graduation pictorial, Jan 2024
    title: "Getting ready for graduation.",
    text: "Dressed up, cameras out, and you still made me smile the most.",
    photo: graduationPictorial,
  },
  {
    id: "year-4",
    label: "A Memory",
    date: "", // photo is from USC graduation, together
    title: "Graduating, side by side.",
    text: "A big milestone, made so much better because you were there for it.",
    photo: uscGraduation,
  },
  {
    id: "month-59",
    label: "Month 59",
    date: "",
    title: "And we're still here.",
    text: "Present day — still laughing, still growing, still choosing each other.",
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
