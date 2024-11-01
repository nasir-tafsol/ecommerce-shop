"use client";
import React from "react";
import { Card, Container } from "react-bootstrap";
import classes from "./product-detail.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default async function page({ params }) {
  const router = useRouter();
  const { id } = params;
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  const product = await response.json();

  const productCategory = await fetch(
    `https://dummyjson.com/products/category/${product.category}`
  );
  const relatedData = await productCategory.json();
  const relatedProductCategory = relatedData.products || [];

  const limitedRelatedProducts = relatedProductCategory
    .filter((item) => item.id !== product.id)
    .slice(0, 4);

  const handleClick = (id) => {
    router.push(`/product/${id}`);
  };
  return (
    <>
      <Container>
        <div className={classes.productDetailSection}>
          {/* <h1 className={classes.productDetailSectionHeading}>Product Detail</h1> */}
          <div className={classes.productDetailMain}>
            <div className={classes.productDetailImage}>
              <Image src={product.images[0]} fill />
            </div>
            <div className={classes.productDetailBody}>
              <div className={classes.productTitle}>
                <h1>{product.title}</h1>
              </div>
              <div className={classes.productDescription}>
                <p>{product.description}</p>
              </div>

              <div className={classes.productPrice}>
                <p>
                  Price: <strong>${product.price}</strong>
                </p>
              </div>
              <div className={classes.productCategory}>
                <p>
                  Category: <strong>{product.category}</strong>
                </p>
              </div>
              <div className={classes.productBrand}>
                <p>
                  Brand: <strong>{product.brand}</strong>
                </p>
              </div>
              <div className={classes.addToCart}>
                {/* <div className={classes.counterUpper}>
                  <Button variant="dark">-</Button>
                  <span>0</span>
                  <Button variant="dark">+</Button>
                </div> */}
                <div className={classes.addToCartBtnOne}>
                  <Link href={`/addToCart/${product.id}`}>Add to Cart</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.productDetailRelated}>
          <div className={classes.relatedProductGrid}>
            {limitedRelatedProducts.map((item) => (
              <Card key={item.id} className={classes.cardItems}>
                <div
                  className={classes.relatedProductGridImage}
                  onClick={() => handleClick(item.id)}
                >
                  <Image src={item.images[0]} fill />
                </div>
                <Card.Body>
                  <Card.Title
                    className={classes.relatedProductGridTitle}
                    onClick={() => handleClick(item.id)}
                  >
                    <h1>{item.title}</h1>
                  </Card.Title>
                  <div
                    className={classes.relatedProductGridDescription}
                    onClick={() => handleClick(item.id)}
                  >
                    <p>{item.description}</p>
                  </div>

                  <div
                    className={classes.productInfoDetail}
                    onClick={() => handleClick(item.id)}
                  >
                    <div className={classes.relatedProductPrice}>
                      Price: <strong>${item.price}</strong>
                    </div>
                    <div className={classes.relatedProductCategory}>
                      Category: <strong>{item.category}</strong>{" "}
                    </div>
                  </div>

                  <div className={classes.addToCart}>
                    {/* <div className={classes.counter}>
                      <Button variant="dark">-</Button>
                      <span>0</span>
                      <Button variant="dark">+</Button>
                    </div> */}
                    {/* <div className={classes.addToCartBtn}>
                      <Button>Add to Cart</Button>
                    </div> */}
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
