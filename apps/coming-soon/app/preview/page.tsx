import "../globals.css";
import { ComingSoon } from "@repo/ui/coming-soon";
import { getBrandById, AQURION_BRANDS } from "@repo/ui/brand-config";

interface PageProps {
  searchParams: Promise<{ brand?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  // Priority: ?brand=xxx URL param (dev preview) → BRAND_ID env var → default
  const brandId = params.brand ?? process.env.BRAND_ID ?? "aqurion-marketing";
  const brand = getBrandById(brandId) ?? AQURION_BRANDS[5]!;
  return <ComingSoon brand={brand} />;
}
