<script lang="ts">
  import { Dictionary, getSpellingBeeWords } from './getSpellingBeeWords';
  import SpellingBeeInput from './SpellingBeeInput.svelte';

  const title = 'Spelling Bee Solver';

  let letters = $state(''.toUpperCase());
  let dictionary = $state(Dictionary.collins);

  let words = $derived(getSpellingBeeWords(letters, dictionary));
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

  <p class="note">
    Enter the letters from <span class="nowrap">Spelling Bee</span> to find matching words.</p
  >

  <SpellingBeeInput bind:letters />

  <h2>{letters}</h2>
  {#if words && words.pangrams.length > 0}
    <details>
      <summary>Pangrams: {words.pangrams.length}</summary>
      <div class="words">
        {#each words.pangrams as word}
          <div>{word}</div>
        {/each}
      </div>
    </details>
  {/if}

  {#if words && words.other.length > 0}
    <details>
      <summary>Other matches: {words.other.length}</summary>
      <div class="words">
        {#each words.other as word}
          <div>{word}</div>
        {/each}
      </div>
    </details>
  {/if}

  <p class="note">
    The official <span class="nowrap">Spelling Bee</span> dictionary is not publicly available, so this
    solver may return matches that are not accepted by the game.
  </p>

  <div class="button-bar">
    <button
      onclick={() => (dictionary = Dictionary.collins)}
      disabled={dictionary === Dictionary.collins}
    >
      Collins
    </button>
    <button
      onclick={() => (dictionary = Dictionary.sowpods)}
      disabled={dictionary === Dictionary.sowpods}
    >
      SowPods
    </button>
    <button onclick={() => (dictionary = Dictionary.twl)} disabled={dictionary === Dictionary.twl}>
      TWL
    </button>
    <button
      onclick={() => (dictionary = Dictionary.american)}
      disabled={dictionary === Dictionary.american}
    >
      American
    </button>
  </div>
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

  details {
    text-align: center;
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
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: clamp(200px, 95vw, 600px);
  }

  .note {
    max-width: 40ch;
    font-style: italic;
    font-family: serif;
    text-align: center;
    text-wrap: balance;
    font-size: 1.2em;
  }

  .nowrap {
    white-space: nowrap;
  }

  button {
    font: inherit;
    border: 1px solid rgb(0 0 0 / 0.3);
    border-radius: 5px;
    background-color: #f3f3f3;
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
