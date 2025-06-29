import { CalendarIcon } from "lucide-react";
import { Link } from "@/i18n/routing";
import { ClientImage } from "../ClientImage";

export default function BlogCard({
  image,
  created_at,
  title,
  description,
  id,
}: Blog) {
  return (
    <div className="bg-white rounded-lg overflow-hidden  ">
      <Link href={`/blogs/${id}`}>
        <div className="relative h-56 w-full">
          <ClientImage
            fill
            src={image}
            alt={title}
            className="object-cover"
            priority
          />
        </div>
        <div className="p-5 shadow border-2">
          {created_at && (
            <div className="flex items-center gap-2 text-gray-500 mb-3">
              <CalendarIcon className="w-4 h-4" />
              <span className="text-sm">{created_at}</span>
            </div>
          )}

          <h3 className={`text-xl font-bold mb-3 text-gray-800 truncate `}>
            {title}
          </h3>
          <p className={`text-gray-600 line-clamp-3 truncate `}>
            {description}
          </p>
        </div>
      </Link>
    </div>
  );
}
