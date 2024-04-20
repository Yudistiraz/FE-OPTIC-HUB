"use client";

import Signinform from "@/components/form/SignInForm";

const Signin = () => {
  return (
    <div className="tw-flex tw-justify-center tw-items-center tw-w-1/2 tw-h-full tw-overflow-y-hidden">
      <div className="tw-w-2/3">
        <Signinform />
      </div>
    </div>
  );
};

export default Signin;
