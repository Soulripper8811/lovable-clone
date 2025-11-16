import React from "react";

const Page = () => {
  console.log(process.env.DATABASE_URL);
  return <div>Hello world</div>;
};

export default Page;
