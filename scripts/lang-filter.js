// 根据当前页面路径自动过滤文章语言
// /zh-CN/ 路径下的页面只显示 lang: zh-CN 的文章
// 其他路径（默认英文）只显示 lang: en 或无 lang 的文章

hexo.extend.filter.register('template_locals', function(locals) {
  var path = locals.page.path || '';
  
  // 判断当前语言环境
  var isZhCN = path.indexOf('zh-CN/') === 0 || path === 'zh-CN/index.html';
  var targetLang = isZhCN ? 'zh-CN' : 'en';
  
  // 过滤首页和归档页的文章列表
  if (locals.page.posts) {
    var filtered = [];
    locals.page.posts.forEach(function(post) {
      var postLang = post.lang;
      if (targetLang === 'zh-CN') {
        if (postLang === 'zh-CN') filtered.push(post);
      } else {
        // 英文模式：显示 en 或无 lang 的
        if (!postLang || postLang === 'en' || postLang !== 'zh-CN') filtered.push(post);
      }
    });
    
    // 替换为过滤后的 Model（保持分页等属性）
    if (locals.page.posts.data) {
      locals.page.posts.data = filtered;
    }
  }

  return locals;
});
