import { askservice, calllawyer, chooselawyer, consultantchat, hero1, hero2, requestoffer ,asklawyer, getcall, chatRequest, sendQuestion, legalDic, lawsAndRegulations, legalBlog } from "../../../public/assets";

export const navBarLinks = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "how_process_works", href: "/how-process-works" },
  { key: "services", href: "/services" },
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
    { key: "ask_lawyer", href: "/ask-lawyer",img: asklawyer },
  { key: "request_offer", href: "/request-price-offer" ,img: requestoffer },
    { key: "call_lawyer", href: "/call-lawyer",img: calllawyer },
  { key: "ask_service", href: "/ask-service" ,img: askservice },
  { key: "choose_lawyer", href: "/choose-lawyer" ,img: chooselawyer },
  { key: "chat_with_consultant", href: "/consultant-chat" ,img:consultantchat },

];
export const servicesLinks = [
{ key: "ask_lawyer", href: "/ask-lawyer",img: asklawyer },
 { key: "call_lawyer", href: "/call-",img: calllawyer },
 { key: "chat_with_consultant", href: "/consultant-chat" ,img:consultantchat },
 { key: "chat_with_lawyer", href: "/chat-with-lawyer" ,img: consultantchat },
 { key: "choose_lawyer", href: "/choose-lawyer" ,img: chooselawyer },
 { key: "request_offer", href: "/request-price-offer" ,img: requestoffer },
];
export const asklawyerLinks = [
{ key:  "call_request", href: "/call-request",img: getcall },
 { key: "live_chat", href: "/live-chat",img: chatRequest },
 { key: "send_question", href: "/send-question" ,img:sendQuestion },
];
export const legalInformationLinks = [
{ key: "legal_dictionary", href: "/legal-dictionary",img: lawsAndRegulations },
{ key:  "laws_and_regulations", href: "/laws-and-regulations",img: legalDic },
{ key: "legal_blog", href: "/legal-blog" ,img:legalBlog },
{ key: "questions_and_answers", href: "/questions-and-answers" ,img:sendQuestion },

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
