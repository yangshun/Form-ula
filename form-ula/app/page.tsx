"use client";
// Components
import { NavBar } from "@/components/navbar";
import { LeftSidebar } from "@/components/leftSidebar";
import { RightSidebar } from "@/components/input/rightSidebar";


const Home = () => {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Header NavBar */}
      <NavBar />
      {/* Body */}
      <div
        className="grid md:grid-cols-[30%_70%]">
        {/* Left Sidebar */}
        <LeftSidebar />
        {/* Right Sidebar */}
        <RightSidebar />
      </div>
    </main>
  );
}

export default Home;