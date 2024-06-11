<script lang="ts">
  interface QuartileInputProps {
    name: string;
    tokens: string[];
    save: (set: string[]) => void;
  }

  let { name = $bindable(), tokens = $bindable(), save }: QuartileInputProps = $props();

  function handleInput(input: HTMLInputElement, index: number) {
    const onInput = (event: Event) => {
      input.value = input.value.replace(/[^a-z]/g, '').toLowerCase();
      tokens[index] = input.value;
    };
    const onBlur = () => {
      tokens[index] = input.value;
    };

    input.addEventListener('input', onInput);
    input.addEventListener('blur', onBlur);
    return {
      destroy() {
        input.removeEventListener('input', onInput);
        input.removeEventListener('blur', onBlur);
      }
    };
  }

  function onClickSave() {
    save(tokens);
  }

  $effect(() => {
    if (tokens) save(tokens);
  });
</script>

<div class="form">
  <input list="names" type="text" bind:value={name} size="12" />
  {#if !tokens}
    <button onclick={onClickSave}>New</button>
  {/if}
</div>

<div class="tokens">
  {#each tokens as token, index}
    <input
      type="text"
      maxlength="4"
      class="token"
      value={token}
      use:handleInput={index}
      autocorrect="off"
      autocapitalize="off"
      autocomplete="off"
    />
  {/each}
</div>

<style>
  .form {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1em;
    width: 300px;

    input {
      font-size: 18px;
      padding: 0.333em;
      background-color: white;
      color: black;
      text-align: center;
      border: 2px solid rgb(133, 133, 210);
      border-radius: 5px;
      font-weight: bold;
      width: auto;
      flex-grow: 1;
    }

    button {
      font: inherit;
      border: 2px solid rgb(133, 133, 210);
      border-radius: 5px;
      background-color: #eee;
      padding: 0.333em 1em;
      height: auto;
      font-weight: bold;
    }
  }

  .tokens {
    display: grid;
    grid-template-columns: repeat(4, 64px);
    gap: 1em;
  }

  .token {
    box-sizing: border-box;
    padding: 0.5em 0.2em;
    background-color: white;
    color: black;
    text-align: center;
    border: 2px solid rgb(133, 133, 210);
    border-radius: 5px;
    font-weight: bold;
    font-size: 18px;
  }
</style>
