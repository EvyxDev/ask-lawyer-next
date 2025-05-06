"use client"

import Image from "next/image"
import { CalendarIcon } from "lucide-react"
import { useLocale } from "next-intl"
import { Link } from "@/i18n/routing"

interface BlogCardProps {
  image: string
  date: string
  title: string
  description: string
  slug: string
}

export default function BlogCard({ image, date, title, description, slug }: BlogCardProps) {
  const locale = useLocale()
  const isRtl = locale === "ar"

  return (
    <div className="bg-white rounded-lg overflow-hidden  ">
      <Link href={`/blogs/${slug}`}>
        <div className="relative h-56 w-full">
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </div>
        <div className="p-5 shadow border-2">
          <div className="flex items-center gap-2 text-gray-500 mb-3">
            <CalendarIcon className="w-4 h-4" />
            <span className="text-sm">{date}</span>
          </div>
          <h3 className={`text-xl font-bold mb-3 text-gray-800 ${isRtl ? "text-right" : "text-left"}`}>{title}</h3>
          <p className={`text-gray-600 line-clamp-3 ${isRtl ? "text-right" : "text-left"}`}>{description}</p>
        </div>
      </Link>
    </div>
  )
}
