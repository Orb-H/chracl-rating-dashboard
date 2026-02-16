"use client";

import Image from "next/image";
import { ComponentProps, useState } from "react";

export function FallbackImage({
  fallbackSrc,
  ...props
}: {
  fallbackSrc: string;
} & ComponentProps<typeof Image>) {
  const [useFallback, setUseFallback] = useState(false);

  return (
    <Image
      {...props}
      src={useFallback ? fallbackSrc : props.src}
      placeholder="blur"
      blurDataURL={fallbackSrc}
      onError={(event) => {
        props.onError?.(event);
        setUseFallback(true);
      }}
    />
  );
}
