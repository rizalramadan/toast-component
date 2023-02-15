import React from "react";
import useKeydown from "../../hooks/use-keydown";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToast] = React.useState([]);

  const handleKeydown = React.useCallback(() => {
    setToast([]);
  }, []);

  useKeydown("Escape", handleKeydown);

  function createToast(vrn, msg) {
    const newToast = { id: crypto.randomUUID(), variant: vrn, message: msg };
    const newListToast = [...toasts, newToast];

    setToast(newListToast);
  }

  function dismissToast(id) {
    const newListToast = toasts.filter((toast) => {
      return toast.id !== id;
    });

    setToast(newListToast);
  }

  return (
    <ToastContext.Provider value={{ toasts, createToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
