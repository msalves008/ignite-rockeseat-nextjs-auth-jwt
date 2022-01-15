import { useContext, useEffect } from "react";
import { Can } from "../components/Can";
import { AuthContext } from "../contexts/AuthContext";
import { useCan } from "../hooks/useCan";
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { AuthTokenError } from "../services/errors/AuthTokenErrors";

import { withSSRAuth } from "../utils/withSSRAuth";
export default function Dashboard() {
  const { user } = useContext(AuthContext);
  /* Modelo 01 para permissions ou roles */
  /* const userCanSeeMetrics = useCan({ permissions: ["metrics.list"] }); */

  useEffect(() => {
    api
      .get("/me")
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <h1>Dashboard: {user?.email}</h1>
      <Can permissions={['metrics.list']}>
        <h2>You can see this</h2>
      </Can>
      {/* Modelo 01 para permissions ou roles */}
      {/*  {userCanSeeMetrics && <p>You can see metrics</p>} */}
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get("/me");
  /* console.log(response); */

  return {
    props: {},
  };
});
