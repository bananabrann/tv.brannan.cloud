<script lang="ts">
  import type ChatMessage from "$lib/types/ChatMessage.interface";
  export let message: ChatMessage;
  import humanPng from "$lib/assets/png/human-female.png";
  import robotPng from "$lib/assets/png/robot.png";
  import { fly } from "svelte/transition";
</script>

<div
  class={`chat-message ${message.role === "user" ? "user-container" : ""} 
${message.role === "assistant" ? "robot-container" : ""}
${message.role === "system" ? "system-container" : ""}`}
  in:fly={{ y: 50, duration: 500 }}
>
  {#if message.role === "user" || message.role === "assistant"}
    <img
      class="avatar"
      src={message.role === "user" ? humanPng : robotPng}
      alt={`${message.role} picture`}
    />
  {/if}
  {#if message.role === "system"}
    <!-- <img src={system} alt=""> -->
  {/if}

  <div
    class={`message-content 
  ${message.role === "user" ? "user-message" : ""} 
  ${message.role === "assistant" ? "robot-message" : ""}
  ${message.role === "system" ? "system-message" : ""}
  `}
  >
    <p>{message.content}</p>
    {#if message.role !== "system"}
      <small>From {message.role === "user" ? "you" : "the robot"}</small>
    {/if}
  </div>
</div>

<style lang="scss">
  $robot-color: #935299;
  $human-color: $light-color;
  $breakpoint: 500px;

  .chat-message {
    z-index: 1;
    display: flex;
    justify-content: flex-start;
    margin-right: 4px;

    .avatar {
      max-height: 90px;
      margin: 0 10px;
      @media screen and (max-width: $breakpoint) {
        width: 50px;
        height: 50px;
        margin: 0;
      }
    }
  }

  .user-container {
    flex-direction: row-reverse;
  }

  .message-content {
    @include box-shadow();
    background-color: adjust-color($color: $dark-color, $lightness: 5%);
    padding: 1rem;
    margin: 0 15px;
    border-radius: 2rem;
    width: 80%;

    p {
      @media screen and (max-width: $breakpoint) {
        font-size: 0.9rem;
        padding: 0;
        margin: 0;
      }
    }
    @media screen and (max-width: $breakpoint) {
      padding: 0.75rem;
      border-radius: 1rem;
    }
  }

  .user-message {
    border-top-right-radius: 0;
    border: $human-color solid 2px;
    white-space: pre;
  }

  .robot-message {
    border-top-left-radius: 0;
    border: $robot-color solid 2px;
  }

  .system-message {
    box-shadow: none;
    border-radius: 0;
    color: $danger-color;
    background-color: adjust-color($dark-color, $lightness: 0%);
    text-align: center;
    padding: 0;
    p {
      margin: 0;
    }
  }
</style>
