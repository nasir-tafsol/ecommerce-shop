"use client";
import React, { useEffect, useState } from "react";
import { Button, Card, Container, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import classes from "./addproduct.module.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function page() {
  let [images, setImages] = useState("");
  let [category, setCategory] = useState("");
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState("");
  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(false);
  let [isEditing, setIsEditing] = useState(null);
  let [upatedItem, setUpdatedItem] = useState(null);

  const getProduct = async () => {
    const response = await axios.get("https://dummyjson.com/products?limit=4");
    if (response !== undefined) {
      setProducts(response.data.products);
      console.log(response.data.products);
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    let dataSet = {
      images,
      category,
      title,
      description,
      price,
    };
    for (const key in dataSet) {
      if (!dataSet[key]) {
        return toast.error(`${key} is required`);
      }
    }

    try {
      setLoading(true);
      let url = upatedItem
        ? `https://dummyjson.com/products/${upatedItem.id}`
        : `https://dummyjson.com/products/add`;

      const response = upatedItem
        ? await axios.put(url, dataSet)
        : await axios.post(url, dataSet);

      if (response.data) {
        let newProduct = response.data;
        if (!upatedItem) {
          setProducts((prev) => [newProduct, ...prev]);
          // setIsEditing(response.data.id);
          toast.success("Product Added Successfully...!");
          resetForm();
        } else {
          setProducts((prev) => {
            const index = prev.findIndex((item) => item.id === newProduct.id);
            if (index !== -1) {
              const checkNewProduct = [...prev];
              checkNewProduct[index] = newProduct;
              return checkNewProduct;
            }
            return prev;
          });
          toast.success("Product updated successfully!");
          resetForm();
        }
      }
    } catch (error) {
      toast.error("Product Not Added...!");
      console.log("Product Not Added...!", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = (item) => {
    setCategory(item.category);
    setTitle(item.title);
    setDescription(item.description);
    setPrice(item.price);
    setIsEditing(item.id);
  };

  const removeProduct = async (id) => {
    try {
      await axios.delete(`https://dummyjson.com/products/${id}`);
      setProducts((prev) => prev.filter((item) => item.id != id));
      toast.success("Product removed successfully!");
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error("Failed to remove product.");
    }
  };

  let resetForm = () => {
    setImages("");
    setCategory("");
    setTitle("");
    setDescription("");
    setPrice("");
    setIsEditing(null);
    setUpdatedItem(null);
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <Container>
        <h1 className={classes.addProductHeading}>Add Products</h1>
        <Form onSubmit={addProduct}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Control
              type="file"
              value={images}
              onChange={(e) => setImages(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Product Category</Form.Label>
            <Form.Control
              type="text"
              className={classes.inputFields}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Product Title</Form.Label>
            <Form.Control
              type="text"
              className={classes.inputFields}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              className={classes.inputFields}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Product Price</Form.Label>
            <Form.Control
              type="number"
              className={classes.inputFields}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="dark"
            disabled={loading}
            type="submit"
            className={classes.addProductBtn}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Adding...
              </>
            ) : isEditing ? (
              "Update Product"
            ) : (
              "Add Product"
            )}
          </Button>
        </Form>
        <ToastContainer autoClose={2000} />

        {products &&
          products?.map((item, index) => (
            <div className={classes.productsItemMain} key={index + 1}>
              <>
                <Card>
                  <div className={classes.addProductCardSection}>
                    <div className={classes.productImage}>
                      <Card.Img
                        variant="top"
                        // src={item.images}
                        // src={`/images/${item.images.split("\\").length > 2 ? item.images.split("\\")[2] : ''}`}
                        src={
                          item.images &&
                          typeof item.images === "string" &&
                          item.images.split("\\").length > 2
                            ? `/images/${item.images.split("\\")[2]}`
                            : `${item.images}`
                        }
                        alt={item.title}
                      />
                    </div>
                    <div className={classes.cardBody}>
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
                    </div>
                    <div className={classes.actionBtns}>
                      <Button
                        variant="success"
                        className={classes.updateBtn}
                        onClick={() => {
                          setUpdatedItem(item);
                          handleUpdateProduct(item);
                        }}
                      >
                        {" "}
                        Update
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => removeProduct(item.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              </>
            </div>
          ))}
      </Container>
    </>
  );
}
