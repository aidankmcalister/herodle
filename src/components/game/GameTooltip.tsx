import { Tooltip } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { correctColor, partialColor, incorrectColor } from "@/app/colors";

const InfoCard = ({
  color,
  label,
  value,
  icon,
  tooltip,
  tooltipLabel,
}: {
  color: string;
  label?: string;
  value?: string;
  icon?: React.ReactNode;
  tooltip?: string;
  tooltipLabel?: string;
}) => (
  <>
    <div className="block md:hidden w-full md:w-24 h-12 md:h-16 relative select-none">
      <div
        className={`absolute w-full h-full ${color} rounded-sm -skew-y-6 overflow-hidden`}>
        {icon && (
          <div className="absolute w-full h-full opacity-20">{icon}</div>
        )}
        <div className="w-full h-full flex flex-col items-center justify-center gap-1">
          {label && (
            <span className="text-[10px] sm:text-xs opacity-70">{label}</span>
          )}
          {value && (
            <span className="text-xs sm:text-sm font-bold relative z-10 px-2 text-center">
              {value}
            </span>
          )}
        </div>
      </div>
    </div>
    <Tooltip
      offset={25}
      content={
        <div className="p-1">
          <p className="font-bold">{tooltipLabel || label}</p>
          <p className="text-sm opacity-70">{tooltip}</p>
        </div>
      }
      className="hidden md:block bg-black/75 text-white select-none">
      <div className="hidden md:block w-full md:w-24 h-12 md:h-16 relative hover:-translate-y-1 hover:scale-105 transition-all select-none duration-300">
        <div
          className={`absolute w-full h-full ${color} rounded-sm -skew-y-6 overflow-hidden`}>
          {icon && (
            <div className="absolute w-full h-full opacity-20">{icon}</div>
          )}
          <div className="w-full h-full flex flex-col items-center justify-center gap-1">
            {label && (
              <span className="text-[10px] sm:text-xs opacity-70">{label}</span>
            )}
            {value && (
              <span className="text-xs sm:text-sm font-bold relative z-10">
                {value}
              </span>
            )}
          </div>
        </div>
      </div>
    </Tooltip>
  </>
);

const GameInfo = () => {
  return (
    <div className="flex flex-col gap-2 sm:gap-4">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4">
        <InfoCard
          color={correctColor}
          label="Exact Match"
          value="Correct"
          tooltip="The guessed attribute matches the target hero's attribute."
        />
        <InfoCard
          color={partialColor}
          label="Partial Match"
          value="Partial"
          tooltip="The guessed attribute shares some attributes with the target hero's attribute."
        />
        <InfoCard
          color={incorrectColor}
          label="No Match"
          value="Wrong"
          tooltip="The guessed attribute doesn't match the target hero's attribute."
        />
        <InfoCard
          color={correctColor}
          value="Same Year"
          label="Appeared"
          icon={<Icon icon="mdi:equal" className="w-full h-full" />}
          tooltipLabel="Same Year"
          tooltip="The guessed hero first appeared in the same year as the target hero."
        />
        <InfoCard
          color={incorrectColor}
          value="Later"
          label="Appeared"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 1800"
              className="w-full origin-bottom mt-4 h-4/5">
              <path
                fill="currentColor"
                d="M599.992 0L131.243 703.131h252.546V1800h432.422V703.131h252.546z"
              />
            </svg>
          }
          tooltipLabel="Later"
          tooltip="The target hero first appeared later than the guessed hero."
        />
        <InfoCard
          color={incorrectColor}
          value="Earlier"
          label="Appeared"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 1800"
              className="w-full rotate-180 origin-center h-4/5">
              <path
                fill="currentColor"
                d="M599.992 0L131.243 703.131h252.546V1800h432.422V703.131h252.546z"
              />
            </svg>
          }
          tooltipLabel="Earlier"
          tooltip="The target hero first appeared earlier than the guessed hero."
        />
      </div>
    </div>
  );
};

export default GameInfo;
