// 置換したい画像URL
const replaceImageUrl =
  "https://img.atwiki.jp/niconicomugen/attach/7146/16667/%E9%87%8E%E7%8D%A3%E5%85%88%E8%BC%A9.jpg";

// YouTube以外でのみ動作
if (!location.hostname.includes("youtube.com")) {

  chrome.storage.local.get("enabled", data => {
    if (data.enabled === false) {
      console.log("Image replacer OFF");
      return;
    }

    function replaceImages() {
      document.querySelectorAll("img").forEach(img => {
        if (img.dataset.replaced) return;

        img.src = replaceImageUrl;
        img.srcset = "";
        img.dataset.replaced = "true";
      });
    }

    // 初回
    replaceImages();

    // 動的対応
    const observer = new MutationObserver(replaceImages);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });

} else {
  console.log("YouTube detected, image replacer disabled.");
}
