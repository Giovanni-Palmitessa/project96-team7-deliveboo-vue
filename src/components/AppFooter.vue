<script></script>
<template>
  <div
    class="text-white MyFooteer grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
  >
    <div class="cardFooter">
      <h1 class="mb-7 mt-4 font-bold text-xl">Scopri Deliveboo</h1>
      <ul>
        <li><a href="#">Investitori</a></li>
        <li><a href="#">Chi siamo</a></li>
        <li><a href="#">Ristoranti</a></li>
        <li><a href="#">Altro</a></li>
        <li><a href="#">Pressroom</a></li>
        <li><a href="#">Programmazione</a></li>
        <li><a href="#">Design</a></li>
        <li><a href="#">Lavora con noi</a></li>
        <li><a href="#">Diventa nostro partner</a></li>
      </ul>
    </div>
    <div class="cardFooter">
      <h2 class="mb-7 mt-4 font-bold text-xl">Note Legali</h2>
      <ul>
        <li><a href="#">Termini & Condizioni</a></li>
        <li><a href="#">Informativa sulla privacy</a></li>
        <li><a href="#">Cookies</a></li>
      </ul>
    </div>
    <div class="cardFooter">
      <h2 class="mb-7 mt-4 font-bold text-xl">Aiuto</h2>
      <ul>
        <li><a href="#">Contatti</a></li>
        <li><a href="#">FAQ</a></li>
        <li><a href="#">Tipi di cucina</a></li>
        <li><a href="#"></a></li>
      </ul>
    </div>
    <div class="cardFooter flex flex-col">
      <h2 class="my-4 font-bold text-xl">Porta Deliveboo con te</h2>
      <a href="#" class="appStoreApple w-40 mb-4"></a>
      <a href="#" class="appStoreGoogle w-40"></a>
    </div>
  </div>
  <div class="icon text-white flex items-center gap-4 px-[50px] pb-4">
    <a href="#"
      ><i class="fa-brands fa-facebook text-2xl hover:text-b_hover"></i
    ></a>
    <a href="#"
      ><i class="fa-brands fa-twitter text-2xl hover:text-b_hover"></i
    ></a>
    <a href="#"
      ><i class="fa-brands fa-instagram text-2xl hover:text-b_hover"></i
    ></a>
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
  height: 50px;
  /* width: 65%; */
  background-position: center;
}
.appStoreGoogle {
  background-image: url(public/img/google-play-badge-logo-svgrepo-com.svg);
  background-size: cover;
  background-repeat: no-repeat;
  height: 50px;
  /* width: 65%; */
  background-position: center;
}
</style>
