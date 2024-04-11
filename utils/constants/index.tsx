export const SITEMAPS = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "My Account",
    path: "/profile",
  },
];

export const MOBILE_SITEMAPS = [
  {
    name: "Cart",
    path: "/shopping-cart",
  },
  {
    name: "Notification",
    path: "/notification",
  },
];

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
    value: "true",
  },
  {
    label: "Inactive",
    value: "false",
  },
];

export const TRANSACTION_STATUS_OPTIONS = [
  {
    label: "Completed",
    value: "complete",
  },
  {
    label: "Ongoing",
    value: "ongoing",
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
    id: "1",
    categoryID: "CT2",
    name: "SuperPhone X",
    price: 799,
    status: true,
    quantity: 50,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/a/a6/Sunny_Day_Real_Estate_-_Diary.jpg",
  },

  {
    id: "2",
    categoryID: "CT1",
    name: "UltraBook Y",
    price: 1299,
    status: true,
    quantity: 20,
    imageUrl: "https://example.com/laptop_y.jpg",
  },

  {
    id: "3",
    categoryID: "CT3",
    name: "Noise-Canceling Z",
    price: 199,
    status: true,
    quantity: 100,
    imageUrl: "https://example.com/headphones_z.jpg",
  },

  {
    id: "4",
    categoryID: "CT4",
    name: "FitnessTracker W",
    price: 149,
    status: true,
    quantity: 75,
    imageUrl: "https://example.com/smartwatch_w.jpg",
  },

  {
    id: "5",
    categoryID: "CT2",
    name: "Professional Camera A",
    price: 1499,
    status: true,
    quantity: 30,
    imageUrl: "https://example.com/camera_a.jpg",
  },

  {
    id: "6",
    categoryID: "CT3",
    name: "Hi-Fi Speaker B",
    price: 249,
    status: true,
    quantity: 60,
    imageUrl: "https://example.com/speaker_b.jpg",
  },

  {
    id: "7",
    categoryID: "CT1",
    name: "SuperTablet C",
    price: 599,
    status: true,
    quantity: 25,
    imageUrl: "https://example.com/tablet_c.jpg",
  },

  {
    id: "8",
    categoryID: "CT4",
    name: "Next-Gen Console D",
    price: 499,
    status: true,
    quantity: 15,
    imageUrl: "https://example.com/console_d.jpg",
  },

  {
    id: "9",
    categoryID: "CT2",
    name: "High-Speed Printer E",
    price: 299,
    status: true,
    quantity: 40,
    imageUrl: "https://example.com/printer_e.jpg",
  },

  {
    id: "10",
    categoryID: "CT3",
    name: "Terabyte Storage F",
    price: 129,
    status: true,
    quantity: 80,
    imageUrl: "https://example.com/harddrive_f.jpg",
  },
];
