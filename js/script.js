// ------------------------------
// documentオブジェクト取得
// ------------------------------
const $doc = document;

// ------------------------------
// DOM読み込み後に実行
// ------------------------------
$doc.addEventListener("DOMContentLoaded", () => {
  // ------------------------------
  // 画像のDOMを取得～フェードアニメーション付与
  // ------------------------------
  const $images = document.querySelectorAll("#Main img");

  const imagesObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is_visible");
          imagesObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  $images.forEach((image) => imagesObserver.observe(image));

  // ------------------------------
  // ヘッダー関連のスクリプト
  // ------------------------------
  const $header = $doc.querySelector("#Header");
  const $catchCopy = document.querySelector(".hero__block");

  if (!$header || !$catchCopy) return;

  // スクロール位置がヒーローイメージの座標を越えると発動
  const headerObserver = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) {
        $header.classList.add("is_scrolled");
      } else {
        $header.classList.remove("is_scrolled");
      }
    },
    {
      root: null,
      threshold: 0,
      rootMargin: `-${$catchCopy.offsetHeight}px 0px 0px 0px`,
    }
  );
  headerObserver.observe($catchCopy);

  // ハンバーガーメニュー　※SPレイアウト時のみ
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
  // スムーススクロール
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

  // ------------------------------
  // フォーム関連
  // ------------------------------
  const $form = $doc.querySelector(".contact__form");
  const radioBody = $doc.querySelector(".contact__form__radio");
  const radioButtons = $doc.querySelectorAll('input[name="contact"]');
  const emailInput = $doc.querySelector("#Email");

  // エラーメッセージを表示させる。
  const showErrorBox = (value, message) => {
    let textBox = value.nextElementSibling;

    if (!textBox || !textBox.classList.contains("errorMessage")) {
      textBox = $doc.createElement("span");
      textBox.classList.add("errorMessage");

      value.after(textBox);
    }

    textBox.textContent = message;
  };

  // エラーメッセージを削除する。
  const clearErrorBox = (value) => {
    const textBox = value.nextElementSibling;

    if (textBox && textBox.classList.contains("errorMessage")) {
      textBox.remove();
    }
  };

  // フォーム送信時のバリデーション
  $form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;

    // 「種別」のバリデーション
    // HTMLソースではデフォルトで１点目に選択させているが、
    // もしチェックが外れていた場合の為に念のため判定する。
    const isRadioChecked = Array.from(radioButtons).some(
      (radio) => radio.checked
    );

    if (!isRadioChecked) {
      showErrorBox(radioBody, "※種別を選択してください。");
      isValid = false;
    } else {
      clearErrorBox(radioBody);
    }

    // 「メールアドレス」のバリデーション
    // 空欄チェック & メールアドレスの体裁となっているか判定する。
    if (!emailInput.value.trim()) {
      showErrorBox(emailInput, "※メールアドレスを入力してください。");
      isValid = false;
    } else if (!emailInput.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      showErrorBox(emailInput, "※有効なメールアドレスを入力してください。");
      isValid = false;
    } else {
      clearErrorBox(emailInput);
    }

    if (isValid) {
      alert(
        "お問い合わせ内容を送信しました。\n内容を確認後、入力頂いたメールアドレスへ返答しますのでお待ちください。"
      );

      emailInput.value = "";
      $doc.querySelector("#Inquiry").value = "";

      return;
    }

    alert("必須項目が選択・入力されていません。");
  });
});
