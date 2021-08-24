type TKeys =
  | "dashboard"
  | "category"
  | "subCategory"
  | "product"
  | "addProduct"
  | "order"
  | "customer";

export interface IRoute {
  name: string;
  path: string;
}

const routes: { [key in TKeys]: IRoute } = {
  dashboard: {
    name: "Dashboard",
    path: "/",
  },
  category: {
    name: "Category",
    path: "/category",
  },
  subCategory: {
    name: "Sub Category",
    path: "/sub-category",
  },
  product: {
    name: "Product",
    path: "/product",
  },
  addProduct: {
    name: "Add Product",
    path: "/add-product",
  },
  order: {
    name: "Order",
    path: "/order",
  },
  customer: {
    name: "Customer",
    path: "/customer",
  },
};

export default routes;
