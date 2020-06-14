<script>
      $(document).ready(function(){
        var user,pass;
        $("#submit").click(function(){
          user=$("#user").val();
          pass=$("#password").val();
          alert('Posting Parameters!');
          $.post("http://localhost:3000/login",{user: user,password: pass}, function(data){
            if(data==='yes') {
                alert("login success");
              }
          });
        });
      });
</script>