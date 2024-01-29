import React, { useState, useEffect } from "react";
import Image from "next/image";

interface imageProps {
  uploadId: string;
  alt: string;
  width?: number;
  height?: number;
  imgType: string;
  className?: string;
}

export const ImageWithFetch = ({
  uploadId,
  alt,
  width,
  height,
  imgType,
  className,
}: imageProps) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    if (imgType === "profile") {
      setImageSrc("/profile_default_image.svg");
    } else if (imgType === "planbg") {
      setImageSrc("/plan_bg_default_image.jpg");
    }
  }, [imgType]);

  useEffect(() => {
    if (uploadId && (!imageSrc || imageSrc.startsWith("/api/imageUpload"))) {
      fetch(`/api/imageUpload?uploadId=${uploadId}`)
        .then((res) => res.json())
        .then(setImageSrc);
    }
  }, [uploadId, imageSrc]);

  return <Image src={imageSrc} alt={alt} width={width} height={height} className={className} />;
};
