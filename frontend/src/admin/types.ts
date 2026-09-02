
export type TabKey = "resume" | "projects" | "techstack";

export type TabsProps = {
  activeTab: TabKey;
  onChange: (tab: TabKey) => void;
};