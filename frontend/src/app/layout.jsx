import "../styles/tailwind.css";
import UserProvider from "../../utils/ProviderContext";

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={`bg-blue-back ultra_large_p:p-0 flex flex-col justify-center items-center`} suppressHydrationWarning={true}>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
