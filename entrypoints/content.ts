async function loadScore(review: Element): Promise<void> {
  if (review.getAttribute("data-pitchfork-score") === "loading") return;

  const link = review.querySelector<HTMLAnchorElement>("a.review__link, a[href*='/reviews/albums/']");
  const metadata = review.querySelector<HTMLElement>(".review__meta") ?? review.querySelector<HTMLElement>(".review__title");
  if (!link || !metadata) return;

  review.setAttribute("data-pitchfork-score", "loading");
  try {
    const response = await fetch(link.href, { credentials: "same-origin" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const page = new DOMParser().parseFromString(await response.text(), "text/html");
    const scores = Array.from(page.querySelectorAll<HTMLElement>(".score"))
      .map((element) => Number.parseFloat(element.textContent ?? ""))
      .filter(Number.isFinite)
      .map((score) => score.toFixed(1));

    if (scores.length === 0) throw new Error("No score found");

    const heading = document.createElement("h2");
    heading.className = "genre-list pitchfork-review-score";
    const scoreLink = document.createElement("a");
    scoreLink.href = link.href;
    scoreLink.textContent = `Score: ${scores.join(" and ")}`;
    heading.append(scoreLink);
    metadata.prepend(heading);
    review.setAttribute("data-pitchfork-score", "complete");
  } catch (error) {
    review.removeAttribute("data-pitchfork-score");
    console.debug("Pitchfork Reviews could not load", link.href, error);
  }
}

function scan(): void {
  for (const review of document.querySelectorAll(".review")) void loadScore(review);
}

export default defineContentScript({
  matches: ["*://pitchfork.com/*", "*://www.pitchfork.com/*"],
  main() {
    scan();
    const observer = new MutationObserver(scan);
    observer.observe(document.documentElement, { childList: true, subtree: true });
    addEventListener("hashchange", scan);
  }
});
