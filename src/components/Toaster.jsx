import { Toaster } from "react-hot-toast";

export function ToasterContainer() {
  return (
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // default options
        className: "",
        duration: 3000,
        style: {
          fontSize: "12px",
          background: "var(--background)",
          color: "var(--text-1)",
        },

        success: {
          theme: {
            primary: "var(--green)",
            secondary: "white",
          },
        },
      }}
    />
  );
}
