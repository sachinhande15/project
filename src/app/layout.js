import "./globals.css";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
const inter = Inter({ subsets: ["latin"] });
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./Provider";
export const metadata = {
  title: {
    default: "Platinum TechnoPark",
    template: "%s",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ToastContainer></ToastContainer>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
