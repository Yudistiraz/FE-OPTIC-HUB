export const t = {
  siteMaps: {
    staff: [
      {
        name: "Dasbor",
        path: "/",
        img: "dashboard",
      },
      {
        name: "Manajemen Produk",
        path: "/product",
        img: "product",
      },
      {
        name: "Manajemen Transaksi",
        path: "/transaction",
        img: "transaction",
      },
      {
        name: "Pengaturan",
        path: "/setting",
        img: "setting",
      },
    ],
    owner: [
      {
        name: "Dasbor",
        path: "/",
        img: "dashboard",
      },
      {
        name: "Manajemen Produk",
        path: "/product",
        img: "product",
      },
      {
        name: "Manajemen Pekerja",
        path: "/employee",
        img: "employee",
      },
      {
        name: "Manajemen Transaksi",
        path: "/transaction",
        img: "transaction",
      },
      {
        name: "Pengaturan",
        path: "/setting",
        img: "setting",
      },
    ],
    createTransaction: "Tambah Transaksi",
  },
  searchBar: "Cari",
  filter: {
    main: "FILTER BERDASARKAN",
    byStatus: "STATUS",
    byCategory: "KATEGORI",
  },
  button: {
    add: "Tambah",
    update: "Perbarui",
    delete: "Hapus",
    cancel: "Batal",
    yes: "YA",
    no: "TIDAK",
  },
  dropdownOptions: {
    allStatus: "Semua Status",
    statusOptions: [
      {
        label: "Aktif",
        value: "active",
      },
      {
        label: "Tidak Aktif",
        value: "inactive",
      },
    ],
    allCategory: "Semua Kategori",
  },
  toast: {
    error: {
      create: "Terjadi Kesalahan Saat Menambahkan",
      update: "Terjadi Kesalahan Saat Memperbarui",
      delete: "Terjadi Kesalahan Saat Menghapus",
    },
    success: {
      create: "Berhasil Menambahkan",
      update: "Berhasil Memperbarui",
      delete: "Berhasil Menghapus",
    },
  },
  headerNavbar: {
    logOut: "Logout",
  },
  badgeText: {
    active: "Aktif",
    inactive: "Tidak Aktif",
  },
  dialogBox: {
    deleteConfirmation: "Apakah Anda Yakin Ingin Menghapus",
  },
  form: {
    productForm: {
      name: {
        label: "NAMA PRODUK",
        placeHolder: "Masukkan Nama Produk",
      },
      price: {
        label: "HARGA PRODUK",
        placeHolder: "Masukkan Harga Produk",
      },
      stock: {
        label: "STOK PRODUK",
        placeHolder: "Masukkan Stok Produk",
      },
      category: {
        label: "KATEGORI PRODUK",
        placeHolder: "Pilih Kategori Produk",
      },
      status: {
        label: "STATUS PRODUK",
        placeHolder: "Masukkan Status Produk",
      },
    },
  },

  Dashboard: {
    GraphSalesHeader: "Grafik Penjualan",
    BestSellerHeader: "Produk Paling Laku",
    LowStockHeader: "Produk Hampir Habis",
    GraphOptions: {
      weekly: "Mingguan",
      monthly: "Bulanan",
      yearly: "Tahunan",
    },
    BestSellerTable: {
      c1: "NAMA PRODUK",
      c2: "TOTAL TERJUAL",
    },
    LowStockTable: {
      c1: "NAMA PRODUK",
      c2: "STOK TERSISA",
    },
  },
  productPage: {
    item: "Produk",
    header: "Manajemen Produk",
    createHeader: "Tambah Produk",
    productTable: {
      c1: "NAMA PRODUK",
      c2: "KATEGORI",
      c3: "HARGA",
      c4: "STOK TERSISA",
      c5: "STATUS",
    },
  },
};
