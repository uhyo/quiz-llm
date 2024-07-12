import React, { use } from "react";

let isAvailableP:
  | Promise<
      | {
          available: true;
        }
      | {
          available: false;
          reason: string;
        }
    >
  | undefined;

export const CheckAIAvailability: React.FC = () => {
  isAvailableP ??= checkAIAvailable();
  const isAvailable = use(isAvailableP);
  if (isAvailable.available) {
    return <p>AI が利用可能です</p>;
  } else {
    return <p>AI が利用できません: {isAvailable.reason}</p>;
  }
};

async function checkAIAvailable(): NonNullable<typeof isAvailableP> {
  if (window.ai === undefined) {
    return {
      available: false,
      reason: "window.ai がありません",
    };
  }

  const canCreateTextSession = await window.ai.canCreateTextSession();
  console.info("canCreateTextSession", canCreateTextSession);
  if (canCreateTextSession === "no") {
    return {
      available: false,
      reason: "canCreateTextSession が no です",
    };
  }
  if (canCreateTextSession === "after-download") {
    return {
      available: false,
      reason:
        "ダウンロードが必要です。chrome://components にアクセスして Optimization Guide On Device Model をダウンロードしてください",
    };
  }
  return {
    available: true,
  };
}
