import { useState, createContext, useContext, type ReactNode } from "react";
import type { TabType } from "./types";

export interface TabContextState {
  selectedTab: TabType;
  setSelectedTab: (tab: TabType) => void;
}

const TabContext = createContext<TabContextState | null>(null);

const TabProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTab, setSelectedTab] = useState<TabType>("home");

  return (
    <TabContext.Provider value={{ selectedTab, setSelectedTab }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTab = () => {
  const context = useContext(TabContext);

  if (!context) {
    throw new Error("useTab must be used within TabProvider");
  }

  return context;
};

export default TabProvider;
