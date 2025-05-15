import { createContext } from "react";

export interface NotificationsContextType {
  showNotification: (message: string) => void;
}

export const NotificationsContext =
  createContext<NotificationsContextType | null>(null);
