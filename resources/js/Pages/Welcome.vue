<script setup>
import { Link } from '@inertiajs/vue3'

</script>

<template>

    <div class="flex justify-center items-center h-screen px-16">
        <div class="grid grid-cols-2 gap-16">
        <!-- Thumbnail 1 -->
        <Link href="/mapa" class="bg-white p-4 rounded-md text-center flex justify-center items-center flex-col transition duration-500 hover:bg-gray-200">
            <img src="leaflet.png" alt="Thumbnail do Mapa" class="max-w-full h-auto rounded-md mb-4">
            <div class="text-lg font-semibold">Leaftlet</div>
        </Link>

        <!-- Thumbnail 2 -->
        <Link href="/grafico" class="bg-white p-4 rounded-md text-center flex justify-center items-center flex-col transition duration-500 hover:bg-gray-200" >
            <img src="chartjs.png" alt="Thumbnail do Gráfico" class="max-w-full h-auto rounded-md mb-4">
            <div class="text-lg font-semibold">Chart JS</div>
        </Link>
        </div>
  </div>
</template>

<style scoped>
body {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
        }

        .thumbnail-container {
            display: flex;
            justify-content: space-around;
            width: 80%;
        }

        .thumbnail {
            flex: 1;
            margin: 10px;
            text-align: center;
        }

        .thumbnail img {
            max-width: 100%;
            height: auto;
            border: 1px solid #ddd;
            border-radius: 4px;
        }

        .thumbnail-caption {
            margin-top: 10px;
            font-size: 18px;
            color: #333;
        }
</style>
