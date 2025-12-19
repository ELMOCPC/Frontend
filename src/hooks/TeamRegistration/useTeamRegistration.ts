// src/pages/TeamRegistration/hooks/useTeamRegistration.ts
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { createTeamService, inviteUserService } from "@/services/teamService";
import type { CreateTeamPayload, InviteUserPayload } from "@/types/teamTypes";

interface TeamInfo {
  teamName: string;
  teamDescription: string;
}

interface MemberData {
  name: string;
  familyName: string;
  email: string;
  phone: string;
  university: string;
  nationalCode?: string;
  tshirtSize?: string;
}

export const useTeamRegistration = (
  currentStep: number,
  setCurrentStep: (step: number) => void
) => {
  const navigate = useNavigate();
  
  const [teamId, setTeamId] = useState<number | null>(null);
  const [teamInfo, setTeamInfo] = useState<TeamInfo>({
    teamName: "",
    teamDescription: "",
  });
  const [member1, setMember1] = useState<MemberData>({
    name: "",
    familyName: "",
    email: "",
    phone: "",
    university: "",
    nationalCode: "",
    tshirtSize: "M",
  });
  const [member2, setMember2] = useState<MemberData>({
    name: "",
    familyName: "",
    email: "",
    phone: "",
    university: "",
    nationalCode: "",
    tshirtSize: "M",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedTeamId = localStorage.getItem("teamId");
    const savedTeamInfo = localStorage.getItem("teamInfo");
    const savedMember1 = localStorage.getItem("member1");
    const savedMember2 = localStorage.getItem("member2");

    if (savedTeamId) setTeamId(Number(savedTeamId));
    if (savedTeamInfo) setTeamInfo(JSON.parse(savedTeamInfo));
    if (savedMember1) setMember1(JSON.parse(savedMember1));
    if (savedMember2) setMember2(JSON.parse(savedMember2));
  }, []);

  // Save current step to localStorage
  useEffect(() => {
    localStorage.setItem("currentStep", currentStep.toString());
  }, [currentStep]);

  const saveToLocalStorage = useCallback((key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  }, []);

  const handleCreateTeam = useCallback(async (values: TeamInfo) => {
    try {
      setIsSubmitting(true);

      const token = localStorage.getItem("access_token");
      if (!token) {
        toast.error("توکن یافت نشد. لطفا دوباره وارد شوید.");
        navigate("/login");
        return;
      }

      const teamPayload: CreateTeamPayload = {
        name: values.teamName,
        description: values.teamDescription,
      };

      console.log("📋 Creating team with payload:", teamPayload);
      const response = await createTeamService(teamPayload);

      if (response?.data?.id) {
        const teamId = response.data.id;
        console.log("✅ Team created with ID:", teamId);
        
        saveToLocalStorage("teamId", teamId);
        saveToLocalStorage("teamInfo", values);

        setTeamId(teamId);
        toast.success("تیم با موفقیت ایجاد شد!");
        setCurrentStep(1);
      } else {
        throw new Error("خطا در ایجاد تیم");
      }
    } catch (error: any) {
      console.error("Error creating team:", error);

      if (error?.messages?.team?.user_already_has_team) {
        toast.error("شما قبلاً یک تیم دارید");
        navigate("/dashboard");
      } else if (error?.messages?.team?.name_already_exists) {
        toast.error("این نام تیم قبلاً انتخاب شده است");
      } else if (error?.response?.data?.messages?.team) {
        toast.error(
          Object.values(error.response.data.messages.team)[0] as string
        );
      } else {
        toast.error(error?.message || "خطا در ایجاد تیم");
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [navigate, saveToLocalStorage, setCurrentStep]);

  const handleMember1Submit = useCallback((values: MemberData) => {
    saveToLocalStorage("member1", values);
    toast.success("اطلاعات عضو دوم ذخیره شد!");
    setCurrentStep(2);
  }, [saveToLocalStorage, setCurrentStep]);

  const handleMember2Submit = useCallback((values: MemberData) => {
    saveToLocalStorage("member2", values);
    toast.success("اطلاعات عضو سوم ذخیره شد!");
    setCurrentStep(3);
  }, [saveToLocalStorage, setCurrentStep]);

  const handleFinalSubmit = useCallback(async () => {
    if (!teamId) {
      toast.error("تیم یافت نشد");
      return;
    }

    // Validate required fields
    const requiredFields = ["name", "familyName", "email", "phone", "university"];
    
    for (const member of [member1, member2]) {
      for (const field of requiredFields) {
        if (!member[field as keyof MemberData]) {
          toast.error(`لطفا اطلاعات ${getFieldLabel(field)} را کامل کنید`);
          return;
        }
      }
    }

    try {
      setIsSubmitting(true);

      const membersPayload: InviteUserPayload = {
        members: [
          {
            first_name: member1.name,
            last_name: member1.familyName,
            email: member1.email,
            phone: member1.phone,
            university: member1.university,
            national_code: member1.nationalCode || "",
            tshirt_size: member1.tshirtSize || "M",
          },
          {
            first_name: member2.name,
            last_name: member2.familyName,
            email: member2.email,
            phone: member2.phone,
            university: member2.university,
            national_code: member2.nationalCode || "",
            tshirt_size: member2.tshirtSize || "M",
          },
        ],
      };

      console.log("📨 دعوت اعضا:", membersPayload);
      await inviteUserService(teamId.toString(), membersPayload);

      toast.success(
        "اعضا دعوت شدند. پس از تایید اعضا نسبت به نهایی کردن تیم اقدام کنید"
      );

      // Clear member data from localStorage
      localStorage.removeItem("member1");
      localStorage.removeItem("member2");
      localStorage.removeItem("currentStep");

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error: any) {
      console.error("❌ خطا در تشکیل تیم:", error);

      if (error.response?.status === 400) {
        const errorMessage =
          error.response?.data?.message || error.response?.data?.error;
        toast.error(errorMessage || "خطا در اطلاعات وارد شده");
      } else {
        toast.error(
          error?.message || "خطا در تشکیل تیم. لطفا دوباره تلاش کنید"
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [teamId, member1, member2, navigate]);

  const handleEditStep = useCallback((step: number) => {
    setCurrentStep(step);
  }, [setCurrentStep]);

  const getFieldLabel = (field: string): string => {
    const labels: Record<string, string> = {
      name: "نام",
      familyName: "نام خانوادگی",
      email: "ایمیل",
      phone: "شماره موبایل",
      university: "دانشگاه",
    };
    return labels[field] || field;
  };

  return {
    teamId,
    teamInfo,
    member1,
    member2,
    isSubmitting,
    handleCreateTeam,
    handleMember1Submit,
    handleMember2Submit,
    handleFinalSubmit,
    handleEditStep,
    updateTeamInfo: setTeamInfo,
    updateMember1: setMember1,
    updateMember2: setMember2,
  };
};