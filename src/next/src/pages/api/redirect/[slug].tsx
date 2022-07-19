import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";
import { prisma } from "../../../server/db/client";

const slugSchema = z.string();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query["slug"] as z.infer<typeof slugSchema>;

  if (!slugSchema.safeParse(slug).success) {
    res.statusCode = 406;
    res.send(JSON.stringify({ message: "Invalid slug provided" }));

    return;
  }

  const data = await prisma.redirect.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
    select: {
      id: true,
      url: true,
      slug: true,
      createdAt: true,
      updatedAt: true,
      user: true,
      userId: true,
    },
  });

  if (!data) {
    res.statusCode = 404;
    res.send(JSON.stringify({ message: "No redirect with that slug found." }));

    return;
  }

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=604800, stale-while-revalidate");

  return res.json(data);
};
