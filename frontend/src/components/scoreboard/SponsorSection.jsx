import Image from "next/image";
import React from "react";

export const SponsorSection = ({ url, alt, width, height, className, classNameImg }) => {
  return (
    <section className={className}>
      <Image
        className={classNameImg}
        src={url}
        alt={alt}
        width={width}
        height={height}
        unoptimized
        priority
      />
  </section>
  );
}


