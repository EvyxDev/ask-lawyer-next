declare type RequestFormData = {
  name: string;
  mobile: string;
  country_id: number;
  lang_id: number;
  email: string;
  message: string;
  type: string;
  lawyer_id?: number;
  lawyer_type: string;
};
declare type CountryTranslation = {
  id: number;
  country_id: number;
  locale: string;
  name: string;
};

declare type Country = {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  is_activate: number;
  name: string;
  translations: CountryTranslation[];
};

declare type City = {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  is_activate: number;
  name: string;
  translations: CountryTranslation[];
};
declare type CityTranslation = {
  id: number;
 city_id: number;
  locale: string;
  name: string;
};

declare type CountriesResponse = {
  success?: boolean; 
  message?: string;
  data: Country[] | null;
  error?: string;
};
declare interface Language {
  id: number;
  name: string;
  locale: string;
  is_activate: number;
}
declare interface LanguageResponse {
  success: boolean;
  message: string;
  data: Language[]| null;
  error?: string;
}



declare interface Lawyers {
  id: number;
  name: string;
}
declare interface LawyersResponse {
  success: boolean;
  message: string;
  data: Language[]| null;
  error?: string;
}