const TabulatorMock = vi.fn(() => ({
  Tabulator: vi.fn(),
  setColumns: vi.fn(),
  setData: vi.fn(),
  getRows: vi.fn(() => []),
  getRow: vi.fn(),
  getRowPosition: vi.fn(),
  destroy: vi.fn(),
}));

export default TabulatorMock;
