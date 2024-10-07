<template>
  <div class="p-datatable-table-container">
    <table class="w-full border-spacing-0 overflow-x-auto relative">
      <thead
        class="[&>tr>th]:px-[10.5px] [&>tr>th]:py-[14px] sticky top-0 bg-surface-0 dark:bg-surface-900 dark:[&>tr>th]:border-surface-800 [&>tr>th]:border-b"
      >
        <slot name="header" />
      </thead>
      <tbody
        class="[&>tr]:outline-transparent [&>tr>td]:px-[10.5px] [&>tr>td]:py-[14px] dark:[&>tr>td]:border-surface-800 [&>tr>td]:border-b"
      >
        <slot name="body" />
      </tbody>
    </table>
  </div>
</template>
