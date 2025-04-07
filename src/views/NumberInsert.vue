<template>
  <div class="content">
    <h2 class="title">임시 자동차 번호 등록</h2>
    <!-- 5 -->
    <form @submit.prevent="submitForm">
      <div class="flex flex-col items-center p-10 bg-gray-100 space-y-6">
        <!-- 시작일 & 종료일 선택기 -->
        <div class="flex space-x-4 items-center">
          <label class="text-lg font-semibold">시작일:</label>
          <input
            type="date"
            v-model="startDateInput"
            @change="updateStart"
            class="border px-2 py-1 rounded"
          />
          <label class="text-lg font-semibold">종료일:</label>
          <input
            type="date"
            v-model="endDateInput"
            @change="updateEnd"
            class="border px-2 py-1 rounded"
          />
        </div>

        <!-- 관할 기관 드롭다운 -->
        <div class="flex items-center space-x-4">
          <label class="text-lg font-semibold">관할 기관:</label>
          <select v-model="data.authority" class="border px-2 py-1 rounded">
            <option value="화성시장">화성시장</option>
            <option value="서울특별시장">서울특별시장</option>
            <option value="부산광역시장">부산광역시장</option>
            <option value="경기도지사">경기도지사</option>
            <option value="제주도지사">제주도지사</option>
          </select>
        </div>

        <!-- 번호 입력 -->
        <div class="flex space-x-4 items-center">
          <label class="text-lg font-semibold">번호:</label>
          <input
            type="text"
            v-model="data.startNumber"
            maxlength="5"
            class="border px-2 py-1 rounded w-32 text-center"
            placeholder="숫자 5자리"
          />
        </div>

        <!-- 임시운행번호판 SVG -->
        <svg
          viewBox="0 0 520 110"
          xmlns="http://www.w3.org/2000/svg"
          class="w-[520px] h-[110px] border border-black bg-white"
        >
        <!-- 외곽 테두리 -->
        <rect x="0" y="0" width="520" height="110" fill="white" stroke="black" />
          
          <!-- 대각선 선 두 줄 -->
    <svg class="absolute top-0 left-0 w-full h-full">
      <line x1="181" y1="110" x2="390" y2="0" stroke="red" stroke-width="3" />
      <line x1="254" y1="110" x2="463" y2="0" stroke="red" stroke-width="3" />
    </svg>

          <!-- 날짜 영역 -->
          <text x="30" y="35" font-size="25" font-weight="bold" fill="black">
            {{ formattedStartDate }}
          </text>
          <text x="30" y="60" font-size="25" font-weight="bold" fill="black">
            ~{{ formattedEndDate }} 까지
          </text>
          <text x="35" y="90" font-size="27" font-weight="bold" fill="black">
            {{ data.authority }}
          </text>

          <!-- 숫자 번호 -->
          <text
            x="325"
            y="90"
            font-size="100"
            font-weight="bold"
            text-anchor="middle"
            fill="black"
            letter-spacing="8"
            font-family="Arial, sans-serif"
          >
            {{ data.startNumber }}
          </text>
        </svg>
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link">[번호 생성]</button>
          </div>
          <div class="control">
            <button type="button" class="button" @click="goToMain">취소</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
/* import { useNumberStore } from '../store/numberStore'; */
import { useRouter } from "vue-router";
/* const numberStore = useNumberStore(); */
const router = useRouter();
const data = ref({
  authority: "",
  firstNumber: "",
  lastNumber: "",
});

const validUntil = ref("2025-04-30");

// 날짜 입력용 값 (HTML date input에 사용)
const dateInput = ref("2025-04-30");

// 날짜 변경 시 유효기간 갱신
const updateDate = () => {
  validUntil.value = formatDate(dateInput.value);
};

/* 5 */
const startDateInput = ref("2025-04-06");
const endDateInput = ref("2025-04-15");

const formattedStartDate = ref("25.04.06");
const formattedEndDate = ref("04.15");

const formatDate = (dateStr, short = false) => {
  const [yyyy, mm, dd] = dateStr.split("-");
  return short ? `${mm}.${dd}` : `${yyyy.slice(2)}.${mm}.${dd}`;
};

const updateStart = () => {
  formattedStartDate.value = formatDate(startDateInput.value);
};
const updateEnd = () => {
  formattedEndDate.value = formatDate(endDateInput.value, true);
};

const submitForm = async () => {
  const formData = new FormData();
  formData.append("region", data.value.authority);
  formData.append("first", data.value.firstNumber);
  formData.append("last", data.value.lastNumber);
  /* await numberStore.insertData(formData); */
};
</script>

<style scoped>
</style>