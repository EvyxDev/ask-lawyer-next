import { askservice, calllawyer, chooselawyer, consultantchat, hero1, hero2, requestoffer ,asklawyer } from "../../../public/assets";

export const navBarLinks = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "how_process_works", href: "/how-process-works" },
  { key: "hire_lawyer", href: "/hire-lawyer" },
  { key: "privacy_policy", href: "/privacy-policy" },
  { key: "legal_information", href: "/legal-information" },
  { key: "contact_us", href: "/contact-us" },
];
export const footerLinks = [
  { key: "about_contry", href: "/about" },
  { key: "services", href: "/services" },
  { key: "lawyers", href: "/lawyers" },
  { key: "news", href: "/news" },
];
export const HeroLinks = [
  { key: "request_offer", href: "/request-price-offer" ,img: requestoffer },
  { key: "ask_service", href: "/ask-service" ,img: askservice },
  { key: "choose_lawyer", href: "/choose-lawyer" ,img: chooselawyer },
  { key: "chat_with_consultant", href: "/consultant-chat" ,img:consultantchat },
  { key: "call_lawyer", href: "/call-lawyer",img: calllawyer },
  { key: "ask_lawyer", href: "/ask-lawyer",img: asklawyer },

];
export const hereData: HereData[] = [
  {
    title: "احصل على مساعدة قانونية عبر الإنترنت",
    description:
      "يوجد لدينا مجموعة مختارة ومدربة على أعلى المستويات ومتخصصين في مجالات القانون المختفلة وذلك لتقديم استشارة قانونية فورية بمستوى جديد من الحلول القانونية لعملاءنا الكرام عن طريق مستشار قانوني متخصص في قضية الموكل.",
    images: [
      { id: 1, title: "Sunset Landscape", imgUrl: hero2 },
      { id: 2, title: "City Skyline", imgUrl: hero1 },
      { id: 3, title: "Mountain Adventure", imgUrl: hero1 },
    ],
  },
];
