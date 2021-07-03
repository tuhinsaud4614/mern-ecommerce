type TKeys = "dashboard";

interface IObj {
  name: string;
  path: string;
}

const routes: { [key in TKeys]: IObj } = {
  dashboard: {
    name: "Dashboard",
    path: "/",
  },
};

export default routes;
