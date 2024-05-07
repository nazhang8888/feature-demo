import { CellComponent, Tabulator } from 'tabulator-tables';

export function validateTable(table: Tabulator) {
  return table.validate();
}

export function longRange(
  cell: CellComponent,
  value: number,
  parameters: { min: number; max: number }
) {
  if (value < parameters.min || value > parameters.max) {
    return false;
  }
  return true;
}

export function latRange(
  cell: CellComponent,
  value: number,
  parameters: { min: number; max: number }
) {
  if (value < parameters.min || value > parameters.max) {
    return false;
  }
  return true;
}

export function minChars(
  cell: CellComponent,
  value: string,
  parameters: { min: number }
) {
  return value.length >= parameters.min ? true : false;
}
