import React from "react";
import Link from "next/link";
import Preferences from "../components/Preferences";

const UserSettings = () => {
  return (
    <main>
      <div>Description</div>
      <button>
        <Link href="/">back to main page</Link>
      </button>
      <Preferences></Preferences>
    </main>
  );
};

export default UserSettings;
