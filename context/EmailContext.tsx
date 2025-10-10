"use client";

import { createContext, useContext, useState } from "react";

type EmailContextType = {
  email: string;
  setEmail: (email: string) => void;
};

const EmailContext = createContext<EmailContextType | undefined>(undefined);

export function EmailProvider({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState("");
  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
}

export function useEmail() {
  const context = useContext(EmailContext);
  if (!context) {
    throw new Error("useEmail must be used within an EmailProvider");
  }
  return context;
}