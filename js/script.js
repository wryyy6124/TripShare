// ------------------------------
// documentオブジェクト取得
// ------------------------------
const $doc = document;

// ------------------------------
// DOM読み込み後に実行
// ------------------------------
$doc.addEventListener("DOMContentLoaded", () => {
  // ------------------------------
  // ヘッダーのDOMを取得
  // ------------------------------
  const $header = $doc.querySelector("#Header");

  window.addEventListener("scroll", () => {
    const headerHeight = $header ? $header.offsetHeight : 0;

    const heroScrollTop =
      $doc.querySelector("#Hero").getBoundingClientRect().bottom - headerHeight;

    if (heroScrollTop <= 0) {
      $header.classList.add("is_scrolled");
    } else {
      $header.classList.remove("is_scrolled");
    }
  });

  // ------------------------------
  // ハンバーガーメニュー
  // ------------------------------
  const $hamburger = $doc.querySelector(".header__hamburger");

  $hamburger.addEventListener("click", () => {
    $doc.body.classList.toggle("is_active");
  });

  const resizeWindow = () => {
    if (window.innerWidth >= 768) {
      $doc.body.classList.remove("is_active");
    }
  };
  window.addEventListener("resize", resizeWindow);

  // ------------------------------
  // アンカーリンク
  // ------------------------------
  const $anchorLink = $doc.querySelectorAll('a[href^="#"]');

  $anchorLink.forEach((li) => {
    li.addEventListener("click", (e) => {
      e.preventDefault();
      const target = $doc.querySelector(li.getAttribute("href"));

      if (target) {
        $doc.body.classList.remove("is_active");

        const headerHeight = $header ? $header.offsetHeight : 0;
        const offsetTop =
          target.getBoundingClientRect().top + window.scrollY - headerHeight;

        scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
});
