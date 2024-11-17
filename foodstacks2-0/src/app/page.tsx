import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div>Main Page</div>
      <button>
        <Link href="/description">description</Link>
      </button>
      <br></br>
      <button>
        <Link href="/user_settings">settings</Link>
      </button>
    </main>
  );
}
