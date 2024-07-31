import type { IImageData } from "@/types/page";
import { Suspense } from "react";
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Carousel as CarouselWrapper,
} from "./ui/carousel";

interface Props {
  images: IImageData[];
}

export default function Carousel({ images }: Props) {
  return (
    <CarouselWrapper className="w-full flex flex-col gap-4 items-center justify-center">
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem>
            <Suspense fallback={"loadnig..."}>
              <img
                key={image.id}
                className="rounded-3xl border-1 border-subtle-secondary shadow-blue"
                src={import.meta.env.PUBLIC_STRAPI_URL + image.attributes.url}
                width={image.attributes.width}
                height={image.attributes.height}
                loading="eager"
              />
            </Suspense>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex items-center justify-center gap-8">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </CarouselWrapper>
  );
}
