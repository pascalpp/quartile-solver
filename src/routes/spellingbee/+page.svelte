<script lang="ts">
  import SpellingBeeInput from './SpellingBeeInput.svelte';

  const title = 'Spelling Bee Solver';
</script>

<svelte:head>
  <title>{title}</title>
  <style>
    html,
    body {
      margin: 0;
      padding: 0;
      font-family: system-ui;
      font-size: 16px;
      line-height: 1.5;
      background-color: white;
    }
  </style>
</svelte:head>

<main>
  <h1>{title}</h1>

  <!-- <datalist id="names">
    {#each names as name}
      <option value={name}>{name}</option>
    {/each}
  </datalist> -->

  <SpellingBeeInput letters="olhbint" />
</main>

<style>
  main {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  h1 {
    margin: 0;
  }

  summary {
    font-weight: bold;
    margin: 0;
    font-size: 22px;
    margin-bottom: 0.5em;
  }

  .words {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    max-width: 600px;
  }

  button {
    font: inherit;
    border: 1px solid rgb(0 0 0 / 0.5);
    border-radius: 5px;
    background-color: #eee;
    padding: 0.333em 1em;
    height: auto;
    font-weight: bold;

    &[disabled] {
      background-color: #333;
      color: white;
    }
  }

  .button-bar {
    display: flex;
    flex-direction: row;
    gap: 0px;

    button {
      border-radius: 0px;
      min-width: 4em;
      &:first-child {
        border-top-left-radius: 40px;
        border-bottom-left-radius: 40px;
        padding-left: 1.25em;
      }
      &:last-child {
        border-top-right-radius: 40px;
        border-bottom-right-radius: 40px;
        padding-right: 1.25em;
      }

      & + button {
        border-left: 0px;
      }
    }
  }
</style>
