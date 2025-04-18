<template>
  <div class="content" style="height: 100vh; display: flex; flex-direction: column;">
    <div style="position: sticky; top: 90px; background-color: white; z-index: 10; padding-top: 5px;">
      <form @submit.prevent="submitForm">
        <div class="flex flex-col items-center space-y-6">
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
              <option disabled value="">선택 또는 직접 입력</option>
              <option value="화성시장">화성시장</option>
              <option value="서울특별시장">서울특별시장</option>
              <option value="부산광역시장">부산광역시장</option>
              <option value="경기도지사">경기도지사</option>
              <option value="제주도지사">제주도지사</option>
              <option value="custom">직접 입력</option>
            </select>
            <input
              v-if="data.authority === 'custom'"
              type="text"
              v-model="customAuthority"
              placeholder="기관명을 입력하세요."
              class="border px-2 py-1 rounded"
            />
          </div>

          <!-- 번호 입력 -->
          <div class="flex space-x-4 items-center">
            <label class="text-lg font-semibold">시작 번호:</label>
            <input
              type="text"
              v-model="data.startNumber"
              maxlength="5"
              class="border px-2 py-1 rounded w-32 text-center"
              placeholder="숫자 5자리"
            />
            <label for="" class="text-lg font-semibold">종료 번호:</label>
            <input
              type="text"
              v-model="data.endNumber"
              maxlength="5"
              class="border px-2 py-1 rounded w-32 text-center"
              placeholder="숫자 5자리"
            />
          </div>

          <div class="field is-grouped flex space-x-4 pb-5">
            <div class="control">
              <button
                class="button px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
              >
                번호 생성
              </button>
            </div>
            <div class="control">
              <button
                class="button px-6 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition"
                @click="exportToPDF"
              >
                PDF 저장
              </button>
            </div>
            <div class="control">
              <button
                type="button"
                class="button px-6 py-2 bg-gray-200 text-gray-800 rounded shadow hover:bg-gray-400 transition"
                @click="reset"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>

    <div style="overflow-y: auto; flex: 1; padding: 20px;">
      <div v-show="showPlates" v-for="num in generatedNumbers" :key="num">
        <svg
          viewBox="0 0 520 110"
          xmlns="http://www.w3.org/2000/svg"
          class="plate-to-export w-[520px] h-[110px] border border-black bg-white mb-4"
        >
          <!-- 외곽 테두리 -->
          <rect
            x="0"
            y="0"
            width="520"
            height="110"
            fill="white"
            stroke="black"
          />

          <!-- 대각선 선 두 줄 -->
          <line
            x1="181"
            y1="110"
            x2="390"
            y2="0"
            stroke="red"
            stroke-width="3"
          />
          <line
            x1="254"
            y1="110"
            x2="463"
            y2="0"
            stroke="red"
            stroke-width="3"
          />

          <!-- 날짜 영역 -->
          <text
            x="30"
            y="35"
            font-size="23"
            font-weight="bold"
            fill="black"
            font-family="Nanum Gothic"
          >
            {{ formattedStartDate }}
          </text>
          <text
            x="30"
            y="60"
            font-size="23"
            font-weight="bold"
            fill="black"
            font-family="Nanum Gothic"
          >
            ~{{ formattedEndDate }} 까지
          </text>
          <text
            x="35"
            y="90"
            font-size="25"
            font-weight="bold"
            fill="black"
            font-family="Nanum Gothic"
          >
            {{ data.authority }}
          </text>

          <!-- 숫자 번호 -->
          <text
            x="325"
            y="88"
            font-size="100"
            font-weight="bold"
            text-anchor="middle"
            fill="black"
            letter-spacing="8"
            font-family="Roboto Mono"
            monospace
          >
            {{ num }}
          </text>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from "vue";
/* import { useNumberStore } from '../store/numberStore'; */
import { useRouter } from "vue-router";
/* const numberStore = useNumberStore(); */
import jsPDF from "jspdf";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const router = useRouter();
const data = ref({
  authority: "",
  startNumber: "",
  endNumber: "",
});

const customAuthority = ref("");

const showPlates = ref(false);

const today = new Date().toISOString().split("T")[0];
const startDateInput = ref(today);
const endDateInput = ref(today);

const formatDate = (dateStr, short = false) => {
  const [yyyy, mm, dd] = dateStr.split("-");
  return short ? `${mm}.${dd}` : `${yyyy.slice(2)}.${mm}.${dd}`;
};

const formattedStartDate = ref(formatDate(today));
const formattedEndDate = ref(formatDate(today, true));

const updateStart = () => {
  formattedStartDate.value = formatDate(startDateInput.value);
};
const updateEnd = () => {
  formattedEndDate.value = formatDate(endDateInput.value, true);
};

const padNumber = (num) => num.toString().padStart(5, "0");

const generatedNumbers = computed(() => {
  const start = parseInt(data.value.startNumber);
  const end = parseInt(data.value.endNumber);
  if (isNaN(start) || isNaN(end) || start > end) return [];
  const range = [];
  for (let i = start; i <= end; i++) {
    range.push(padNumber(i));
  }
  return range;
});

const reset = () => {
  data.value.authority = "";
  data.value.startNumber = "";
  data.value.endNumber = "";
  customAuthority.value = "";
  startDateInput.value = today;
  endDateInput.value = today;
  formattedStartDate.value = formatDate(today);
  formattedEndDate.value = formatDate(today, true);
  showPlates.value = false;
};

const exportToPDF = async () => {
  /* await nextTick();
  await delay(100); */

  const elements = document.querySelectorAll(".plate-to-export");
  if (elements.length === 0) {
    alert("번호판이 생성되지 않았습니다. 먼저 번호 생성 버튼을 눌러주세요.");
    return;
  }

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: [520 / 3.78, 110 / 3.78],
  });

  for (let i = 0; i < elements.length; i++) {
    const svgElement = elements[i];
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const img = new Image();
    img.src = url;

    await new Promise((resolve) => {
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 520 * 2;
        canvas.height = 110 * 2;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const imgData = canvas.toDataURL("image/jpeg");
        const width = 520 / 3.78;
        const height = 110 / 3.78;
        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, 0, width, height);

        URL.revokeObjectURL(url);
        resolve();
      };
    });
  }

  pdf.save("license_plates.pdf");
};

const submitForm = async () => {
  await nextTick(); // DOM 업데이트 기다림

  if (data.value.authority === "custom") {
    data.value.authority = customAuthority.value;
  }

  if (!data.value.authority || data.value.authority.trim() === '') {
    alert('관할 기관을 입력하거나 선택해주세요.');
    return;
  }

  const startStr = data.value.startNumber;
  const endStr = data.value.endNumber;

    if (startStr.length !== 5 || endStr.length !== 5 || isNaN(Number(startStr)) || isNaN(Number(endStr))) {
    alert('시작 번호와 종료 번호는 5자리 숫자여야 합니다.');
    return;
  }

  const start = parseInt(startStr, 10);
  const end = parseInt(endStr, 10);

  if (start > end) {
    alert('시작 번호는 종료 번호보다 작거나 같아야 합니다.');
    return;
  }

  // 재렌더링을 위해 먼저 false 처리
  showPlates.value = false;
  await nextTick(); // DOM 업데이트 기다림

  /* const formData = new FormData();
  formData.append("authority", data.value.authority);
  formData.append("start", data.value.startNumber);
  formData.append("end", data.value.endNumber); */
  /* await numberStore.insertData(formData); */

  showPlates.value = true; // 다시 보여줌
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");
* {
  font-family: "Nanum Gothic", sans-serif;
}
</style>