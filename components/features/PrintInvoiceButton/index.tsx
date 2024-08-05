import CustomButton from "@/components/ui/Button";
import React, { Fragment, useRef } from "react";
import ReactToPrint from "react-to-print";
import InvoiceComponent from "@/components/features/InvoiceComponent";
import { TTransaction } from "@/utils/models";
import { useLanguage } from "@/context/Language";

interface PrintInvoiceButtonProps {
  data?: TTransaction;
}

export default function PrintInvoiceButton({ data }: PrintInvoiceButtonProps) {
  const { translations } = useLanguage();
  const componentRef = useRef<HTMLDivElement>(null);
  return (
    <Fragment>
      <ReactToPrint
        trigger={() => (
          <CustomButton type="button" className="tw-w-1/4">
            {translations?.button?.printIvoice}
          </CustomButton>
        )}
        content={() => componentRef.current}
        pageStyle={`
  @page { 
    margin: 0; 
    size: A4; 
  }
  @media print { 
    body { 
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`}
      />
      <div className="tw-hidden">
        <InvoiceComponent ref={componentRef} data={data} />
      </div>
    </Fragment>
  );
}
