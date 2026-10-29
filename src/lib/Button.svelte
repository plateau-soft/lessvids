<script lang="ts">
  import { onMount } from "svelte";

  let {
    label,
    onclick,
    disabled = false,
  }: {
    label: string;
    onclick?: (e: MouseEvent) => void;
    disabled?: boolean;
  } = $props();

  let main_color = $state("");
  let hover_color = $state("");
  onMount(() => {
    const site_button = document.querySelector(
      ".ItemActionButton-module-scss-module__nKPqYG__actionButton button",
    );
    if (!site_button) return;
    const styles = getComputedStyle(site_button);
    const before = getComputedStyle(site_button, "::before");
    main_color = styles.background;
    hover_color = before.background !== "none" ? before.background : "#b53bfe";
  });
</script>

<button
  class="custom-button"
  {onclick}
  {disabled}
  style:background={main_color}
  style={`--hover-color: ${hover_color}`}
>
  {label}
</button>

<style>
  .custom-button {
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    gap: 8px;
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 42px;
    padding: 0 16px;

    color: #fff;
    border: 0;
    border-radius: 90px;
    outline: none;
    cursor: pointer;

    font-size: 17px;
    font-weight: 700;
    line-height: 17px;
    text-transform: uppercase;
    text-decoration: none;

    transition: fill 0.3s ease-in-out !important;
    isolation: isolate;
  }

  .custom-button::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: var(--hover-color);
    opacity: 0;
    transition: opacity 0.3s ease-in-out !important;
  }

  .custom-button:hover::before {
    opacity: 1;
  }
</style>
