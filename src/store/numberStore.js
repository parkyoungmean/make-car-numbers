import { defineStore } from 'pinia';
/* 520p */
export const useNumberStore = defineStore('number', {
    state: {
        dataList: [],
        currentData: null,
    },
    actions: {
        async fetchDataList() {
            try {
                const response = await fetch();
            } catch (error) {
                constole.error('자료 목록을 가져오는 중 오류 발생:', error);
            }
        },
        async fetchDataDetail(dno) {
            try {
                const response = await fetch();
            } catch (error) {
                console.error('자료 상세 정보를 가져오는 중 오류 발생:', error);
            }
        },
        async insertData(formData) {
            try {
                const response = await fetch('')
            } catch (error) {
                console.error('자료를 등록하는 중 오류 발생', error);
            }
        },
        async updateData(dno, formData) {
            try {
                
            } catch (error) {
                console.error('자료를 수정하는 중 오류 발생', error);
            }
        },
        async deleteData() {
            try {
                const response = await fetch();
            } catch (error) {
                console.error('자료를 삭제하는 중 오류 발생', error);
            }
        },
    },
});