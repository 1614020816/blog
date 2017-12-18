	  //页面加载时运行
	  $(document).ready(function(){
	    $("#content").load('home.html');
      changeTheme();
	  });
		// 文章一级分类   文章二级分类 
		var type1 = type2 = null;

    // 点击菜单切换主体内容
    var chgPage = function(page){
			if(page == "article") {type1 = "1";type2 = null;};		//文章一级分类：TEC-技术文章
			if(page == "note") {type1 = "2";type2 = null;}		//文章一级分类：NOTE-读书笔记
      $("#content").load(page + ".html");
    }
    //背景颜色切换功能
    function changeTheme(){
      $("#sel").change(function(){
        let index = $('#sel').get(0).selectedIndex;
        let theme = ['#b35e59','#ddc468','#f1c4be','#b8d3ca','#8a7e94','#d4bb9c','#a7ab86','#93816d'];
        $("body").css("background-color",theme[index]);
      });
   }
	 //根据文章分类获取文章列表
	 function getArtLsByType(type_lv1, type_lv2){
  	type1 = type_lv1;
    type2 = type_lv2;
    if(type_lv1 == "1"){
			$("#content").load("article.html");
		} 
    if(type_lv1 == "2") {
			$("#content").load("note.html");
		}
   }
	//  根据id去查询对应的文章内容
	 function getArticleById(id){
    var result = null;
    $.ajax({
      type:'get',
      url:'http://39.108.187.242/data/article/getArticle.php?art_id='+id,
      async: false, 
      success:(res)=>{
        result = res;
      },
      error:err=>{
        console.log(err);
      }
    });
    return result;
  }
	// 根据文章id更新对应的点击率
	function updateArtHits(id){
    $.ajax({
      type:'post',
      url:'http://39.108.187.242/data/article/updateArtHits.php',
      data:{id:id}
    });
  }

	//点击文章标题加载文章内容
	function getArtContent(id){
		updateArtHits(id);
		var result = getArticleById(id);
		let html='';
		let item = result.data[0];
		html += `
							<div>
								<p style='margin-bottom: 10px;'>文章分类：
										<span class='art-type' onclick="getArtLsByType('${item.art_type1}', null)">${item.art_type1Desc}</span> >> 
										<span class='art-type' onclick="getArtLsByType('${item.art_type1}', '${item.art_type2}')">${item.art_type2Desc}</span>
								</p>
								<h1 class='article-title'>${item.art_title}</h1>
								<p class='article-info'>
									<span>作者：${item.art_author}</span>
									<span>发表时间：${item.art_pubtime}</span>
									<span>点击数：${item.art_hits}</span>
								<div class='article-content'>${item.art_content}</div>
							</div>
						`;
		$("#content").html(html);
	}