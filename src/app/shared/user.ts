export interface UserDetails {
    uid: string;
    displayName?: string;
    displayNameLower?: string;
    userName?: string;
    userNameLower?: string;
    userBio?: string;
    country?: string;
    city?: string;
    imageURL?: string;
    email: string;
    isAdmin?: boolean;
    [x: string]: any;
  }