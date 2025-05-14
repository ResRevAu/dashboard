import dynamic from "next/dynamic";
import React from "react";

const NoSSR = (props: { children: React.ReactNode }) => <>{props.children}</>;
export default dynamic(() => Promise.resolve(NoSSR), { ssr: false }); 