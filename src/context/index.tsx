import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";
export const AppProviders = ({ children }: { children: ReactNode }) => {
    console.log('打印下children',children)
    return (
            <AuthProvider>{children}</AuthProvider>
    );
};
