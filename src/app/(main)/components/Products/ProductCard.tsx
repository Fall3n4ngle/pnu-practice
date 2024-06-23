import { Card, CardContent, CardFooter } from "@/ui";
import Image from "next/image";
import { shimmer, toBase64 } from "@/common/utils";
import { Filter } from "@/common/types";

type Props = {
  image: string;
  name: string;
  categories: Filter[];
  price: number;
  countInStock: number;
};

export default function ProductCard({
  categories,
  image,
  name,
  price,
  countInStock,
}: Props) {
  return (
    <Card className="bg-secondary">
      <CardContent className="p-3">
        <div className="relative mb-3 pb-[80%]">
          <Image
            src={image}
            alt={`${name}`}
            fill
            className="rounded-lg object-cover"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(225, 280),
            )}`}
          />
        </div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="mb-2">
          {categories.slice(0, 3).map((category) => (
            <span
              key={category.id}
              className="font-semibold text-muted-foreground"
            >
              {category.name}
            </span>
          ))}
        </p>
      </CardContent>
      <CardFooter className="px-3">
        <div className="flex w-full items-center justify-between gap-4">
          <span className="text-xl font-bold text-primary">${price / 100}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
