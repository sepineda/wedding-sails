import { Wedding } from './wedding';

export interface User{
  first_name? : string,

  last_name? : string,

  email : string,

  password : string,

  weddings: Wedding[];
}
