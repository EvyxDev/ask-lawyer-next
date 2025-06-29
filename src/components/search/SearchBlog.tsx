import { Link } from "@/i18n/routing"
import { LuMessageCircleQuestion } from "react-icons/lu"

interface SearchBlogProps {
  blogs: SearchResult[];
}

const SearchBlog = ({ blogs}: SearchBlogProps) => {
  return (
    <div>
      {blogs?.map((blog: SearchResult) => (
        <Link
          href={`blogs/${blog.id}`}
          className="rounded-sm shadow-sm flex justify-between md:p-4 p-2 hover:bg-gray-50"
          key={blog.id}
        >
          <div className="flex flex-col gap-2">
            <div className="text-primary flex gap-2 md:text-2xl text-xl">
              <LuMessageCircleQuestion
                className="shrink-0"
                size={30}
              />
              <h2 className="break-after-all">{blog?.title}</h2>
            </div>
            <p className="md:text-2xl text-xl">{blog?.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default SearchBlog