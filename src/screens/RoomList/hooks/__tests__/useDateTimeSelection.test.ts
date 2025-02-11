import { renderHook, act } from "@testing-library/react-hooks";
import { useDateTimeSelection } from "../useDateTimeSelection";

describe("useDateTimeSelection", () => {
  beforeEach(() => {
    // Reset the date to a known value for consistent testing
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2024, 1, 11, 10, 30)); // Feb 11, 2024, 10:30 AM
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should initialize with 8:00 AM of current date", () => {
    const { result } = renderHook(() => useDateTimeSelection());

    const expectedDate = new Date();
    expectedDate.setHours(8, 0, 0, 0);

    expect(result.current.selectedDateTime).toEqual(expectedDate);
  });

  it("should update selectedDateTime when onDateTimeChange is called", () => {
    const { result } = renderHook(() => useDateTimeSelection());

    const newDate = new Date(2024, 1, 15, 14, 30); // Feb 15, 2024, 2:30 PM

    act(() => {
      result.current.onDateTimeChange(newDate);
    });

    expect(result.current.selectedDateTime).toEqual(newDate);
  });

  describe("formatDate", () => {
    it("should format date with correct suffix - st", () => {
      const { result } = renderHook(() => useDateTimeSelection());
      const date = new Date(2024, 1, 1); // Feb 1
      expect(result.current.formatDate(date)).toMatch(/1st Feb 2024/);
    });

    it("should format date with correct suffix - nd", () => {
      const { result } = renderHook(() => useDateTimeSelection());
      const date = new Date(2024, 1, 2); // Feb 2
      expect(result.current.formatDate(date)).toMatch(/2nd Feb 2024/);
    });

    it("should format date with correct suffix - rd", () => {
      const { result } = renderHook(() => useDateTimeSelection());
      const date = new Date(2024, 1, 3); // Feb 3
      expect(result.current.formatDate(date)).toMatch(/3rd Feb 2024/);
    });

    it("should format date with correct suffix - th", () => {
      const { result } = renderHook(() => useDateTimeSelection());
      const date = new Date(2024, 1, 4); // Feb 4
      expect(result.current.formatDate(date)).toMatch(/4th Feb 2024/);
    });
  });

  describe("formatTime", () => {
    it("should format time in 12-hour format", () => {
      const { result } = renderHook(() => useDateTimeSelection());

      const morningTime = new Date(2024, 1, 11, 9, 30); // 9:30 AM
      expect(result.current.formatTime(morningTime)).toMatch(/9:30 AM/i);

      const afternoonTime = new Date(2024, 1, 11, 14, 30); // 2:30 PM
      expect(result.current.formatTime(afternoonTime)).toMatch(/2:30 PM/i);
    });

    it("should pad hours and minutes with zeros when needed", () => {
      const { result } = renderHook(() => useDateTimeSelection());

      const earlyMorning = new Date(2024, 1, 11, 8, 5); // 8:05 AM
      expect(result.current.formatTime(earlyMorning)).toMatch(/8:05 AM/i);
    });
  });
});
