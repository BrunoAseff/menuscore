import React from "react";
import useDesigner from "./hooks/useDesigner";
import FormElementsSidebar from "./FormElementsSidebar";
import PropertiesFormSidebar from "./PropertiesFormSidebar";

export default function DesignerSideBar() {
  const { selectedElement } = useDesigner();

  return (
    <aside className="w-[400px] max-w-[400px]  flex flex-col flex-grow gap-2 border-l-2 border-card p-4 bg-card overflow-y-auto h-full dark:bg-background">
      {!selectedElement && <FormElementsSidebar />}
      {selectedElement && <PropertiesFormSidebar />}
    </aside>
  );
}
