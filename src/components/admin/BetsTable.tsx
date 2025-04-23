
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PendingBet } from "@/types/predictions";
import { useLocale } from "@/i18n/useLocale";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Eye, Filter } from "lucide-react";

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
    // Filter by status
    if (statusFilter !== "all" && bet.status !== statusFilter) return false;
    
    // Filter by name
    if (nameFilter && !bet.name.toLowerCase().includes(nameFilter.toLowerCase())) return false;
    
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative">
          <Input
            placeholder={t("searchByName")}
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="pl-8 w-full sm:w-[200px]"
          />
          <Eye className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Predictions</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
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
                <TableRow key={bet.id} className={bet.status === 'approved' ? 'bg-green-50' : ''}>
                  <TableCell>
                    {editing === bet.id ? (
                      <Input
                        value={editForm?.name || ""}
                        onChange={e => onEditFormChange("name", e.target.value)}
                      />
                    ) : bet.name}
                  </TableCell>
                  <TableCell>{bet.date}</TableCell>
                  <TableCell>
                    {editing === bet.id ? (
                      <Input
                        value={editForm?.eyeColor || ""}
                        onChange={e => onEditFormChange("eyeColor", e.target.value)}
                      />
                    ) : bet.eyeColor}
                  </TableCell>
                  <TableCell>
                    {editing === bet.id ? (
                      <Input
                        value={editForm?.hairColor || ""}
                        onChange={e => onEditFormChange("hairColor", e.target.value)}
                      />
                    ) : bet.hairColor}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      bet.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {bet.status === 'approved' && <Check className="mr-1 h-3 w-3" />}
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
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
