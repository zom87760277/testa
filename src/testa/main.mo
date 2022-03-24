import List "mo:base/List";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Option "mo:base/Option";
 
actor {
    public type Message =  {
        time : Time.Time;
        author: Text;
        text: Text;
    };

    public type Follow = {
        pid: Text;
        author: ?Text;
    };

    public type Microblog = actor {
        follow: shared(Principal) -> async ();
        follows: shared query () -> async [Follow];
        post: shared(Text) -> async ();
        posts: shared query (since: Time.Time) -> async [Message];
        timeline : shared query(pid: Text, since: Time.Time) -> async [Message];
        set_name : shared (name: Text) -> async();
        get_name : shared query () -> async ?Text;
    };

    

    stable var followed : List.List<Follow> = List.nil();

    public shared func follow(id: Principal) : async (){
      let canister : Microblog = actor(Principal.toText(id));
      let name : ?Text = await canister.get_name();
      followed := List.push({pid = Principal.toText(id); author = name},followed);
        //followed := List.push(id, followed);
    };

    public shared query func follows() : async [Follow]{
        List.toArray(followed);
    };

    stable var messages : List.List<Message> = List.nil();


    public shared func post(otp: Text, content: Text) : async () {
        //assert(Principal.toText(msg.caller) == "sz2vl-rh25x-2ocfs-ivonm-ja6ma-go6m6-lwzts-ogkcb-55j7o-xrga7-mqe");
        
        assert(otp == "666888");
        var m ={
            text = content;
            time = Time.now();
            author = authorName;
        };
        
        messages := List.push<Message>(m,messages);
    };

    public shared query func posts(since: Time.Time) : async [Message] {
      //  switch since {
      //    case (?Time)
      //      List.toArray(List.filter(messages, func(val: Message) : Bool {
      //        val.time > 1
      //      }));
      //    case null
      //      List.toArray(messages);
      //  }
        var m : List.List<Message> = List.nil();
        m := List.filter<Message>(messages, func ({ time }) = time >= since);
        List.toArray(m);
        
    };


    public shared func timeline(pid: Text,since: Time.Time) : async [Message]{
        var all : List.List<Message> = List.nil();
       
        if(pid == ""){
          for (id in Iter.fromList(List.reverse(followed))){
            let canister : Microblog = actor(id.pid);
            let msgs : [Message] = await canister.posts(since);
            for (msg in Iter.fromArray(msgs)){
                all := List.push(msg, all);
            }
          };
        }else{
          let canister : Microblog = actor(pid);
          let msgs : [Message] = await canister.posts(since);
          for (msg in Iter.fromArray(msgs)){
            all := List.push(msg, all);
            };
        };
 /*
        for (id in Iter.fromList(List.reverse(followed))){
            let canister : Microblog = actor(Principal.toText(id));
            let msgs : [Message] = await canister.posts(since);
            for (msg in Iter.fromArray(msgs)){
                all := List.push(msg, all);
            }
          };*/
        List.toArray(all);
    };
    stable var authorName : Text = "zom";

    
    public shared func set_name(name: Text) : async Text{ 
        authorName := name;
        authorName;
    };

    public shared query func get_name() : async ?Text { 
        ?authorName;
    };



};

