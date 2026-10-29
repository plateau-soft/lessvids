<script lang="ts">
  import Button from "./lib/Button.svelte";
  import { download_data } from "./stores/download";
  import { GM_download } from "$";

  function download() {
    const data = $download_data;
    if (!data?.download || !data?.metadata) return;
    const md = data.metadata;
    const filename = `${md.author} ${md.date} ${md.title} (${md.id}).mp4`;
    console.log(filename);

    GM_download({
      url: data.download,
      name: filename,
      saveAs: true,
    });
  }

  function metadata() {
    const md = $download_data?.metadata;
    if (!md) return;

    const filename = `${md.date} ${md.title} (${md.id}).json`;
    console.log(filename);

    const json = JSON.stringify(md, null, 2);
    const blob = new Blob([json], {
      type: "application/json",
    });
    const blob_URL = URL.createObjectURL(blob);

    GM_download({
      url: blob_URL,
      name: filename,
      onload: () => URL.revokeObjectURL(blob_URL),
      onerror: () => URL.revokeObjectURL(blob_URL),
    });
  }
</script>

<div id="lessvids">
  <Button label="Download" onclick={download}></Button>
  <Button
    label="Metadata"
    onclick={metadata}
    disabled={!$download_data?.metadata}
  ></Button>
</div>

<style>
  #lessvids {
    display: flex;
    background: #fff;
    border-bottom: 1px solid #e0e0e0;
    justify-content: center;
    align-items: center;
    padding: 16px 24px;
    gap: 24px;
  }
</style>
