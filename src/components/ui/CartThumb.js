import Image from "next/image";
import ScentBottle from "@/components/ui/ScentBottle";

// A cart line's product photo, filling its box; the drawn bottle only shows until the photo is known.
export default function CartThumb({ item, size }) {
  if (item.image) {
    return <Image src={item.image} alt={item.name} fill sizes="120px" style={{ objectFit: "cover" }} />;
  }
  return <ScentBottle accent={item.accent} accentSoft={item.accentSoft} size={size} isSet={item.family === "set"} />;
}
