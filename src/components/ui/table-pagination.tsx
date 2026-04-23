import { Button } from '@/components/ui/button';

interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface TablePaginationProps {
  pagination?: PaginationMeta;
  currentPage: number;
  onPageChange: (page: number) => void;
  items: unknown[];
}

export const TablePagination = ({ pagination, currentPage, onPageChange, items }: TablePaginationProps) => {
  if (!pagination) return null;

  const startItem = items.length > 0 ? (pagination.current_page - 1) * pagination.per_page + 1 : 0;
  const endItem = items.length > 0
    ? (pagination.current_page - 1) * pagination.per_page + items.length
    : 0;

  const pageNumbers = Array.from({ length: pagination.last_page }, (_, i) => i + 1);

  return (
    <div className="flex justify-between items-center mt-4">
      <div className="text-sm text-gray-500">
        Menampilkan{' '}
        <strong>{startItem}</strong>{' '}
        sampai{' '}
        <strong>{endItem}</strong>{' '}
        dari <strong>{pagination.total ?? 0}</strong> data
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          disabled={pagination.current_page === 1}
          onClick={() => onPageChange(currentPage - 1)}
        // className="bg-[#0F2A4D] text-white hover:bg-[#0F2A4D]/90"
        >
          Sebelumnya
        </Button>

        {pageNumbers.map((page) => (
          <Button
            key={page}
            size="sm"
            onClick={() => onPageChange(page)}
            className={
              pagination.current_page === page
                ? 'bg-[#0F2A4D] text-white'
                : 'bg-white text-[#1E4F85] border border-[#1E4F85]/30 hover:bg-[#EAF2FB]'
            }
          >
            {page}
          </Button>
        ))}

        <Button
          variant="outline"
          disabled={pagination.current_page === pagination.last_page}
          onClick={() => onPageChange(currentPage + 1)}
        // className="bg-[#0F2A4D] text-white hover:bg-[#0F2A4D]/90"
        >
          Selanjutnya
        </Button>
      </div>
    </div>
  );
};