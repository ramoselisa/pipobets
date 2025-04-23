
import { Eye, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocale } from "@/i18n/useLocale";

interface TableFiltersProps {
  nameFilter: string;
  setNameFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
}

export function TableFilters({
  nameFilter,
  setNameFilter,
  statusFilter,
  setStatusFilter,
}: TableFiltersProps) {
  const { t } = useLocale();

  return (
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
          <SelectItem value="deleted">Deleted</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
