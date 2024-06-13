export const STAFF_SITEMAPS = [
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
    name: "Transaction",
    path: "/transaction",
    img: "transaction",
  },
  {
    name: "Setting",
    path: "/setting",
    img: "setting",
  },
];

export const OWNER_SITEMAPS = [
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
    name: "Transaction",
    path: "/transaction",
    img: "transaction",
  },
  {
    name: "Setting",
    path: "/setting",
    img: "setting",
  },
];

export const DUMMY_SELECT = [
  {
    id: "1",
    label: "Option 1",
    value: "Option 1",
  },
  {
    id: "2",
    label: "Option 2",
    value: "Option 2",
  },
];

export const DUMMY_SELECT_OPTIONS = [
  {
    id: "1",
    name: "Option 1",
    label: "Option 1",
  },
  {
    id: "2",
    name: "Option 2",
    label: "Option 2",
  },
];

export const STATUS_OPTIONS = [
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Inactive",
    value: "inactive",
  },
];

export const TRANSACTION_STATUS_OPTIONS = [
  {
    label: "Completed",
    value: "complete",
  },
  {
    label: "Ongoing",
    value: "onGoing",
  },
  {
    label: "Cancelled",
    value: "cancel",
  },
];

export const LANGUAGE_OPTIONS = [
  {
    id: "id",
    name: "Indonesia",
    img: "/assets/icons/id.svg",
  },
  {
    id: "en",
    name: "English",
    img: "/assets/icons/en.svg",
  },
];

export const CREATE_TRANSACTION_STATUS_OPTIONS = [
  {
    label: "Completed",
    value: "complete",
  },
  {
    label: "Ongoing",
    value: "onGoing",
  },
];

export const PAYMENT_METHOD_OPTIONS = [
  {
    label: "Cash",
    value: "cash",
  },
  {
    label: "QRIS",
    value: "qris",
  },
  {
    label: "Debit Card",
    value: "debit",
  },
  {
    label: "Credit Card",
    value: "credit_card",
  },
];

export const EMPLOYEE_OPTIONS = [
  {
    label: "Owner",
    value: "owner",
  },
  {
    label: "Staff",
    value: "staff",
  },
];

export const DAY_HOURS_OPTIONS = [
  { label: "Days", value: "days" },
  { label: "Hours", value: "hours" },
];

export const DAILY_WEEKLY_OPTIONS = [
  { label: "Daily", value: "days" },
  { label: "Weekly", value: "weeks" },
];

export const SCHEDULE_STATUS_OPTIONS = [
  { label: "Upcoming", value: "upcoming" },
  { label: "Finished", value: "finished" },
  { label: "Cancelled", value: "cancelled" },
];

export const PHONE_PREFIX = [
  { label: "Indonesia", value: "+62" },
  { label: "Brunei Darussalam", value: "+673" },
  { label: "Cambodia", value: "+855" },
  { label: "Laos", value: "+856" },
  { label: "Malaysia", value: "+60" },
  { label: "Myanmar (Burma)", value: "+95" },
  { label: "Philippines", value: "+63" },
  { label: "Singapore", value: "+65" },
  { label: "Thailand", value: "+66" },
  { label: "Vietnam", value: "+84" },
];

export const STATUS_CLASSES_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

