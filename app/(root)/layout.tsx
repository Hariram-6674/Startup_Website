import { SanityLive } from "@/sanity/lib/live";
import Navbar from "../../components/server_components/Navbar";
import { Toaster } from "sonner";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-workSans">
      <Toaster richColors/>
      <Navbar />
      {children}
      <SanityLive />
    </main>
  );
}
