import { z } from "zod";

// Schema for Members & Invitations table
export const memberSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(["Owner", "Member"]),
  status: z.enum(["Joined", "Pending"]),
  date: z.string(),
});

export type Member = z.infer<typeof memberSchema>;
