import Header from "./components/Header";
import { fetchData } from "./lib/fetchData";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await fetchData();

  return (
    <html lang="en">
      <body>
        <Header data={data} />
        {children}
      </body>
    </html>
  );
}
