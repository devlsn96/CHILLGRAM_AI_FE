// 간단 폴링 유틸(최대 timeoutMs)
export async function pollJobUntilDone(
  jobId,
  { intervalMs = 10000, timeoutMs = 180000 } = {}, // 10초 간격, 3분 타임아웃
) {
  const started = Date.now();

  while (true) {
    const job = await fetchJob(jobId);
    const s = job?.status;

    if (s === "SUCCEEDED" || s === "FAILED") return job;

    if (Date.now() - started > timeoutMs) {
      throw new Error("제품 이미지 생성 시간이 초과되었습니다.");
    }

    await new Promise((r) => setTimeout(r, intervalMs));
  }
}
