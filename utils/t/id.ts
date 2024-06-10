import ProductSearchBar from "@/components/features/ProductSearchBar";

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
        name: "Manajemen Pegawai",
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
    byRole: "JABATAN",
    byTransactionStatus: "STATUS TRANSAKSI",
    byStartDate: "TANGGAL AWAL",
    byEndDate: "TANGGAL AKHIR",
  },
  button: {
    add: "Tambah",
    update: "Perbarui",
    delete: "Hapus",
    cancel: "Batal",
    yes: "YA",
    no: "TIDAK",
    updatePassword: "Ubah Password",
    printIvoice: "Cetak Invoice",
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
    roleOptions: [
      {
        label: "Pemilik",
        value: "owner",
      },
      {
        label: "Staff",
        value: "staff",
      },
    ],
    allRole: "Semua Jabatan",
    transactionStatusOptions: [
      {
        label: "Selesai",
        value: "complete",
      },
      {
        label: "Diproses",
        value: "onGoing",
      },
      {
        label: "Dibatalkan",
        value: "cancel",
      },
    ],
    createTransactionStatusOptions: [
      {
        label: "Selesai",
        value: "complete",
      },
      {
        label: "Diproses",
        value: "onGoing",
      },
    ],
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
    logOut: "Keluar",
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
    employeeForm: {
      name: {
        label: "NAMA PEGAWAI",
        placeHolder: "Masukkan Nama Pegawai",
      },
      dob: {
        label: "TANGGAL LAHIR PEGAWAI",
        placeHolder: "Masukkan Tanggal Lahir Pegawai",
      },
      phoneNumber: {
        label: "NO. TELEPON PEGAWAI",
        placeHolder: "Masukkan No. Telepon Pegawai",
      },
      nik: {
        label: "NIK PEGAWAI",
        placeHolder: "Masukkan NIK Pegawai",
      },
      email: {
        label: "EMAIL PEGAWAI",
        placeHolder: "Masukkan Email Pegawai",
      },
      password: {
        label: "PASSWORD PEGAWAI",
        placeHolder: "Masukkan Password Pegawai",
      },
      newPassword: {
        label: "PASSWORD BARU PEGAWAI",
        placeHolder: "Masukkan Password Baru Pegawai",
      },
      role: {
        label: "JABATAN PEGAWAI",
        placeHolder: "Masukkan Jabatan Pegawai",
      },
      status: {
        label: "STATUS PEGAWAI",
        placeHolder: "Masukkan Status Pegawai",
      },
    },
    changePasswordForm: {
      old: {
        label: "PASSWORD LAMA",
        placeHolder: "Masukkan Password Lama",
      },
      new: {
        label: "PASSWORD BARU",
        placeHolder: "Masukkan Password Baru",
      },
      confirmation: {
        label: "PASSWORD KONFIRMASI",
        placeHolder: "Masukkan Password Konfirmasi",
      },
    },
    transactionForm: {
      employeeId: {
        label: "ID PEGAWAI",
      },
      employeeName: {
        label: "NAMA PEGAWAI",
      },
      customerDetail: {
        label: "Detail Pelanggan",
      },
      customerName: {
        label: "NAMA PELANGGAN",
        placeHolder: "Masukkan Nama Pelanggan",
      },
      customerEmail: {
        label: "EMAIL PELANGGAN",
        placeHolder: "Masukkan Email Pelanggan",
      },
      customerPhone: {
        label: "NO. TELEPON PELANGGAN",
        placeHolder: "Masukkan No. Telepon Pelanggan",
      },
      transactionDetail: {
        label: "Detail Transaksi",
      },
      paymentMethod: {
        label: "METODE PEMBAYARAN",
        placeHolder: "Pilih Metode Pembayaran",
      },
      withPrescription: {
        label: "DENGAN PRESKRIPSI DOKTER?",
      },
      totalCost: {
        label: "Total Harga",
      },
      status: {
        label: "STATUS TRANSAKSI",
        placeHolder: "Pilih Status Transaksi",
      },
    },
  },
  ProductSearchBar: "Cari Produk",
  ProductOverview: {
    zeroMessage: "Tidak Ada Produk Dalam Transaksi Ini",
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
  EmployeePage: {
    item: "Pegawai",
    header: "Manajemen Pegawai",
    createHeader: "Tambah Pegawai",
    employeeTable: {
      c1: "NAMA PEGAWAI",
      c2: "EMAIL",
      c3: "NO. TELEPON",
      c4: "JABATAN",
      c5: "STATUS",
    },
  },
  settingPage: {
    header: "Pengaturan",
    itemPassword: "Password",
  },
  transactionPage: {
    item: "Transaksi",
    header: "Manajemen Transaksi",
    createHeader: "Tambah Transaksi",
    transactionTable: {
      c1: "NAMA PEGAWAI",
      c2: "NAMA PELANGGAN",
      c3: "METODE PEMBAYARAN",
      c4: "STATUS",
      c5: "TOTAL TRANSAKSI",
      c6: "TANGGAL TRANSAKSI",
    },
  },
};
