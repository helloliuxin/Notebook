<template>
  <div class="beian">
    <p>
      <a href="/">helloliuxin's Notebook</a>
    </p>
    <p>
      <a href="https://beian.miit.gov.cn/" target="_blank"
        >宁ICP备2020003142号-1</a
      >
    </p>
  </div>
</template>

<script>
export default {
  name: "beian"
};
</script>

<style scoped>
.beian {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  display: -webkit-box;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  background: #fff;
  z-index: 999;
}
.beian p {
  padding: 4px 10px;
  margin: 0;
}

.beian a {
  color: #bbb;
  font-size: 12px;
}
</style>
