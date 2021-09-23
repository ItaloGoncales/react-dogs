import React from "react";
import { useNavigate } from "react-router";
import { PASSWORD_RESET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import useForm from "../../Hooks/useForm";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import Error from "../Helpers/Error";

const LoginResetPassword = () => {
  const [login, setLogin] = React.useState("");
  const [key, setKey] = React.useState("");
  const password = useForm();

  const navigate = useNavigate();

  const { loading, error, request } = useFetch();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("login")) setLogin(params.get("login"));
    if (params.get("key")) setKey(params.get("key"));
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const { url, options } = PASSWORD_RESET({
      password: password.value,
      login,
      key,
    });

    const { response } = await request(url, options);

    if (response.ok) navigate("/login");
  }

  return (
    <div>
      <h1 className="title">Resete a Senha</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nova Senha"
          type="password"
          name="password"
          {...password}
        />
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Resetar</Button>
        )}
        <Error error={error} />
      </form>
    </div>
  );
};

export default LoginResetPassword;
