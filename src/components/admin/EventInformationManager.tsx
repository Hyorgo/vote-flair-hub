import { EventForm } from "./event/EventForm";
import { EventDisplay } from "./event/EventDisplay";
import { useEventManager } from "./event/useEventManager";

export const EventInformationManager = () => {
  const {
    eventInfo,
    isLoading,
    isEditing,
    formData,
    setFormData,
    handleEdit,
    handleSubmit,
    updateMutation,
    setIsEditing,
  } = useEventManager();

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!eventInfo) return null;

  if (isEditing) {
    return (
      <EventForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        onCancel={() => setIsEditing(false)}
        isPending={updateMutation.isPending}
      />
    );
  }

  return <EventDisplay eventInfo={eventInfo} onEdit={handleEdit} />;
};