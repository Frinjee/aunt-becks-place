export type IndexEntry = {
  readonly title: string;
  readonly category: "Press" | "Event";
  readonly date: string;
  readonly detail?: readonly string[];
  readonly href?: string;
};

export type NewsEntry = {
  readonly title: string;
  readonly category: "Press";
  readonly date: string;
  readonly source: string;
  readonly href: string;
  readonly image: string;
  readonly alt: string;
};

export type EventEntry = {
  readonly title: string;
  readonly timeAndDate: string;
  readonly location: string;
  readonly email: string;
  readonly phone: string;
};

export const site = {
  name: "Aunt Becks Place",
  eyebrow: "At the corner of care and community",
  email: "auntbecksplacebaltimore@gmail.com",
  brandMark: "/assets/abp/imgs/crossstreet.png",
  heroLogo: "/assets/abp/imgs/abp-logo-1.png",
  manifesto:
    "To practice restorative justice as acts of love by building community mutual aid, restoring through Sunday dinners, access to resources, and networking, and restoring the social fabric of Baltimore City.",
  description: "Aunt Becks Place community support and neighborhood care page.",
  facebook: "https://www.facebook.com/AuntBecksPlace/",
  instagram: "https://www.instagram.com/auntbecksplace/",
} as const;

export const newsEntries = [
  {
    title: "Honor Rows: 'Weave: The Social Fabric Project'",
    category: "Press",
    date: "11/28/2024",
    source: "WBALTV",
    href: "https://www.wbaltv.com/article/honor-rows-weave-the-social-fabric-project-started-simply-with-kind-act/63044357",
    image: "/assets/abp/imgs/videoframe_13226.png",
    alt: "Honor Rows: 'Weave: The Social Fabric Project' news thumbnail",
  },
  {
    title: "Aunt Beck's Place Provides Meals For Those In Need",
    category: "Press",
    date: "03/03/2025",
    source: "WYPR On the Record",
    href: "https://www.wypr.org/show/on-the-record/2025-03-03/aunt-becks-place-provides-meals-for-those-in-need",
    image: "/assets/abp/imgs/wypr.jpg",
    alt: "Aunt Beck's Place Provides Meals For Those In Need news thumbnail",
  },
  {
    title: "Connections, Opportunities Propel Graduate's Ambition",
    category: "Press",
    date: "06/05/2025",
    source: "UBalt Student Stories",
    href: "https://www.ubalt.edu/about/newsroom/student-stories-rebekah-opher.cfm",
    image: "/assets/abp/imgs/rebekah-opher-feature2.jpg",
    alt: "Connections, Opportunities Propel Graduate's Ambition news thumbnail",
  },
  {
    title: "Compassion and Service Drive Law-Bound Leader",
    category: "Press",
    date: "12/04/2025",
    source: "NSLS News & Events",
    href: "https://www.nsls.org/news-and-events/compassion-and-service-drive-law-bound-leader",
    image: "/assets/abp/imgs/Member Spotligh-Rebekah Opher_Banner.png",
    alt: "Compassion and Service Drive Law-Bound Leader news thumbnail",
  },
] satisfies readonly NewsEntry[];

export const eventEntries = [
  {
    title: "Placeholder Community Clothes Drive",
    timeAndDate: "6:00 PM, June 8, 2026",
    location: "St. Vincent de Paul Hall",
    email: "foo@gmail.com",
    phone: "(410) 555-0101",
  },
  {
    title: "Placeholder Community BBQ",
    timeAndDate: "5:30 PM, June 15, 2026",
    location: "120 N Front Street, Baltimore",
    email: "foo@gmail.com",
    phone: "(410) 555-0102",
  },
] satisfies readonly EventEntry[];

export const indexEntries = [
  ...eventEntries.map((event) => ({
    title: event.title,
    category: "Event" as const,
    date: event.timeAndDate,
    detail: [`Location: ${event.location}`, `Contact: ${event.email} | ${event.phone}`],
  })),
] satisfies readonly IndexEntry[];

export const missionContent = {
  mission:
    "Practicing restorative justice through acts of love by building community and mutual aid, restoring connection through Sunday dinners, increasing access to resources and networking opportunities, and helping restore the social fabric of Baltimore City.",
  vision:
    "To be the heart and soul of the community, providing access to services, opportunities, and education that empower residents to work collaboratively, strengthen neighborhood connections, and restore existing communities throughout Baltimore City.",
  join:
    "If you practice servant leadership, have donations to share, or would like to volunteer your time and talents, we invite you to connect with us and become part of the village. Together, we can strengthen community, share resources, and create lasting change throughout Baltimore City.",
  labels: ["Community care", "Restorative justice"],
} as const;

export const storyContent = [
  "Aunt Becks Place is the traditional neighborhood gathering place where everyone is welcome. There is always a listening ear, community support, and the kind of practical care that grows through food, fellowship, and faith in one another.",
  "Built from lived experiences and a dedication to serving both inside and outside the classroom, Aunt Becks Place nurtures the village one meal at a time, creating space for neighbors to pour into one another while nourishing their own spirit. Restorative justice is the pathway forward, and love remains the guiding force behind everything we do.",
] as const;

export const sundayDinner = {
  title: "Sunday Dinner",
  lines: [
    "Serving Sunday dinner between 2:30 and 4:00 PM.",
    "Near St. Vincent de Paul",
    "120 N Front Street",
    "Baltimore, Maryland 21202.",
  ],
} as const;

export const donationCodes = [
  {
    src: "/assets/abp/imgs/cash-app-abp-withlove-2.svg",
    label: "$AuntBecksPlace",
    alt: "QR Code $AuntBecksPlace",
  },
  {
    src: "/assets/abp/imgs/cash-app-abpweaves-2-ro.svg",
    label: "$AuntBecksPlaceWeaves",
    alt: "QR Code $AuntBecksPlaceWeaves",
  },
] as const;
