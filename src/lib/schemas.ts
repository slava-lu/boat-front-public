import { z } from "zod";

export const boatSchema = z.object({
  name: z.string().min(1, { message: "Name must be present" }),
  description: z.string().min(1, { message: "Description must be present" }),
  boatSize: z.enum(["SMALL", "MEDIUM", "BIG"]),
});
