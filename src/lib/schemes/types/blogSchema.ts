import { z } from "zod";


export const getBlogSchema = (messages: {
  titleRequired: string;
  descriptionRequired: string;
  countryRequired: string;
  blogRequired: string;
  imgRequired: string;
}) =>
  z.object({
    title: z.string().min(1, { message: messages.titleRequired }),
    description: z.string().min(1, { message: messages.descriptionRequired }),
    country_id: z.string().min(1, { message: messages.countryRequired }),
    blog_category_id: z.string().min(1, { message: messages.blogRequired }),
    img: z.instanceof(File, { message: messages.imgRequired }), 
  });
export type BlogSchemaType = z.infer<ReturnType<typeof getBlogSchema>>;

