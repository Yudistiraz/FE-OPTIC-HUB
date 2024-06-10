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
    byRole: "ROLE",
  },
  button: {
    add: "Add",
    update: "Update",
    delete: "Delete",
    cancel: "Cancel",
    yes: "YES",
    no: "NO",
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
    roleOptions: [
      {
        label: "Owner",
        value: "owner",
      },
      {
        label: "Staff",
        value: "staff",
      },
    ],
    allRole: "All Role",
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
  form: {
    productForm: {
      name: {
        label: "PRODUCT NAME",
        placeHolder: "Input Product Name",
      },
      price: {
        label: "PRODUCT PRICE",
        placeHolder: "Input Product Price",
      },
      stock: {
        label: "PRODUCT STOCK",
        placeHolder: "Input Product Stock",
      },
      category: {
        label: "PRODUCT CATEGORY",
        placeHolder: "Choose Product Category",
      },
      status: {
        label: "PRODUCT STATUS",
        placeHolder: "Input Product Status",
      },
    },
    employeeForm: {
      name: {
        label: "EMPLOYEE NAME",
        placeHolder: "Input Employee Name",
      },
      dob: {
        label: "EMPLOYEE DOB",
        placeHolder: "Input Employee DOB",
      },
      phoneNumber: {
        label: "EMPLOYEE PHONE NUMBER",
        placeHolder: "Input Employee Phone Number",
      },
      nik: {
        label: "EMPLOYEE NIK NUMBER",
        placeHolder: "Input Employee NIK Number",
      },
      email: {
        label: "EMPLOYEE EMAIL",
        placeHolder: "Input Employee Email",
      },
      password: {
        label: "EMPLOYEE PASSWORD",
        placeHolder: "Input Employee Password",
      },
      newPassword: {
        label: "EMPLOYEE NEW PASSWORD",
        placeHolder: "Input Employee New Password",
      },
      role: {
        label: "EMPLOYEE ROLE",
        placeHolder: "Input Employee Role",
      },
      status: {
        label: "EMPLOYEE STATUS",
        placeHolder: "Input Employee Status",
      },
    },
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
    createHeader: "Create Product",
    productTable: {
      c1: "PRODUCT NAME",
      c2: "CATEGORY",
      c3: "PRICE",
      c4: "STOCK",
      c5: "STATUS",
    },
  },
  EmployeePage: {
    item: "Employee",
    header: "Manage Employee",
    createHeader: "Add Employee",
    employeeTable: {
      c1: "EMPLOYEE NAME",
      c2: "EMAIL",
      c3: "PHONE NUMBER",
      c4: "ROLE",
      c5: "STATUS",
    },
  },
};
