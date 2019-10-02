global.plug = () => {
  return {};
};
const { shouldExecuteReport } = require('../src/utils');

it('should execute report', () => {
  expect(shouldExecuteReport(true, true, true)).toBe(false);
  expect(shouldExecuteReport(true, true, false)).toBe(false);
  expect(shouldExecuteReport(true, false, false)).toBe(false);
  expect(shouldExecuteReport(true, false, true)).toBe(false);
  expect(shouldExecuteReport(false, true, true)).toBe(true);
  expect(shouldExecuteReport(false, true, false)).toBe(true);
  expect(shouldExecuteReport(false, false, false)).toBe(false);
  expect(shouldExecuteReport(false, false, true)).toBe(true);
});