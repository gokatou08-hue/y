// --------------------
// 画像置換
// --------------------
const replaceImageUrls = [
  "https://img.atwiki.jp/niconicomugen/attach/7146/16667/%E9%87%8E%E7%8D%A3%E5%85%88%E8%BC%A9.jpg",
  "https://images.steamusercontent.com/ugc/937186000753113799/8C1E695F5002463534561258E78DFB7FDEA465DF/?imw=512&imh=384&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
  "https://i.ytimg.com/vi/pfPvN04dma8/maxresdefault.jpg"
];

function getRandomImage() {
  return replaceImageUrls[
    Math.floor(Math.random() * replaceImageUrls.length)
  ];
}

// --------------------
// 文字をランダムに置換
// --------------------
const replaceAllTexts = [
  "野獣先輩",
  "やりますねぇ",
  "まずいですよ！",
  "いいゾ〜これ",
  "114514",
  "810",
  "4545",
];

function getRandomText() {
  return replaceAllTexts[
    Math.floor(Math.random() * replaceAllTexts.length)
  ];
}

// --------------------
// 実行
// --------------------
if (!location.hostname.includes("youtube.com")) {

  chrome.storage.local.get("enabled", data => {
    if (data.enabled === false) return;

    // ===== 画像 =====
    function replaceImages() {
      document.querySelectorAll("img").forEach(img => {
        if (img.dataset.replaced) return;

        img.src = getRandomImage();
        img.srcset = "";
        img.dataset.replaced = "true";
      });
    }

    // ===== 文字 =====
    function replaceAllText() {
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode(node) {
            if (!node.parentNode) return NodeFilter.FILTER_REJECT;

            const tag = node.parentNode.tagName;
            if (
              ["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "INPUT", "CODE"]
                .includes(tag)
            ) {
              return NodeFilter.FILTER_REJECT;
            }

            if (!node.nodeValue.trim()) {
              return NodeFilter.FILTER_REJECT;
            }

            if (node.__replaced) {
              return NodeFilter.FILTER_REJECT;
            }

            return NodeFilter.FILTER_ACCEPT;
          }
        }
      );

      let node;
      while ((node = walker.nextNode())) {
        node.nodeValue = getRandomText();
        node.__replaced = true;
      }
    }

    // 初回
    replaceImages();
    replaceAllText();

    // 動的対応
    const observer = new MutationObserver(() => {
      replaceImages();
      replaceAllText();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}
