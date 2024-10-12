<script lang="ts">
  import { getSpellingBeeWords } from './getSpellingBeeWords';
  import SpellingBeeInput from './SpellingBeeInput.svelte';

  const title = 'Spelling Bee Solver';

  let letters = $state(''.toUpperCase());

  let words = $derived(getSpellingBeeWords(letters));

  $inspect(words);
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

  <SpellingBeeInput bind:letters />

  <h2>{letters}</h2>
  {#if words.pangrams.length > 0}
    <details>
      <summary>Pangrams: {words.pangrams.length}</summary>
      <div class="words">
        {#each words.pangrams as word}
          <div>{word}</div>
        {/each}
      </div>
    </details>
  {/if}

  {#if words.other.length > 0}
    <details>
      <summary>Other matches: {words.other.length}</summary>
      <div class="words">
        {#each words.other as word}
          <div>{word}</div>
        {/each}
      </div>
    </details>
  {/if}
</main>

<style>
  main {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
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
