import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Instagram,
  Youtube,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Download,
  FileImage,
  Video,
  X,
} from "lucide-react";

import Container from "@/components/common/Container";
import useSnsStore from "@/stores/snsStore";

// 더미 콘텐츠 데이터 (모든 프로젝트의 SNS/Shorts 콘텐츠)
const DUMMY_SNS_CONTENTS = [
  {
    id: "sns-1",
    type: "sns",
    platform: "Instagram",
    title: "인스타그램 #두쫀쿠 이미지",
    description: "감성적인 스타일링 SNS 이미지",
    date: "2024-01-20",
    status: "활성",
    stats: { views: 15200, likes: 856, comments: 124, shares: 234 },
  },
  {
    id: "sns-2",
    type: "sns",
    platform: "Instagram",
    title: "인스타그램 릴스용",
    description: "트렌디한 컬러 포인트",
    date: "2024-01-10",
    status: "활성",
    stats: { views: 9800, likes: 567, comments: 89, shares: 123 },
  },
  {
    id: "shorts-1",
    type: "shorts",
    platform: "YouTube",
    title: "유튜브 쇼츠 영상",
    description: "30초 감각적인 초콜릿 언박싱 쇼츠",
    date: "2024-01-18",
    status: "활성",
    stats: { views: 28400, likes: 1523, comments: 245, shares: 445 },
  },
];

