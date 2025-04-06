<template>
    <div class="content">
        <h2 class="title">번호 등록</h2>
        <form @submit.prevent="submitForm">
            <div class="field">
                <label for="" class="label">제목</label>
                <div class="control">
                    <input type="text" class="input" v-model="data.regionText" required />
                </div>
            </div>
            <div class="field">
                <label for="" class="label">시작번호</label>
                <div class="control">
                    <input type="text" class="input" v-model="data.firstNumber" required />
                </div>
            </div>
            <div class="field">
                <label for="" class="label">끝번호</label>
                <div class="control">
                    <input type="text" class="input" v-model="data.lastNumber" required />
                </div>
            </div>
            <div class="field is-grouped">
                <div class="control">
                    <button class="button is-link">[번호 생성]</button>
                </div>
                <div class="control">
                    <button type="button" class="button" @click="goToMain">취소</button>
                </div>
            </div>
        </form>

        <!-- 01 tailwind -->
        <!-- 번호판 -->
        <div class="flex justify-center">
        <div 
        class="relative w-[400px] h-[200px] flex flex-col items-center justify-center rounded-lg border-4 shadow-lg"
        >
            <!-- 지역 및 문자 -->
            <span class="absolute top-6 left-6 text-[30px] font-bold tracking-wide">{{ data.regionText }}</span>

            <!-- 번호 -->
            <span class="text-[65px] font-bold tracking-wide">{{ data.firstNumber }}</span>
        </div>
        </div>

        {{ data.regionText }} | {{ data.firstNumber }} | {{ data.lastNumber }}
        <!-- 2 -->
        <div class="flex justify-center p-10 bg-gray-100">
            <svg :width="plateWidth" :height="plateHeight" viewBox="0 0 400 200">
            <!-- 번호판 배경 -->
            <rect x="0" y="0" width="400" height="200" fill="white" stroke="black" stroke-width="8" rx="10" ry="10"/>
            
            <!-- 지역 또는 한글 문자 -->
            <text x="50" y="70" font-size="40" font-weight="bold" fill="black">{{ data.regionText }}</text>
            
            <!-- 숫자 부분 -->
            <text x="100" y="150" font-size="70" font-weight="bold" fill="black">{{ data.firstNumber }}</text>
            </svg>
        </div>

        <!-- 3 -->
        <div class="flex justify-center p-10 bg-gray-100">
            <svg
            viewBox="0 0 335 155"
            width="500"
            height="230"
            xmlns="http://www.w3.org/2000/svg"
            class="rounded border shadow-md"
            >
            <!-- 배경 -->
            <rect width="335" height="155" fill="white" stroke="black" stroke-width="4" rx="10" />

            <!-- '임시' 텍스트 -->
            <text x="20" y="40" font-size="28" font-weight="bold" fill="black">{{ data.regionText }}</text>

            <!-- 차량 번호 -->
            <text x="167" y="90" font-size="40" font-weight="bold" text-anchor="middle" fill="black">
                {{ data.firstNumber }}
            </text>

            <!-- 유효기간 -->
            <!-- <text x="167" y="135" font-size="16" text-anchor="middle" fill="black">
                {{ validUntil }}까지
            </text> -->
            </svg>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
/* import { useNumberStore } from '../store/numberStore'; */
import { useRouter } from 'vue-router';
/* const numberStore = useNumberStore(); */
const router = useRouter();
const data = ref({
    regionText: '', firstNumber: '', lastNumber: '',
});
const plateWidth = 400;
const plateHeight = 200;

const submitForm = async () => {
    const formData = new FormData();
    formData.append('region', data.value.regionText);
    formData.append('first', data.value.firstNumber);
    formData.append('last', data.value.lastNumber);
    /* await numberStore.insertData(formData); */
}

</script>

<style scoped>

</style>