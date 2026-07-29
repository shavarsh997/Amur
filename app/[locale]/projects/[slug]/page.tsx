import { notFound } from "next/navigation";

/** There are no published portfolio entries yet; unknown project URLs are true 404s. */
export default function ProjectDetailPage() {
  notFound();
}
