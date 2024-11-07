import "./globals.css";

export const metadata = {
  title: "Staj Case",
  description: "Generated by Oğuz Han Uyar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
