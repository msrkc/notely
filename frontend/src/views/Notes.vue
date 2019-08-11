<template>
  <div id="app">
    <Header />
    <div class="notes"><Sidebar /><Pad /></div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Pad from "@/components/Pad";
import Sidebar from "@/components/Sidebar";

export default {
  name: "AppNotes",
  components: {
    Header,
    Pad,
    Sidebar
  }
};
</script>
<style lang="stylus" scoped>
.notes {
  display: flex;
  height: 100%;
}
</style>
