import Navbar from "../server_components/Navbar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-workSans">
      <Navbar />
      {children}
    </main>
  );
}
