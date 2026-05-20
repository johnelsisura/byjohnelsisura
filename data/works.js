// ============================================================
// ADD YOUR WORKS HERE
// Each object = one portfolio card + project page
// ============================================================

export const works = [
  {
    id: "campaign-title-here",
    client: "Client Name",
    title: "Campaign Title Here",
    brief: "Short one-liner describing what the project was about.",
    type: ["campaign", "copy"],          // used for filter tags
    typeLabel: "Campaign · Copy",
    thumb: "/images/thumb-campaign.jpg", // put image in /public/images/
    thumbBg: "from-yellow-950 to-amber-900", // fallback gradient if no image
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
    background:
      "Over the years, [Client] has been the go-to for X. So when Y happened, the brand wanted to Z.",
    idea:
      "Here's the big idea behind this campaign. What was the creative insight? What made it work? Explain the concept in a few sentences.",
    credits: [
      { role: "Creative Director", name: "Name Here" },
      { role: "Copywriter", name: "John Elsisura" },
      { role: "Art Director", name: "Name Here" },
    ],
  },
  {
    id: "jingle-title-here",
    client: "Client Name",
    title: "Jingle Title Here",
    brief: "Short one-liner.",
    type: ["jingle"],
    typeLabel: "Jingle · Audio",
    thumb: "/images/thumb-jingle.jpg",
    thumbBg: "from-blue-950 to-cyan-900",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
    background: "Background story here.",
    idea:
      "The idea behind the jingle. What made it catchy? What human truth does it tap into?",
    credits: [
      { role: "Copywriter / Jingle", name: "John Elsisura" },
      { role: "Music Producer", name: "Name Here" },
    ],
  },
  {
    id: "case-study-title",
    client: "Client Name",
    title: "Case Study Title",
    brief: "Short one-liner.",
    type: ["casestudy", "pr"],
    typeLabel: "Case Study · PR",
    thumb: "/images/thumb-case.jpg",
    thumbBg: "from-purple-950 to-violet-900",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
    background: "Background story here.",
    idea: "The idea and execution behind this case study.",
    credits: [
      { role: "Account Manager", name: "John Elsisura" },
      { role: "PR Lead", name: "Name Here" },
    ],
  },
  {
    id: "graphics-work",
    client: "Client Name",
    title: "Graphics Work",
    brief: "Short one-liner.",
    type: ["graphics"],
    typeLabel: "Graphics · Visual",
    thumb: "/images/thumb-graphics.jpg",
    thumbBg: "from-green-950 to-emerald-900",
    videoUrl: "",
    background: "Background story here.",
    idea: "The concept and design direction for this visual work.",
    credits: [{ role: "Graphic Designer", name: "John Elsisura" }],
  },
];

export const filterTags = [
  { label: "All", value: "all" },
  { label: "Campaign", value: "campaign" },
  { label: "Copy", value: "copy" },
  { label: "Jingle", value: "jingle" },
  { label: "Case Study", value: "casestudy" },
  { label: "PR", value: "pr" },
  { label: "Graphics", value: "graphics" },
  { label: "Accounts", value: "accounts" },
];
