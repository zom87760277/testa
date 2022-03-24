import { testa } from "../../declarations/testa";

async function post(){
  let post_button = document.getElementById("post");
  let error = document.getElementById("error");
  error.innerText = "";
  post_button.disabled = true;
  let textarea = document.getElementById("message");
  let otp = document.getElementById("otp").value;
  let text = textarea.value;
  try{
    await testa.post(otp,text);
    textarea.value = "";
  } catch(err){
    console.log(err)
    error.innerText = "Post Failed!";
  }
  
  post_button.disabled = false;
}

var num_posts = 0;
var num_timeline = 0;
var num_follows = 0;

async function load_posts(){
  let posts_section = document.getElementById("posts");
  let posts = await testa.posts(0);

  if(num_posts == posts.length) return;
  posts_section.replaceChildren([]);
  num_posts = posts.length;

  for(var i=0;i < posts.length; i++){
    let post = document.createElement("p");
    let postT = document.createElement("t");
      var t = Number(posts[i].time/100000n);
      postT = new Date(t).toString();
      post.innerText = ("content:"+posts[i].text +"TIME:"+ postT + "A:"+posts[i].author);
      posts_section.appendChild(post);
  }
}
async function load_follows(){
  let follows_section = document.getElementById("follows");
  let follows = await testa.follows();

  if(num_follows == follows.length) return;
  follows_section.replaceChildren([]);
  num_follows = follows.length;

  for(var i=0;i < follows.length; i++){
    let fol = document.createElement("u");
    fol.innerText = (follows[i] + "     ");
    follows_section.appendChild(fol);
  }
  followsDisplay(follows);

}

function followsDisplay(follows) {
  // 获取table位置标签
  let follows_section = document.getElementById("follows");
  follows_section.replaceChildren([]);
  // 创建表节点 和tbody节点
  var tbl     = document.createElement("table");
  var tblBody = document.createElement("tbody");
  for (var j = 0; j < follows.length; j++) {
      // 添加行tr
      var row = document.createElement("tr");
      let follow = follows[j];

      var cell2 = document.createElement("td");
        cell2.style.border=0;
        cell2.style.cellspacing="0";
        cell2.style.cellpadding="0";
        var cellText2 = document.createTextNode(" # "+j + " # CanisterID ："+follow.pid + " ");
        cell2.appendChild(cellText2);
        row.appendChild(cell2);
        
        var cell1 = document.createElement("td");
        cell1.style.border=0;
        cell1.style.cellspacing="0";
        cell1.style.cellpadding="0";
        var cellText1 = document.createElement("button");
        cellText1.innerText = "Name: " + follow.author;
        cellText1.setAttribute("pid",follow.pid); 
        cellText1.setAttribute("blogName",follow.author); 
        cell1.appendChild(cellText1);
        row.appendChild(cell1);
      // 增加到tbody
      tblBody.appendChild(row);
  }
  // 把tbody放入table中
  tbl.appendChild(tblBody);
  // table put to body
  follows_section.appendChild(tbl);
  tbl.setAttribute("border", "0");

  var tdb = document.querySelectorAll("td button");
  var ii;
  for (ii = 0; ii < tdb.length; ii++) {
     tdb[ii].addEventListener("click", async (e) => {
      e.preventDefault();
      let pid = e.target.getAttribute("pid");
      let name = e.target.getAttribute("blogName");
      let blogName = document.getElementById("blogName");
      blogName.innerText = "  Loading for " + name + " ... ";
      let table_section = document.getElementById("timeline");
      table_section.replaceChildren([]);
      let count = await load_timeline(pid);
      blogName.innerText = "  found " + count + " article from " + name;
      return false;
    });
  };
}

async function load_timeline(id){
  let timeline_section = document.getElementById("timeline");
  let timeline = await testa.timeline(id,0);


  if(num_timeline == timeline.length) return;
  timeline_section.replaceChildren([]);
  num_timeline = timeline.length;

  for(var i=0;i < timeline.length; i++){
    let timel = document.createElement("q");
    let timelT = document.createElement("w");
      var t = Number(timeline[i].time/100000n);
      timelT = new Date(t).toString();
      timel.innerText = ("content:"+timeline[i].text +"      TIME:"+ timelT + "      Author:"+timeline[i].author);
      timeline_section.appendChild(timel);
  }
}
function load(){
  let post_button = document.getElementById("post");
  post_button.onclick = post;
  load_posts();
  load_follows();
  load_timeline("");

  setInterval(load_follows,3000);
  setInterval(load_posts,3000);
}

window.onload = load