import Link from "next/link";

interface LogoType {
  centered?: boolean;
}

const Logo = ({ centered = false }: LogoType): React.ReactNode => (
  <>
    <Link
      href="/"
      className={`flex items-center gap-2 font-medium
        ${centered && "justify-center w-full"}`}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <i className="fad fa-comments-alt" />
      </div>
      Quizzify
    </Link>
  </>
);

export default Logo;
