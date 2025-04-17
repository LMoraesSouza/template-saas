
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col itens-center justify-center h-screen">
      Landing Page
      <Link href='login'>
        <button>
          Login
        </button>
      </Link>
    </div>
  );
}
