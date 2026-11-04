// Content from "Denis Mutugi — Cinematography Portfolio".
// Single source of truth for the About, Work and Contact pages.

export const CONTACT = {
  email: "mutugidenis57@gmail.com",
  phone: "+254 725 007 831",
  phoneHref: "tel:+254725007831",
  youtubeLabel: "Acting With Deno",
  youtubeUrl: "https://youtube.com/@actingwithdeno1490",
  showreelUrl: "https://www.youtube.com/channel/UCy6SE6SYZOn2vbVBHkgVsvA",
  base: "Nairobi, Kenya",
} as const;

export const TITLE = "Cinematographer | Editor";
export const TAGLINE = "Cinematography Portfolio · 7 Years Behind the Lens";
export const FORMATS = "Narrative film · Series · Documentary · Adverts · Branded content";

export const PROFILE = [
  "Denis Mutugi is a Nairobi-based cinematographer and editor with seven years of hands-on experience shooting narrative films, television series, documentaries, commercials and branded content across Kenya and East Africa.",
  "Trained in Theatre Arts and Film Technology at Kenyatta University, he brings an actor's instinct for performance and a director's eye for composition to every frame. Because he also edits his own footage, he shoots with the cut in mind: coverage that is efficient, intentional and ready for post.",
  "Comfortable on cinema-level cameras and equally at home moving fast on location with a small crew, Denis delivers a clean, cinematic image that serves the story.",
];

export const STATS = [
  { value: "7+", label: "Years in the industry" },
  { value: "27+", label: "Films & productions" },
  { value: "4", label: "Cinema camera systems" },
  { value: "5", label: "Formats shot" },
];

export const VISION =
  "Use film to promote upright living, correct, educate and entertain people in their moments.";
export const MISSION = "Reflect to society the lost morals, and use the voice that film gives you.";

export const CAMERAS = [
  {
    name: "ARRI Alexa",
    kind: "Cinema camera",
    use: "Narrative film, series and high-end commercial work",
  },
  {
    name: "RED",
    kind: "Cinema camera",
    use: "Film, branded content and commercial production",
  },
  {
    name: "Sony FX3",
    kind: "Full-frame cinema line",
    use: "Documentary, branded content, series and fast-moving location shoots",
  },
  {
    name: "Canon EOS 5D Mark II",
    kind: "Full-frame DSLR",
    use: "Early-career film, music and web content, and B-camera coverage",
  },
];

export const APPROACH = [
  "Lighting and framing planned around the story and the edit",
  "Consistent exposure, colour and look across multi-camera days",
  "Strong on-set communication with directors, gaffers and talent",
  "Experience directing actors and guiding crew on lighting and camera position",
];

export type Credit = { title: string; role: string; year: string; note: string };

export const CREDITS: { category: string; items: Credit[] }[] = [
  {
    category: "Feature Film",
    items: [
      {
        title: "Letters of Tomorrow",
        role: "Director of Photography",
        year: "2026",
        note: "Feature film for Mount Kenya University. Led the camera department as D.O.P. from pre-production through the shoot.",
      },
      {
        title: "LIA",
        role: "Cinematography & Editing",
        year: "2023–2024",
        note: "“We all have a father.” Denva International feature film, shot and cut by Denis, which also features him on screen.",
      },
      {
        title: "Nawiri, Miliki and Nada",
        role: "Film",
        year: "2022–2023",
        note: "Narrative features from the Denva International and partner slate where Denis contributed to production, editing and performance.",
      },
    ],
  },
  {
    category: "Series",
    items: [
      {
        title: "QWARE",
        role: "Cinematographer · Maisha Magic · Naota Media",
        year: "2025",
        note: "Shot the series for Maisha Magic and added graphics in post-production.",
      },
      {
        title: "Letters to Myself",
        role: "Shooter & Editor",
        year: "2025",
        note: "Self-directed series, shot and edited end to end.",
      },
      {
        title: "Beshte",
        role: "Shooter & Editor · Denva Productions",
        year: "2022–2023",
        note: "Web series produced, shot and edited for online audiences.",
      },
      {
        title: "Baba Yao",
        role: "Set Runner · Africa Motion Pictures · KTN",
        year: "2019",
        note: "Early broadcast set experience on a national television programme. Also Mama Yangu (Mwangaza TV) and Room Mates.",
      },
    ],
  },
  {
    category: "Documentary",
    items: [
      {
        title: "Allure of Soil",
        role: "Lead Cinematographer",
        year: "2026",
        note: "Lead cinematographer on the Data in Dirt series by Allure of Soil.",
      },
      {
        title: "WIOMSA Scientific Symposium",
        role: "Lead Cinematographer & Editor · Mombasa",
        year: "2025",
        note: "Covered the symposium end to end as main cinematographer and editor.",
      },
      {
        title: "Cinema in Nature",
        role: "Shooter & Editor",
        year: "2024–2025",
        note: "Wildlife and nature content shot and edited for the company.",
      },
      {
        title: "My Planet, My Future",
        role: "Editor",
        year: "2024",
        note: "Documentary by Kini Wakini. Others include Naam Yawk, Farm Docu, Zawadi Mashinani and Magarini Children's Home.",
      },
    ],
  },
  {
    category: "Adverts & Branded",
    items: [
      {
        title: "Syngenta Africa: product launch",
        role: "Cinematographer & Editor",
        year: "2026",
        note: "Launch coverage for the new product “Segovis Flora” plus farm testimonials shot and edited across Nairobi, Nanyuki, Nakuru, Eldoret and Naivasha.",
      },
      {
        title: "Mettus Whiskey",
        role: "Advert",
        year: "2026",
        note: "Advert for Mettus, a whiskey brand.",
      },
      {
        title: "Corporate & club content",
        role: "Editor",
        year: "2025",
        note: "Videos for Nyanza Club and Muthaiga Golf Club.",
      },
      {
        title: "Product adverts, podcasts and social",
        role: "Freelance",
        year: "2024 onward",
        note: "Product advertisements, short-form shots, podcast shooting and editing.",
      },
    ],
  },
];

