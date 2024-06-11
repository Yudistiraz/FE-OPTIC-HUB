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
    byTransactionStatus: "TRANSACTION STATUS",
    byStartDate: "START DATE",
    byEndDate: "END DATE",
  },
  button: {
    add: "Add",
    update: "Update",
    delete: "Delete",
    cancel: "Cancel",
    yes: "YES",
    no: "NO",
    updatePassword: "Update Password",
    printIvoice: "Print Invoice",
    signIn: "Sign In",
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
    transactionStatusOptions: [
      {
        label: "Completed",
        value: "complete",
      },
      {
        label: "Ongoing",
        value: "onGoing",
      },
      {
        label: "Canceled",
        value: "cancel",
      },
    ],
    createTransactionStatusOptions: [
      {
        label: "Completed",
        value: "complete",
      },
      {
        label: "Ongoing",
        value: "onGoing",
      },
    ],
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
    changePasswordForm: {
      old: {
        label: "OLD PASSWORD",
        placeHolder: "Input Old Password",
      },
      new: {
        label: "NEW PASSWORD",
        placeHolder: "Input New Password",
      },
      confirmation: {
        label: "CONFIRMATION PASSWORD",
        placeHolder: "Input Confirmation Password",
      },
    },
    transactionForm: {
      employeeId: {
        label: "EMPLOYEE ID",
      },
      employeeName: {
        label: "EMPLOYEE NAME",
      },
      customerDetail: {
        label: "Customer's Detail",
      },
      customerName: {
        label: "CUSTOMER NAME",
        placeHolder: "Input Customer Name",
      },
      customerEmail: {
        label: "CUSTOMER EMAIL",
        placeHolder: "Input Customer Email",
      },
      customerPhone: {
        label: "CUSTOMER PHONE NUMBER",
        placeHolder: "Input Customer Phone Number",
      },
      transactionDetail: {
        label: "Transaction's Detail",
      },
      paymentMethod: {
        label: "PAYMENT METHOD",
        placeHolder: "Choose Payment Method",
      },
      withPrescription: {
        label: "WITH PRESCRIPTIONS?",
      },
      totalCost: {
        label: "Total Cost",
      },
      status: {
        label: "TRANSACTION STATUS",
        placeHolder: "Choose Transaction Status",
      },
    },
  },
  ProductSearchBar: "Search Product",
  ProductOverview: {
    zeroMessage: "There's No Product on This Transaction",
  },

  validation: {
    signIn: {
      email: {
        v1: "Email is Invalid",
        v2: "Email is Required",
      },
      password: "Password is Required",
    },
    product: {
      name: "Product Name is Required",
      categoryId: "Product Category is Required",
      imageUrl: "Product Image is Required",
      price: "Product Price is Required",
      quantity: "Product Stock is Required",
    },
    employee: {
      name: "Employee Name is Required",
      dob: "Employee Date of Birth is Required",
      phone_number: {
        v1: "Employee Phone Number is Required",
        v2: "Employee Phone Number Must Be At Least 10 Characters",
        v3: "Employee Phone Number Maximum is 12 Characters",
        v4: "Employee Phone Number Must Be Begins With 8",
      },
      email: "Employee Email is Required",
      password: "Employee Password is Required",
      role: "Employee Role is Required",
      nik: {
        v1: "Employee NIK is Required",
        v2: "Employee NIK Must Be 16 Characters",
      },
    },
    changePassword: {
      oldPassword: "Old Password is Required",
      newPassword: "New Password is Required",
      confirmPassword: {
        v1: "Confirmation Password is Required",
        v2: "Confirm Password must match with New Password",
      },
    },
    transaction: {
      userId: "Employee ID is Required",
      userName: "Employee Name is Required",
      customerName: "Customer Name is Required",
      customerPhone: "Customer Phone is Required",
      customerEmail: "Customer Email is Required",
      paymentMethod: "Payment Method is Required",
      orderItem: "Item is Required",
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
  settingPage: {
    header: "Settings",
    itemPassword: "Password",
    languageHeader: "Application Language",
    passWorHeader: "Account Password",
  },
  transactionPage: {
    item: "Transaction",
    header: "Manage Transaction",
    createHeader: "Add Transaction",
    transactionTable: {
      c1: "EMPLOYEE NAME",
      c2: "CUSTOMER NAME",
      c3: "PAYMENT METHOD",
      c4: "STATUS",
      c5: "TOTAL TRANSACTION",
      c6: "TRANSACTION DATE",
    },
  },
  signInPage: {
    header: "Sign In To Your Account",
  },
};
