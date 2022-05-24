import { UserCurrentLocation } from '@prisma/client';

export class UserLocation implements UserCurrentLocation {
  id: string;
  userId: string;
  lat: number;
  long: number;
  updatedAt: Date;
}
