// CMU 15-445 学习站 - 交互脚本
(function () {
  "use strict";

  // 移动端汉堡菜单
  var toggle = document.querySelector(".menu-toggle");
  var sideBar = document.querySelector(".side-bar");
  if (toggle && sideBar) {
    toggle.addEventListener("click", function () {
      sideBar.classList.toggle("open");
    });
    // 点击侧边栏链接后收起菜单
    sideBar.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        sideBar.classList.remove("open");
      });
    });
  }

  // 当前年份写入页脚
  var yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
