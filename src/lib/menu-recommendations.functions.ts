import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const requestSchema = z.object({
  dietaryNeeds: z.string().trim().max(300),
  preferences: z.string().trim().max(300),
}).refine((value) => value.dietaryNeeds.length > 0 || value.preferences.length > 0, "Conte suas preferências ou necessidades alimentares.");

export const recommendMenu = createServerFn({ method: "POST" })
  .validator((input) => requestSchema.parse(input))
  .handler(async ({ data }) => {
    const { getMenuRecommendations } = await import("./menu-recommendations.server");
    return getMenuRecommendations(data);
  });