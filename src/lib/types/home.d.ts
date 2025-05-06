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
