import type { Metadata } from "next";
import { BrandsGallery } from "./BrandsGallery";

export const metadata: Metadata = {
  title: "Aqurion Holdings — All Domain Previews",
  description: "Preview all 24 Aqurion Holdings domain coming-soon pages",
};

export default function BrandsPage() {
  return <BrandsGallery />;
}
