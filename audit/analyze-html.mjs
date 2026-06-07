import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const auditDir = new URL(".", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");

function analyze(filePath) {
  const html = readFileSync(filePath, "utf8");
  const name = filePath.split(/[\\/]/).pop();
  const issues = [];

  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  if (h1Count !== 1) {
    issues.push({ severity: "high", rule: "single-h1", detail: `Found ${h1Count} h1 elements` });
  }

  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  for (const img of imgs) {
    if (!/\balt=/.test(img)) {
      issues.push({ severity: "critical", rule: "img-alt", detail: img.slice(0, 120) });
    }
  }

  const blankTargetLinks = [...html.matchAll(/<a\b[^>]*target\s*=\s*["']_blank["'][^>]*>/gi)];
  for (const link of blankTargetLinks) {
    const tag = link[0];
    const hasVisuallyHidden =
      /opens in a new (tab|window)/i.test(tag) ||
      /sr-only|visually-hidden|screen-reader/i.test(tag);
    const hasAriaLabel = /\baria-label=/.test(tag);
    if (!hasVisuallyHidden && !hasAriaLabel) {
      issues.push({
        severity: "medium",
        rule: "new-tab-hint",
        detail: tag.replace(/\s+/g, " ").slice(0, 160),
      });
    }
  }

  const inputs = [...html.matchAll(/<(input|select|textarea)\b[^>]*>/gi)];
  for (const input of inputs) {
    const tag = input[0];
    const idMatch = tag.match(/\bid\s*=\s*["']([^"']+)["']/i);
    const id = idMatch?.[1];
    if (!id) continue;
    const hasLabel = new RegExp(`<label[^>]*for\\s*=\\s*["']${id}["']`, "i").test(html);
    const hasAriaLabel = /\baria-label=/.test(tag);
    const hasAriaLabelledby = /\baria-labelledby=/.test(tag);
    if (!hasLabel && !hasAriaLabel && !hasAriaLabelledby) {
      issues.push({ severity: "critical", rule: "form-label", detail: tag.replace(/\s+/g, " ").slice(0, 160) });
    }
  }

  if (!html.includes('href="#content"') && !html.includes("Skip to content")) {
    issues.push({ severity: "high", rule: "skip-link", detail: "Skip link not found in HTML" });
  }

  if (!html.includes('lang="en"')) {
    issues.push({ severity: "high", rule: "html-lang", detail: "Missing lang=en on html element" });
  }

  if (!html.includes('id="content"')) {
    issues.push({ severity: "high", rule: "main-target", detail: "Missing #content main target" });
  }

  const hasRevealHidden = html.includes('class="reveal') && !html.includes('is-visible');
  if (hasRevealHidden) {
    issues.push({
      severity: "high",
      rule: "reveal-nojs",
      detail: "Reveal content rendered with opacity:0 and no is-visible class in SSR HTML",
    });
  }

  const navCount = (html.match(/<nav\b/gi) ?? []).length;
  if (navCount < 1) {
    issues.push({ severity: "medium", rule: "nav-landmark", detail: "No nav landmark found" });
  }

  const mainCount = (html.match(/<main\b/gi) ?? []).length;
  if (mainCount !== 1) {
    issues.push({ severity: "medium", rule: "main-landmark", detail: `Found ${mainCount} main elements` });
  }

  const scriptCount = (html.match(/<script\b/gi) ?? []).length;
  const gtm = html.includes("googletagmanager.com");

  return { name, issues, meta: { scriptCount, gtm, imgCount: imgs.length, blankTargetLinks: blankTargetLinks.length } };
}

const files = readdirSync(auditDir)
  .filter((f) => f.endsWith(".html"))
  .map((f) => join(auditDir, f))
  .sort();

const results = files.map(analyze);
console.log(JSON.stringify(results, null, 2));
