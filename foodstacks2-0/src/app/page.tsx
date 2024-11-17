import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div>Welcome to Foodstacks!!!</div>
      <button>
        <Link href="/description">View Details</Link>
      </button>
      <br></br>
      <button>Recommend</button>
      <br></br>
      <button>
        <Link href="/user_settings">Change User Preferences</Link>
      </button>
    </main>
  );
}
