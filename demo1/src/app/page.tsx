'use client'

import Navigation from "@/components/home/Navigation";
import Main from "@/components/home/Main";
import {useAppContext} from "@/components/AppContext";

export default function Home() {
    const {state} = useAppContext()

  return (
      <div className={`flex h-full ${state.themeMode}`}>
        <Navigation />
        <Main />
      </div>
  );
}
