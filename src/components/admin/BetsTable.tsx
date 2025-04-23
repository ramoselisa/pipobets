
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PendingBet } from "@/types/predictions";
import { useLocale } from "@/i18n/useLocale";

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

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("name")}</TableHead>
          <TableHead>{t("birthDate")}</TableHead>
          <TableHead>{t("eye")}</TableHead>
          <TableHead>{t("hair")}</TableHead>
          <TableHead>{t("actions")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pendingBets.map(bet => (
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
              <Button
                variant="default"
                size="sm"
                onClick={() => onApprove(bet.id)}
              >
                Approve
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
