import { requireRole } from "@/lib/core/session";
import React from "react";

const SeekerLayout = async ({ children }) => {
  await requireRole("seeker");
  return <div>{children}</div>;
};

export default SeekerLayout;
