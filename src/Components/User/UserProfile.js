import React from "react";
import { useNavigate, useParams } from "react-router";
import { UserContext } from "../../UserContext";
import Feed from "../Feed/Feed";
import Head from "../Helpers/Head";

const UserProfile = () => {
  const { user } = useParams();
  const { data } = React.useContext(UserContext);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (data && user === data.username) {
      navigate("/conta");
    }
  }, [data]);

  return (
    <section className="container mainSection">
      <Head title={user} />
      <h1 className="title">{user}</h1>
      <Feed user={user} />
    </section>
  );
};

export default UserProfile;
