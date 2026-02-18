import {
  Users,
  Package,
  FileText,
  MoreHorizontal,
  Instagram,
  Facebook,
  Twitter,
  TrendingUp,
  Clock,
  CheckCircle2,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

import Container from "@/components/common/Container";
import Card from "@/components/common/Card";
import { OPERATOR } from "@/data/users";
import { PRODUCTS } from "@/data/products";
import { SNSProgress } from "@/components/sns/SNSProgress";
import { ProjectItem } from "@/components/products/ProjectItem";
import { TREND_DATA } from "@/data/trend";
import { ACTIVITIES_LOGS, ACTIVITIES_SUM } from "@/data/activity";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-full bg-[#F2F4F7] py-10 font-sans">
      <Container>
        {/* 상단 헤더 */}
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-[28px] font-bold text-[#101828]">
              관리자 대시보드
            </h1>
            <p className="text-sm text-[#667085] mt-1">
              전체 시스템 운영 현황 및 통계
            </p>
          </div>
          <div className="flex gap-3 mt-2">
            <select className="bg-white border border-[#D0D5DD] rounded-lg px-4 py-2 text-sm font-semibold text-[#344054] shadow-sm outline-none">
              <option>최근 7일</option>
            </select>
            <select className="bg-white border border-[#D0D5DD] rounded-lg px-4 py-2 text-sm font-semibold text-[#344054] shadow-sm outline-none">
              <option>전체</option>
            </select>
          </div>
        </div>

        {/* 1. 상단 요약 카드 섹션 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 border-none shadow-sm bg-white rounded-3xl">
            <div className="flex justify-between items-start mb-10">
              <span className="text-[15px] font-medium text-[#667085]">
                전체 운영자
              </span>
              <Users size={20} className="text-[#2E90FA]" />
            </div>
            <div className="text-[32px] font-bold text-[#101828]">
              {OPERATOR.length}명
            </div>
            <div className="text-sm font-semibold text-[#12B76A] mt-1">
              활성: {OPERATOR.filter((o) => o.status === "활성").length}명
            </div>
          </Card>

          <Card className="p-6 border-none shadow-sm bg-white rounded-3xl">
            <div className="flex items-center gap-2 mb-6 text-[#667085]">
              <FileText size={18} className="text-[#7F56D9]" />
              <span className="text-[15px] font-medium">
                최근 진행 프로젝트
              </span>
            </div>
            <div className="space-y-4">
              <ProjectItem
                tag="광고 생성"
                title="발렌타인데이 캠페인"
                user="조은영"
                time="2시간 전"
                tagColor="bg-[#F9F5FF] text-[#7F56D9] border-[#E9D7FE]"
              />
              <ProjectItem
                tag="도안 생성"
                title="신제품 패키지 도안"
                user="이매니저"
                time="3시간 전"
                tagColor="bg-[#EFF8FF] text-[#175CD3] border-[#D1E9FF]"
              />
            </div>
          </Card>

          <Card className="p-6 border-none shadow-sm bg-white rounded-3xl">
            <div className="flex justify-between items-start mb-10 text-[#667085]">
              <span className="text-[15px] font-medium">등록 제품</span>
              <Package size={20} className="text-[#12B76A]" />
            </div>
            <div className="text-[32px] font-bold text-[#101828]">
              {PRODUCTS.length}개
            </div>
            <div className="text-sm font-semibold text-[#F04438] mt-1">
              ⚠ 30일+ 미활동: 7개
            </div>
          </Card>
        </div>

        {/* 2. 트렌드 분석 & SNS 섹션 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 p-6 border-none shadow-sm bg-white rounded-3xl min-w-0">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-[#101828]">
                📈 트렌드 키워드 분석
              </h3>
              <p className="text-xs text-[#667085]">
                월별 트렌드 키워드 선택 추이
              </p>
            </div>
            {/* 고정 높이 또는 aspect 부여로 에러 해결 */}
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={TREND_DATA}
                  margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#EAECF0"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "#667085" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "#667085" }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Legend
                    iconType="circle"
                    wrapperStyle={{ paddingTop: "20px", fontSize: "12px" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="두쫀쿠"
                    stroke="#F04438"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="발렌타인데이"
                    stroke="#D946EF"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="건강한간식"
                    stroke="#12B76A"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6 border-none shadow-sm bg-white rounded-3xl">
            <div className="mb-8">
              <h3 className="text-lg font-bold text-[#101828]">
                📱 SNS 연결 현황
              </h3>
              <p className="text-xs text-[#667085]">플랫폼별 계정 연결 상태</p>
            </div>
            <div className="space-y-8">
              <SNSProgress
                icon={<Instagram size={18} className="text-[#E1306C]" />}
                label="Instagram"
                current={8}
                total={10}
                color="bg-[#E1306C]"
              />
              <SNSProgress
                icon={<Facebook size={18} className="text-[#1877F2]" />}
                label="Facebook"
                current={6}
                total={10}
                color="bg-[#1877F2]"
              />
              <SNSProgress
                icon={<Twitter size={18} className="text-[#1DA1F2]" />}
                label="Twitter"
                current={4}
                total={10}
                color="bg-[#1DA1F2]"
              />
            </div>
          </Card>
        </div>

        {/* 3. 하단 활동 통계 & 로그 섹션 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 p-6 border-none shadow-sm bg-white rounded-3xl min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={18} className="text-[#2E90FA]" />
              <h3 className="text-lg font-bold text-[#101828]">
                운영 활동 통계
              </h3>
            </div>
            <p className="text-xs text-[#667085] mb-8">
              누적 콘텐츠 생성 데이터
            </p>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ACTIVITIES_SUM}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#EAECF0"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fontWeight: 600 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11 }}
                  />
                  <Tooltip cursor={{ fill: "#F9FAFB" }} />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={60}>
                    {ACTIVITIES_SUM.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6 border-none shadow-sm bg-white rounded-3xl overflow-hidden">
            <div className="flex items-center gap-2 mb-1 text-[#101828]">
              <Clock size={18} className="text-[#667085]" />
              <h3 className="text-lg font-bold">최근 활동 로그</h3>
            </div>
            <p className="text-xs text-[#667085] mb-6">시스템 실시간 내역</p>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {ACTIVITIES_LOGS.map((log) => (
                <div
                  key={log.id}
                  className="p-4 bg-[#F9FAFB] rounded-2xl border border-[#F2F4F7] flex gap-3"
                >
                  <CheckCircle2
                    size={16}
                    className="text-[#12B76A] mt-1 flex-shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-[#101828]">
                        {log.user}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 bg-white border rounded text-[#344054] font-bold">
                        {log.type}
                      </span>
                    </div>
                    <p className="text-xs text-[#475467] leading-snug">
                      {log.title}
                    </p>
                    <p className="text-[10px] text-[#98A2B3] mt-1">
                      {log.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* 4. 운영자 테이블 목록 */}
        <Card className="p-6 border-none shadow-sm bg-white rounded-3xl overflow-hidden">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-[#101828]">
              운영자 관리 목록
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#EAECF0] text-[#667085]">
                  <th className="pb-4 font-semibold">이름</th>
                  <th className="pb-4 font-semibold">이메일</th>
                  <th className="pb-4 font-semibold">상태</th>
                  <th className="pb-4 font-semibold text-center">광고</th>
                  <th className="pb-4 font-semibold text-center">도안</th>
                  <th className="pb-4 font-semibold text-center">SNS</th>
                  <th className="pb-4 font-semibold text-right">상세</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAECF0]">
                {OPERATOR.map((op, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-[#F9FAFB] transition-colors cursor-pointer group"
                  >
                    <td className="py-4 font-bold text-[#101828]">{op.name}</td>
                    <td className="py-4 text-[#667085]">{op.email}</td>
                    <td className="py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-[11px] font-bold ${op.status === "활성" ? "bg-[#ECFDF3] text-[#027A48]" : "bg-[#F2F4F7] text-[#344054]"}`}
                      >
                        {op.status}
                      </span>
                    </td>
                    <td className="py-4 text-center font-medium">{op.ad}</td>
                    <td className="py-4 text-center font-medium">
                      {op.mockup}
                    </td>
                    <td className="py-4 text-center font-medium">{op.sns}</td>
                    <td className="py-4 text-right">
                      <button className="text-[#667085] group-hover:text-[#101828]">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </Container>
    </div>
  );
}
