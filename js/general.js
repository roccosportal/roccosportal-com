 $(document).ready(function(){
   $("#lifestream-github").lifestream({
      limit: 8,
      list:[
        {
          service: "github",
          user: "roccosportal"
        }
      ]
  });
  $("#lifestream-stackoverflow").lifestream({
      limit: 8,
      list:[
        {
          service: "stackoverflow",
          user: "1307375"
        }
      ]
  });
});

