"use client";

import Image from "next/image";
import { useState } from "react";

export function FallbackImage({
  fallbackSrc,
  ...props
}: {
  fallbackSrc: string;
} & React.ComponentProps<typeof Image>) {
  const [useFallback, setUseFallback] = useState(false);
  const [oldSrc, setOldSrc] = useState(props.src);
  if (oldSrc !== props.src) {
    setUseFallback(false);
    setOldSrc(props.src);
  }

  return (
    <Image
      {...props}
      src={useFallback ? fallbackSrc : props.src}
      placeholder="blur"
      blurDataURL={fallbackSrc}
      onError={() => {
        setUseFallback(true);
      }}
    />
  );
}
