"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import classes from "./allproduct.module.css";
import { toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ReactPaginate from "react-paginate";

export default function Page() {
  const router = useRouter();
  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(false);
  let [currentPage, setCurrentPage] = useState(1);
  let [count, setCount] = useState(0);
  const [postPerPage] = useState(8);

  const allProductItems = async (page = 1) => {
    setLoading(true);
    try {
      let skip = (page - 1) * postPerPage || 0;
      const response = await axios.get(
        `https://dummyjson.com/products?limit=${postPerPage}&skip=${skip}`
      );
      setProducts(response.data.products);
      setCount(response.data?.total);
    } catch (error) {
      console.log("Error into Getting Data", error);
      toast.error("Error in Fetching Product Data.....!");
    }
    setLoading(false);
  };

  useEffect(() => {
    allProductItems(currentPage);
  }, []);

  const handleClick = (id) => {
    router.push(`/product/${id}`);
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
    allProductItems(data.selected + 1);
  };

  let totalPages = Math.ceil(count / postPerPage);
  return (
    <>
      <Container>
        <h1 className={classes.allProductItemsheading}>All Products</h1>
        {loading && <Spinner animation="border" />}
        <div className={classes.productsItemMain}>
          {products?.map((item) => (
            <>
              <Card
                onClick={() => handleClick(item.id)}
                className={classes.cardItems}
              >
                <div className={classes.productImage}>
                  <Image
                    variant="top"
                    src={item.images[0]}
                    alt={item.title}
                    fill
                  />
                </div>

                <Card.Body>
                  <Card.Title className={classes.productTile}>
                    {item.title}
                  </Card.Title>

                  <Card.Text className={classes.productDescription}>
                    {item.description}
                  </Card.Text>
                  <div className={classes.productInfo}>
                    <div className={classes.productPrice}>
                      Category: <strong>{item.category}</strong>
                    </div>
                    <div className={classes.productPrice}>
                      Price: <strong>${item.price}</strong>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </>
          ))}
        </div>

        <ReactPaginate
          breakLabel="..."
          nextLabel="next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={Math.ceil(totalPages)}
          previousLabel="previous"
          renderOnZeroPageCount={null}
          containerClassName={classes.paginationContainer}
          activeClassName={classes.active}
          disabledClassName={classes.disabled}
          forcePage={currentPage - 1}
        />
      </Container>
    </>
  );
}
