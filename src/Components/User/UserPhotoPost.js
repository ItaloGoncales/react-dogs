import React from "react";
import { PHOTO_POST } from "../../api";
import useFetch from "../../Hooks/useFetch";
import useForm from "../../Hooks/useForm";
import Error from "../Helpers/Error";
import Button from "../Forms/Button";
import Input from "../Forms/Input";

import styles from "./UserPhotoPost.module.css";
import { useNavigate } from "react-router";
import Head from "../Helpers/Head";

const UserPhotoPost = () => {
  let nome = useForm();
  let peso = useForm("number");
  let idade = useForm("number");
  let [img, setImg] = React.useState({});

  const { data, error, loading, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) navigate("/conta");
  }, [data]);

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("img", img.raw);
    formData.append("nome", nome.value);
    formData.append("peso", peso.value);
    formData.append("idade", idade.value);

    const token = window.localStorage.getItem("token");

    const { url, options } = PHOTO_POST(token, formData);

    await request(url, options);
  }

  function handleImgChange({ target }) {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <Head title="Poste sua foto" />
      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" name="nome" {...nome} />
        <Input label="Peso" type="number" name="peso" {...peso} />
        <Input label="Idade" type="number" name="idade" {...idade} />
        <input
          type="file"
          name="img"
          id="img"
          onChange={handleImgChange}
          className={styles.file}
        />
        <Button disabled={loading ? "disabled" : ""}>Enviar</Button>
        <Error error={error} />
      </form>
      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url(${img.preview})` }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default UserPhotoPost;
