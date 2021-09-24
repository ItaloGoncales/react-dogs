import React from "react";
import { STATS_GET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import Error from "../Helpers/Error";
import Head from "../Helpers/Head";
import Loading from "../Helpers/Loading";

const UserStatsGraphs = React.lazy(() => import("./UserStatsGraphs"));

const UserStats = () => {
  const { data, error, loading, request } = useFetch();

  React.useEffect(() => {
    async function getData() {
      const { url, options } = STATS_GET();

      await request(url, options);

      console.log(data);
    }

    getData();
  }, [request]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (data) {
    return (
      <React.Suspense fallback={<Loading />}>
        <Head title="Estatísticas" />
        <UserStatsGraphs data={data} />
      </React.Suspense>
    );
  } else return null;
};

export default UserStats;
