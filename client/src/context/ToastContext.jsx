import {
  createContext,
  useContext,
  useState,
} from "react";

/*
  🔔 Toast context

  Global notification system used across
  the Pokédex application.
*/
const ToastContext =
  createContext();

/*
  🧠 Toast provider

  Makes toast notifications available
  throughout the app.
*/
export function ToastProvider({
  children,
}) {

  const [toast, setToast] =
    useState(null);

  /*
    ✨ Show toast notification
  */
  const showToast = (
    message,
    type = "success"
  ) => {

    setToast({
      message,
      type,
    });

    /*
      ⏳ Auto-dismiss toast
    */
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  return (
    <ToastContext.Provider
      value={{
        showToast,
      }}
    >

      {children}

      {toast && (
        <div
          className={`
            toast
            toast-${toast.type}
          `}
        >
          {toast.message}
        </div>
      )}

    </ToastContext.Provider>
  );
}

/*
  🪝 Custom toast hook
*/
export function useToast() {

  return useContext(
    ToastContext
  );
}