export const DUMMY_EMPLOYEE = [
  {
    id: "ID0",
    dob: "10/9/2006",
    name: "Employee 0",
    email: "employee0@example.com",
    password: "password0",
    phoneNumber: "1234567890",
    status: true,
    role: "staff",
  },
  {
    id: "ID1",
    dob: "8/27/1998",
    name: "Employee 1",
    email: "employee1@example.com",
    password: "password1",
    phoneNumber: "1234567891",
    status: false,
    role: "staff",
  },
  {
    id: "ID2",
    dob: "7/19/1990",
    name: "Employee 2",
    email: "employee2@example.com",
    password: "password2",
    phoneNumber: "1234567892",
    status: true,
    role: "staff",
  },
  {
    id: "ID3",
    dob: "11/29/2005",
    name: "Employee 3",
    email: "employee3@example.com",
    password: "password3",
    phoneNumber: "1234567893",
    status: false,
    role: "staff",
  },
  {
    id: "ID4",
    dob: "8/15/1986",
    name: "Employee 4",
    email: "employee4@example.com",
    password: "password4",
    phoneNumber: "1234567894",
    status: true,
    role: "staff",
  },
  {
    id: "ID5",
    dob: "4/28/1978",
    name: "Employee 5",
    email: "employee5@example.com",
    password: "password5",
    phoneNumber: "1234567895",
    status: false,
    role: "owner",
  },
  {
    id: "ID6",
    dob: "9/7/1984",
    name: "Employee 6",
    email: "employee6@example.com",
    password: "password6",
    phoneNumber: "1234567896",
    status: true,
    role: "owner",
  },
  {
    id: "ID7",
    dob: "2/10/1987",
    name: "Employee 7",
    email: "employee7@example.com",
    password: "password7",
    phoneNumber: "1234567897",
    status: false,
    role: "owner",
  },
  {
    id: "ID8",
    dob: "11/20/1985",
    name: "Employee 8",
    email: "employee8@example.com",
    password: "password8",
    phoneNumber: "1234567898",
    status: true,
    role: "owner",
  },
  {
    id: "ID9",
    dob: "11/4/1999",
    name: "Employee 9",
    email: "employee9@example.com",
    password: "password9",
    phoneNumber: "1234567899",
    status: false,
    role: "owner",
  },
];

