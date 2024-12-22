import React from "react";
import { ParticipantsActions } from "./ParticipantsActions";
import { ParticipantsTableContent } from "./ParticipantsTableContent";
import { useParticipants } from "./useParticipants";

export const ParticipantsTable = () => {
  const {
    participants,
    isLoading,
    editingId,
    editForm,
    setEditForm,
    handleDeleteAll,
    handleExportCSV,
    handleEdit,
    handleSave,
    handleCancel,
  } = useParticipants();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ParticipantsActions
        onDeleteAll={handleDeleteAll}
        onExportCSV={handleExportCSV}
      />
      <ParticipantsTableContent
        participants={participants}
        editingId={editingId}
        editForm={editForm}
        onEdit={handleEdit}
        onSave={handleSave}
        onCancel={handleCancel}
        setEditForm={setEditForm}
      />
    </div>
  );
};