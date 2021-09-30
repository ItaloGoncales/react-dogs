import React from "react";
import { PHOTOS_GET } from "../../api";
import Error from "../Helpers/Error";
import useFetch from "../../Hooks/useFetch";
import FeedPhotosItem from "./FeedPhotosItem";
import Loading from "../Helpers/Loading";
import styles from "./FeedPhotos.module.css";
import PropTypes from "prop-types";

const FeedPhotos = ({ user, page, setInfinite, setModalPhoto }) => {
  let { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    async function fetchPhotos() {
      let { url, options } = PHOTOS_GET(page, 3, user);

      const { response, json } = await request(url, options);

      if (response.ok && json.length < 3) {
        setInfinite(false);
      }
    }

    fetchPhotos();
  }, [request, user, page]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <ul className={`${styles.feed} animeLeft`}>
        {data.map((photo) => (
          <FeedPhotosItem
            key={photo.id}
            photo={photo}
            setModalPhoto={setModalPhoto}
          />
        ))}
      </ul>
    );
  else return null;
};

export default FeedPhotos;

FeedPhotos.defaultProps = {
  user: 0,
  page: 0,
};

FeedPhotos.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  page: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  setInfinite: PropTypes.func,
  setModalPhoto: PropTypes.func,
};