const IMG = "/images/portfolio";

export type Frame = { src: string; title: string; caption: string; width: number; height: number };

export const SHOWCASE_LEAD: Frame = {
  src: `${IMG}/frames-series.jpg`,
  title: "Series frames",
  caption: "Warm interiors, practical light and natural skin tones",
  width: 1024,
  height: 576,
};

export const SHOWCASE: Frame[] = [
  { src: `${IMG}/frames-fadhila.jpg`, title: "Fadhila", caption: "Low-key night and coastal exteriors", width: 1024, height: 576 },
  { src: `${IMG}/frames-kigongo.jpg`, title: "Kigongo", caption: "Naturalistic, earthy palette with soft window light", width: 1024, height: 576 },
  { src: `${IMG}/frames-beco.jpg`, title: "Beco", caption: "Saturated, colour-led comedy", width: 1024, height: 576 },
  { src: `${IMG}/frames-bill.jpg`, title: "Bill", caption: "Intimate drama, motivated light", width: 768, height: 432 },
  { src: `${IMG}/frames-chanjo.jpg`, title: "Chanjo", caption: "Interior setups and mixed lighting", width: 768, height: 432 },
];

export const ON_SET: Frame[] = [
  { src: `${IMG}/onset-interview-setup.jpg`, title: "Interview Setup", caption: "Tripod · LED key light", width: 675, height: 900 },
  { src: `${IMG}/onset-atmospheric-lighting.jpg`, title: "Atmospheric Lighting", caption: "Studio · Haze · Dolly", width: 675, height: 900 },
  { src: `${IMG}/onset-documentary-interview.jpg`, title: "Documentary Interview", caption: "Natural light · Location", width: 675, height: 900 },
  { src: `${IMG}/onset-night-interior.jpg`, title: "Night Interior", caption: "Practicals · SmallHD monitor", width: 675, height: 900 },
  { src: `${IMG}/onset-live-event.jpg`, title: "Live Event", caption: "DJI Ronin gimbal", width: 675, height: 900 },
  { src: `${IMG}/onset-location-shoot.jpg`, title: "Location Shoot", caption: "Handheld gimbal · Nature", width: 675, height: 900 },
  { src: `${IMG}/onset-camera-movement.jpg`, title: "Camera Movement", caption: "Dolly track · Low light", width: 675, height: 900 },
  { src: `${IMG}/onset-corporate-interior.jpg`, title: "Corporate Interior", caption: "On-camera monitoring", width: 675, height: 900 },
];

export const SUPPORT_GEAR =
  "Sirui tripods and heads · DJI Ronin gimbal · SmallHD and wireless monitors · LED and RGB tube lighting · Dolly and track · Shotgun and on-camera audio";

export const TIMELINE = [
  {
    years: "2026",
    role: "Cinematographer / D.O.P.",
    org: "Syngenta Africa · Mount Kenya University",
    points: [
      "Product launch coverage and farm testimonials across five Kenyan towns",
      "D.O.P. on the feature film “Letters of Tomorrow”",
      "D.O.P. on Allure of Soil",
      "Afro-Latin Tamasha documentary (African Countries competition)",
    ],
  },
  {
    years: "2025",
    role: "Lead Cinematographer & Editor",
    org: "WIOMSA · Naota Media / Maisha Magic",
    points: [
      "Main cinematographer and editor for the WIOMSA Scientific Symposium, Mombasa",
      "Cinematography and post graphics for the Maisha Magic series QWARE",
    ],
  },
  {
    years: "2024",
    role: "Cinematographer & Editor",
    org: "Cinema in Nature · Freelance",
    points: [
      "Shot and edited nature content, podcasts, documentaries and product adverts",
      "Edited the feature film LIA and the documentary My Planet, My Future",
    ],
  },
  {
    years: "2022–2023",
    role: "Script Supervisor, Shooter & Editor",
    org: "Denva Productions · Naota Africa",
    points: [
      "Shot and edited short-form content and produced the web series Beshte on YouTube",
      "Film editor at Naota Africa, delivering to detailed creative briefs and deadlines",
      "D.O.P. on the film Below See Level",
    ],
  },
  {
    years: "2020–2022",
    role: "Freelance Cinematographer & Editor",
    org: "Seven Seasons Production · Independent",
    points: [
      "Designed unique videos for YouTube audiences and recorded live-stream services",
      "Edited with graphics, titles, audio and effects, and developed scripts",
      "1st AC on set",
    ],
  },
  {
    years: "2019",
    role: "Set Runner",
    org: "Africa Motion Pictures · Baba Yao on KTN",
    points: ["Fast-paced broadcast set where the on-set craft began"],
  },
];

export const SKILLS = [
  {
    group: "Cinematography",
    items: [
      "Camera operation",
      "Lighting and composition",
      "Multi-camera coverage",
      "Shoot directing",
      "Team leadership",
    ],
  },
  {
    group: "Post-Production",
    items: [
      "Adobe Premiere Pro",
      "Adobe After Effects",
      "Titles, graphics and sound",
      "Colour and finishing",
      "Delivery to client platforms",
    ],
  },
  {
    group: "Story & Performance",
    items: [
      "Script writing, film and stage",
      "Film and stage directing",
      "Acting for film",
      "Script supervision",
      "Time management",
    ],
  },
];
