import { ScrapbookGallery } from "@/components/gallery/scrapbook-gallery";
import { SectionTitle } from "@/components/ui/section-title";
import { galleryMemories } from "@/lib/data";

export default function GalleryPage() {
  return (
    <main className="px-4 py-12 md:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <SectionTitle
          eyebrow="Memory Archive"
          title="Scrapbook Gallery"
          description="Polaroid-style moments, micro-stories, funny quotes, and tape-peel interactions from past events."
        />
        <div className="mt-8">
          <ScrapbookGallery memories={galleryMemories} />
        </div>
      </div>
    </main>
  );
}
