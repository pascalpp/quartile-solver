<script lang="ts">
  import { createQRCode } from '$lib/create-qrcode';

  const { data } = $props();
  const options = $state(data.options);

  const svg = $derived(createQRCode(options));
</script>

<svelte:head>
  <title>QR Code</title>
  <style>
    html,
    body {
      margin: 0;
      padding: 0;
      font-family: system-ui;
      background-color: hsl(169, 40%, 80%);
    }
  </style>
</svelte:head>

<main>
  <form method="get" action="/">
    <h1>QR Code</h1>
    <label>
      URL
      <input name="url" type="text" bind:value={options.url} />
    </label>
    <label>
      Width
      <input name="width" type="number" size="4" bind:value={options.width} />
    </label>
    <label>
      <input name="logo" type="checkbox" bind:checked={options.showLogo} />
      Logo
    </label>
    <label>
      <input name="border" type="checkbox" bind:checked={options.showBorder} />
      Border
    </label>
    <button type="submit">Submit</button>
  </form>
  {@html svg}
  <details>
    <summary>SVG Output</summary>
    <textarea>{svg}</textarea>
  </details>
</main>

<style>
  main {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
    margin: auto;
  }
  h1 {
    margin: 0;
  }
  :global(svg) {
    max-width: 100%;
    height: auto;
    flex-shrink: 0;
  }
  form {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    line-height: 1;
  }
  h1 {
    font-size: 18px;
    margin-right: 1rem;
  }
  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    -webkit-user-select: none;
    user-select: none;
  }
  input {
    font: inherit;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 0.25rem 0.5rem;
  }
  input[name='url'] {
    width: 30rem;
  }
  input[name='width'] {
    width: 4rem;
  }
  details {
    width: 100%;
    text-align: center;
  }
  textarea {
    width: 100%;
    height: 50vh;
    overflow-y: auto;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 0.5rem;
    margin-block: 1rem;
    font-family: monospace;
    font-size: 16px;
  }
  button {
    font: inherit;
    padding: 0.25rem 0.75rem;
    border-radius: 5px;
    border: 1px solid #666;
    background-color: #eee;
  }
</style>
