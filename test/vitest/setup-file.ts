// This file will be run before each test file
import { vi } from 'vitest';
import TabulatorMock from './__tests__/__mocks__/tabulator';

vi.mock('tabulator-tables', () => {
  return {
    ...vi.importActual('tabulator-tables'),
    TabulatorFull: TabulatorMock,
  };
});
