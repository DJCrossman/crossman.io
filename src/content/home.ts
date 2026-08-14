import type { HomeSection, ImageAsset, VideoAsset } from "./types";

export const hero = {
  title: "David Crossman",
  image: {
    src: "/images/home/hero.jpg",
    alt: "Sunlit atrium full of people working at tables during a tech event",
    width: 2500,
    height: 1667,
  } satisfies ImageAsset,
};

export const intro =
  "Hi there! I'm a Canadian who has worked in tech for over ten years.";

export const homeSections: HomeSection[] = [
  {
    title: "Community",
    paragraphs: [
      "Community means a lot to me. Being part of some thing that provides the opportunity for others to learn, build relationships, and share experiences is some thing that I am always actively participating in. I credit the majority of my growth to being part of the many communities in Regina.",
    ],
    italic: true,
    image: {
      src: "/images/home/community.jpg",
      alt: "David speaking at a podium during a community tech event",
      width: 2500,
      height: 1667,
    },
    imageSide: "left",
  },
  {
    title: "Solving problems",
    paragraphs: [
      "As someone who's been working in tech for 8+ years, I have always been drawn to problem solving whether that requires coding or not. Whether it's making more with less or trying to provide as much value as fast as possible, this is what drives me.",
    ],
    image: {
      src: "/images/home/solving-problems.jpg",
      alt: "David smiling in conversation at a table during a workshop",
      width: 2500,
      height: 1666,
    },
    imageSide: "right",
  },
  {
    title: "Mental health",
    paragraphs: [
      "In the world of crunch time, weekend warriors, and grinding out the next big startup. I have learned the importance of mental health and breaking the stigma behind it. Every year I participate in Movember to open the conversation to talking about things that aren't fun to talk about",
    ],
    image: {
      src: "/images/home/mental-health.jpg",
      alt: "Portrait of David with a Movember moustache",
      width: 2500,
      height: 1875,
    },
    imageSide: "left",
  },
];

/**
 * Background video between the sections and "Love to touch grass".
 * Drop the compressed original into public/videos/home-bg.mp4 —
 * see public/videos/README.md.
 */
export const homeVideo: VideoAsset = {
  src: "/videos/home-bg.mp4",
  poster: "/images/home/hero.jpg",
};

export const touchGrass = {
  title: "Love to touch grass",
  paragraphs: [
    "Outside of work, I attempt to spend most of my time soaking up the sun and enjoying the fresh air. Only recently in 2023, I joined the Regina Rowing Club. It is one of the most enjoyable ways to take advantage of the short summers that we have. I have also been training over the winter with indoor rowing and love pushing myself physically.",
    "I also enjoy pushing myself to my limits throughout the summer months by running consistently and eventually taking on the QCM half marathon every year. I find running is an excellent way to clear my thoughts and reset my mind for the day.",
    "Ever since I was a kid, the great outdoors has always been a passion of mine. Camping, canoeing, and hikes have always been the best way to connect with the beautiful world around us. Disconnecting and enjoying the quiet is an important thing to me and perfectly balances the career I love.",
  ],
  images: [
    {
      src: "/images/home/running.jpg",
      alt: "David running in the Queen City Marathon",
      width: 1460,
      height: 971,
    },
    {
      src: "/images/home/outdoors.jpg",
      alt: "David outdoors enjoying the fresh air",
      width: 2500,
      height: 1875,
    },
  ] satisfies ImageAsset[],
};

export const contact = {
  title: "Reach out",
  subtitle: "Happy to grab a coffee and chat about things!",
};
