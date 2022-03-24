export const idlFactory = ({ IDL }) => {
  const Follow = IDL.Record({ 'pid' : IDL.Text, 'author' : IDL.Opt(IDL.Text) });
  const Time = IDL.Int;
  const Message = IDL.Record({
    'text' : IDL.Text,
    'time' : Time,
    'author' : IDL.Text,
  });
  return IDL.Service({
    'follow' : IDL.Func([IDL.Principal], [], []),
    'follows' : IDL.Func([], [IDL.Vec(Follow)], ['query']),
    'get_name' : IDL.Func([], [IDL.Opt(IDL.Text)], ['query']),
    'post' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'posts' : IDL.Func([Time], [IDL.Vec(Message)], ['query']),
    'set_name' : IDL.Func([IDL.Text], [IDL.Text], []),
    'timeline' : IDL.Func([IDL.Text, Time], [IDL.Vec(Message)], []),
  });
};
export const init = ({ IDL }) => { return []; };
