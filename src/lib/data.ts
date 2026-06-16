import { EventItem, GalleryMemory, VibeTag } from "@/lib/types";

export const heardThatIntro =
  "Heard That? is a Bangalore community run by two psychology students who plan cozy, curated experiences where strangers become friends through games, stories, movies, nostalgia, and unfiltered conversations.";

export const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/heard._.that/" },
  { label: "WhatsApp", href: "https://chat.whatsapp.com/CaV0E4v0Ja60kXTeFkH9FB?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGnCfq7HCx8sOsIeWab2xggrlOWjHp2myzKlysigIsHDKSw9e779zuZ-fBkCys_aem_zXLKYf7m9fbJM5EGFo2J8g" },
];

export const vibes: Array<{
  title: VibeTag;
  icon: string;
  description: string;
  suggestion: string;
}> = [
  {
    title: "Board Game Goblin",
    icon: "🎲",
    description: "Carries strategy and chaos in equal amount. Says one round and means four.",
    suggestion: "You'd probably love our Mafia x Monopoly Mashup Night 👀",
  },
  {
    title: "Movie Yapper",
    icon: "🎬",
    description: "Can pause a scene every 20 seconds to discuss the symbolism of a lamp.",
    suggestion: "You belong at Sitcom Roast & Rewatch.",
  },
  {
    title: "Cafe Hopper",
    icon: "☕",
    description: "Knows every cozy corner in Indiranagar and rates ambience like Michelin.",
    suggestion: "Try our Slow Sunday Cafe Crawl.",
  },
  {
    title: "Psychology Overthinker",
    icon: "🧠",
    description: "Reads behavior patterns at brunch and still forgets where keys are.",
    suggestion: "Join our Soft Skills & Mind Games circle.",
  },
  {
    title: "Playlist Curator",
    icon: "🎧",
    description: "Sends 2 AM playlists with names like 'rain on neon roads'.",
    suggestion: "Come to Nostalgia Jukebox Night.",
  },
  {
    title: "Sitcom Rewatch Addict",
    icon: "📺",
    description: "Finds emotional healing in comfort episodes and chai.",
    suggestion: "Trivia Night was made for you.",
  },
  {
    title: "2AM Philosopher",
    icon: "🌙",
    description: "Asks deep life questions after everyone said goodnight.",
    suggestion: "Catch the Midnight Open Circle.",
  },
];

export const events: EventItem[] = [
  {
    id: "evt_001",
    slug: "nostalgia-night-vhs-vibes",
    title: "Nostalgia Night: VHS Vibes",
    description:
      "A retro memory jam with cartoon theme songs, 2000s snacks, and team games that feel like school holidays.",
    location: "Dialogues Cafe, Koramangala",
    dateTime: "2026-06-05T19:30:00+05:30",
    seatsTotal: 40,
    seatsLeft: 9,
    tags: ["retro", "games", "chai"],
    mood: "Warm + silly + loud laughter",
    theme: "Old cartoons and chaotic fun",
    emoji: "📼",
    priceInr: 699,
    coverImage:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "evt_002",
    slug: "board-game-chaos-club",
    title: "Board Game Chaos Club",
    description:
      "Mafia, Codenames, Taboo, and social mixers for people who want to meet strangers without awkward small talk.",
    location: "Lahe Lahe, Indiranagar",
    dateTime: "2026-06-12T18:00:00+05:30",
    seatsTotal: 50,
    seatsLeft: 21,
    tags: ["board games", "friends", "interactive"],
    mood: "Playful + competitive",
    theme: "Team shuffle tables",
    emoji: "🃏",
    priceInr: 799,
    coverImage:
      "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "evt_003",
    slug: "chai-debates-and-midnight-philosophy",
    title: "Chai Debates & Midnight Philosophy",
    description:
      "A cozy circle for expressive conversations, story prompts, and no-pressure vulnerability.",
    location: "The Kind Roastery, JP Nagar",
    dateTime: "2026-06-20T20:30:00+05:30",
    seatsTotal: 35,
    seatsLeft: 14,
    tags: ["talks", "philosophy", "cozy"],
    mood: "Deep + intimate",
    theme: "Questions that stay with you",
    emoji: "☕",
    priceInr: 649,
    coverImage:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "evt_004",
    slug: "sitcom-roast-trivia-night",
    title: "Sitcom Roast & Trivia Night",
    description:
      "Iconic sitcom rounds, absurd charades, and a shared projector nostalgia trip.",
    location: "Underline Center, MG Road",
    dateTime: "2026-06-27T19:00:00+05:30",
    seatsTotal: 60,
    seatsLeft: 31,
    tags: ["movies", "sitcom", "trivia"],
    mood: "High energy",
    theme: "Friends, The Office, B99, and more",
    emoji: "🍿",
    priceInr: 899,
    coverImage:
      "https://images.unsplash.com/photo-1489599735734-79b4ee7ea0c0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "evt_005",
    slug: "playlist-swap-social",
    title: "Playlist Swap Social",
    description:
      "Bring your comfort tracks, trade playlists, and discover your new favorite people and songs.",
    location: "Dyu Art Cafe, Koramangala",
    dateTime: "2026-07-03T18:30:00+05:30",
    seatsTotal: 45,
    seatsLeft: 27,
    tags: ["music", "social", "nostalgia"],
    mood: "Soft + dreamy",
    theme: "Soundtrack your summer",
    emoji: "🎧",
    priceInr: 749,
    coverImage:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80",
  },
];

