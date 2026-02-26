import { BarChart3, DollarSign, Eye, Target } from "lucide-react";

export const STATS = [
    {
      title: "총 매출",
      value: "₩7,500,000",
      trend: "+12.5%",
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      title: "ROI",
      value: "268%",
      trend: "+8.3%",
      icon: BarChart3,
      color: "text-blue-500",
    },
    {
      title: "총 조회수",
      value: "13,200",
      trend: "+18.2%",
      icon: Eye,
      color: "text-purple-500",
    },
    {
      title: "전환율",
      value: "4.8%",
      trend: "-0.5%",
      icon: Target,
      color: "text-orange-500",
    },
  ];

export const LINE = [
  { name: "월", 조회수: 1100, 클릭: 400, 전환: 50 },
  { name: "화", 조회수: 1900, 클릭: 550, 전환: 60 },
  { name: "수", 조회수: 1500, 클릭: 480, 전환: 55 },
  { name: "목", 조회수: 2100, 클릭: 650, 전환: 80 },
  { name: "금", 조회수: 2500, 클릭: 720, 전환: 95 },
  { name: "토", 조회수: 2200, 클릭: 680, 전환: 85 },
  { name: "일", 조회수: 1800, 클릭: 520, 전환: 65 },
];

export const BAR = [
  { name: "1월", 매출: 4500, 광고비: 2100 },
  { name: "2월", 매출: 5200, 광고비: 2400 },
  { name: "3월", 매출: 6100, 광고비: 2800 },
  { name: "4월", 매출: 5800, 광고비: 2500 },
  { name: "5월", 매출: 6800, 광고비: 2900 },
  { name: "6월", 매출: 7800, 광고비: 3200 },
];
