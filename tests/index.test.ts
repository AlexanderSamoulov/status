import { TreeStore, TreeStoreItem } from '../src';

describe('TreeStore', () => {
  const items:TreeStoreItem[] = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },
    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },
    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
  ];

  const ts = new TreeStore(items);

  test('getAll returns all items', () => {
    expect(ts.getAll()).toEqual(items);
  });

  test('getItem returns item by id', () => {
    expect(ts.getItem(1)).toEqual({ id: 1, parent: 'root' });
    expect(ts.getItem(100)).toBeUndefined();
  });

  test('getChildren returns children by parent id', () => {
    expect(ts.getChildren(1)).toEqual([
      { id: 2, parent: 1, type: 'test' },
      { id: 3, parent: 1, type: 'test' },
    ]);
    expect(ts.getChildren(100)).toEqual([]);
  });

  test('getAllChildren returns all descendants by parent id', () => {
    expect(ts.getAllChildren(1)).toEqual([
      { id: 2, parent: 1, type: 'test' },
      { id: 3, parent: 1, type: 'test' },
      { id: 4, parent: 2, type: 'test' },
      { id: 5, parent: 2, type: 'test' },
      { id: 6, parent: 2, type: 'test' },
      { id: 7, parent: 4, type: null },
      { id: 8, parent: 4, type: null },
    ]);
    expect(ts.getAllChildren(100)).toEqual([]);
  });

  test('getAllParents returns all ancestors by child id', () => {
    expect(ts.getAllParents(4)).toEqual([
      { id: 4, parent: 2, type: 'test' },
      { id: 2, parent: 1, type: 'test' },
      { id: 1, parent: 'root' },
    ]);
    expect(ts.getAllParents(100)).toEqual([]);
  });
});
