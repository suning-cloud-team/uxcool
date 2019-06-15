<template>
  <div>
    <ux-pagination :current="5"
                   :total="500"
                   show-quick-jumper />
    <br>
    <ux-pagination :current="5"
                   :total="500"
                   :show-quick-jumper-confirm-btn="false"
                   show-quick-jumper />
  </div>
</template>
