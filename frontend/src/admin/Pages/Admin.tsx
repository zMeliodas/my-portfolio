import { useState } from "react";
import ProjectCards from "../../admin/common/ProjectCards";
import ResumeSection from "../../admin/common/ResumeSection";
import Tabs from "../../admin/common/Tabs";
import type { TabKey } from "../types";
import TechnologiesCards from "../../admin/common/TechnologiesCards";

const Admin = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("resume");

  return (
    <div className="bg-backgroundColor w-full h-full">
      <div className="flex flex-col pt-8 px-8 max-w-4xl 2xl:px-24 gap-4">
        <h1 className="text-draculaPink text-4xl font-medium font-mono lg:text-4xl">
          Admin
        </h1>
        <p className="text-white font-medium font-mono sm:text-sm xl:text-xl">
          Update the resume, projects, and tech stack shown on your portfolio.
        </p>

        <Tabs activeTab={activeTab} onChange={setActiveTab} />

        <div className="pb-8">
          {activeTab === "resume" && <ResumeSection />}
          {activeTab === "projects" && <ProjectCards />}
          {activeTab === "techstack" && <TechnologiesCards />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
