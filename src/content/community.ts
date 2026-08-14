import type { Entry, ImageAsset } from "./types";

export const communityHero = {
  title: "Things I've helped out with",
  image: {
    src: "/images/community/hero.jpg",
    alt: "Crowd gathered at a HackRegina community event",
    width: 1919,
    height: 1282,
  } satisfies ImageAsset,
};

export const communityEntries: Entry[] = [
  {
    slug: "hackregina",
    name: "HackRegina",
    logo: {
      src: "/images/community/hackregina-logo.png",
      alt: "HackRegina",
      width: 2294,
      height: 1179,
    },
    banner: {
      src: "/images/community/hackregina-banner.jpg",
      alt: "Tables of developers coding, socializing and snacking at a hackathon",
      width: 2500,
      height: 3750,
    },
    description: [
      "Breaking down the silos of technology ventures is how we hope to help grow a strong community that can support each other. Our goal is to assist individuals' growth by providing opportunities to collaborate, learn, and grow together. We aim to have a consistent amount of meetups throughout the year for those with busy schedules",
    ],
    link: { label: "Visit HackRegina", href: "https://www.hackregina.com/" },
    roleTitle: "My role at HackRegina…",
    role: [
      "Starting a just a Slack group to connect with previous coworkers, it soon developed into a community that gathers and discusses all things tech related. I have lead the initiative on running hackathons, meet ups, Battlesnake tournaments and more. We work closely with with our partners and sponsors to offer services and create connections within the community.",
    ],
    learnedTitle: "Things I've learned so far…",
    learned: [
      "Being part of a community is the most rewarding part",
      "There is so much value is cross company collaboration and discussion",
      "Employers are found through connections and opportunities spark from meetups",
    ],
    workedOnTitle: "Things I worked on so far…",
    workedOn: [
      "Building and maintaining a yearly budget for events throughout the year",
      "Regularly building relationships with community partners and sponsors",
      "Organizing small and large events throughout the year",
      "Moderating the community Slack channel only when necessary",
    ],
  },
  {
    slug: "msi-computer-camps",
    name: "MSI Computer Camps",
    logo: {
      src: "/images/community/msi-compcamps-logo.png",
      alt: "MSI Computer Camps",
      width: 408,
      height: 247,
    },
    description: [
      "The MSI Computer Camps are a set of non-profit summer camps hosted at the University of Regina. The camps are dedicated to the education of youth in the rapidly changing computing industry.",
    ],
    link: { label: "Visit MSI CompCamps", href: "https://www.compcamps.com" },
    roleTitle: "My role at MSI Computer Camps…",
    role: [
      "Within my time as a Mentor, I have learned that leading a youth program is the most rewarding thing you can do. It was one of the main reason that I founded Citrus. Throughout the years I have ran lessons for web development, electronics, and game development. I have been fortunate to be part of the team that has made an impact in so many lives.",
    ],
    learnedTitle: "Things I've learned so far…",
    learned: [
      "Campers creating things on their own after your lesson is so gratifying",
      "Logistics of youth camps including communication and marketing are challenges feats",
    ],
    workedOnTitle: "Things I worked on so far…",
    workedOn: [
      "Creating and helping campers through a tutorial in Unreal Engine to build a Rocket League clone",
      "Teaching the basics of HTML, CSS, and JavaScript",
      "Lead campers through multiple electronic projects for Arduinos",
      "Co-directed and managed logistics for our 2022 summer camps",
    ],
    video: {
      src: "/videos/msi-compcamps.mp4",
      poster: "/images/community/msi-compcamps-poster.jpg",
    },
  },
];
