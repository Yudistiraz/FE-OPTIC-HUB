export const t = {
  siteMaps: {
    staff: [
      {
        name: "Dashboard",
        path: "/",
        img: "dashboard",
      },
      {
        name: "Manage Product",
        path: "/product",
        img: "product",
      },
      {
        name: "Manage Transactions",
        path: "/transaction",
        img: "transaction",
      },
      {
        name: "Setting",
        path: "/setting",
        img: "setting",
      },
    ],
    owner: [
      {
        name: "Dashboard",
        path: "/",
        img: "dashboard",
      },
      {
        name: "Manage Product",
        path: "/product",
        img: "product",
      },
      {
        name: "Manage Employee",
        path: "/employee",
        img: "employee",
      },
      {
        name: "Manage Transactions",
        path: "/transaction",
        img: "transaction",
      },
      {
        name: "Setting",
        path: "/setting",
        img: "setting",
      },
    ],
    createTransaction: "Add Transaction",
  },
  searchBar: "Search",
  filter: {
    main: "FILTER BY",
    byStatus: "STATUS",
    byCategory: "CATEGORY",
  },
  button: {
    add: "Add",
    update: "Update",
    delete: "Delete",
    cancel: "Cancel",
    yes: "Yes",
    no: "No",
  },
  dropdownOptions: {
    allStatus: "All Status",
    statusOptions: [
      {
        label: "Active",
        value: "active",
      },
      {
        label: "Inactive",
        value: "inactive",
      },
    ],
    allCategory: "All Category",
  },
  toast: {
    error: {
      create: "Error While Creating",
      update: "Error While Updating",
      delete: "Error While Deleting",
    },
    success: {
      create: "Successfully Created",
      update: "Successfully Updated",
      delete: "Successfully Deleted",
    },
  },
  headerNavbar: {
    logOut: "Logout",
  },
  badgeText: {
    active: "Active",
    inactive: "Inactive",
  },
  dialogBox: {
    deleteConfirmation: "Are You Sure Want to Delete",
  },

  Dashboard: {
    GraphSalesHeader: "Sales Graph",
    BestSellerHeader: "Best Seller Product",
    LowStockHeader: "Low Stock Product",
    GraphOptions: {
      weekly: "Weekly",
      monthly: "Monthly",
      yearly: "Yearly",
    },
    BestSellerTable: {
      c1: "PRODUCT NAME",
      c2: "TOTAL SOLD",
    },
    LowStockTable: {
      c1: "PRODUCT NAME",
      c2: "STOCK LEFT",
    },
  },
  productPage: {
    item: "Product",
    header: "Manage Product",
    productTable: {
      c1: "PRODUCT NAME",
      c2: "CATEGORY",
      c3: "PRICE",
      c4: "STOCK",
      c5: "STATUS",
    },
  },
};
