
import { Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PendingBet } from "@/types/predictions";

interface BetTableRowProps {
  bet: PendingBet;
  editing: string | null;
  editForm: PendingBet | null;
  onEditFormChange: (field: keyof PendingBet, value: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onApprove: (id: string) => void;
}

export function BetTableRow({
  bet,
  editing,
  editForm,
  onEditFormChange,
  onEdit,
  onDelete,
  onApprove,
}: BetTableRowProps) {
  const isEditing = editing === bet.id;

  return (
    <TableRow 
      className={
        bet.status === 'approved' ? 'bg-green-50' : 
        bet.status === 'deleted' ? 'bg-red-50' : ''
      }
    >
      <TableCell>
        {isEditing ? (
          <Input
            value={editForm?.name || ""}
            onChange={e => onEditFormChange("name", e.target.value)}
          />
        ) : bet.name}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <div className="flex gap-2">
            <Input
              value={editForm?.date || ""}
              onChange={e => onEditFormChange("date", e.target.value)}
              placeholder="YYYY-MM-DD"
            />
            <Input
              value={editForm?.time || ""}
              onChange={e => onEditFormChange("time", e.target.value)}
              placeholder="HH:MM"
            />
          </div>
        ) : (
          <>
            {bet.date} {bet.time || ""}
          </>
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <Input
            value={editForm?.eyeColor || ""}
            onChange={e => onEditFormChange("eyeColor", e.target.value)}
          />
        ) : bet.eyeColor}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <Input
            value={editForm?.hairColor || ""}
            onChange={e => onEditFormChange("hairColor", e.target.value)}
          />
        ) : bet.hairColor}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <Select 
            value={editForm?.status || "pending"} 
            onValueChange={(value) => onEditFormChange("status", value)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="deleted">Deleted</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            bet.status === 'approved' ? 'bg-green-100 text-green-800' : 
            bet.status === 'deleted' ? 'bg-red-100 text-red-800' : 
            'bg-yellow-100 text-yellow-800'
          }`}>
            {bet.status === 'approved' && <Check className="mr-1 h-3 w-3" />}
            {bet.status}
          </span>
        )}
      </TableCell>
      <TableCell className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(bet.id)}
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
        
        {bet.status !== 'deleted' && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(bet.id)}
          >
            Delete
          </Button>
        )}
        
        {bet.status === 'pending' && (
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
  );
}
