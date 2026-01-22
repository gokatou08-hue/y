// 置換用画像URLを複数用意
const replaceImageUrls = [
  "https://img.atwiki.jp/niconicomugen/attach/7146/16667/%E9%87%8E%E7%8D%A3%E5%85%88%E8%BC%A9.jpg",
  "https://images.steamusercontent.com/ugc/937186000753113799/8C1E695F5002463534561258E78DFB7FDEA465DF/?imw=512&imh=384&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
  "https://i.ytimg.com/vi/pfPvN04dma8/maxresdefault.jpg"
];

// ランダムに1枚選ぶ関数
function getRandomImage() {
  return replaceImageUrls[
    Math.floor(Math.random() * replaceImageUrls.length)
  ];
}

// YouTube以外でのみ動作
if (!location.hostname.includes("youtube.com")) {

  chrome.storage.local.get("enabled", data => {
    if (data.enabled === false) return;

    function replaceImages() {
      document.querySelectorAll("img").forEach(img => {
        if (img.dataset.replaced) return;

        img.src = getRandomImage();
        img.srcset = "";
        img.dataset.replaced = "true";
      });
    }

    // 初回
    replaceImages();

    // 動的に追加される画像も対応
    const observer = new MutationObserver(replaceImages);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });

}
