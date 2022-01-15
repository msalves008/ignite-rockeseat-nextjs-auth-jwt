import { ReactNode } from "react";
import { useCan } from "../hooks/useCan";

interface canProps {
  children: ReactNode;
  permissions?: string[];
  roles?: string[];
}

export function Can({ children, permissions, roles }: canProps) {
  const userCanSeeComponent = useCan({ permissions, roles });

  if (!userCanSeeComponent) {
    return null;
  }
  return <>{children}</>;
}
