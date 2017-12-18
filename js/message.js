// 表单验证
function check(){
  
  // 验证用户名
  $('#text-content').blur(function(){
    var v_content = $('#text-content').val();
    if(v_content==''){
      $('.text-content').html('既然来了，不留点什么吗').css({'color':'red','margin-left':'10px'});
    }
  });

  $('#name').blur(function(){
    var v_name = $('#name').val();
    if(v_name==''){
      $('.name').html('用户名不能为空').css('color','red');
    }
    else{
      $('.name').html('');
    }
  });
// 验证邮箱格式
  $('#email').blur(function(){
   var v_email = $('#email').val();
   if(v_email==''){
    $('.email').html('邮箱不能为空').css('color','red');
   }
   else{
    let bool_email = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(v_email);
    if(bool_email==false){
      $('.email').html('邮箱格式错误,请重新输入').css('color','red');
     }
     else if(bool_email==true){
      $('.email').html('你放心，我不会告诉别人的').css('color','green');
     }
   }
  });
// 验证个人网站
  $('#url').blur(function(){
    var v_url = $('#url').val();
    if(v_url==''){ return}
    else{
     let bool_url = /^([a-zA-Z\d][a-zA-Z\d-_]+\.)+[a-zA-Z\d-_][^ ]*$/.test(v_url);
     if(bool_url==false){
      $('.url').html('格式错误,请重新输入').css('color','red');
     }
     else{
      $('.url').html('我相信你不会填广告链接的').css('color','green');
     }
    }
  });
}



// 添加留言到数据库
function addMessage() {
  var v_content = $('#text-content').val();
  var v_name = $('#name').val();
  var v_url = $('#url').val();
  var v_email = $('#email').val();
  $.ajax({
    type: "post",
    url: "http://39.108.187.242/data/message/addMessage.php",
    data: {
      name: v_name,
      email: v_email,
      userurl: v_url,
      content: v_content
    },
    error: (err) => {
      console.log(err);
    }
  })
  .then((res) => {
    var ress = JSON.parse(res);
    if(ress.code == 200) {
      $('#text-content').val('');
      $('#name').val('');
      $('#url').val('');
      $('#email').val('');
      $('span').html('');
    } else {
      console.log('err:' + ress);
      console.log('添加失败');
    }
  })
}
// 获取留言内容
function getComments(pno) {
			$.ajax({
				url: "http://39.108.187.242/data/message/getMessage.php",
				type: "get",
				data: {pno:pno},
				dataType: "json",
				success: function(data) {
					// console.log(data);
          //分页
          //动态加载留言
        var html = '';
        for(let c of data.data.reverse()){
          html += `
                      <li>
                        <h3>${c.msg_user}说:</h3>
                        <p>${c.msg_content}</p>
                        <p>${c.msg_date}</p>
                      </li>
                    `
        }
      
        $('#comment-container').html(html);
					$("#page").paging({
						pageNo: pno,
						totalPage: data.pageCount,
						totalSize: data.recordCount,
						callback: function(pno) {
							getComments(pno);
						}
					});
				}
			})
    }
// 页面加载时默认加载第一页数据
$(document).ready(function() {
  check();
  getComments(1);
  //给按钮绑定事件
  $('#btn').click(function() {
    var v_content = $('#text-content').val();
    var v_name = $('#name').val();
    var v_email = $('#email').val();
    if(v_content != '' && v_name != '' && v_email != ''){
      addMessage();
    }else{
      $('.tips').html('噢噢，你还没有填完哦').css('color','red');
    }
    getComments(1);
  });
});
