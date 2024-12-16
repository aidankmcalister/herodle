import { Icon } from "@iconify/react";

const InfoCard = ({
  color,
  label,
  value,
  icon,
}: {
  color: string;
  label?: string;
  value?: string;
  icon?: React.ReactNode;
}) => (
  <div className="w-24 h-16 relative">
    <div
      className={`absolute w-full h-full ${color} rounded-sm -skew-y-6 overflow-hidden`}>
      {icon && <div className="absolute w-full h-full opacity-20">{icon}</div>}
      <div className="w-full h-full flex flex-col items-center justify-center gap-1">
        {label && <span className="text-xs opacity-70">{label}</span>}
        {value && (
          <span className="text-sm font-bold relative z-10">{value}</span>
        )}
      </div>
    </div>
  </div>
);

const GameInfo = () => {
  return (
    <div className="p-4">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <InfoCard
            color="bg-green-500/80"
            label="Exact Match"
            value="Correct"
          />
          <InfoCard
            color="bg-yellow-600/80"
            label="Close Match"
            value="Partial"
          />
          <InfoCard color="bg-neutral-800/80" label="No Match" value="Wrong" />

          <InfoCard
            color="bg-green-500/80"
            value="Same Year"
            icon={<Icon icon="mdi:equal" className="w-full h-full" />}
          />
          <InfoCard
            color="bg-neutral-800/80"
            value="Year Higher"
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
          />
          <InfoCard
            color="bg-neutral-800/80"
            value="Year Lower"
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
          />
        </div>
      </div>
    </div>
  );
};

export default GameInfo;
