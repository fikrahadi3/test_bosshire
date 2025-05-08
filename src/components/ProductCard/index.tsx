"use client";

import Image from "next/image";
import { useState } from "react";
import {
  AddCircleOutlineOutlined,
  RemoveCircleOutlineOutlined,
} from "@mui/icons-material";
import { Box, Button, Card, IconButton, Rating, Tooltip } from "@mui/material";

import styles from "./utils/styles.module.scss";
import { ProductCardProps } from "./utils/types";

const ProductCard = ({
  category,
  defaultCount = 0,
  description,
  id,
  image,
  isEditable,
  price,
  rating,
  title,
  handleAddProduct,
}: ProductCardProps) => {
  const [count, setCount] = useState(defaultCount);

  return (
    <Card variant="outlined" className={styles.productCard__container}>
      <div className={styles.productCard__content}>
        <Image
          className={styles.content__image}
          src={image}
          width={200}
          height={200}
          alt={title}
        />

        <Box className={styles.content__text}>
          <Tooltip title={title}>
            <p>{title.substring(0, 20) + "..."}</p>
          </Tooltip>
          <Tooltip className={styles.text__description} title={description}>
            <Card variant="outlined">Description</Card>
          </Tooltip>
          <div className={styles.text__category}>Category: {category}</div>
          <div className={styles.text__rating}>
            <Rating
              className={styles.rating}
              size="small"
              defaultValue={rating.rate}
              precision={0.5}
              readOnly
            />
            <p>{rating.count}</p>
          </div>
          <div className={styles.text__price}>Price: $ {price}</div>
        </Box>
        <Box className={styles.content__form}>
          <div className={styles.form__count}>
            <IconButton onClick={() => (count > 0 ? setCount(count - 1) : 0)}>
              <RemoveCircleOutlineOutlined />
            </IconButton>
            <div className={styles.count__number}>{count}</div>
            <IconButton onClick={() => setCount(count + 1)}>
              <AddCircleOutlineOutlined />
            </IconButton>
          </div>
          {isEditable && (
            <Button
              className={styles.form__button}
              variant="outlined"
              onClick={() => handleAddProduct?.(id, count, title, price)}
            >
              Add to Cart
            </Button>
          )}
        </Box>
      </div>
    </Card>
  );
};

export default ProductCard;
