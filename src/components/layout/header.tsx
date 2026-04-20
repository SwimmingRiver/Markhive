import SignoutButton from "./signout-button";

interface HeaderProps {
  email: string;
}

export default function Header({ email }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 h-14 border-b border-border [border-bottom-width:0.5px]">
      <span className="font-serif text-lg">Markhive</span>
      <div className="flex items-center gap-4">
        <span className="text-[12px] text-muted">{email}</span>
        <SignoutButton />
      </div>
    </header>
  );
}