export default function SnsManagementPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("instagram");
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [connectingPlatform, setConnectingPlatform] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadingContent, setUploadingContent] = useState(null);
  const [uploadedItems, setUploadedItems] = useState([]);

  const {
    instagramAccount,
    youtubeAccount,
    connectInstagram,
    disconnectInstagram,
    connectYoutube,
    disconnectYoutube,
  } = useSnsStore();

  // 탭별 콘텐츠 필터링
  const filteredContents = DUMMY_SNS_CONTENTS.filter((item) =>
    activeTab === "instagram"
      ? item.platform === "Instagram"
      : item.platform === "YouTube"
  );

  // 총 통계 계산
  const totalStats = filteredContents.reduce(
    (acc, item) => ({
      views: acc.views + item.stats.views,
      likes: acc.likes + item.stats.likes,
      comments: acc.comments + item.stats.comments,
      shares: acc.shares + item.stats.shares,
    }),
    { views: 0, likes: 0, comments: 0, shares: 0 }
  );

  const handleConnect = (platform) => {
    setConnectingPlatform(platform);
    setIsConnectModalOpen(true);
  };

  const handleUploadClick = (item) => {
    setUploadingContent(item);
    setIsUploadModalOpen(true);
  };

  const handleUploadComplete = (contentId) => {
    setUploadedItems((prev) => [...prev, contentId]);
    setIsUploadModalOpen(false);
    setUploadingContent(null);
  };

  const isUploaded = (contentId) => uploadedItems.includes(contentId);

  return (
    <div className="min-h-full bg-[#F9FAFB] py-12">
      <Container>
        {/* 헤더 */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-[#111827] mb-2">SNS 관리</h1>
          <p className="text-[#9CA3AF] font-medium">
            Instagram과 YouTube 계정을 연결하고 콘텐츠를 관리하세요
          </p>
        </div>

        {/* 계정 연결 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Instagram 카드 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center">
                  <Instagram className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#111827]">Instagram</h3>
                  {instagramAccount.connected ? (
                    <p className="text-sm text-gray-500">
                      @{instagramAccount.username}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400">연결되지 않음</p>
                  )}
                </div>
              </div>
              {instagramAccount.connected ? (
                <span className="flex items-center gap-1.5 text-sm font-bold text-green-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  연결됨
                </span>
              ) : (
                <button
                  onClick={() => handleConnect("instagram")}
                  className="text-sm font-bold text-blue-500 hover:text-blue-600"
                >
                  연결하기
                </button>
              )}
            </div>
            {instagramAccount.connected && (
              <>
                <div className="flex items-center justify-between py-3 border-t border-gray-100">
                  <span className="text-sm text-gray-500">팔로워</span>
                  <span className="font-bold text-[#111827]">
                    {instagramAccount.followers.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={disconnectInstagram}
                  className="w-full mt-2 py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50"
                >
                  연결 해제
                </button>
              </>
            )}
          </div>

          {/* YouTube 카드 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                  <Youtube className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#111827]">YouTube</h3>
                  {youtubeAccount.connected ? (
                    <p className="text-sm text-gray-500">
                      {youtubeAccount.channelName}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400">연결되지 않음</p>
                  )}
                </div>
              </div>
              {youtubeAccount.connected ? (
                <span className="flex items-center gap-1.5 text-sm font-bold text-green-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  연결됨
                </span>
              ) : (
                <button
                  onClick={() => handleConnect("youtube")}
                  className="text-sm font-bold text-blue-500 hover:text-blue-600"
                >
                  연결하기
                </button>
              )}
            </div>
            {youtubeAccount.connected && (
              <>
                <div className="flex items-center justify-between py-3 border-t border-gray-100">
                  <span className="text-sm text-gray-500">팔로워</span>
                  <span className="font-bold text-[#111827]">
                    {youtubeAccount.subscribers.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={disconnectYoutube}
                  className="w-full mt-2 py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50"
                >
                  연결 해제
                </button>
              </>
            )}
          </div>
        </div>

        {/* 업로드된 콘텐츠 섹션 */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="mb-6">
            <h2 className="text-xl font-black text-[#111827] mb-1">
              업로드된 콘텐츠
            </h2>
            <p className="text-sm text-gray-500">
              각 플랫폼별 업로드된 콘텐츠와 성과를 확인하세요
            </p>
          </div>

          {/* 탭 */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab("instagram")}
              className={`flex items-center gap-2 px-6 py-3 font-bold text-sm border-b-2 transition-colors ${activeTab === "instagram"
                ? "border-pink-500 text-pink-600"
                : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
            >
              <Instagram className="h-4 w-4" /> Instagram{" "}
              <span className="ml-1 text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                {DUMMY_SNS_CONTENTS.filter((c) => c.platform === "Instagram").length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("youtube")}
              className={`flex items-center gap-2 px-6 py-3 font-bold text-sm border-b-2 transition-colors ${activeTab === "youtube"
                ? "border-red-500 text-red-600"
                : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
            >
              <Youtube className="h-4 w-4" /> YouTube{" "}
              <span className="ml-1 text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                {DUMMY_SNS_CONTENTS.filter((c) => c.platform === "YouTube").length}
              </span>
            </button>
          </div>

          {/* 총 통계 */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                <Eye className="h-4 w-4" /> 총 조회수
              </div>
              <p className="text-2xl font-black text-[#111827]">
                {totalStats.views.toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                <Heart className="h-4 w-4" /> 총 좋아요
              </div>
              <p className="text-2xl font-black text-[#111827]">
                {totalStats.likes.toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                <MessageCircle className="h-4 w-4" /> 총 댓글
              </div>
              <p className="text-2xl font-black text-[#111827]">
                {totalStats.comments.toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                <Share2 className="h-4 w-4" /> 총 공유
              </div>
              <p className="text-2xl font-black text-[#111827]">
                {totalStats.shares.toLocaleString()}
              </p>
            </div>
          </div>

          {/* 콘텐츠 리스트 - 카드형 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {filteredContents.map((item) => {
              const isVideo = item.type === "shorts";

              return (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm h-full flex flex-col"
                >
                  {/* 이미지 영역 - edge to edge */}
                  <div
                    className={`aspect-[4/3] w-full flex items-center justify-center ${isVideo
                      ? "bg-gray-800"
                      : "bg-gradient-to-br from-[#F9FAFB] to-[#E5E7EB]"
                      }`}
                  >
                    {isVideo ? (
                      <Video className="h-12 w-12 text-gray-400" />
                    ) : (
                      <FileImage className="h-10 w-10 text-gray-300" />
                    )}
                  </div>

                  {/* 컨텐츠 영역 */}
                  <div className="p-5 flex-grow flex flex-col">
                    {/* 배지 행 */}
                    <div className="mb-3 flex items-center gap-2 flex-wrap">
                      <span className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-[11px] font-bold text-[#6B7280]">
                        {item.type === "shorts" ? "🎬 숏츠" : "📷 SNS 이미지"}
                      </span>
                      <span
                        className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold ${item.platform === "Instagram"
                          ? "bg-gradient-to-r from-pink-100 to-purple-100 text-pink-600"
                          : "bg-red-100 text-red-600"
                          }`}
                      >
                        {item.platform === "Instagram" ? "📷" : "▶️"} {item.platform}
                      </span>
                      <span className="ml-auto rounded-full bg-cyan-50 px-3 py-1 text-[11px] font-bold text-cyan-600">
                        {item.status}
                      </span>
                    </div>

                    {/* 타이틀 */}
                    <h3 className="text-lg font-black text-[#111827]">{item.title}</h3>

                    {/* 날짜 */}
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-400">
                      📅 {item.date}
                    </p>

                    {/* 설명 */}
                    <p className="mt-2 text-sm text-teal-600">{item.description}</p>

                    {/* 통계 */}
                    <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                      <div className="text-center">
                        <p className="text-lg font-black text-gray-800">
                          {item.stats.views.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-400">조회</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-black text-gray-800">
                          {item.stats.likes.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-400">좋아요</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-black text-gray-800">
                          {item.stats.shares.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-400">공유</p>
                      </div>
                    </div>

                    {/* 액션 버튼 */}
                    <div className="mt-auto pt-4 flex items-center gap-2">
                      <button
                        onClick={() => handleUploadClick(item)}
                        disabled={isUploaded(item.id)}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-opacity ${isUploaded(item.id)
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90"
                          }`}
                      >
                        {isUploaded(item.id) ? "업로드됨" : "업로드"}
                      </button>
                      <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-50">
                        <Download className="h-4 w-4" /> 다운로드
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>

      {/* 계정 연결 모달 */}
      {isConnectModalOpen && (
        <ConnectAccountModal
          platform={connectingPlatform}
          onClose={() => setIsConnectModalOpen(false)}
          onConnect={(data) => {
            if (connectingPlatform === "instagram") {
              connectInstagram(data.username, data.followers);
            } else {
              connectYoutube(data.channelName, data.subscribers);
            }
            setIsConnectModalOpen(false);
          }}
        />
      )}

      {/* 업로드 모달 */}
      {isUploadModalOpen && uploadingContent && (
        <UploadModal
          content={uploadingContent}
          onClose={() => {
            setIsUploadModalOpen(false);
            setUploadingContent(null);
          }}
          onUpload={() => handleUploadComplete(uploadingContent.id)}
        />
      )}
    </div>
  );
}

function ConnectAccountModal({ platform, onClose, onConnect }) {
  const [accountId, setAccountId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!accountId.trim() || !password.trim()) return;
    // 실제 API 연동 시에는 여기서 로그인 처리
    // 현재는 더미로 연결 성공 처리
    if (platform === "instagram") {
      onConnect({ username: accountId.trim(), followers: 12400 });
    } else {
      onConnect({ channelName: accountId.trim(), subscribers: 8920 });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${platform === "instagram"
              ? "bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500"
              : "bg-red-600"
              }`}
          >
            {platform === "instagram" ? (
              <Instagram className="h-6 w-6 text-white" />
            ) : (
              <Youtube className="h-6 w-6 text-white" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-black text-[#111827]">
              {platform === "instagram" ? "Instagram" : "YouTube"} 로그인
            </h2>
            <p className="text-sm text-gray-500">계정으로 로그인하세요</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {platform === "instagram" ? "사용자명 또는 이메일" : "이메일"}
            </label>
            <input
              type="text"
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              placeholder={
                platform === "instagram"
                  ? "사용자명, 이메일 또는 전화번호"
                  : "example@gmail.com"
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-blue-400"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={!accountId.trim() || !password.trim()}
            className={`flex-1 py-3 rounded-xl font-bold text-white transition-colors ${platform === "instagram"
              ? "bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90"
              : "bg-red-600 hover:bg-red-700"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}

function UploadModal({ content, onClose, onUpload }) {
  const [description, setDescription] = useState("");
  const [hashtags, setHashtags] = useState("");

  const handleSubmit = () => {
    // 실제 API 연동 시 여기서 업로드 처리
    onUpload();
    alert(`${content.platform}에 업로드되었습니다!`);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${content.platform === "Instagram"
                ? "bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500"
                : "bg-red-600"
              }`}
          >
            {content.platform === "Instagram" ? (
              <Instagram className="h-6 w-6 text-white" />
            ) : (
              <Youtube className="h-6 w-6 text-white" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-black text-[#111827]">
              {content.platform}에 업로드
            </h2>
            <p className="text-sm text-gray-500">{content.title}</p>
          </div>
        </div>

        {/* 미리보기 */}
        <div className="mb-6 p-4 bg-gray-50 rounded-xl">
          <p className="text-sm text-gray-500 mb-2">업로드할 콘텐츠</p>
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
              {content.type === "shorts" ? (
                <Video className="h-6 w-6 text-gray-400" />
              ) : (
                <FileImage className="h-6 w-6 text-gray-400" />
              )}
            </div>
            <div>
              <p className="font-bold text-[#111827]">{content.title}</p>
              <p className="text-sm text-gray-500">{content.date}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              피드 설명
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="피드에 표시될 설명을 입력하세요..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-blue-400 resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              해시태그
            </label>
            <input
              type="text"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              placeholder="#해시태그 #광고 #프로모션"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-blue-400"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className={`flex-1 py-3 rounded-xl font-bold text-white transition-colors ${content.platform === "Instagram"
                ? "bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90"
                : "bg-red-600 hover:bg-red-700"
              }`}
          >
            업로드
          </button>
        </div>
      </div>
    </div>
  );
}
