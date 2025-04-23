
import { useState } from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PendingBet } from "@/types/predictions";
import { useLocale } from "@/i18n/useLocale";
import { TableFilters } from "./table/TableFilters";
import { BetTableRow } from "./table/TableRow";

interface BetsTableProps {
  pendingBets: PendingBet[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onApprove: (id: string) => void;
  editing: string | null;
  editForm: PendingBet | null;
  onEditFormChange: (field: keyof PendingBet, value: string) => void;
}

export function BetsTable({ 
  pendingBets, 
  onEdit, 
  onDelete, 
  onApprove, 
  editing, 
  editForm,
  onEditFormChange 
}: BetsTableProps) {
  const { t } = useLocale();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [nameFilter, setNameFilter] = useState<string>("");

  const filteredBets = pendingBets.filter(bet => {
    if (statusFilter !== "all" && bet.status !== statusFilter) return false;
    if (nameFilter && !bet.name.toLowerCase().includes(nameFilter.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <TableFilters
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("name")}</TableHead>
              <TableHead>{t("birthDate")}</TableHead>
              <TableHead>{t("eye")}</TableHead>
              <TableHead>{t("hair")}</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                  No predictions found matching your filters
                </TableCell>
              </TableRow>
            ) : (
              filteredBets.map(bet => (
                <BetTableRow
                  key={bet.id}
                  bet={bet}
                  editing={editing}
                  editForm={editForm}
                  onEditFormChange={onEditFormChange}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onApprove={onApprove}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
