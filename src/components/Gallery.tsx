import type { IImageData } from "@/types/page";
import { useState } from "react";

interface Props {
  images: IImageData[];
}

export default function Gallery({ images }: Props) {
  const [image, setImage] = useState<IImageData>(images[0]);
  const [idx, setIdx] = useState(0);

  function changeImage(index: number) {
    setIdx(index);
    setImage(images[index]);
  }

  return (
    <div className="flex flex-col items-start justify-start gap-4 w-full">
      <div className="rounded-3xl border-1 border-subtle-secondary shadow-blue flex items-center justify-center w-full  overflow-clip">
        <img
          className="w-full h-56 md:h-80 xl:h-[500px] object-contain"
          src={import.meta.env.PUBLIC_STRAPI_URL + image.attributes.url}
          width={image.attributes.width}
          height={image.attributes.height}
          loading="eager"
        />
      </div>
      <div className="flex gap-4 overflow-auto">
        {images.map((thumbnail, i) => (
          <img
            key={thumbnail.id}
            className={`rounded-3xl  shadow-blue object-cover h-24 w-24 ${
              idx == i
                ? "border-4 border-primary"
                : "border-1 border-subtle-secondary"
            }`}
            src={import.meta.env.PUBLIC_STRAPI_URL + thumbnail.attributes.url}
            width={thumbnail.attributes.width}
            height={thumbnail.attributes.height}
            loading="eager"
            onClick={() => changeImage(i)}
          />
        ))}
      </div>
    </div>
  );
}
