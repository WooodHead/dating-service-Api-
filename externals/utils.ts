export function transformMeterDistance(distance: number): {
  unit: string;
  value: number;
} {
  if (distance < 1609.344) {
    return {
      unit: 'feet',
      value: distance * 3.2808,
    };
  }
  return {
    unit: 'miles',
    value: distance / 1609.344,
  };
}

export function transformMilesDistance(distance: number): {
  unit: string;
  value: number;
} {
  if (distance < 1) {
    return {
      unit: 'feet',
      value: distance * 5280,
    };
  }
  return {
    unit: 'miles',
    value: distance,
  };
}
