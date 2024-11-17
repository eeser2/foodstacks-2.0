import React from "react";
import Link from "next/link";

const UserSettings = () => {
  return (
    <main>
      <div>Description</div>
      <button>
        <Link href="/">back to main page</Link>
      </button>
    </main>
  );
};

export default UserSettings;
