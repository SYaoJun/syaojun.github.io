// 生成中文首页 /zh-CN/index.html（只包含 lang: zh-CN 的文章）
hexo.extend.generator.register('zh-homepage', function(locals) {
  var zhPosts = locals.posts.filter(function(p) { return p.lang === 'zh-CN'; });
  if (zhPosts.length === 0) return [];
  
  return {
    path: 'zh-CN/index.html',
    layout: ['index', 'archive'],
    data: {
      lang: 'zh-CN',
      posts: zhPosts
    }
  };
});
