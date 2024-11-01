"use client";
import React, { useEffect, useState } from "react";
import classes from "./add-to-cart.module.css";
import Image from "next/image";

export default function Page({ params }) {
  const { id } = params;
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const getProduct = async () => {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const allProduct = await response.json();
    setProducts(allProduct);
    setTotalPrice(allProduct.price);
  };

  const incQuantityPrice = () => {
    setQuantity((prev) => {
      const newQuantityItem = prev + 1;
      setTotalPrice(products.price * newQuantityItem);
      return newQuantityItem;
    });
  };

  const decQuantityPrice = () => {
    setQuantity((prev) => {
      if (prev > 1) {
        const minusItem = prev - 1;
        setTotalPrice(products.price * minusItem);
        return minusItem;
      }
      return prev;
    });
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  if (!products) {
    return <div>Loading....!</div>;
  }
  return (
    <>
      <div className={classes.addToCartMainPage}>
        <div className={classes.formDiv}>
          <form className={classes.form}>
            <h1>Check Out</h1>
            <div className={classes.inputGroup}>
              <input type="text" placeholder="Enter Your Name" required />
            </div>
            <div className={classes.inputGroup}>
              <textarea placeholder="Enter Your Address" required />
            </div>
            <div className={classes.inputGroup}>
              <input type="number" placeholder="Enter Your Number" required />
            </div>
            <div className={classes.inputGroup}>
              <input type="text" placeholder="Enter Your City" required />
            </div>
            <button type="submit" className={classes.submitButton}>
              Submit
            </button>
          </form>
        </div>
        <div className={classes.addToCartForm}>
          <div className={classes.addToCartProductInfo}>
            <div className={classes.addToCartProductImage}>
              <Image src={products.images[0]} fill />
            </div>
            <div className={classes.addToCartProductInfoDetail}>
              <div className={classes.addToCartProductInfoTitle}>
                <h1>{products.title}</h1>
              </div>
              <div className={classes.addToCartProductInfoSection}>
                <div className={classes.addToCartProductInfoCounterSection}>
                  <button variant="dark" onClick={decQuantityPrice} disabled={quantity===1}>
                    -
                  </button>
                  <span>{quantity}</span>
                  <button variant="dark" onClick={incQuantityPrice}>
                    +
                  </button>
                </div>
                {/* <div className={classes.addToCartProductInfoAddToCartBtn}>
                  <Link href={"/"}>Add to Cart</Link>
                </div> */}
              </div>
            </div>
            <div className={classes.addToCartProductInfoPrice}>
              <h5>${products.price}</h5>
            </div>
          </div>
          {/* Price Table */}
          <div className={classes.addToCartProductInfoTotalPrice}>
            <h5>Total Price: ${totalPrice.toFixed(2)}</h5>
          </div>
        </div>
      </div>
    </>
  );
}
