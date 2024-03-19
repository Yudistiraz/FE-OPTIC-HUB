import ImageLoader from "@/components/ui/ImageLoader";
import type { Metadata } from "next";

// import BottomMenu from '@/component/layouts/BottomMenu'
// import Footer from '@/component/layouts/Footer'
// import Header from '@/component/layouts/Header'

export const metadata: Metadata = {
  title: "Optic Hub App",
  description: "Optic Hub",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="tw-w-screen tw-h-[100svh] lg:tw-h-screen tw-flex">
      <div className="tw-w-1/2 tw-bg-[#457DFF] tw-flex tw-justify-center tw-items-center">
        <div className="tw-w-1/3">
          <ImageLoader src="/logo-big.png" />
        </div>
      </div>
      {children}
    </div>
  );
}
