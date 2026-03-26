export type PortfolioPlatform =
  | "youtube"
  | "vimeo"
  | "tiktok"
  | "instagram"
  | "drive"
  | "external";

export type PortfolioItem = {
  title: string;
  url: string;
  platform: PortfolioPlatform;
  viewsLabel?: string;
  note?: string;
};

export type PortfolioSection = {
  title: string;
  description?: string;
  items: PortfolioItem[];
};

export type SoftwareItem = {
  title: string;
  description: string;
  href?: string;
};

export const site: {
  name: string;
  tagline: string;
  profileImageUrl: string;
  profileImageAlt: string;
  intro: string;
  highlights: string[];
  portfolioSections: PortfolioSection[];
  software: SoftwareItem[];
  tare: { title: string; body: string; href: string };
} = {
  name: "Chris Jereza",
  tagline: "Video creator · storyteller · creative technologist",
  profileImageUrl: "https://unavatar.io/instagram/chrisjereza",
  profileImageAlt: "Chris Jereza",
  intro:
    "Video creator and storyteller specializing in viral short-form, social-first branded video and documentary, long-form shows, and comedy.",
  highlights: [
    "Former BuzzFeed lead producer/host",
    "Editor at The Verge",
    "8+ years of end-to-end content execution",
    "1.3M+ followers across YouTube, Instagram, and TikTok",
    "500M+ views across all platforms in 2025",
  ],

  portfolioSections: [
    {
      title: "BuzzFeed Originals",
      description:
        "Creator of flagship series My Plate to Date and Language Test, and others. Created and grew BuzzFeed's Asian-American channel, A*Pop, from 0 to 150k+ subscribers in 6 months.",
      items: [
        {
          title: "Korean Girl Picks a Date Based on Their Tteokbokki (Plate to Date)",
          url: "https://youtu.be/NC-iKvZNhy4?si=Hb5_l8mLB_mvRFfc",
          platform: "youtube",
        },
        {
          title: "Single Guy PIcks A Date Based On Their Fried Chicken",
          url: "https://www.youtube.com/watch?v=iQeLRD48GTw&ab_channel=A*Pop",
          platform: "youtube",
        },
        {
          title: "Picking A Date Based On Their Filipino Cooking (Plate to Date)",
          url: "https://www.youtube.com/watch?v=pNAjL71DIzA&list=PL5vtqDuUM1DlFpyrsl_mg5ao5A-P7xhpq&index=10&ab_channel=BuzzFeedVideo",
          platform: "youtube",
        },
        {
          title: "Korean Americans Take a 1st Grade Korean Test (Language Test)",
          url: "https://youtu.be/JbHCTOFF1XA?si=5LJXLGdHZ-xL-Z-B",
          platform: "youtube",
        },
        {
          title: "Short-Form Edit of Korean Language Test",
          url: "https://www.tiktok.com/@apopofficial/video/7241331458135100715",
          platform: "tiktok",
        },
        {
          title: "Asian Dad Speed Dates 5 Guys for His Daughter",
          url: "https://youtu.be/MHkhZJcFQSk?si=t_KNpLcMYEjXuNdM",
          platform: "youtube",
        },
        {
          title: "I Turned My Car Into a Recording Studio",
          url: "https://www.youtube.com/watch?v=Vre_vdT7XJY",
          platform: "youtube",
        },
        {
          title: "Randall Park, Justin H. Min, Ally Maki Interview",
          url: "https://youtu.be/hgpnLRnhksA?si=0kyy5rx4rWzyJzOg",
          platform: "youtube",
        },
        {
          title: "Rice Tier List",
          url: "https://www.tiktok.com/@apopofficial/video/7216839420316798254",
          platform: "tiktok",
          note: "TikTok clips and tier list video samples",
        },
        {
          title: "Asian Parent Punishment Tier List",
          url: "https://www.tiktok.com/@apopofficial/video/7214933941781056810",
          platform: "tiktok",
        },
        {
          title: "Barista Reviews Celebrity Coffee Orders",
          url: "https://youtu.be/7qqIRrVQehM?si=-thE2LunXc99P2u-",
          platform: "youtube",
        },
        {
          title: "We Ran A 5K Every Day For 5 Days",
          url: "https://www.youtube.com/watch?v=1jz7msnmFLU&t=295s&ab_channel=Goodful",
          platform: "youtube",
        },
      ],
    },
    {
      title: "The Verge: Decoder",
      description:
        "Main editor for The Verge's flagship tech CEO interview series Decoder.",
      items: [
        {
          title: "Uber CEO Interview (Decoder)",
          url: "https://www.youtube.com/watch?v=NRIF-DfMsQ0&t=3s",
          platform: "youtube",
        },
        {
          title: "GM Ceo Interview (Decoder)",
          url: "https://www.youtube.com/watch?v=GIr_oscnob4&t=922s",
          platform: "youtube",
        },
        {
          title: "Zocdoc CEO Interview (Decoder)",
          url: "https://www.youtube.com/watch?v=Atg-gDBPrEY&t=34s",
          platform: "youtube",
        },
        {
          title: "Hinge CEO Interview (Decoder)",
          url: "https://www.youtube.com/watch?v=PSI3q0kyrx0",
          platform: "youtube",
        },
        {
          title: "Lyft CEO Interview (Decoder)",
          url: "https://www.youtube.com/watch?v=XEg_8Fi9Nuw&t=6s",
          platform: "youtube",
        },
      ],
    },
    {
      title: "Branded + Client Work",
      items: [
        {
          title: "Short Film Challenge for Hollyland Tech",
          url: "https://www.youtube.com/watch?v=zZAfjmVZcvI",
          platform: "youtube",
          note: "Created in <36 hours, $50 budget",
        },
        {
          title: "What to Expect at a Muay Thai Class",
          url: "https://drive.google.com/file/d/1xkHsvXqYAS3c0kdW_ZaIXN0lQpuLsDzx/view?usp=sharing",
          platform: "drive",
        },
        {
          title: "Crypto Casino Campaign",
          url: "https://drive.google.com/file/d/1qflrJa8YLCCWHAxKMDVXbW-m3GaOXN7q/view?usp=sharing",
          platform: "drive",
        },
        {
          title: "How I Passed The Google Coding Interview",
          url: "https://youtu.be/ksZ2wFRZ3gM",
          platform: "youtube",
        },
        {
          title: "Office Tour at Tech Startup (Doola)",
          url: "https://drive.google.com/file/d/1yR2KCiYimGlEd1AuqEulzpMS9j1FPZyO/view?usp=sharing",
          platform: "drive",
        },
        {
          title: "Muay Thai Gym Promo Series (short-form)",
          url: "https://www.instagram.com/reel/CzPPbWGAo1D/",
          platform: "instagram",
        },
        {
          title: "Fundraiser Video - East Clarke Place Annual Gala",
          url: "https://drive.google.com/file/d/1Ragrn6DpFZdAvvUEP7zW4CTZrBL5lvml/view?usp=sharing",
          platform: "drive",
        },
        {
          title: "Mini-Doc for Artist Collective",
          url: "https://youtu.be/ubsGFC2yZb0",
          platform: "youtube",
        },
        {
          title: "Styling Session 1",
          url: "https://www.instagram.com/p/C2XWoV-Bswy/",
          platform: "instagram",
          note: "Hair Product Reels For American Crew",
        },
        {
          title: "Styling Session 2",
          url: "https://www.instagram.com/p/C1cIX8ZqKQJ/",
          platform: "instagram",
        },
        {
          title: "Styling Session 3",
          url: "https://www.instagram.com/p/C1UZ8JDN7rn/",
          platform: "instagram",
        },
        {
          title: "BuzzFeed Producer Recap",
          url: "https://youtu.be/mKnSeBsZpNI?si=cC7AOtpjbJk5ImG3",
          platform: "youtube",
        },
        {
          title: "Do You Wonder If You're Burned Out?",
          url: "https://www.tiktok.com/@chris.jereza/video/7221267420692958510",
          platform: "tiktok",
          viewsLabel: "2.4M views",
        },
      ],
    },
    {
      title: "Viral Short-Form - Fight Tips Series",
      description: "Viral comedy shorts",
      items: [
        {
          title: "If Someone Pulls a Firearm...",
          url: "https://www.youtube.com/shorts/OBltIp3B9Vs",
          platform: "youtube",
          viewsLabel: "182M views",
        },
        {
          title: "Combo to End ANY Fight",
          url: "https://www.instagram.com/reel/DEDdOBOSk2I/",
          platform: "instagram",
          viewsLabel: "50M views",
        },
        {
          title: "Nuts Attack",
          url: "https://www.instagram.com/reel/DFGaTQ5yPKT/",
          platform: "instagram",
          viewsLabel: "60M views",
        },
        {
          title: "The Hammer Strike",
          url: "https://www.instagram.com/reel/DES2Z8eyHSS/",
          platform: "instagram",
          viewsLabel: "37.5M views",
        },
        {
          title: "Combo That Will Protect You From Women",
          url: "https://www.instagram.com/reel/DF5eJotOTuj/",
          platform: "instagram",
          viewsLabel: "3.7M views",
        },
        {
          title: "If it is life or death...",
          url: "https://www.instagram.com/reel/DJ1-PEMuuap/",
          platform: "instagram",
          viewsLabel: "7.7M views",
        },
        {
          title: "KUNG FU in a street fight",
          url: "https://youtube.com/shorts/68qRbpaZEss?feature=share",
          platform: "youtube",
          viewsLabel: "4.5M views",
        },
      ],
    },
    {
      title: "Viral Short-Form - Rappers Teach Engineering",
      description: "Viral edutainment series",
      items: [
        {
          title: "21 Savage Teaches Security Engineering",
          url: "https://www.instagram.com/reel/C6HjhEvgFb7/",
          platform: "instagram",
          viewsLabel: "2M views",
        },
        {
          title: "Lil Wayne Teaches Network Engineering",
          url: "https://www.instagram.com/reel/C7fFEE2PDNE/",
          platform: "instagram",
          viewsLabel: "1.2M views",
        },
        {
          title: "Baby Keem Teaches System Design",
          url: "https://www.instagram.com/reel/C5jZ-CRgzqh/",
          platform: "instagram",
          viewsLabel: "983K views",
        },
        {
          title: "Pop Smoke Teaches Data Engineering",
          url: "https://www.instagram.com/reel/C8GEjYyA8NB/",
          platform: "instagram",
          viewsLabel: "767K views",
        },
      ],
    },
    {
      title: "Long-form videos on personal platforms",
      items: [
        {
          title: "I moved to new york like everyone else",
          url: "https://www.youtube.com/watch?v=kd_y5IW0NUQ&t=3s",
          platform: "youtube",
        },
        {
          title: "How I Passed The Google Coding Interviews",
          url: "https://www.youtube.com/watch?v=ksZ2wFRZ3gM&t=17s",
          platform: "youtube",
        },
        {
          title: "Life After Heroin Addiction",
          url: "https://www.youtube.com/watch?v=8dW2xiKmJso&t=209s&pp=0gcJCcEJAYcqIYzv",
          platform: "youtube",
          note: "Interview Series",
        },
        {
          title: "Life as a Famous Tech YouTuber",
          url: "https://www.youtube.com/watch?v=K-5sxMZ_opI&ab_channel=ChristopherJ",
          platform: "youtube",
        },
        {
          title: "Life After Losing a Parent in the Hood",
          url: "https://www.youtube.com/watch?v=TnBbqFHrBy8&t=181s&ab_channel=ChristopherJ",
          platform: "youtube",
        },
      ],
    },
  ],

  software: [
    {
      title: "Filmmaking + Directing",
      description:
        "Filmmaking, directing, cinematic lighting, hosting, casting, location scouting, set design, and story development.",
    },
    {
      title: "Post-Production + Motion",
      description:
        "Editing, color grading, motion graphics, and delivery across social-first and long-form formats.",
    },
    {
      title: "Tools",
      description:
        "Final Cut Pro, Adobe Premiere, After Effects, Audition, Photoshop, Logic, audio recording, mixing, and mastering.",
    },
  ],

  tare: {
    title: "TARE",
    body: "TARE Studio NYC - my experimental coffee omakase brand.",
    href: "https://tarestudionyc.com",
  },
};
