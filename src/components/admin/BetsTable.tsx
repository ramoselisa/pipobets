
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PendingBet } from "@/types/predictions";
import { useLocale } from "@/i18n/useLocale";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

  const filteredBets = pendingBets.filter(bet => {
    if (statusFilter === "all") return true;
    return bet.status === statusFilter;
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Predictions</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
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
          {filteredBets.map(bet => (
            <TableRow key={bet.id}>
              <TableCell>
                {editing === bet.id ? (
                  <Input
                    value={editForm?.name || ""}
                    onChange={e => onEditFormChange("name", e.target.value)}
                  />
                ) : bet.name}
              </TableCell>
              <TableCell>{bet.date}</TableCell>
              <TableCell>{bet.eyeColor}</TableCell>
              <TableCell>{bet.hairColor}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  bet.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {bet.status}
                </span>
              </TableCell>
              <TableCell className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(bet.id)}
                >
                  {editing === bet.id ? "Save" : "Edit"}
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(bet.id)}
                >
                  Delete
                </Button>
                {bet.status !== 'approved' && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => onApprove(bet.id)}
                  >
                    Approve
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
