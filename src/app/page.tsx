import { BoatList } from "@/components/BoatList";
import BoatAdd from "@/components/BoatAdd";
import { getBoats } from "@/lib/services/boatServices";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/Logout";

export default async function Home() {
  const tokenCookie = await cookies();
  const token = tokenCookie?.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const boats = await getBoats();

  return (
    <div>
      <main className="container mx-auto py-10">
        <LogoutButton />
        <h1 className="text-3xl font-bold mb-6">Boat Inventory</h1>
        <BoatList boats={boats} />
        <BoatAdd />
      </main>
    </div>
  );
}
