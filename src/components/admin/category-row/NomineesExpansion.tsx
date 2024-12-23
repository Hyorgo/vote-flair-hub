import { TableCell, TableRow } from "@/components/ui/table";
import { NomineeList } from "../NomineeList";

interface NomineesExpansionProps {
  showNominees: boolean;
  nominees: any[];
  categoryId: string;
  onDeleteNominee: (id: string) => void;
}

export const NomineesExpansion = ({
  showNominees,
  nominees,
  categoryId,
  onDeleteNominee,
}: NomineesExpansionProps) => {
  if (!showNominees) return null;

  return (
    <TableRow>
      <TableCell colSpan={4}>
        <NomineeList 
          nominees={nominees} 
          categoryId={categoryId}
          onDeleteNominee={onDeleteNominee}
        />
      </TableCell>
    </TableRow>
  );
};