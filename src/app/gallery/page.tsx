import { ScrapbookGallery } from "@/components/gallery/scrapbook-gallery";
import { supabaseAdmin } from "@/lib/supabase-admin";

export default async function GalleryPage() {
  const { data: memories } = await supabaseAdmin
    .from("gallery_submissions")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  return (
    <main className="px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 font-display text-5xl uppercase">
          Scrapbook Gallery
        </h1>

        <ScrapbookGallery memories={memories || []} />
      </div>
    </main>
  );
}