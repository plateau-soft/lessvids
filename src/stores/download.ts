import { writable } from "svelte/store";

interface Metadata {
  title: string;
  author: string;
  date: string;
  url: string;
  id: string;
  length: string;
  size: string;
  tags: Record<string, string>;
}
export interface Download_Data {
  download?: string;
  metadata?: Metadata;
}

export const download_data = writable<Download_Data | null>(null);
