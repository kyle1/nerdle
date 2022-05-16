import { useState } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";

import Instructions from "../components/Instructions";
import Modal from "../components/Modal";
import NavBar from "../components/NavBar";
import Settings from "../components/Settings";
import Stats from "../components/Stats";
import "../styles/globals.css";

// function MyApp({ Component, pageProps }: AppProps) {
const App: React.FC<AppProps> = (props: AppProps) => {
  const [showInstructionsModal, setShowInstructionsModal] = useState<boolean>(false);
  const [showStatsModal, setShowStatsModal] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);

  return (
    <>
      <Head>
        <title>Nerdle</title>
      </Head>
      <NavBar
        onInstructionsClick={() => setShowInstructionsModal(true)}
        onStatsClick={() => setShowStatsModal(true)}
        onSettingsClick={() => setShowSettingsModal(true)}
      />
      {showInstructionsModal && (
        <Modal onConfirm={() => console.log("confirmed")} onClose={() => setShowInstructionsModal(false)}>
          <Instructions />
        </Modal>
      )}
      {showStatsModal && (
        <Modal onConfirm={() => console.log("confirmed")} onClose={() => setShowStatsModal(false)}>
          <Stats />
        </Modal>
      )}
      {showSettingsModal && (
        <Modal onConfirm={() => console.log("confirmed")} onClose={() => setShowSettingsModal(false)}>
          <Settings />
        </Modal>
      )}
      <props.Component {...props.pageProps} />
      <div id="overlays"></div>
    </>
  );
};

export default App;
