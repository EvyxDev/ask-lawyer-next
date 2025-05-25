//home.d.ts
interface Image {
  id: number;
  title: string;
  imgUrl: string;
}
interface HereData {
  title: string;
  description: string;
  images: Image[];
}
declare type ContactFormData = {
  name: string;
  mobile: string;
  email: string;
  subject: string;
  content: string;
};
declare interface AboutDetails {
  content:string;
}
declare interface AboutResponse {
  success: boolean;
  data: AboutDetails;
}
declare interface PrivacyPolicy {
  id:number;
  content_ar:string;
  content_en:string;
}
declare interface PrivacyPolicyResponse {
  success: boolean;
  data: PrivacyPolicy;
  error?: string; 
}
declare interface HowProcessWorks {
  id:number;
  description_ar:string;
  description_en:string;
}
declare interface HowProcessWorksResponse {
  success: boolean;
  data: HowProcessWorks;
  error?: string; 
}
declare interface heroSectionTypes {
 id:number;
 title:string;
 description:string;
  images: string[]; 
}
declare interface HeroResponse {
  success?: boolean;
  data: HeroSectionType | null; 
  error?: string;
}