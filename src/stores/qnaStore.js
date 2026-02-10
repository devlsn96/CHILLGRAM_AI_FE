import { create } from "zustand";
import { devtools } from "zustand/middleware";
import * as qnaApi from "@/services/api/qnaApi";

const store = (set, get) => ({
    // State
    questions: [], // 전체 질문 목록 (클라이언트 필터링용)
    currentQuestion: null, // 현재 보고 있는 질문 상세
    isLoading: false,
    error: null,

    // UI State
    filterStatus: "all",
    searchQuery: "",

    // Actions
    setFilterStatus: (status) => set({ filterStatus: status }),
    setSearchQuery: (query) => set({ searchQuery: query }),

    // 질문 목록 조회
    fetchQuestions: async (params = { page: 0, size: 1000 }) => {
        set({ isLoading: true, error: null });
        try {
            const data = await qnaApi.fetchQuestions(params);
            set({ questions: data.content || [], isLoading: false });
        } catch (error) {
            console.error("fetchQuestions failed:", error);
            set({ error: error.message, isLoading: false });
        }
    },

    // 질문 상세 조회
    fetchQuestion: async (id) => {
        set({ isLoading: true, error: null, currentQuestion: null });
        try {
            const data = await qnaApi.fetchQuestion(id);
            set({ currentQuestion: data, isLoading: false });
        } catch (error) {
            console.error("fetchQuestion failed:", error);
            set({ error: error.message, isLoading: false });
        }
    },

    // 질문 등록
    createQuestion: async (payload) => {
        set({ isLoading: true, error: null });
        try {
            await qnaApi.createQuestion(payload);
            // 목록 갱신
            await get().fetchQuestions();
            set({ isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },

    // 질문 수정 (Update)
    updateQuestion: async (questionId, payload) => {
        // 로딩 상태를 전역으로 걸면 UI가 깜빡일 수 있으므로 필요한 경우에만
        try {
            await qnaApi.updateQuestion(questionId, payload);
            // 상세 정보 갱신
            await get().fetchQuestion(questionId);
            // 목록 정보 갱신 (제목 등이 바뀌었을 수 있음)
            get().fetchQuestions();
        } catch (error) {
            throw error;
        }
    },

    // 질문 삭제 (Soft Delete 포함)
    deleteQuestion: async (questionId) => {
        try {
            await qnaApi.deleteQuestion(questionId);
            // 목록 갱신
            await get().fetchQuestions();
            set({ currentQuestion: null });
        } catch (error) {
            throw error;
        }
    },

    // 답변 등록
    createAnswer: async (questionId, payload) => {
        try {
            await qnaApi.createAnswer(questionId, payload);
            // 상세 정보 갱신 (답변 목록 갱신)
            await get().fetchQuestion(questionId);
            // 목록 갱신 (답변 상태 변경 가능성)
            get().fetchQuestions();
        } catch (error) {
            throw error;
        }
    },

    // 답변 수정
    updateAnswer: async (questionId, answerId, payload) => {
        try {
            await qnaApi.updateAnswer(questionId, answerId, payload);
            await get().fetchQuestion(questionId);
        } catch (error) {
            throw error;
        }
    },

    // 답변 삭제
    deleteAnswer: async (questionId, answerId) => {
        try {
            await qnaApi.deleteAnswer(questionId, answerId);
            await get().fetchQuestion(questionId);
            get().fetchQuestions(); // 답변 개수나 상태가 변할 수 있음
        } catch (error) {
            console.warn("deleteAnswer failed, trying reload...", error);
            // 에러 발생해도 목록 갱신 시도
            await get().fetchQuestion(questionId);
            throw error;
        }
    }
});

export const useQnaStore = create(devtools(store));
