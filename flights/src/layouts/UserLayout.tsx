import type { FC } from "react";
import { Navbar } from "../ui/components";

interface Props {
  children?: React.ReactNode;
  withContainer?: boolean;
}

export const UserLayout: FC<Props> = ({ children, withContainer = false }) => {
  return (
    <div className="bg-slate-100 min-h-screen">
      <Navbar />
      <main
        className={
          withContainer ? "container mt-14 mx-auto max-w-7xl px-6 pt-9" : ""
        }
      >
        {children}
      </main>
    </div>
  );
};
