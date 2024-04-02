export interface TUser {
  access: string;
  user: {
    id: string;
    name: string;
    email: string;
    telephone: string;
    is_admin: boolean;
    is_group_leader: boolean;
    is_deleted: boolean;
  };
  organization: {
    id: string;
    name: string;
    admin: string;
  };
}

export interface Tleader {
  id: string;
  name: string;
  email: string;
  telephone: string;
  is_admin: boolean;
  is_group_leader: boolean;
  is_deleted: boolean;
}

export interface TLeaderUser {
  access: string;
  user: Tleader;
  organization: {
    id: string;
    name: string;
    admin: string;
  };
  groups: group[];
}

export interface TAttending {
  id: string;
  name: string;
  is_deleted: boolean;
}

interface group {
  id: string;
  name: string;
}