export const galleryMemories: GalleryMemory[] = [
  {
    id: "mem_001",
    title: "Mafia Betrayal Arc",
    event: "Board Game Chaos Club",
    quote: "I trusted her. She was mafia for three rounds.",
    caption: "The table screamed, then became best friends.",
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=80",
    tapeColor: "#f7c548",
  },
  {
    id: "mem_002",
    title: "Cartoon Intro Karaoke",
    event: "Nostalgia Night",
    quote: "Ten adults singing old intros at full volume is healing.",
    caption: "Someone knew every lyric. Everyone joined.",
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80",
    tapeColor: "#ff7c7c",
  },
  {
    id: "mem_003",
    title: "Cafe Deep Talk",
    event: "Chai Debates",
    quote: "Felt like journaling out loud with strangers who listened.",
    caption: "Conversations flowed past closing time.",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    tapeColor: "#7cd5ff",
  },
  {
    id: "mem_004",
    title: "Sitcom Debate Championship",
    event: "Sitcom Roast",
    quote: "Best character arc debate got way too intense.",
    caption: "Still unresolved. Still iconic.",
    image:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=900&q=80",
    tapeColor: "#7ce8a6",
  },
];

export const tonightVibeData = {
  mood: "Currently obsessed with: chai debates & mafia games.",
  quotePool: [
    "Small talk is optional. Weird stories are welcome.",
    "Comfort strangers become comfort people.",
    "Your new inside joke might start tonight.",
    "Come for the game. Stay for the people.",
  ],
  obsessions: ["F.R.I.E.N.D.S reruns", "Bingo chaos", "Impromptu poetry", "Filter coffee walks"],
  upcomingThemes: ["Rainy Day Recess", "Bollywood Memory Lane", "90s Stationery Nostalgia"],
};

export const nostalgiaItems = [
  { title: "Cartoon Era", text: "Shinchan, Scooby-Doo, Doraemon marathons", emoji: "📺" },
  { title: "Childhood Games", text: "Kanche, stapu, chor-police, book cricket", emoji: "🧿" },
  { title: "Old Internet", text: "Orkut scraps, Yahoo buzzers, early memes", emoji: "💾" },
  { title: "Retro Music", text: "Indi-pop, cassette mixtapes, early MTV", emoji: "🎶" },
];

export const founders = [
  {
    name: "Aarohi",
    bio: "Psychology student, movie hoarder, and board game instigator.",
    interests: ["sitcoms", "literature", "art", "cafes"],
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80",
    social: "https://instagram.com",
  },
  {
    name: "Niharika",
    bio: "Psychology student, nostalgia researcher, and philosophy chatterbox.",
    interests: ["books", "nostalgia", "movies", "community"],
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=700&q=80",
    social: "https://instagram.com",
  },
];

export const collaborationTypes = [
  "Event Collaboration",
  "Venue Partnership",
  "Cafe Collaboration",
  "Food Partner",
  "Community Program",
  "Creative Project",
];

export const mapSpots = [
  {
  id: "1",
  kind: "Community Space",
  name: "Koramangala Cozy Circuit",
  description: "Movie nights, chai talks and spontaneous friendships."
},
  {
  id: "2",
  kind: "Board Game Cafe",
  name: "Indiranagar Game Corner",
  description: "Where strangers become board game rivals."
},
  {
  id: "3",
  kind: "Late Night Circle",
  name: "JP Nagar Chai Deck",
  description: "Long conversations over endless chai."
},
  {
  id: "4",
  kind: "Event Venue",
  name: "MG Road Nostalgia Hub",
  description: "Retro events, music and collective nostalgia."
},
];
