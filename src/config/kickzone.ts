export const KICKZONE = {
  businessName: "Kick-Zone",
  businessType: "Indoor football turf",
  location: {
    area: "Mirpur 12",
    city: "Dhaka",
    country: "Bangladesh",
    short: "Mirpur 12, Dhaka",
    full: "Mirpur 12, Dhaka, Bangladesh",
    mapsSearchUrl:
      "https://www.google.com/maps/search/?api=1&query=Kick-Zone+Mirpur+12+Dhaka+Bangladesh",
  },
  phone: {
    display: "01973-613818",
    telHref: "tel:+8801973613818",
  },
  socials: {
    facebook: "https://www.facebook.com/kickzonemirpur",
    instagram: "https://www.instagram.com/Kz.Kickzone",
  },
  currency: "BDT",
  currencySymbol: "৳",
  timeZone: "Asia/Dhaka",

  // ---- Fixed business rule: every booking is exactly 90 minutes ----
  bookingDurationMinutes: 90 as const,
  bookingDurationLabel: "1 Hour 30 Minutes",

  // Illustrative demo pricing (NOT confirmed as the real price)
  // Day slots start below nightStartsAt; night slots start at/after it.
  daySessionPriceBDT: 3000,
  nightSessionPriceBDT: 4000,
  nightStartsAt: "17:00",
  sessionPriceLabel: "from ৳3,000",
  priceNote:
    "Illustrative demo prices — day slots (before 5 PM) ৳3,000, night slots (5 PM onwards) ৳4,000. Contact Kick-Zone at 01973-613818 to confirm actual prices.",

  // Illustrative demo operating hours (NOT confirmed)
  openingTime: "08:00",
  closingTime: "23:00",
  slotIntervalMinutes: 90,
  hoursNote:
    "Illustrative demo hours (8:00 AM – 11:00 PM). Actual opening hours may differ — please call to confirm.",

  // Illustrative demo-unavailable slot start times (24h "HH:MM").
  // These are static examples; per-date variation is generated deterministically in lib.
  illustrativeUnavailableStarts: ["13:30", "18:30"],

  facilities: [
    {
      title: "FIFA-Grade Artificial Turf",
      description:
        "Consistent bounce, cushioned underlay and all-weather indoor surface built for fast 5v5 / 7v7 football.",
      image:
        "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=1200&auto=format&fit=crop",
      icon: "turf",
    },
    {
      title: "Pro Floodlighting",
      description:
        "Bright, even LED floodlights for night sessions with zero dark spots on the pitch.",
      image:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
      icon: "floodlight",
    },
    {
      title: "Changing & Shower Rooms",
      description:
        "Clean changing areas to gear up before kickoff and freshen up after full-time.",
      image:
        "https://images.unsplash.com/photo-1571902943202-507ec2618e38?q=80&w=1200&auto=format&fit=crop",
      icon: "shirt",
    },
    {
      title: "Match Footballs & Bibs",
      description:
        "Quality match balls, bibs and cones available so your squad can start playing right away.",
      image:
        "https://images.unsplash.com/photo-1614632537190-23e4145e646a?q=80&w=1200&auto=format&fit=crop",
      icon: "ball",
    },
    {
      title: "Spectator Zone",
      description:
        "Sideline seating for friends and subs to watch the game up close in a safe indoor hall.",
      image:
        "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?q=80&w=1200&auto=format&fit=crop",
      icon: "users",
    },
    {
      title: "Drinking Water & First Aid",
      description:
        "Hydration and basic first-aid support on site so you can play hard and stay safe.",
      image:
        "https://images.unsplash.com/photo-1526401485004-46910ecc8e51?q=80&w=1200&auto=format&fit=crop",
      icon: "safety",
    },
  ],

  gallery: [
    {
      src: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=1600&auto=format&fit=crop",
      alt: "Indoor artificial turf football pitch under lights (illustrative stock photo)",
    },
    {
      src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1600&auto=format&fit=crop",
      alt: "Football stadium floodlights at night (illustrative stock photo)",
    },
    {
      src: "https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=1600&auto=format&fit=crop",
      alt: "Football on green turf close-up (illustrative stock photo)",
    },
    {
      src: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1600&auto=format&fit=crop",
      alt: "Players competing for the ball (illustrative stock photo)",
    },
    {
      src: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=1600&auto=format&fit=crop",
      alt: "Footballer striking the ball on turf (illustrative stock photo)",
    },
    {
      src: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1600&auto=format&fit=crop",
      alt: "Football goal net on pitch (illustrative stock photo)",
    },
    {
      src: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?q=80&w=1600&auto=format&fit=crop",
      alt: "Team huddle before match (illustrative stock photo)",
    },
    {
      src: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1600&auto=format&fit=crop",
      alt: "Football boots and ball on grass (illustrative stock photo)",
    },
  ],

  heroImage:
    "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=2000&auto=format&fit=crop",
} as const;

export type KickZoneConfig = typeof KICKZONE;
