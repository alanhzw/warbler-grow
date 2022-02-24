import { getSectorAngle, rotatePointerToPrize, rotatePlateToPrize } from '../logic';

describe('logic.ts', () => {
  describe('getSectorAngle', () => {
    it('The angle of 2 /8 should be 1.25', () => {
      expect(getSectorAngle(1, 8)).toBe(0.125);
    });
    it('The angle of 7 / 8 should be 0.625', () => {
      expect(getSectorAngle(6, 8)).toBe(0.75);
    });
    it('The angle of 4 / 6 should be 0.625', () => {
      expect(getSectorAngle(3, 6)).toBe(0.5);
    });
  });

  describe('rotatePointerToPrize', () => {
    it('The angle of point to 3 / 8 should be 0.25', () => {
      expect(rotatePointerToPrize(2, 8)).toBe(0.25);
    });
    it('The angle of point to 6 / 8 should be 0.625', () => {
      expect(rotatePointerToPrize(5, 8)).toBe(0.625);
    });
    it('The angle of point to 8 / 8 with loop 4 should be 4.875', () => {
      expect(rotatePointerToPrize(7, 8, 4)).toBe(4.875);
    });
  });

  describe('rotatePlateToPrize', () => {
    it('The angle of point to 2 / 8 should be 0.75', () => {
      expect(rotatePlateToPrize(2, 8)).toBe(0.75);
    });
    it('The angle of point to 5 / 8 should be 0.25', () => {
      expect(rotatePlateToPrize(6, 8)).toBe(0.25);
    });
    it('The angle of point to 7 / 8 with loop 4 should be 4.125', () => {
      expect(rotatePlateToPrize(7, 8, 4)).toBe(4.125);
    });
  });
});
