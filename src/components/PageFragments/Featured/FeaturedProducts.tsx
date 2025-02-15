import Image from "next/image";
import Link from "next/link";

const FeaturedProducts = () => {
  const products = [
    {
      title: "New arrivals are now in!",
      buttonText: "SHOW COLLECTION",
      image: "/images/featured-1.jpg",
    },
    {
      title: "Basic t-shirts",
      price: "$29.99",
      buttonText: "MORE DETAILS",
      image: "/images/featured-2.jpg",
    },
    {
      title: "Sale this summer",
      buttonText: "VIEW ALL",
      image: "/images/featured-3.jpg",
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10 py-16">
      {products.map((product, index) => (
        <div
          key={index}
          className="relative h-96 bg-cover bg-center flex items-end p-6 rounded-lg shadow-lg text-white"
          style={{ backgroundImage: `url(${product.image})` }}
        >
          <div className="bg-black bg-opacity-50 p-4 rounded-lg w-full text-center">
            <h2 className="text-lg font-semibold">{product.title}</h2>
            {product.price && <p className="text-lg font-bold">{product.price}</p>}
            <Link
              href="#"
              className="mt-4 inline-block bg-white text-black px-4 py-2 rounded-full font-semibold"
            >
              {product.buttonText}
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FeaturedProducts;
