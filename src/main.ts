import { mount, unmount } from "svelte";
import Video from "./Video.svelte";
import { Monkey_Fetch } from "./monkey_fetch";

const VIDEO_PREFIX = "https://www.manyvids.com/Video/";
const PROFILE_PREFIX = "https://www.manyvids.com/Profile/";

const CONTAINER_SELECTOR =
  ".videoPage-module-scss-module__g0T5Hq__activityLeft";

let app_instance: ReturnType<typeof mount> | undefined;
let mounted_target: HTMLElement | undefined;

function remove_app() {
  if (app_instance) {
    unmount(app_instance);
    app_instance = undefined;
  }

  mounted_target = undefined;
}

function is_visible(element: HTMLElement): boolean {
  const style = getComputedStyle(element);
  return style.display !== "none";
}

function get_active_target(): HTMLElement | undefined {
  return [...document.querySelectorAll<HTMLElement>(CONTAINER_SELECTOR)].find(
    is_visible,
  );
}

function reconcile_page() {
  const is_video_page = window.location.href.startsWith(VIDEO_PREFIX);

  if (!is_video_page) {
    remove_app();
    return;
  }

  const target = get_active_target();

  if (!target) {
    remove_app();
    return;
  }

  if (target === mounted_target && app_instance) return;

  remove_app();

  app_instance = mount(Video, {
    target,
    anchor: target.firstChild ?? undefined,
  });

  mounted_target = target;
}

function start() {
  if (!document.body) {
    document.addEventListener("DOMContentLoaded", start, { once: true });
    return;
  }

  const observer = new MutationObserver(() => {
    reconcile_page();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class", "style"],
  });

  window.navigation.addEventListener("navigate", (event) => {
    if (event.destination.url !== window.location.href) {
      remove_app();
    }
  });

  window.navigation.addEventListener("navigatesuccess", () => {
    reconcile_page();
  });

  reconcile_page();
}

const monkey = new Monkey_Fetch(window.location.href);

start();
