import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "O nome do seu formulário precisa ser maior.",
  }),
  description: z.string().optional(),
});

export type formSchemaType = z.infer<typeof formSchema>;
