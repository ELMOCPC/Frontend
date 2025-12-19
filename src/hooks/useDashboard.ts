// src/pages/Dashboard/hooks/useDashboard.ts
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import {
  getTeamForDashboardService,
  submitTeamService,
  deleteTeamService,
  getInvitesService,
  cancelInviteService,
  uploadReceiptService,
} from "@/services/teamService";
import type { DashboardTeam } from "@/services/teamService";
import type { TeamInvite } from "@/types/teamTypes";

type DashboardUser = {
  name: string;
  familyName: string;
  email: string;
  phone: string;
  teamId?: number;
};

export const useDashboard = (authUser: any) => {
  const [userData, setUserData] = useState<DashboardUser | null>(null);
  const [teamData, setTeamData] = useState<DashboardTeam | null>(null);
  const [loading, setLoading] = useState(true);
  const [teamLoading, setTeamLoading] = useState(false);
  const [invites, setInvites] = useState<TeamInvite[]>([]);
  const [invitesLoading, setInvitesLoading] = useState(false);
  const [isCaptain, setIsCaptain] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);
  const [notifications, setNotifications] = useState<any[]>([]);

  // Fetch team data
  const fetchTeamData = useCallback(async () => {
    if (!authUser) return;

    setTeamLoading(true);
    try {
      const team = await getTeamForDashboardService();
      setTeamData(team);
      
      // Update captain status
      const captainStatus = team?.creator_id === authUser.id;
      setIsCaptain(captainStatus);
    } catch (error) {
      console.error("Error fetching team data:", error);
      setTeamData(null);
    } finally {
      setTeamLoading(false);
    }
  }, [authUser]);

  // Fetch invites
  const fetchInvites = useCallback(async () => {
    if (!teamData) return;

    setInvitesLoading(true);
    try {
      const response = await getInvitesService(teamData.id);
      setInvites(response.data);
    } catch (error) {
      console.error("Error fetching invites:", error);
      setInvites([]);
    } finally {
      setInvitesLoading(false);
    }
  }, [teamData]);

  // Calculate days left
  const calculateDaysLeft = useCallback(() => {
    const today = new Date();
    const targetDate = new Date("2025-12-11");
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysLeft(diffDays);
    return diffDays;
  }, []);

  // Get notifications based on team status
  const getNotificationsBasedOnStatus = useCallback((team: DashboardTeam | null) => {
    if (!team) {
      return [
        {
          id: 1,
          title: "تشکیل تیم",
          message: "برای شرکت در مسابقه باید یک تیم تشکیل دهید",
          type: "warning",
          date: new Date().toLocaleDateString("fa-IR"),
          read: false,
        },
      ];
    }

    const baseNotifications = [];
    // const today = new Date().toLocaleDateString("fa-IR");

    // ... (rest of notification logic)
    
    return baseNotifications;
  }, []);

  // Initialize user data
  useEffect(() => {
    if (!authUser) return;

    const mappedUser: DashboardUser = {
      name: authUser.first_name,
      familyName: authUser.last_name,
      email: authUser.email,
      phone: authUser.phone,
      teamId: authUser.teamId,
    };

    setUserData(mappedUser);
    fetchTeamData();
    setLoading(false);
  }, [authUser, fetchTeamData]);

  // Update captain status when team data changes
  useEffect(() => {
    if (teamData && authUser) {
      const captainStatus = teamData.creator_id === authUser.id;
      setIsCaptain(captainStatus);
    }
  }, [teamData, authUser]);

  // Update notifications when team data changes
  useEffect(() => {
    const newNotifications = getNotificationsBasedOnStatus(teamData);
    setNotifications(newNotifications);
  }, [teamData, getNotificationsBasedOnStatus]);

  // Fetch invites when team data changes
  useEffect(() => {
    if (teamData) {
      fetchInvites();
    }
  }, [teamData, fetchInvites]);

  // Calculate days left on mount
  useEffect(() => {
    calculateDaysLeft();
  }, [calculateDaysLeft]);

  // Handle delete team
  const handleDeleteTeam = async () => {
    if (!teamData) return;

    try {
      await deleteTeamService(teamData.id);
      toast.success("تیم با موفقیت حذف شد!");
      await fetchTeamData();
      return true;
    } catch (error: any) {
      console.error("Error deleting team:", error);
      toast.error(error?.message || "خطا در حذف تیم");
      return false;
    }
  };

  // Handle submit team
  const handleSubmitTeam = async () => {
    if (!teamData) {
      toast.error("تیم یافت نشد");
      return false;
    }

    try {
      await submitTeamService(teamData.id);
      toast.success("تیم با موفقیت ثبت نهایی شد!");
      await fetchTeamData();
      return true;
    } catch (error: any) {
      console.error("Error submitting team:", error);
      const errorMessage = error?.response?.data?.messages?.team?.pending_invitations || "خطا در ثبت نهایی تیم";
      toast.error(errorMessage);
      return false;
    }
  };

  // Handle upload receipt
  const handleUploadReceipt = async (file: File) => {
    if (!teamData) return false;

    try {
      const formData = new FormData();
      formData.append("receipt", file);
      await uploadReceiptService(teamData.id, formData);
      toast.success("فیش پرداخت با موفقیت آپلود شد");
      await fetchTeamData();
      return true;
    } catch (error: any) {
      console.error("Error uploading receipt:", error);
      toast.error(error?.message || "خطا در آپلود فیش");
      return false;
    }
  };

  // Handle cancel invite
  const handleCancelInvite = async (inviteToken: string, inviteid: string) => {
    try {
      await cancelInviteService(inviteToken, inviteid);
      toast.success("دعوت با موفقیت لغو شد");
      fetchInvites();
      return true;
    } catch (error: any) {
      console.error("Error canceling invite:", error);
      toast.error(error?.message || "خطا در لغو دعوت");
      return false;
    }
  };

  // Handle start submit process
  const handleStartSubmitProcess = () => {
    return invites?.length > 0 ? false : true;
  };

  return {
    userData,
    teamData,
    loading,
    teamLoading,
    invites,
    invitesLoading,
    isCaptain,
    daysLeft,
    notifications,
    fetchTeamData,
    fetchInvites,
    handleDeleteTeam,
    handleSubmitTeam,
    handleUploadReceipt,
    handleCancelInvite,
    handleStartSubmitProcess,
  };
};