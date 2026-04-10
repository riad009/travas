import { ComingSoon } from "@repo/ui/coming-soon";
import { getBrandById, AQURION_BRANDS } from "@repo/ui/brand-config";

export default function Page() {
  const brandId = process.env.BRAND_ID ?? "aqurion-marketing";
  const brand = getBrandById(brandId) ?? AQURION_BRANDS[5]!;
  return <ComingSoon brand={brand} />;
}
