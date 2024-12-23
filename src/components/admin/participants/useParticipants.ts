import { useParticipantsData } from "@/hooks/useParticipantsData";
import { useParticipantActions } from "@/hooks/useParticipantActions";

export const useParticipants = () => {
  const { participants, isLoading, refreshParticipants } = useParticipantsData();
  const actions = useParticipantActions(participants, refreshParticipants);

  return {
    participants,
    isLoading,
    ...actions,
  };
};