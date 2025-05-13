"use client";

import Image from "next/image";
import { useState } from "react";
import { placeholder } from "../../public/assets";

// Import ImageProps from next/image for type safety
import type { ImageProps } from "next/image";

export function ClientImage({ src, alt, ...props }: ImageProps) {
  const [error, setError] = useState(false);

  return error ? (
    <Image src={placeholder} alt={alt} {...props} />
  ) : (
    <Image src={src} alt={alt} onError={() => setError(true)} {...props} />
  );
}