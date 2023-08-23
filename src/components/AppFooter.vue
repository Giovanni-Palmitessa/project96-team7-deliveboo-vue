<script></script>
<template>
  <div
    class="text-white MyFooteer grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
  >
    <div class="cardFooter">
      <h1 class="mb-7 mt-4 font-bold text-xl">Scopri Deliveboo</h1>
      <ul>
        <li>Investitori</li>
        <li>Chi siamo</li>
        <li>Ristoranti</li>
        <li>Altro</li>
        <li>Pressroom</li>
        <li>Programmazione</li>
        <li>Design</li>
        <li>Lavora con noi</li>
        <li>Diventa nostro partner</li>
      </ul>
    </div>
    <div class="cardFooter">
      <h2 class="mb-7 mt-4 font-bold text-xl">Note Legali</h2>
      <ul>
        <li>Termini & Condizioni</li>
        <li>Informativa sulla privacy</li>
        <li>Cookies</li>
      </ul>
    </div>
    <div class="cardFooter">
      <h2 class="mb-7 mt-4 font-bold text-xl">Aiuto</h2>
      <ul>
        <li>Contatti</li>
        <li>FAQ</li>
        <li>Tipi di cucina</li>
        <li>Lavora con noi</li>
      </ul>
      Aiuto
    </div>
    <div class="cardFooter grid grid-cols-4">
      <h2 class="mb-4 mt-4 col-span-4 font-bold text-xl">
        Porta Deliveboo con te
      </h2>
      <div class="appStoreApple col-span-3"></div>
      <div class="appStoreGoogle col-span-3"></div>
    </div>
  </div>
  <div class="icon text-white">
    <i class="fa-brands fa-facebook"></i>
    <i class="fa-brands fa-twitter"></i>
    <i class="fa-brands fa-instagram"></i>
  </div>
</template>
<style scoped>
.icon {
  background-color: #2e3333;
  height: 50px;
}
.MyFooteer {
  background-color: #2e3333;
  padding: 50px;
  width: 100%;
}
.cardFooter {
  background-color: #434848;
  border-radius: 0.5rem;
  padding-left: 15px;
  padding-bottom: 20px;
}
li {
  margin-top: 0.8rem;
}
li:hover {
  color: #00846b;
}
.appStoreApple {
  background-image: url(public/img/download-on-the-app-store-apple-logo-svgrepo-com.svg);
  background-size: cover;
  background-repeat: no-repeat;
  height: 80px;
  width: 65%;
  background-position: center;
}
.appStoreGoogle {
  background-image: url(public/img/google-play-badge-logo-svgrepo-com.svg);
  background-size: cover;
  background-repeat: no-repeat;
  height: 80px;
  width: 65%;
  background-position: center;
}
</style>
