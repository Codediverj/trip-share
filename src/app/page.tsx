// "use client";

// import dynamic from "next/dynamic";
import { useEffect } from "react";
import { TestComp } from "./testComp";

const RootPage = () => {
  const now = +new Date();

  return (
    <>
      {/* <TestComp date={now} /> */}
      {/*now*/}
    </>
  );
};

// export default dynamic(() => Promise.resolve(RootPage), { ssr: false });
export default RootPage;
// export const dynamic = "force-dynamic";
