import React from "react";
import Image from "next/image";

interface MainImgProps {
  randomImage: string;
  randomCountry: string;
}

function ImageList({ randomImage, randomCountry }: MainImgProps) {
  return (
    <>
      {/* <Image src={randomImage} alt="plus icon" width="125" height="135" /> */}
      <h5>{randomCountry}</h5>
      <p>2018.04.07 ~ 04.10</p>
    </>
  );
}

export default ImageList;
