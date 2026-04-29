import BookmarkInput from "@/components/bookmark/BookmarkInput";
import RecentBookmarks from "@/components/bookmark/RecentBookmarks";

export default function BookmarkPage() {
  return (
    <div className="flex flex-col items-center px-8 py-10 gap-7 h-full overflow-y-auto">
      <div className="w-full max-w-[720px]">
        <h1 className="font-serif text-[28px] font-normal mb-1">새 북마크 저장</h1>
        <p className="text-sm text-muted">
          URL을 입력하면 제목과 설명을 자동으로 가져옵니다.
        </p>
      </div>
      <BookmarkInput />
      <RecentBookmarks />
    </div>
  );
}
