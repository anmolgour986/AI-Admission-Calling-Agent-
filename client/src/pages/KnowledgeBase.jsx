import { useState } from "react";
import KnowledgeForm from "../components/knowledge/KnowledgeForm";
import KnowledgeTable from "../components/knowledge/KnowledgeTable";

const KnowledgeBase = () => {
  const [refresh, setRefresh] = useState(false);

  const refreshKnowledge = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-white">
        Knowledge Base
      </h1>

      <KnowledgeForm
        onKnowledgeAdded={refreshKnowledge}
      />

      <KnowledgeTable
        refresh={refresh}
      />
    </div>
  );
};

export default KnowledgeBase;