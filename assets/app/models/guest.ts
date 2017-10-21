export interface Guest {
  id?: string,

  first_name: string,

  last_name?: string,

  email?: string,

  phone?: string,

  spaces?: number,

  status?: number;

  active: boolean,

  _wedding: string
}

export enum GuestStates {
  Seen,
  Confirmed,
  Denied,
  Sent
}
