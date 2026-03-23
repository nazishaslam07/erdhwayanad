import stewardAmir from "@/assets/steward-amir.png";
import stewardZeya from "@/assets/steward-zeya.jpeg";
import stewardKhalda from "@/assets/steward-khalda.jpeg";
import stewardFahad from "@/assets/steward-fahad.png";

export interface Steward {
  name: string;
  role: string;
  shortBio: string;
  fullBio: string;
  philosophy: string;
  image: string;
  isTeam: boolean;
  isInvite?: boolean;
  quotes?: { text: string; source: string }[];
}

export const stewards: Steward[] = [
  {
    name: "Amir Equbal",
    role: "Founder & Vision Steward",
    shortBio: "From exploring simplicity through Minimal Muslim to building communities rooted in stewardship, land, and faith.",
    fullBio: "For years, I found myself drawn to a simple question: what does a life that is truly aligned with the Fitrah look like today?\n\nThat question quietly shaped much of what I've been building. Through Minimal Muslim, I began exploring simplicity, modest living, and conscious consumption. Through design and architecture, I tried to use my skills in ways that serve people rather than just markets. Along the way, I realized that lifestyle, land, community, and faith cannot really be separated. They are all part of the same ecosystem of living.\n\nerdh grew out of that realization.\n\nIt is my attempt to move from talking about values to actually living them. To help create small communities rooted in stewardship of the land, modest living, learning, and service. Places where people can live closer to the earth, support each other, and raise families in an environment that reflects the values we believe in.\n\nI see myself simply as a steward trying to use the creative blessings I've been given to nurture something beneficial for people and the earth, inshaAllah.",
    philosophy: "Lifestyle, land, community, and faith cannot really be separated. They are all part of the same ecosystem of living.",
    image: stewardAmir,
    isTeam: true,
  },
  {
    name: "Zeya Ahmad Quadri",
    role: "Education & Learning Steward",
    shortBio: "Engineer turned homeschooling father, building a slower, more intentional life in Wayanad for his family.",
    fullBio: "I'm Zeya Ahmad Quadri, and my journey toward erdh began with a simple question: What kind of life truly nurtures our families, our values, and our connection with nature?\n\nFor more than a decade, I worked at General Motors as a Fluid Dynamics Engineer in Bangalore, while also exploring entrepreneurial work. But over time, the fast-paced urban life made me reflect on the kind of environment I wanted for my family.\n\nThat reflection eventually led us to Wayanad.\n\nToday, I live here with my family as a homeschooling father of three, trying to build a life that is slower, more intentional, and closer to nature. Our learning journey at home is rooted in curiosity, lived experiences, community, and fitrah.\n\nProfessionally, I run Gallop Creative Agency, helping startups and organizations build meaningful brands. I also created Seerah Box, an initiative that helps children connect with the life and lessons of the Prophet ﷺ through engaging learning.\n\nMoving to Wayanad was more than a relocation — it was a shift toward a life centered on sustainability, faith, and community. Through erdh, I hope to help nurture a place where families can grow food, raise children close to nature, learn together, and rediscover a balanced, self-sustaining way of life.",
    philosophy: "What kind of life truly nurtures our families, our values, and our connection with nature?",
    image: stewardZeya,
    isTeam: true,
  },
  {
    name: "Dr. Khalda Zeya",
    role: "Health & Wellbeing",
    shortBio: "A dentist rediscovering what truly nurtures health, family, and inner peace — closer to nature.",
    fullBio: "For many years, life followed the familiar rhythm of Bangalore — busy clinic days, appointments, and the constant pace of city living.\n\nWhen the idea of moving closer to nature first came up, I felt hesitant. Leaving behind the comfort of the city and the life I knew wasn't an easy thought. But my husband often spoke about a different kind of life for our family — where children could grow up outdoors, where food came from the soil we cared for, and where home felt less rushed and more present.\n\nThose conversations stayed with me.\n\nSlowly, I began reflecting on what truly nurtures health, family, and inner peace.\n\nThat reflection eventually led me to Wayanad.\n\nMoving into a community now feels like a natural next step — being surrounded by families who share similar values, where children grow up together and life is built on care, cooperation, and a sense of belonging.",
    philosophy: "What truly nurtures health, family, and inner peace is found closer to the earth.",
    image: stewardKhalda,
    isTeam: false,
  },
  {
    name: "Fahad Azmi",
    role: "Infrastructure & Sustainability",
    shortBio: "A civil engineer who spent a decade building cities, now seeking to build a life closer to nature and purpose.",
    fullBio: "I am a civil engineer and project management professional with more than a decade of experience working on large construction and development projects. My work has been deeply connected to the growth of modern cities — designing, managing, and delivering infrastructure and developments that shape urban life.\n\nThrough this journey, I have seen both the achievements and the consequences of modern urban living.\n\nCities promise opportunity and convenience, yet they often bring pollution, congestion, overcrowding, and a lifestyle where people spend hours in traffic and very little time with their families or in reflection. Many people today spend 3–4 hours daily commuting, living in environments dominated by concrete, noise, and constant pressure.\n\nIt raises a simple but profound question: Is this the life we were truly meant to live?\n\nIslam constantly invites us to reflect on the natural world as a sign of Allah's wisdom.\n\nSeeking a life closer to nature — with organic food, sustainable living, peaceful communities, and stronger family connections — is not a step backward. In many ways, it may actually be a step closer to the natural and balanced life that Allah intended for humanity.",
    philosophy: "True success is not only measured by buildings, roads, or economic growth. It is measured by peace, family, health, gratitude, and living in harmony with the creation of Allah.",
    image: stewardFahad,
    isTeam: false,
    quotes: [
      {
        text: "Indeed, in the creation of the heavens and the earth and the alternation of night and day are signs for those of understanding.",
        source: "Surah Aal-Imran (3:190)",
      },
      {
        text: "It is He who produced you from the earth and settled you in it.",
        source: "Surah Hud (11:61)",
      },
    ],
  },
];
