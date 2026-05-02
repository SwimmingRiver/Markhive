import { Suspense } from "react";
import LibraryController from "@/components/library/LibraryController";

export default function LibraryPage() {
  return (
    <Suspense>
      <LibraryController />
    </Suspense>
  );
}
