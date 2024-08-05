import React, { forwardRef } from "react";
import { Typography } from "@mui/material";
import { OrderItem, TTransaction } from "@/utils/models";
import { getThousandSeparator } from "@/utils/function";

interface InvoiceComponentProps {
  data?: TTransaction;
}

const InvoiceComponent = forwardRef<HTMLDivElement, InvoiceComponentProps>(
  ({ data }, ref) => {
    return (
      <div
        className="tw-w-[208mm] tw-flex tw-gap-16 tw-flex-col tw-relative tw-outline tw-outline-4 tw-mb-4 tw-pb-4"
        ref={ref}
      >
        <div className="tw-w-full tw-items-center tw-flex tw-flex-col tw-gap-2 tw-outline tw-outline-4">
          <Typography variant="h4" className="tw-uppercase">
            Optic Name
          </Typography>
          <Typography
            variant="body2"
            className="tw-uppercase tw-text-center tw-w-3/4"
          >
            Cibinong City Mall, Jl. Tegar Beriman No.1 Lt. UG Unit B2,
            Pakansari, Kec. Cibinong, Kabupaten Bogor, Jawa Barat 16916
          </Typography>
          <Typography variant="body2" className="tw-uppercase">
            +628001110202
          </Typography>
        </div>

        <div className="tw-w-full tw-flex tw-gap-16 tw-px-4 tw-flex-col">
          <div className="tw-w-full tw-flex tw-flex-col tw-gap-2">
            <div className="tw-w-full tw-grid tw-grid-cols-2 tw-items-center">
              <Typography
                variant="subtitle2Reg"
                className="tw-uppercase tw-col-span-1"
              >
                {data?.transactionDate || ""}
              </Typography>
              <Typography
                variant="subtitle2Reg"
                className="tw-uppercase tw-col-span-1 tw-ml-auto"
              >
                {data?.userName || ""}
              </Typography>
            </div>

            <div className="tw-w-full tw-grid tw-grid-cols-2 tw-items-center">
              <Typography
                variant="subtitle2Reg"
                className="tw-uppercase tw-col-span-1"
              >
                {data?.prescription?.customerName || ""}
              </Typography>
              <Typography
                variant="subtitle2Reg"
                className="tw-uppercase tw-col-span-1 tw-ml-auto"
              >
                {data?.paymentMethod || ""}
              </Typography>
            </div>

            <div className="tw-w-full tw-grid tw-grid-cols-2 tw-items-center">
              <Typography
                variant="subtitle2Reg"
                className="tw-uppercase tw-col-span-1"
              >
                Transaction ID
              </Typography>
              <Typography
                variant="subtitle2Reg"
                className="tw-uppercase tw-col-span-1 tw-ml-auto tw-text-end"
              >
                {data?.id || ""}
              </Typography>
            </div>
            <div className="tw-w-full tw-flex tw-justify-end">
              <Typography variant="subtitle2" className="tw-uppercase">
                {data?.status}
              </Typography>
            </div>
          </div>

          <div className="tw-w-full tw-flex tw-flex-col tw-gap-2">
            {data?.orderItem?.map((product: OrderItem) => (
              <div
                className="tw-w-full tw-grid tw-grid-cols-6 tw-items-center"
                key={product?.id}
              >
                <Typography
                  variant="subtitle2Reg"
                  className="tw-uppercase tw-col-span-4"
                >
                  {product?.qty} x {product?.name}
                </Typography>
                <Typography
                  variant="subtitle2Reg"
                  className="tw-uppercase tw-col-span-2 tw-ml-auto"
                >
                  Rp.{getThousandSeparator(product?.qty * product?.price)}
                </Typography>
              </div>
            ))}
          </div>

          <div className="tw-w-full tw-flex tw-flex-col tw-gap-2">
            <div className="tw-w-full tw-grid tw-grid-cols-6 tw-items-center">
              <Typography
                variant="subtitle2Reg"
                className="tw-uppercase tw-col-span-2"
              >
                HARGA JUAL
              </Typography>
              <Typography
                variant="subtitle2Reg"
                className="tw-uppercase tw-col-span-4 tw-ml-auto"
              >
                Rp.{getThousandSeparator(data?.subTotal)}
              </Typography>
            </div>
            <div className="tw-w-full tw-grid tw-grid-cols-6 tw-items-center">
              <Typography
                variant="subtitle2Reg"
                className="tw-uppercase tw-col-span-2"
              >
                PPN 10%
              </Typography>
              <Typography
                variant="subtitle2Reg"
                className="tw-uppercase tw-col-span-4 tw-ml-auto"
              >
                Rp.{getThousandSeparator(data?.tax)}
              </Typography>
            </div>
            <div className="tw-w-full tw-grid tw-grid-cols-6 tw-items-center">
              <Typography
                variant="subtitle2Reg"
                className="tw-uppercase tw-col-span-2"
              >
                TOTAL
              </Typography>
              <Typography
                variant="subtitle2Reg"
                className="tw-uppercase tw-col-span-4 tw-ml-auto"
              >
                Rp.{getThousandSeparator(data?.totalPrice)}
              </Typography>
            </div>
          </div>
        </div>

        <div className="tw-w-full tw-absolute tw-h-full tw-flex tw-flex-row tw-items-center tw-justify-center">
          <div className="tw-w-4/5 tw-object-cover">
            <img src="/assets/watermark/watermark.png" alt="" />
          </div>
        </div>
      </div>
    );
  }
);

export default InvoiceComponent;
