import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  CheckCircle,
  XCircle,
  Users,
  User,
  Mail,
  Phone,
  LogOut,
  Menu,
  X,
  RefreshCw,
  Receipt,
  ExternalLink,
  Globe,
  ChevronDown,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import {
  fetchTeamsService,
  approveTeamService,
  rejectTeamService,
  fetchUsersService,
  verifyReceiptService,
  fetchPendingReceiptsService,
  type Team,
  type User as AdminUser,
} from "@/services/adminServices";

type TeamStatus =
  | "draft"
  | "submitted"
  | "waiting_for_payment"
  | "receipt_pending"
  | "accepted"
  | "rejected";
type ActiveTab = "teams" | "users";
type Receipt = {
  id: number;
  team_id: number;
  [key: string]: any;
};

function AdminTeamsApproval() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState<Team[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<TeamStatus | "all">(
    "submitted"
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [approving, setApproving] = useState<number | null>(null);
  const [rejecting, setRejecting] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("teams");
  const [verifyingReceipt, setVerifyingReceipt] = useState<number | null>(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<{
    id: number;
    teamName: string;
    teamId?: number; // اضافه کردن teamId
    approved?: boolean;
  } | null>(null);
  const [verificationNotes, setVerificationNotes] = useState("");
  const [pendingReceipts, setPendingReceipts] = useState<Receipt[]>([]);

  useEffect(() => {
    if (activeTab === "teams") {
      fetchTeams();
      fetchPendingReceipts();
    } else {
      fetchUsers();
    }
  }, [activeTab]);
  // تابع جدید برای دریافت receipts
  const fetchPendingReceipts = async () => {
    try {
      const receipts = await fetchPendingReceiptsService();
      setPendingReceipts(receipts);
    } catch (err: any) {
      console.error("Error fetching pending receipts:", err);
      toast.error("خطا در دریافت لیست فیش‌های در انتظار");
    }
  };
  const findReceiptIdByTeamId = (teamId: number): number | null => {
    const receipt = pendingReceipts.find(
      (receipt) => receipt.team_id === teamId
    );
    return receipt ? receipt.id : null;
  };

  const fetchTeams = async () => {
    try {
      setLoading(true);
      setError(null);

      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        navigate("/login");
        return;
      }

      const teamsData = await fetchTeamsService();
      setTeams(teamsData);
    } catch (err: any) {
      console.error("Error fetching teams:", err);
      setError(err.message);
      toast.error("خطا در بارگذاری تیم‌ها");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleVerifyReceipt = async (receiptId: number, approved: boolean) => {
    try {
      setVerifyingReceipt(receiptId);

      // const payload: VerifyReceiptPayload = {
      //   approved: approved,
      //   notes: verificationNotes || undefined,
      // };

      await verifyReceiptService(receiptId, approved, verificationNotes);

      if (approved) {
        toast.success("فیش پرداخت با موفقیت تایید شد");
      } else {
        toast.success("فیش پرداخت رد شد");
      }

      setShowReceiptModal(false);
      setVerificationNotes("");
      setSelectedReceipt(null);

      await fetchTeams();
      await fetchPendingReceipts();
    } catch (err: any) {
      console.error("Error verifying receipt:", err);
      toast.error(err.message || "خطا در تایید فیش");
    } finally {
      setVerifyingReceipt(null);
    }
  };

  const handleOpenReceiptModal = (teamId: number, teamName: string) => {
    // پیدا کردن receipt_id بر اساس team_id
    const receiptId = findReceiptIdByTeamId(teamId);

    if (!receiptId) {
      toast.error("فیش پرداختی برای این تیم یافت نشد");
      return;
    }

    setSelectedReceipt({
      id: receiptId,
      teamName,
      teamId, // اضافه کردن teamId برای استفاده احتمالی
    });
    setShowReceiptModal(true);
  };

  const closeReceiptModal = () => {
    setShowReceiptModal(false);
    setSelectedReceipt(null);
    setVerificationNotes("");
  };

  const fetchUsers = async () => {
    try {
      setUsersLoading(true);
      setError(null);

      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        navigate("/login");
        return;
      }

      const usersData = await fetchUsersService();
      setUsers(usersData);
    } catch (err: any) {
      console.error("Error fetching users:", err);
      setError(err.message);
      toast.error("خطا در بارگذاری کاربران");
    } finally {
      setUsersLoading(false);
    }
  };

  const handleRefresh = () => {
    if (activeTab === "teams") {
      setRefreshing(true);
      fetchTeams();
      fetchPendingReceipts();
    } else {
      fetchUsers();
    }
  };

  const handleApproveTeam = async (teamId: number) => {
    try {
      setApproving(teamId);
      await approveTeamService(teamId);
      toast.success("تیم با موفقیت تایید شد");
      setTeams((prev) =>
        prev.map((team) =>
          team.id === teamId ? { ...team, status: "accepted" } : team
        )
      );
      setSelectedTeam(null);
    } catch (err: any) {
      console.error("Error:", err);
      toast.error(err.message || "خطا در تایید تیم");
    } finally {
      setApproving(null);
    }
  };

  const handleRejectTeam = async (teamId: number) => {
    try {
      setRejecting(teamId);
      await rejectTeamService(teamId);
      toast.success("تیم رد شد");
      setTeams((prev) =>
        prev.map((team) =>
          team.id === teamId ? { ...team, status: "rejected" } : team
        )
      );
      setSelectedTeam(null);
    } catch (err: any) {
      console.error("Error:", err);
      toast.error(err.message || "خطا در رد کردن تیم");
    } finally {
      setRejecting(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  const filteredTeams = teams.filter((team) => {
    const matchesSearch =
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.members.some(
        (member) =>
          member.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.email.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus =
      filterStatus === "all" || team.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const filteredUsers = users.filter((user) => {
    return (
      user.first_name?.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      user.last_name?.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      user.phone?.includes(userSearchTerm) ||
      user.national_code?.includes(userSearchTerm)
    );
  });

  const statusConfig: Record<
    TeamStatus,
    { label: string; pillClass: string }
  > = {
    draft: {
      label: "پیش‌نویس",
      pillClass: "is-draft",
    },
    submitted: {
      label: "ثبت‌نام شده",
      pillClass: "is-submitted",
    },
    waiting_for_payment: {
      label: "در انتظار پرداخت",
      pillClass: "is-waiting",
    },
    receipt_pending: {
      label: "در انتظار رسید",
      pillClass: "is-receipt",
    },
    accepted: {
      label: "تایید شده",
      pillClass: "is-accepted",
    },
    rejected: {
      label: "رد شده",
      pillClass: "is-rejected",
    },
  };

  const getStats = () => {
    return {
      total: teams.length,
      draft: teams.filter((t) => t.status === "draft").length,
      submitted: teams.filter((t) => t.status === "submitted").length,
      waiting_for_payment: teams.filter(
        (t) => t.status === "waiting_for_payment"
      ).length,
      receipt_pending: teams.filter((t) => t.status === "receipt_pending")
        .length,
      accepted: teams.filter((t) => t.status === "accepted").length,
      rejected: teams.filter((t) => t.status === "rejected").length,
    };
  };

  const stats = getStats();

  const getStatusMessage = (status: TeamStatus) => {
    const messages: Record<TeamStatus, { emoji: string; text: string }> = {
      accepted: { emoji: "✅", text: "این تیم قبلاً تایید شده است" },
      rejected: { emoji: "❌", text: "این تیم رد شده است" },
      draft: { emoji: "📝", text: "این تیم در حالت پیش‌نویس است" },
      waiting_for_payment: {
        emoji: "💳",
        text: "این تیم در انتظار پرداخت است",
      },
      submitted: { emoji: "📋", text: "این تیم ثبت‌نام شده است" },
      receipt_pending: { emoji: "🧾", text: "این تیم در انتظار رسید است" },
    };
    return messages[status];
  };

  const renderLoading = () => (
    <div
      dir="rtl"
      className="app-main"
      style={{ minHeight: "100vh", justifyContent: "center" }}
      aria-live="polite"
    >
      <div className="empty">
        <span className="spinner" aria-hidden="true" />
        <p className="empty-text">
          {activeTab === "teams"
            ? "درحال بارگذاری تیم‌ها..."
            : "درحال بارگذاری کاربران..."}
        </p>
      </div>
    </div>
  );

  if (
    (activeTab === "teams" && loading) ||
    (activeTab === "users" && usersLoading)
  ) {
    return renderLoading();
  }

  return (
    <div dir="rtl">
      {/* Sidebar */}
      <aside className={`sidebar${!sidebarOpen ? " is-collapsed" : ""}`}>
        <div className="sidebar-head">
          <div className="wordmark wordmark-sm">
            <span className="wm-elmo">ELMO</span>
            <span className="wm-c1">C</span>
            <span className="wm-p">P</span>
            <span className="wm-c2">C</span>
            <span className="wm-year"> 2025</span>
          </div>
          <p className="sidebar-title">پنل مدیریت</p>
          <p className="sidebar-sub">سیستم مدیریت تیم‌ها و کاربران</p>
        </div>

        <nav className="sidebar-nav" aria-label="بخش‌های پنل مدیریت">
          <button
            type="button"
            onClick={() => setActiveTab("teams")}
            className={`sidebar-link${activeTab === "teams" ? " is-active" : ""}`}
            aria-current={activeTab === "teams" ? "page" : undefined}
          >
            <Users className="icon" />
            <span className="sidebar-label">تایید تیم‌ها</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("users")}
            className={`sidebar-link${activeTab === "users" ? " is-active" : ""}`}
            aria-current={activeTab === "users" ? "page" : undefined}
          >
            <User className="icon" />
            <span className="sidebar-label">مدیریت کاربران</span>
          </button>

          <div className="sidebar-stat">
            <p className="sidebar-stat-title">
              {activeTab === "teams" ? "آمار تیم‌ها" : "آمار کاربران"}
            </p>
            <div className="kv-list">
              {activeTab === "teams" ? (
                <>
                  <div className="kv-row">
                    <span className="kv-key">کل تیم‌ها</span>
                    <span className="kv-value">{stats.total}</span>
                  </div>
                  <div className="kv-row">
                    <span className="kv-key">پیش‌نویس</span>
                    <span className="kv-value">{stats.draft}</span>
                  </div>
                  <div className="kv-row">
                    <span className="kv-key">ثبت‌نام شده</span>
                    <span className="kv-value">{stats.submitted}</span>
                  </div>
                  <div className="kv-row">
                    <span className="kv-key">در انتظار پرداخت</span>
                    <span className="kv-value">{stats.waiting_for_payment}</span>
                  </div>
                  <div className="kv-row">
                    <span className="kv-key">در انتظار رسید</span>
                    <span className="kv-value">{stats.receipt_pending}</span>
                  </div>
                  <div className="kv-row">
                    <span className="kv-key">تایید شده</span>
                    <span className="kv-value">{stats.accepted}</span>
                  </div>
                  <div className="kv-row">
                    <span className="kv-key">رد شده</span>
                    <span className="kv-value">{stats.rejected}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="kv-row">
                    <span className="kv-key">کل کاربران</span>
                    <span className="kv-value">{users.length}</span>
                  </div>
                  <div className="kv-row">
                    <span className="kv-key">تایید ایمیل شده</span>
                    <span className="kv-value">
                      {users.filter((u) => u.email_verified).length}
                    </span>
                  </div>
                  <div className="kv-row">
                    <span className="kv-key">تایید ایمیل نشده</span>
                    <span className="kv-value">
                      {users.filter((u) => !u.email_verified).length}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </nav>

        <div className="sidebar-foot">
          <button
            type="button"
            onClick={handleLogout}
            className="sidebar-link sidebar-logout"
          >
            <LogOut className="icon" />
            <span className="sidebar-label">خروج از سیستم</span>
          </button>
        </div>
      </aside>

      <div className={`with-sidebar${!sidebarOpen ? " is-collapsed" : ""}`}>
        {/* Header */}
        <header className="topbar">
          <div className="topbar-inner has-search">
            <button
              type="button"
              className="icon-btn"
              onClick={() => setSidebarOpen((prev) => !prev)}
              aria-label="جمع کردن منوی کناری"
              aria-expanded={sidebarOpen}
            >
              <Menu className="icon" />
            </button>

            <div>
              <h1 className="topbar-title">
                {activeTab === "teams"
                  ? "مدیریت و تایید تیم‌ها"
                  : "مدیریت کاربران"}
              </h1>
              <p className="topbar-sub">
                {activeTab === "teams"
                  ? `${filteredTeams.length} تیم از ${teams.length} تیم`
                  : `${filteredUsers.length} کاربر از ${users.length} کاربر`}
              </p>
            </div>

            <div className="topbar-actions">
              <label className="search search-grow">
                <input
                  className="input"
                  type="search"
                  aria-label="جستجو"
                  placeholder={
                    activeTab === "teams"
                      ? "جستجو بر اساس نام تیم، توضیحات، نام اعضا یا ایمیل..."
                      : "جستجو بر اساس نام، ایمیل، شماره تلفن یا کد ملی..."
                  }
                  value={activeTab === "teams" ? searchTerm : userSearchTerm}
                  onChange={(e) =>
                    activeTab === "teams"
                      ? setSearchTerm(e.target.value)
                      : setUserSearchTerm(e.target.value)
                  }
                />
                <Search className="icon search-icon" aria-hidden="true" />
              </label>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleRefresh}
                disabled={refreshing}
              >
                <RefreshCw
                  className="icon-sm"
                  style={
                    refreshing
                      ? { animation: "spin 700ms linear infinite" }
                      : undefined
                  }
                />
                {refreshing ? "درحال بروزرسانی..." : "بروزرسانی"}
              </button>
            </div>
          </div>
        </header>

        <main className="app-main">
          {/* Status filter chips (teams tab only) */}
          {activeTab === "teams" && (
            <div
              className="chips chips-start"
              role="group"
              aria-label="فیلتر وضعیت تیم‌ها"
            >
              {(
                [
                  { value: "all", label: "همه تیم‌ها" },
                  { value: "submitted", label: "ثبت‌نام شده" },
                  { value: "waiting_for_payment", label: "در انتظار پرداخت" },
                  { value: "receipt_pending", label: "در انتظار رسید" },
                  { value: "accepted", label: "تایید شده" },
                  { value: "rejected", label: "رد شده" },
                ] as const
              ).map((status) => (
                <button
                  key={status.value}
                  type="button"
                  className={`chip${
                    filterStatus === status.value ? " is-active" : ""
                  }`}
                  onClick={() => setFilterStatus(status.value)}
                  aria-pressed={filterStatus === status.value}
                >
                  {status.label}
                </button>
              ))}
            </div>
          )}

          {error && (
            <div className="alert alert-danger" role="alert">
              <XCircle className="icon alert-icon" aria-hidden="true" />
              <div>
                <p className="alert-title">خطا</p>
                <p>{error}</p>
              </div>
            </div>
          )}

          {/* Teams Tab Content */}
          {activeTab === "teams" && (
            <section className="stack" aria-label="تایید تیم‌ها">
              {filteredTeams.length === 0 ? (
                <div className="empty">
                  <span className="empty-icon" aria-hidden="true">
                    <Users className="icon-lg" />
                  </span>
                  <p className="empty-text">تیمی یافت نشد</p>
                  <p className="small text-muted">
                    {searchTerm || filterStatus !== "all"
                      ? "لطفاً عبارت جستجو یا فیلترها را تغییر دهید"
                      : "هنوز هیچ تیمی ثبت‌نام نکرده است"}
                  </p>
                </div>
              ) : (
                filteredTeams.map((team) => {
                  const canApprove =
                    team.status === "submitted" ||
                    team.status === "receipt_pending";
                  const statusMsg = getStatusMessage(team.status);

                  return (
                    <article className="card stack" key={team.id}>
                      <div className="team-card-head">
                        <div className="stack">
                          <div className="row">
                            <h2 className="card-title">{team.name}</h2>
                            <span
                              className={`status-pill ${
                                statusConfig[team.status].pillClass
                              }`}
                            >
                              <span className="dot" aria-hidden="true" />
                              {statusConfig[team.status].label}
                            </span>
                          </div>

                          {team.description && (
                            <p className="card-text">{team.description}</p>
                          )}

                          <div className="row">
                            <span className="chip">
                              <Users className="icon-sm" aria-hidden="true" />
                              {team.members?.length || 0} عضو
                            </span>
                            {team.receipt_image_url && (
                              <a
                                href={team.receipt_image_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="chip"
                              >
                                <Receipt className="icon-sm" aria-hidden="true" />
                                مشاهده رسید
                                <ExternalLink
                                  className="icon-sm"
                                  aria-hidden="true"
                                />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Team Members Preview */}
                      <div className="stack">
                        <div className="row">
                          <Users className="icon" aria-hidden="true" />
                          <h3 className="card-title">اعضای تیم</h3>
                          <span className="small text-muted">
                            ({team.members?.length || 0} نفر)
                          </span>
                        </div>
                        <div className="member-preview">
                          {team.members?.slice(0, 3).map((member) => (
                            <div className="member-chip" key={member.id}>
                              <span className="avatar" aria-hidden="true">
                                {member.first_name.charAt(0)}
                              </span>
                              <span className="user-meta">
                                <span className="user-name">
                                  {member.first_name} {member.last_name}
                                </span>
                                <span
                                  className={`user-role${
                                    member.id === team.creator_id
                                      ? " text-warning"
                                      : ""
                                  }`}
                                >
                                  {member.id === team.creator_id
                                    ? "کاپیتان"
                                    : "عضو تیم"}
                                </span>
                                <span className="user-role">
                                  {member.email}
                                </span>
                              </span>
                            </div>
                          ))}
                          {team.members && team.members.length > 3 && (
                            <div className="member-chip text-center">
                              + {team.members.length - 3} عضو دیگر
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Receipt Verification Button */}
                      {team.receipt_image_url &&
                        team.status === "receipt_pending" && (
                          <div className="card-actions">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() =>
                                handleOpenReceiptModal(team.id, team.name)
                              }
                            >
                              <Receipt className="icon-sm" aria-hidden="true" />
                              تایید/رد فیش
                            </button>
                          </div>
                        )}

                      {/* Expanded Details */}
                      <details
                        className="details"
                        open={selectedTeam?.id === team.id}
                        onToggle={(e) => {
                          const isOpen = e.currentTarget.open;
                          setSelectedTeam((prev) =>
                            isOpen
                              ? prev?.id === team.id
                                ? prev
                                : team
                              : prev?.id === team.id
                              ? null
                              : prev
                          );
                        }}
                      >
                        <summary>
                          <span className="details-when-closed">
                            مشاهده جزئیات
                          </span>
                          <span className="details-when-open">
                            بستن جزئیات
                          </span>
                          <ChevronDown
                            className="details-chevron icon"
                            aria-hidden="true"
                          />
                        </summary>
                        <div className="details-body">
                          <p className="details-title">
                            اطلاعات کامل اعضای تیم
                          </p>
                          {team.members?.map((member) => (
                            <div className="detail-member" key={member.id}>
                              <div className="detail-member-head">
                                <div className="row">
                                  <span className="avatar" aria-hidden="true">
                                    {member.first_name.charAt(0)}
                                  </span>
                                  <span className="user-meta">
                                    <span className="user-name">
                                      {member.first_name} {member.last_name}
                                    </span>
                                    <span
                                      className={`user-role${
                                        member.id === team.creator_id
                                          ? " text-warning"
                                          : ""
                                      }`}
                                    >
                                      {member.id === team.creator_id
                                        ? "کاپیتان تیم"
                                        : "عضو تیم"}
                                    </span>
                                  </span>
                                </div>
                              </div>
                              <span className="row small text-muted">
                                <Mail
                                  className="icon-sm"
                                  aria-hidden="true"
                                />
                                {member.email}
                              </span>
                              <span className="row small text-muted">
                                <Phone
                                  className="icon-sm"
                                  aria-hidden="true"
                                />
                                {member.phone}
                              </span>
                            </div>
                          ))}
                        </div>
                      </details>

                      {/* Action Buttons / status message */}
                      {canApprove && team.status !== "receipt_pending" ? (
                        <div className="card-actions">
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => handleApproveTeam(team.id)}
                            disabled={approving === team.id}
                          >
                            {approving === team.id ? (
                              <span className="spinner" aria-hidden="true" />
                            ) : (
                              <CheckCircle
                                className="icon-sm"
                                aria-hidden="true"
                              />
                            )}
                            {approving === team.id
                              ? "درحال تایید..."
                              : "تایید تیم"}
                          </button>
                          <button
                            type="button"
                            className="btn btn-destructive"
                            onClick={() => handleRejectTeam(team.id)}
                            disabled={rejecting === team.id}
                          >
                            {rejecting === team.id ? (
                              <span className="spinner" aria-hidden="true" />
                            ) : (
                              <XCircle
                                className="icon-sm"
                                aria-hidden="true"
                              />
                            )}
                            {rejecting === team.id ? "درحال رد..." : "رد تیم"}
                          </button>
                        </div>
                      ) : (
                        <p className="status-message">
                          <Info className="icon icon-sm" aria-hidden="true" />
                          {statusMsg.text}
                        </p>
                      )}
                    </article>
                  );
                })
              )}
            </section>
          )}

          {/* Users Tab Content */}
          {activeTab === "users" && (
            <section className="stack" aria-label="مدیریت کاربران">
              {filteredUsers.length === 0 ? (
                <div className="empty">
                  <span className="empty-icon" aria-hidden="true">
                    <User className="icon-lg" />
                  </span>
                  <p className="empty-text">کاربری یافت نشد</p>
                  <p className="small text-muted">
                    {userSearchTerm
                      ? "لطفاً عبارت جستجو را تغییر دهید"
                      : "هنوز هیچ کاربری ثبت‌نام نکرده است"}
                  </p>
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <article className="card" key={user.id}>
                    <div className="user-card-head">
                      <div className="row">
                        <span className="avatar" aria-hidden="true">
                          {user.first_name.charAt(0)}
                        </span>
                        <div>
                          <h2 className="card-title">
                            {user.first_name} {user.last_name}
                          </h2>
                          <div className="row">
                            <span
                              className={`badge ${
                                user.email_verified
                                  ? "badge-success"
                                  : "badge-warning"
                              }`}
                            >
                              {user.email_verified
                                ? "تایید ایمیل"
                                : "در انتظار تایید"}
                            </span>
                            {user.ip_address && (
                              <span className="badge badge-cyan">
                                <Globe className="icon-sm" aria-hidden="true" />
                                IP: {user.ip_address}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="user-fields">
                      <div className="user-field">
                        <p className="user-field-key">ایمیل</p>
                        <p className="user-field-val">{user.email}</p>
                      </div>
                      <div className="user-field">
                        <p className="user-field-key">شماره تلفن</p>
                        <p className="user-field-val">{user.phone}</p>
                      </div>
                      <div className="user-field">
                        <p className="user-field-key">کد ملی</p>
                        <p className="user-field-val">{user.national_code}</p>
                      </div>
                      <div className="user-field">
                        <p className="user-field-key">دانشگاه</p>
                        <p className="user-field-val">
                          {user.university || "ثبت نشده"}
                        </p>
                      </div>
                      <div className="user-field">
                        <p className="user-field-key">سایز تی‌شرت</p>
                        <p className="user-field-val">
                          {user.tshirt_size || "ثبت نشده"}
                        </p>
                      </div>
                      <div className="user-field">
                        <p className="user-field-key">تاریخ ثبت‌نام</p>
                        <p className="user-field-val">
                          {new Date(user.created_at).toLocaleDateString("fa-IR")}
                        </p>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </section>
          )}
        </main>
      </div>

      {/* مودال تایید/رد فیش */}
      {showReceiptModal && selectedReceipt && (
        <div
          className="modal-overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeReceiptModal();
          }}
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="verify-receipt-title"
          >
            <div className="modal-head">
              <div className="row">
                <span
                  className="stat-icon is-receipt"
                  aria-hidden="true"
                >
                  <Receipt className="icon" />
                </span>
                <h2 className="modal-title" id="verify-receipt-title">
                  تایید فیش پرداخت
                </h2>
              </div>
              <button
                type="button"
                className="icon-btn"
                onClick={closeReceiptModal}
                aria-label="بستن"
              >
                <X className="icon" aria-hidden="true" />
              </button>
            </div>

            <div className="modal-body stack">
              <div className="receipt-frame">
                <Receipt className="icon-lg" aria-hidden="true" />
                <p>پیش‌نمایش تصویر فیش پرداخت</p>
                <p className="small">JPG, PNG, PDF</p>
              </div>

              <p className="card-text">
                آیا از {selectedReceipt.approved ? "تایید" : "رد"} فیش پرداخت
                تیم
                <span className="text-highlight">
                  {" "}
                  {selectedReceipt.teamName}{" "}
                </span>
                مطمئن هستید؟
              </p>

              <div className="field">
                <label className="label" htmlFor="receipt-note">
                  یادداشت (اختیاری)
                </label>
                <textarea
                  id="receipt-note"
                  className="textarea"
                  rows={3}
                  value={verificationNotes}
                  onChange={(e) => setVerificationNotes(e.target.value)}
                  placeholder="یادداشت برای تیم..."
                />
              </div>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={closeReceiptModal}
              >
                انصراف
              </button>
              <button
                type="button"
                className="btn btn-destructive"
                onClick={() =>
                  handleVerifyReceipt(selectedReceipt.id, false)
                }
                disabled={verifyingReceipt === selectedReceipt.id}
              >
                {verifyingReceipt === selectedReceipt.id ? (
                  <span className="spinner" aria-hidden="true" />
                ) : (
                  <XCircle className="icon-sm" aria-hidden="true" />
                )}
                رد فیش
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => handleVerifyReceipt(selectedReceipt.id, true)}
                disabled={verifyingReceipt === selectedReceipt.id}
              >
                {verifyingReceipt === selectedReceipt.id ? (
                  <span className="spinner" aria-hidden="true" />
                ) : (
                  <CheckCircle className="icon-sm" aria-hidden="true" />
                )}
                تایید فیش
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminTeamsApproval;