export const DUMMY_PRODUCT = [
  {
    id: "e8b808a2-51eb-4190-9474-d9af3ff66d8d",
    createdAt: "2024-04-08T23:11:58.205Z",
    updatedAt: "2024-04-08T23:11:58.205Z",
    deletedAt: null,
    name: "Frame A",
    priceBeforeTax: 270271,
    tax: 29729,
    price: 300000,
    status: true,
    quantity: 10,
    imageUrl: "testing.png",
    category: {
      id: "e5a26efb-c991-46a9-a1fd-2f0935fcee19",
      createdAt: "2024-04-05T22:36:44.893Z",
      updatedAt: "2024-04-05T22:36:44.893Z",
      deletedAt: null,
      name: "frame",
    },
    categoryId: "e5a26efb-c991-46a9-a1fd-2f0935fcee19",
  },
  {
    id: "9f56cfad-fa4c-4c33-b91b-b8d31526b72f",
    createdAt: "2024-04-08T23:11:58.205Z",
    updatedAt: "2024-04-08T23:11:58.205Z",
    deletedAt: null,
    name: "Frame D",
    priceBeforeTax: 270271,
    tax: 29729,
    price: 300000,
    status: true,
    quantity: 10,
    imageUrl: "testing.png",
    category: {
      id: "e5a26efb-c991-46a9-a1fd-2f0935fcee19",
      createdAt: "2024-04-05T22:36:44.893Z",
      updatedAt: "2024-04-05T22:36:44.893Z",
      deletedAt: null,
      name: "frame",
    },
    categoryId: "e5a26efb-c991-46a9-a1fd-2f0935fcee19",
  },
  {
    id: "d522a795-7988-4aa1-b331-8f101d7b7114",
    createdAt: "2024-04-08T23:11:58.205Z",
    updatedAt: "2024-04-08T23:11:58.205Z",
    deletedAt: null,
    name: "Frame E",
    priceBeforeTax: 270271,
    tax: 29729,
    price: 300000,
    status: true,
    quantity: 10,
    imageUrl: "testing.png",
    category: {
      id: "e5a26efb-c991-46a9-a1fd-2f0935fcee19",
      createdAt: "2024-04-05T22:36:44.893Z",
      updatedAt: "2024-04-05T22:36:44.893Z",
      deletedAt: null,
      name: "frame",
    },
    categoryId: "e5a26efb-c991-46a9-a1fd-2f0935fcee19",
  },
  {
    id: "aa1a33d9-4d0e-4319-8c90-d1e7afaf4cc3",
    createdAt: "2024-04-08T23:11:58.205Z",
    updatedAt: "2024-04-08T23:11:58.205Z",
    deletedAt: null,
    name: "Frame F",
    priceBeforeTax: 270271,
    tax: 29729,
    price: 300000,
    status: true,
    quantity: 10,
    imageUrl: "testing.png",
    category: {
      id: "e5a26efb-c991-46a9-a1fd-2f0935fcee19",
      createdAt: "2024-04-05T22:36:44.893Z",
      updatedAt: "2024-04-05T22:36:44.893Z",
      deletedAt: null,
      name: "frame",
    },
    categoryId: "e5a26efb-c991-46a9-a1fd-2f0935fcee19",
  },
  {
    id: "83d18b9f-f9c4-47f7-85f2-86f6b0dd4dd2",
    createdAt: "2024-04-08T23:11:58.205Z",
    updatedAt: "2024-04-08T23:11:58.205Z",
    deletedAt: null,
    name: "Frame G",
    priceBeforeTax: 270271,
    tax: 29729,
    price: 300000,
    status: true,
    quantity: 10,
    imageUrl: "testing.png",
    category: {
      id: "e5a26efb-c991-46a9-a1fd-2f0935fcee19",
      createdAt: "2024-04-05T22:36:44.893Z",
      updatedAt: "2024-04-05T22:36:44.893Z",
      deletedAt: null,
      name: "frame",
    },
    categoryId: "e5a26efb-c991-46a9-a1fd-2f0935fcee19",
  },
  {
    id: "0df8476e-0a79-4d3e-8df5-d6f5ee7d3f11",
    createdAt: "2024-04-08T23:11:58.205Z",
    updatedAt: "2024-04-08T23:11:58.205Z",
    deletedAt: null,
    name: "Frame H",
    priceBeforeTax: 270271,
    tax: 29729,
    price: 300000,
    status: true,
    quantity: 10,
    imageUrl: "testing.png",
    category: {
      id: "e5a26efb-c991-46a9-a1fd-2f0935fcee19",
      createdAt: "2024-04-05T22:36:44.893Z",
      updatedAt: "2024-04-05T22:36:44.893Z",
      deletedAt: null,
      name: "frame",
    },
    categoryId: "e5a26efb-c991-46a9-a1fd-2f0935fcee19",
  },
  {
    id: "3e99239a-9b07-4cf4-b3ab-41c6214ff862",
    createdAt: "2024-04-08T23:11:58.205Z",
    updatedAt: "2024-04-08T23:11:58.205Z",
    deletedAt: null,
    name: "Frame I",
    priceBeforeTax: 270271,
    tax: 29729,
    price: 300000,
    status: true,
    quantity: 10,
    imageUrl: "testing.png",
    category: {
      id: "e5a26efb-c991-46a9-a1fd-2f0935fcee19",
      createdAt: "2024-04-05T22:36:44.893Z",
      updatedAt: "2024-04-05T22:36:44.893Z",
      deletedAt: null,
      name: "frame",
    },
    categoryId: "e5a26efb-c991-46a9-a1fd-2f0935fcee19",
  },
  {
    id: "b25d6cb7-8ef6-49bc-ae0f-e1c967d19be0",
    createdAt: "2024-04-08T23:11:58.205Z",
    updatedAt: "2024-04-08T23:11:58.205Z",
    deletedAt: null,
    name: "Frame B",
    priceBeforeTax: 270271,
    tax: 29729,
    price: 300000,
    status: true,
    quantity: 10,
    imageUrl: "testing.png",
    category: {
      id: "e5a26efb-c991-46a9-a1fd-2f0935fcee19",
      createdAt: "2024-04-05T22:36:44.893Z",
      updatedAt: "2024-04-05T22:36:44.893Z",
      deletedAt: null,
      name: "frame",
    },
    categoryId: "e5a26efb-c991-46a9-a1fd-2f0935fcee19",
  },
  {
    id: "9b0cb1cc-e6d1-4989-b7b5-2c7848a94a8e",
    createdAt: "2024-04-08T23:11:58.205Z",
    updatedAt: "2024-04-08T23:11:58.205Z",
    deletedAt: null,
    name: "Frame C",
    priceBeforeTax: 270271,
    tax: 29729,
    price: 300000,
    status: true,
    quantity: 10,
    imageUrl: "testing.png",
    category: {
      id: "e5a26efb-c991-46a9-a1fd-2f0935fcee19",
      createdAt: "2024-04-05T22:36:44.893Z",
      updatedAt: "2024-04-05T22:36:44.893Z",
      deletedAt: null,
      name: "frame",
    },
    categoryId: "e5a26efb-c991-46a9-a1fd-2f0935fcee19",
  },
];
