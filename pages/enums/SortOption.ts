export type SortType = 'price' | 'title';

export interface SortOptionDefinition<T> {
  value: string; //drop-down value in UI
  type: 'price' | 'title'; //what we are sorting
  comparator: (a: T, b: T) => number; //sorting logic
}

// Type-safe, fully defined SortOptions
export const SortOption = {
  PRICE_LOW_TO_HIGH: {
    value: 'lohi',
    type: 'price',
    comparator: (a: number, b: number) => a - b,
  } as SortOptionDefinition<number>,

  PRICE_HIGH_TO_LOW: {
    value: 'hilo',
    type: 'price',
    comparator: (a: number, b: number) => b - a,
  } as SortOptionDefinition<number>,

  NAME_A_TO_Z: {
    value: 'az',
    type: 'title',
    comparator: (a: string, b: string) => a.localeCompare(b),
  } as SortOptionDefinition<string>,

  NAME_Z_TO_A: {
    value: 'za',
    type: 'title',
    comparator: (a: string, b: string) => b.localeCompare(a),
  } as SortOptionDefinition<string>,
} as const;

export type SortOption = typeof SortOption[keyof typeof SortOption];