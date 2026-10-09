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
    // 点击侧边栏链接后收起菜单（但折叠按钮除外）
    sideBar.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        sideBar.classList.remove("open");
      });
    });
    // 折叠按钮不收起菜单
    sideBar.querySelectorAll(".nav-toggle").forEach(function (navToggle) {
      navToggle.addEventListener("click", function (e) {
        e.stopPropagation();
      });
    });
  }

  // 导航栏折叠/展开功能
  var navToggles = document.querySelectorAll(".nav-toggle");
  navToggles.forEach(function (navToggle) {
    navToggle.addEventListener("click", function () {
      var section = navToggle.closest(".nav-section");
      var submenu = section ? section.querySelector(".nav-submenu") : null;
      if (!submenu) {
        return;
      }
      var isExpanded = navToggle.getAttribute("aria-expanded") === "true";

      // 切换展开/折叠状态
      navToggle.setAttribute("aria-expanded", !isExpanded);
      submenu.classList.toggle("nav-submenu-open");
    });
  });

  // 当前年份写入页脚
  var yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
