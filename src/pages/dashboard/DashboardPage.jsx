import {
  LayoutGrid,
  Image as ImageIcon,
  TrendingUp,
  Package,
  Share2,
  FileText,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import Container from "@/components/common/Container";
import Card from "@/components/common/Card";
import { useAuthStore } from "@/stores/authStore";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { QuickButton } from "@/components/common/QuickButton";
import { StatItem } from "@/components/common/StatItem";
import { ACTIVITIES_LOGS } from "@/data/activity";

export default function DashboardPage() {
  const navigator = useNavigate();
  const user = useAuthStore((s) => s.user);

  return (
    <div className="min-h-full py-8">
      <Container>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-black text-[#3b312b]">대시보드</h1>
          </div>
          <p className="text-lg text-gray-500 font-medium">
            환영합니다, {user?.name ?? "사용자"}님!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <StatItem
            title="진행 중 프로젝트"
            value="3"
            icon={LayoutGrid}
            color="text-blue-500"
          />
          <StatItem
            title="생성된 광고"
            value="12"
            icon={ImageIcon}
            color="text-green-500"
          />
          <StatItem
            title="SNS 게시 수"
            value="24"
            icon={TrendingUp}
            color="text-purple-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ErrorBoundary>
              <Card className="h-full border border-gray-200 shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  최근 활동
                </h2>
                <p className="text-sm text-gray-400 mb-8">
                  최근에 수행한 작업들입니다
                </p>
                <div className="space-y-4">
                  {ACTIVITIES_LOGS.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center p-5 bg-[#F9FAFB] rounded-3xl hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div>
                        <div className="font-bold text-gray-800 text-lg">
                          {item.title}
                        </div>
                        <div className="text-sm text-gray-400 mt-1">
                          {item.type}
                        </div>
                      </div>
                      <div className="text-sm text-gray-400">{item.time}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </ErrorBoundary>
          </div>

          <div>
            <ErrorBoundary>
              <Card className="h-full border border-gray-200 shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  바로 시작하기
                </h2>
                <p className="text-sm text-gray-400 mb-8">
                  빠른 작업을 시작하세요
                </p>
                <div className="flex flex-col gap-4">
                  <QuickButton
                    icon={Package}
                    label="제품 관리"
                    onClick={() => navigator("/dashboard/products")}
                  />
                  <QuickButton
                    icon={Share2}
                    label="SNS 관리"
                    onClick={() => navigator("/dashboard/sns")}
                  />
                  <QuickButton
                    icon={FileText}
                    label="분석 & 리포트"
                    onClick={() => navigator("/dashboard/analytics")}
                  />
                </div>
              </Card>
            </ErrorBoundary>
          </div>
        </div>
      </Container>
    </div>
  );
}
