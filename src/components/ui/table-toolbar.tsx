import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Search } from 'lucide-react';

interface TableToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  showEntriesValue: string;
  onShowEntriesChange: (value: string) => void;
  onAddClick: () => void;
  addButtonLabel?: string;
}

export const TableToolbar = ({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Cari...",
  showEntriesValue,
  onShowEntriesChange,
  onAddClick,
  addButtonLabel = "Tambah",
}: TableToolbarProps) => {
  return (
    <div className="flex justify-between items-center flex-wrap gap-4">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Show</span>
        <Select value={showEntriesValue} onValueChange={onShowEntriesChange}>
          <SelectTrigger className="w-20 border-gray-300">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-gray-600">entries</span>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 w-64 border-gray-300 focus:border-[#1E4F85]"
          />
        </div>

        <Button
          className="bg-[#1E4F85] text-white hover:bg-[#1E4F85]"
          onClick={onAddClick}
        >
          <Plus className="h-4 w-4 mr-2" />
          {addButtonLabel}
        </Button>
      </div>
    </div>
  );
};