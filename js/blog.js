	var type1LS=type2LS=null;
//背景颜色切换功能
function changeTheme(){
$("#sel").change(function(){
	let index = $('#sel').get(0).selectedIndex;
	let theme = ['#b35e59','#ddc468','#f1c4be','#b8d3ca','#8a7e94','#d4bb9c','#a7ab86','#93816d'];
	$("body").css("background-color",theme[index]);
});
}
	//根据文章一级分类显示对应的文章二级分类
	function type1Chg(typeData1){
		let html = '';
		for(let item of type2LS){
			if(item.art_type1 == typeData1)
				html += `<option value='${item.art_type2}'>${item.art_type2_des}</option>`
		}
		$('#type2').html(html);
	}

	//获取文章分类（一级分类&二级分类）
	function getType(){
		$.ajax({
			type:'get',
			url:'http://39.108.187.242/data/blog/getType.php',
			success:function(res){
				type1LS = res.type1;
				type2LS = res.type2;
				let html='';
				for(let item of type1LS){
					html += `<option value='${item.art_type1}'>${item.art_type1_des}</option>`
				}
				$('#type1').html(html);
			}
		}).then(function(){
			let typeData1 = $('#type1').val();
			type1Chg(typeData1);
		})
	}
	//点选文章一级分类显示对应的文章二级分类
	$('#type1').change(function(){
		let typeData1 = $('#type1').val();
		type1Chg(typeData1);
	});

	//页面初始化-获取文章一级&二级分类
	$(function(){
		getType();
		changeTheme();
	});

	$('#title').blur(function(){
		let title = $("#title").val();
		if(title==''){
			$('.title').html('文章标题不能为空哦').css('color','red');
		}else{
			$('.title').html('ok').css('color','green');
		}
	});
	$('#author').blur(function(){
		let author = $('#author').val();
		if(author == ''){
			$('.author').html('文章作者不能为空哦').css('color','red');
		}else{
			$('.author').html('ok').css('color','green');
		}
	});
	$('#des').blur(function(){
		let des = $('#des').val();
		if(des == ''){
			$('.des').html('文章描述不能为空哦').css('color','red');
		}else{
			$('.des').html('ok').css('color','green');
		}
	});
		
	//提交文章
	$('#btn').click(function(){
		var title = $("#title").val();
		var author = $('#author').val();
		var des = $('#des').val();
		var type1 = $('#type1').val();
		var type2 = $('#type2').val();
		var content = ue.getContent();
		if(title != '' && author != '' && des != '' && content != ''){
			$.ajax({
				type:'post',
				url:'http://39.108.187.242/data/article/addArticle.php',
				data:{
					title:title,
					author:author,
					des:des,
					type1:type1,
					type2:type2,
					content:content
				},
				success:(res) => {
					if(res.code == 200) {
						alert('添加成功');
					} else {
						console.log('添加失败');
					}
				},
				error:(err) => {
					console.log(err);
				}
			});
		}
	});