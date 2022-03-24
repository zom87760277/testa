import type { Principal } from '@dfinity/principal';
export interface Follow { 'pid' : string, 'author' : [] | [string] }
export interface Message { 'text' : string, 'time' : Time, 'author' : string }
export type Time = bigint;
export interface _SERVICE {
  'follow' : (arg_0: Principal) => Promise<undefined>,
  'follows' : () => Promise<Array<Follow>>,
  'get_name' : () => Promise<[] | [string]>,
  'post' : (arg_0: string, arg_1: string) => Promise<undefined>,
  'posts' : (arg_0: Time) => Promise<Array<Message>>,
  'set_name' : (arg_0: string) => Promise<string>,
  'timeline' : (arg_0: string, arg_1: Time) => Promise<Array<Message>>,
}
