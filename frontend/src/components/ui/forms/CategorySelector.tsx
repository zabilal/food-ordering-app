import { cn } from '@/lib/utils';

type Category = {
  id: string;
  name: string;
  icon?: React.ReactNode;
};

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: string;
  onSelect: (categoryId: string) => void;
  className?: string;
}

export function CategorySelector({
  categories,
  selectedCategory,
  onSelect,
  className,
}: CategorySelectorProps) {
  return (
    <div className={cn('flex space-x-2 overflow-x-auto pb-2', className)}>
      <button
        key="all"
        onClick={() => onSelect('all')}
        className={cn(
          'whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors',
          selectedCategory === 'all'
            ? 'bg-primary text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        )}
      >
        All Items
      </button>
      
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect(category.id)}
          className={cn(
            'flex items-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors',
            selectedCategory === category.id
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          )}
        >
          {category.icon && <span className="mr-2">{category.icon}</span>}
          {category.name}
        </button>
      ))}
    </div>
  );
}
