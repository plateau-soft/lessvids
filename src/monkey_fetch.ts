import { download_data, type Download_Data } from "./stores/download";
import { unsafeWindow } from "$";

type Fetch_Handler = (response: Response, url: string) => Promise<void>;
interface Tag_Data {
  id: number;
  count: number;
  label: string;
}

interface Raw_Video_Data {
  teaser: {
    filepath: string;
  };
  title: string;
  model: {
    displayName: string;
  };
  launchDate: string;
  url: string;
  id: string;
  videoDuration: string;
  size: string;
  tagList: Tag_Data[];
}

export class Monkey_Fetch {
  private handler?: Fetch_Handler;

  constructor(loc: string) {
    if (loc.startsWith("https://www.manyvids.com/Video/")) {
      this.handler = this.video_handler.bind(this);
      this.patch();
    }
    if (loc.startsWith("https://www.manyvids.com/Profile/")) {
      this.handler = this.profile_handler.bind(this);
      this.patch();
    }
  }

  _get_request_url(input: RequestInfo | URL): string {
    if (typeof input === "string") return input;
    if (input instanceof URL) return input.href;
    return input.url;
  }

  patch() {
    const _fetch = unsafeWindow.fetch;
    unsafeWindow.fetch = async (
      input: RequestInfo | URL,
      init?: RequestInit,
    ) => {
      const response = await _fetch.call(unsafeWindow, input, init);
      const url = this._get_request_url(input);
      if (this.handler) {
        await this.handler(response, url);
      }
      return response;
    };
  }

  async profile_handler(response: Response, url: string) {
    if (url.includes("sort=newest")) {
      const cloned = response.clone();
      const data = await cloned.json();
      console.log(data);
    }
  }

  async video_handler(response: Response, url: string) {
    const _is_video_request = (url: string) => {
      const parts = url.split("/");
      if (parts.length === 6 && parts[3] === "store" && parts[4] === "video") {
        return true;
      }
      return false;
    };

    if (_is_video_request(url)) {
      const clone = response.clone();
      const data = await clone.json();
      const clean_data = this._extract_download_data(data.data);
      download_data.update((current) => ({
        ...current,
        download: clean_data.download,
        metadata: clean_data.metadata,
      }));
      console.log(data);
    }
  }

  _extract_download_data(video: Raw_Video_Data): Download_Data {
    const _extract_tags = (tags: Tag_Data[]): Record<string, string> => {
      const tag_obj: Record<string, string> = {};
      for (const tag of tags) {
        const name = tag.label;
        const link = `https://www.manyvids.com/Vids/${name.toLowerCase()}`;
        tag_obj[name] = link;
      }
      return tag_obj;
    };

    const _sanitize_title = (title: string): string => {
      if (/\s{2,}/.test(title) || title !== title.trim()) {
        window.alert(`???\n${title}`);
      }
      const clean_title = title.trim().replace(/\s{2,}/g, " ");
      return clean_title;
    };

    return {
      download: video.teaser.filepath,
      metadata: {
        title: _sanitize_title(video.title),
        author: video.model.displayName,
        date: video.launchDate.split("T")[0],
        url: `https://www.manyvids.com${video.url}`,
        id: video.id,
        length: video.videoDuration,
        size: video.size,
        tags: _extract_tags(video.tagList),
      },
    };
  }
}
