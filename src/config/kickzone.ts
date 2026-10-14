export const KICKZONE = {
  businessName: "Kick-Zone",
  businessType: "Indoor football turf",
  location: {
    area: "Mirpur 12",
    city: "Dhaka",
    country: "Bangladesh",
    short: "Mirpur 12, Dhaka",
    full: "Block-M, Plot-7, Eastern Housing Phase-2, Pallabi, Mirpur-12, Dhaka",
    mapsSearchUrl:
      "https://www.google.com/maps/search/?api=1&query=Block-M+Plot-7+Eastern+Housing+Phase-2+Pallabi+Mirpur-12+Dhaka",
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

  // Official slot-chart pricing: day slots 1–7 before 5 PM, night slots 8–14 from 5 PM.
  daySessionPriceBDT: 2500,
  nightSessionPriceBDT: 4000,
  // Slots starting at or after this time (24h "HH:MM") are night slots.
  nightStartsAt: "17:00",
  sessionPriceLabel: "from ৳2,500",
  priceNote:
    "Official slot-chart prices — day slots (1–7) ৳2,500, night slots (8–14) ৳4,000. Contact Kick-Zone at 01973-613818 to confirm.",

  // Official daily timetable from the Kick-Zone slot chart (14 fixed 90-min slots).
  // Slot 12 ends after midnight; slots 13–14 run after midnight.
  openingTime: "06:00",
  closingTime: "03:30",
  slotIntervalMinutes: 90,
  dailySlots: [
    { start: "06:00", end: "07:30" }, // 1 Day
    { start: "07:30", end: "09:00" }, // 2 Day
    { start: "09:00", end: "10:30" }, // 3 Day
    { start: "10:30", end: "12:00" }, // 4 Day
    { start: "12:00", end: "13:30" }, // 5 Day
    { start: "14:00", end: "15:30" }, // 6 Day
    { start: "15:30", end: "17:00" }, // 7 Day
    { start: "17:00", end: "18:30" }, // 8 Night
    { start: "18:30", end: "20:00" }, // 9 Night
    { start: "20:00", end: "21:30" }, // 10 Night
    { start: "21:30", end: "23:00" }, // 11 Night
    { start: "23:00", end: "00:30" }, // 12 Night (ends next day)
    { start: "00:30", end: "02:00" }, // 13 Night (next day)
    { start: "02:00", end: "03:30" }, // 14 Night (next day)
  ],
  hoursNote:
    "Open daily 6:00 AM – 3:30 AM (14 fixed slots) per the official Kick-Zone slot chart.",

  // Illustrative demo-unavailable slot start times (24h "HH:MM").
  // These are static examples; per-date variation is generated deterministically in lib.
  illustrativeUnavailableStarts: ["12:00", "18:30"],

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
      src: "/venue-4.jpg",
      alt: "Player on the Kick-Zone turf under floodlights at night",
    },
    {
      src: "/venue-6.jpg",
      alt: "Aerial view of the full Kick-Zone pitch during a match",
    },
    {
      src: "/venue-1.jpg",
      alt: "Players warming up on the Kick-Zone artificial turf",
    },
    {
      src: "/venue-5.jpg",
      alt: "Match action at Kick-Zone — player chasing the ball",
    },
    {
      src: "/venue-3.jpg",
      alt: "Tournament winners with trophy and medals at Kick-Zone",
    },
    {
      src: "/venue-2.jpg",
      alt: "Team stretching session on the Kick-Zone turf",
    },
    {
      src: "/venue-7.jpg",
      alt: "Champions celebrating with balloons at Kick-Zone",
    },
  ],

  heroImage: "/venue-4.jpg",
} as const;

export type KickZoneConfig = typeof KICKZONE;
