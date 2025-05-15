import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import type { SnackbarProps } from "@mui/material/Snackbar";
import { NotificationsContext } from "./NotificationsContext";

export interface NotificationsProviderProps {
  children?: React.ReactNode;
  notificationProps?: SnackbarProps;
}

const NotificationsProvider = ({
  children,
  notificationProps,
}: NotificationsProviderProps) => {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const showNotification = (message: string) => {
    setMessage(message);
    setOpen(true);
  };

  return (
    <NotificationsContext.Provider value={{ showNotification }}>
      {children}

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message={message}
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        {...notificationProps}
      />
    </NotificationsContext.Provider>
  );
};

export { NotificationsProvider };
