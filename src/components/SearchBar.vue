
<!-- HTML -->
<template>
<div>Holaaaaaa</div>
  <!-- Search bar -->
  <f7-searchbar
    cancel-link="Cancel"
    search-list="#search-list"
    placeholder="Search in items"
    :clear-button="true"
    @searchbar:search="onSearch"
    @searchbar:enable="onEnable"
    @searchbar:disable="onDisable"
    @searchbar:clear="onClear"
  ></f7-searchbar>

  <!-- Will be visible if there is no any results found, defined by "searchbar-not-found" class -->
  <f7-list class="searchbar-not-found">
    <f7-list-item title="Nothing found"></f7-list-item>
  </f7-list>

  <!-- Search-through list -->
  <f7-list class="searchbar-found" id="search-list">
    <f7-list-item v-for="item in items" :title="'Item ' + item" v-bind:key="item"></f7-list-item>
  </f7-list>

</template>

<script>
  export default {
    data: function () {
      return {
        items: (function () {
          var it = [];
          for (var i = 0; i < 100; i++) it.push(i+1);
          return it;
        })()
      }
    },
    methods: {
      onSearch: function (query, found) {
        console.log('search', query);
      },
      onClear: function (event) {
        console.log('clear');
      },
      onEnable: function (event) {
        console.log('enable');
      },
      onDisable: function (event) {
        console.log('disable');
      },
    }
  }
</script>