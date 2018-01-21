$(document).ready(function(){

  $('form').on('submit', function(){

      var item = $('form input');
      var todo = {item: item.val()};

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo, // put the data in the payload, accessible via req.body in the backend. see body-parser and the corresponding post handler on the server.
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
          alert("posted: " + JSON.stringify(data));
        }
      });

      return false;

  });

  $('li').on('click', function(){
      var item = $(this).text().replace(/ /g, "-"); // replace any space " " in the string with "-"
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
          alert("deleted: " + JSON.stringify(data));
        }
      });
  });

});
