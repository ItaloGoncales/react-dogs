import React from "react";
import useForm from "../../Hooks/useForm";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import Error from "../Helpers/Error";
import { UserContext } from "../../UserContext";

const LoginCreate = () => {
  const username = useForm();
  const email = useForm("email");
  const password = useForm();

  const { userCreate, error, loading } = React.useContext(UserContext);

  function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && password.validate() && email.validate()) {
      userCreate(username.value, password.value, email.value);
    }
  }

  return (
    <section className="animeleft">
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Email" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        <Button disabled={loading ? "disabled" : ""}>Cadastrar</Button>
        <Error error={error} />
      </form>
    </section>
  );
};

export default LoginCreate;
