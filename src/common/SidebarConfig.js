export const adminLinks = [
  {
    title: "Home",
    path: "/",
    access: ["admin"],
  },
  {
    title: "Products",
    path: "/products",
    subLinks: [
      {
        title: "View Products",
        path: "/products",
        access: ["admin"],
      },
      {
        title: "Add Products",
        path: "/add-products",
        access: ["admin"],
      },
    ],
    access: ["admin"],
  },
  {
    title: "Orders",
    path: "/orders",
    access: ["admin"],
  },
  {
    title: "Coupons",
    path: "/coupons",
    subLinks: [
      {
        title: "View Coupons",
        path: "/coupons",
        access: ["admin"],
      },
      {
        title: "Add Coupons",
        path: "/add-coupons",
        access: ["admin"],
      },
    ],
    access: ["admin"],
  },
  {
    title: "Master",
    path: "/master",
    subLinks: [
      {
        title: "Color",
        path: "/color",
        subLinks: [
          {
            title: "View Colors",
            path: "/color/view-colors",
            access: ["admin"],
          },
          {
            title: "Add Color",
            path: "/color/add-color",
            access: ["admin"],
          },
        ],
        access: ["admin"],
      },
      {
        title: "Design Type",
        path: "/design-type",
        subLinks: [
          {
            title: "View Design Types",
            path: "/design-type/view-design-types",
            access: ["admin"],
          },
          {
            title: "Add Design Type",
            path: "/design-type/add-design-type",
            access: ["admin"],
          },
        ],
        access: ["admin"],
      },
    ],
    access: ["admin"],
  },
];
