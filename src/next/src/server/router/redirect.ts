import { createRouter } from "./context";
import * as z from "zod";

export const redirectSchema = z.object({
  slug: z
    .string()
    .max(32, { message: "Slug must be less than 32 characters" })
    .min(2, { message: "Slug must contain at least 2 characters" }),
  url: z
    .string()
    .url({ message: "Invalid URL provided" })
    .max(64, { message: "URL must be less than 64 characters" })
    .min(8, { message: "URL must contain at least 8 characters" }),
});

export const redirectRouter = createRouter().mutation("create", {
  input: redirectSchema,
  resolve: ({ input: { slug, url }, ctx }) => {
    return ctx.prisma.redirect.create({
      data: {
        slug,
        url,
      },
      select: {
        id: true,
        slug: true,
      },
    });
  },
});
