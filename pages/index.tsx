// pages/index.tsx

import { useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

interface HomeProps {}

const MapComponent = dynamic(() => import("../components/MapComponent"), {
  ssr: false, // ✅ Prevents "window is not defined" error
});

const Home: React.FC<HomeProps> = () => {
  const [year, setYear] = useState<number>(2000000); // Initialize to a starting year
  const [info, setInfo] = useState<any>(null); // State to hold info from map clicks

  return (
    <div>
      <Head>
        <title>📍 Mapping Human Evolution</title>
        <meta
          name="description"
          content="Track human evolution patterns over millions of years."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>📍 Mapping Human Evolution</h1>
        <MapComponent setInfo={setInfo} year={year} setYear={setYear} />

        {info && (
          <div
            style={{
              padding: "10px",
              backgroundColor: "#f9f9f9",
              marginTop: "10px",
            }}
          >
            <h3>Details</h3>
            <pre>{JSON.stringify(info, null, 2)}</pre>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;