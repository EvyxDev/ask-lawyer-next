"use client";

import { useLocale, useTranslations } from "next-intl";
import BlogCard from "./BlogCard";

// Mock data for blogs
const getBlogData = (locale: string) => {
  if (locale === "ar") {
    return [
      {
        id: 1,
        image: "/grand-law-library.png",
        date: "18 أغسطس 2023",
        title: "حقوق العاملين حسب قانون العمل الأردني",
        description:
          "اعتمدت لجنة الشؤون الصحية والبيئية في المجلس الوطني الاتحادي مشروع قانون بشأن حقوق العمال وظروف العمل.",
        slug: "workers-rights-jordan",
      },
      {
        id: 2,
        image: "/grand-law-library.png",
        date: "18 أغسطس 2023",
        title: "حقوق العاملين حسب قانون العمل الأردني",
        description:
          "اعتمدت لجنة الشؤون الصحية والبيئية في المجلس الوطني الاتحادي مشروع قانون بشأن حقوق العمال وظروف العمل.",
        slug: "workers-rights-jordan-2",
      },
      {
        id: 3,
        image: "/grand-law-library.png",
        date: "18 أغسطس 2023",
        title: "حقوق العاملين حسب قانون العمل الأردني",
        description:
          "اعتمدت لجنة الشؤون الصحية والبيئية في المجلس الوطني الاتحادي مشروع قانون بشأن حقوق العمال وظروف العمل.",
        slug: "workers-rights-jordan-3",
      },
      {
        id: 4,
        image: "/grand-law-library.png",
        date: "18 أغسطس 2023",
        title: "حقوق العاملين حسب قانون العمل الأردني",
        description:
          "اعتمدت لجنة الشؤون الصحية والبيئية في المجلس الوطني الاتحادي مشروع قانون بشأن حقوق العمال وظروف العمل.",
        slug: "workers-rights-jordan-4",
      },
    ];
  } else {
    return [
      {
        id: 1,
        image: "/grand-law-library.png",
        date: "August 18, 2023",
        title: "Workers' Rights According to Jordanian Labor Law",
        description:
          "The Health and Environmental Affairs Committee of the Federal National Council approved a bill regarding workers' rights and working conditions.",
        slug: "workers-rights-jordan",
      },
      {
        id: 2,
        image: "/grand-law-library.png",
        date: "August 18, 2023",
        title: "Workers' Rights According to Jordanian Labor Law",
        description:
          "The Health and Environmental Affairs Committee of the Federal National Council approved a bill regarding workers' rights and working conditions.",
        slug: "workers-rights-jordan-2",
      },
      {
        id: 3,
        image: "/grand-law-library.png",
        date: "August 18, 2023",
        title: "Workers' Rights According to Jordanian Labor Law",
        description:
          "The Health and Environmental Affairs Committee of the Federal National Council approved a bill regarding workers' rights and working conditions.",
        slug: "workers-rights-jordan-3",
      },
      {
        id: 4,
        image: "/grand-law-library.png",
        date: "August 18, 2023",
        title: "Workers' Rights According to Jordanian Labor Law",
        description:
          "The Health and Environmental Affairs Committee of the Federal National Council approved a bill regarding workers' rights and working conditions.",
        slug: "workers-rights-jordan-4",
      },
    ];
  }
};

export default function Blogs() {
  const t = useTranslations();
  const locale = useLocale();
  const blogs = getBlogData(locale);

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-12">
        <div className={`flex gap-4 items-center `}>
          <h2 className={`text-4xl md:text-5xl text-primary font-semibold `}>
            {t("blogs")}
          </h2>
          <div className="bg-secondary w-24 md:w-36 h-[6px] mt-4"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            image={blog.image}
            date={blog.date}
            title={blog.title}
            description={blog.description}
            slug={blog.slug}
          />
        ))}
      </div>
    </section>
  );
}
