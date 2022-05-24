/* eslint-disable prettier/prettier */
import { AuthProviderType, LocationObjectType, UserQuoteObject, users } from '@prisma/client';
class UserAccount {
  providerType: AuthProviderType;
}

export interface UserEntity {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthday: Date;
  showMe: string;
  sexualOrientation: string;
  phoneNumber: string;
  isPrivate: boolean;
  isPhoneVerified: boolean;
  isPremium: boolean;
  accounts: UserAccount[];
  loc: LocationObjectType;
  quote: UserQuoteObject
}

export class UserSummaryEntity implements Partial<users> {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
}
