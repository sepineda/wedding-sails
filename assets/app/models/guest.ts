export interface Guest {
  id?: string,

  first_name: string,

  last_name?: string,

  email?: string,

  phone?: string,

  confirmed?: boolean,

  spaces?: number,

  status?: string;

  active: boolean,

  _wedding: string
}
