import { notFound } from "next/navigation";
import { urlForImage } from "../../../../sanity/lib/image";
import { getProductBySlug } from "./actions/product";
import { Gallery, ProductForm } from "./components";
import { getProducts } from "@/common/actions/products";

type Props = {
  params: {
    slug: string;
  };
};

export default async function Product({ params: { slug } }: Props) {
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  const { name, images, price, description, ...data } = product;

  return (
    <>
      <div className="grid grid-cols-1 gap-9 lg:grid-cols-3">
        <div className="">
          <Gallery name={name} images={images} />
        </div>
        <div className="lg:col-start-2 lg:col-end-4 lg:pt-12">
          <h2 className="mb-3 text-3xl font-bold">{name}</h2>
          <p className="mb-8 text-2xl font-semibold leading-none text-primary">
            ${price / 100}
          </p>
          <div className="mb-8">
            <ProductForm
              name={name}
              image={urlForImage(images[0]).url()}
              price={price}
              description={description}
              {...data}
            />
          </div>
          <h3 className="mb-2 text-xl font-semibold">Description:</h3>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
        </div>
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const products = await getProducts({});

  return products.data.slice(0, 9).map((product) => ({
    slug: product.slug,
  }));
}