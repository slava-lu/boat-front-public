import { z } from "zod";
import { boatSchema } from "@/lib/schemas";

export type Boat = {
  id: string;
  name: string;
  description: string;
  boatSize: "SMALL" | "MEDIUM" | "BIG";
  createdAt: Date;
};

export type BoatValues = z.infer<typeof boatSchema>;

export type BoatDetailPageProps = {
  params: { id: string };
};
