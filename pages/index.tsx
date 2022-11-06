import type { NextPage } from "next";
import Layout from "../components/Layout/Layout";
import Navbar from "../components/Navbar/Navbar";
import Feed from "../pages/feed";
import { auth } from "../firebase";
import Splash from "./splash";
import { useEffect, useState } from "react";
import { index } from "../constants/metadata";

interface Props {}

const Home: NextPage<Props> = () => {
  const [signedIn, setSignedIn] = useState<number>(-1);
  useEffect(() =>
    auth.onAuthStateChanged((user) => {
      user ? setSignedIn(1) : setSignedIn(0);
    })
  );

  return (
    <Layout metadata={index}>
      <Navbar currentPage="Home" />
      {signedIn === 1 && <Feed />}
      {signedIn === 0 && <Splash />}
      {signedIn === -1 && <p>Loading...</p>}
    </Layout>
  );
};

export default Home;
