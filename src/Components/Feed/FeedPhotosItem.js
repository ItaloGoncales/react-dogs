/* eslint-disable react/prop-types */
import React from "react";
import styles from "./FeedPhotosItem.module.css";

const FeedPhotosItem = ({ photo, setModalPhoto }) => {
  return (
    <li
      className={styles.photo}
      onClick={() => {
        setModalPhoto(photo);
      }}
    >
      <img src={photo.src} alt={photo.title} />
      <span className={styles.visualizacao}>{photo.acessos}</span>
    </li>
  );
};

export default FeedPhotosItem;
