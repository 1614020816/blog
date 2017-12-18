function getTecArt(pno){
	$.ajax({
		type:'get',
		url:'http://39.108.187.242/data/article/getArticle.php?type1=' + type1 + '&type2=' + type2,
		data: {pno:pno},
		error:(err)=>{
			console.log(err);
		}
	}).then(function(res){
			$("#page").paging({
					pageNo: pno,
					totalPage: res.pageCount,
					totalSize: res.recordCount,
					callback: function(pno) {
						getArtList(pno);
					}
				});
				
			var bloglist = res.data;
			var html="";
			for(let item of bloglist){
				html += `
					<div class="blog">
						<h3><a data-id='${item.art_id}'>${item.art_title}</a></h3>
						<p>${item.art_des}</p>
						<p class="date">
							<span>${item.art_pubtime}</span>
							<span>博客分类：
							[<a class='art-type' onclick="getArtLsByType('${item.art_type1}', null)">${item.art_type1Desc}</a>/
							 <a class='art-type' onclick="getArtLsByType('${item.art_type1}', '${item.art_type2}')">${item.art_type2Desc}</a>]</span>
						</p>
					</div>
					`;
			}
			$('.container>ul').html(html);
		},
	);
}


$(document).ready(function() {
	getTecArt(1);
});

$('.note-list').on('click','.blog>h3>a',function(e){
	e.preventDefault();
	let $e = $(e.target);
	var id = $e.attr('data-id');
	getArtContent(id);
});
